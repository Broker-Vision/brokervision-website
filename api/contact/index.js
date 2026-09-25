/**
 * Broker Vision contact API
 * Azure Functions + Cloudflare Turnstile + Azure Table Storage + Microsoft Graph mail (optional).
 */

const { validateContactBody } = require("../lib/validate");
const { verifyTurnstile, getTurnstileSiteKey } = require("../lib/turnstile");
const { saveInquiry, bumpRateLimit, hashIp, getConnectionString, diagnoseStorage } = require("../lib/storage");
const { sendGraphNotification, isMailEnabled, diagnoseGraph } = require("../lib/graphMail");
const { checkRateLimit, getClientIp } = require("../lib/rateLimit");
const crypto = require("crypto");

function json(context, status, body, extraHeaders = {}) {
  context.res = {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
    body,
  };
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

async function publicConfig() {
  const siteKey = getTurnstileSiteKey();
  const [storage, graph] = await Promise.all([diagnoseStorage(), diagnoseGraph()]);
  return {
    ok: true,
    turnstileSiteKey: siteKey,
    turnstileRequired: Boolean(siteKey && (process.env.CONTACT_TURNSTILE_SECRET_KEY || process.env.TURNSTILE_SECRET_KEY)),
    mailEnabled: isMailEnabled(),
    storageConfigured: Boolean(getConnectionString()),
    diagnostics: {
      storage,
      graph,
    },
  };
}

module.exports = async function (context, req) {
  try {
    if (req.method === "OPTIONS") {
      context.res = { status: 204, headers: corsHeaders() };
      return;
    }

    if (req.method === "GET") {
      const config = await publicConfig();
      json(context, 200, config, corsHeaders());
      return;
    }

    const ip = getClientIp(req);
    const rate = checkRateLimit(ip);
    if (!rate.ok) {
      json(
        context,
        429,
        {
          ok: false,
          code: "RATE_LIMITED",
          message: "Zu viele Anfragen. Bitte warten Sie einen Moment und versuchen Sie es erneut.",
        },
        { ...corsHeaders(), "Retry-After": String(rate.retryAfterSec || 60) },
      );
      return;
    }

    // Best-effort durable counter (does not block request if storage is down).
    try {
      await bumpRateLimit(hashIp(ip), rate.windowMs);
    } catch (error) {
      context.log.warn("Rate limit table bump failed", error?.message || error);
    }

    const result = validateContactBody(req.body || {});
    if (result.spam) {
      json(context, 200, { ok: true }, corsHeaders());
      return;
    }
    if (result.error) {
      json(context, 400, { ok: false, code: "VALIDATION_ERROR", message: result.error }, corsHeaders());
      return;
    }

    const turnstile = await verifyTurnstile(result.data.turnstileToken, ip);
    if (!turnstile.ok) {
      const status = turnstile.code === "TURNSTILE_NOT_CONFIGURED" ? 503 : 400;
      json(
        context,
        status,
        {
          ok: false,
          code: turnstile.code,
          message: turnstile.message,
        },
        corsHeaders(),
      );
      return;
    }

    if (!getConnectionString()) {
      json(
        context,
        503,
        {
          ok: false,
          code: "STORAGE_NOT_CONFIGURED",
          message:
            "Der Empfangsdienst ist noch nicht vollständig konfiguriert. Bitte schreiben Sie an info@brokervision.ch.",
        },
        corsHeaders(),
      );
      return;
    }

    const inquiry = {
      id: crypto.randomUUID(),
      receivedAt: new Date().toISOString(),
      name: result.data.name,
      company: result.data.company,
      email: result.data.email,
      phone: result.data.phone,
      interest: result.data.interest,
      message: result.data.message,
      source: result.data.source,
      status: "new",
      mailStatus: "pending",
      clientIpHash: hashIp(ip),
    };

    let stored;
    try {
      stored = await saveInquiry(inquiry);
    } catch (error) {
      context.log.error("Storage save failed", {
        message: error?.message || String(error),
        code: error?.code,
        statusCode: error?.statusCode,
      });
      json(
        context,
        503,
        {
          ok: false,
          code: error?.code === "TIMEOUT" ? "STORAGE_TIMEOUT" : "STORAGE_FAILED",
          message:
            "Ihre Anfrage konnte nicht gespeichert werden. Bitte versuchen Sie es später erneut oder schreiben Sie an info@brokervision.ch.",
        },
        corsHeaders(),
      );
      return;
    }

    if (!stored.ok) {
      json(
        context,
        503,
        {
          ok: false,
          code: stored.code || "STORAGE_NOT_CONFIGURED",
          message:
            "Der Empfangsdienst ist noch nicht vollständig konfiguriert. Bitte schreiben Sie an info@brokervision.ch.",
        },
        corsHeaders(),
      );
      return;
    }

    let mailStatus = "skipped";
    let mailError = null;
    try {
      const mail = await sendGraphNotification(inquiry);
      if (mail.skipped) mailStatus = "disabled";
      else if (mail.ok) mailStatus = "sent";
      else {
        mailStatus = "failed";
        mailError = { code: mail.code, status: mail.status || null, detail: mail.detail || null };
        context.log.warn("Graph mail failed", mailError);
      }
    } catch (error) {
      mailStatus = "failed";
      mailError = { code: "GRAPH_EXCEPTION", detail: String(error?.message || error) };
      context.log.warn("Graph mail exception", mailError);
    }

    // Inquiry is considered accepted once stored; mail can be enabled later via config.
    context.log("Contact inquiry accepted", {
      id: inquiry.id,
      interest: inquiry.interest,
      mailStatus,
      mailEnabled: isMailEnabled(),
      mailError,
    });

    json(
      context,
      200,
      {
        ok: true,
        id: inquiry.id,
        mailStatus,
        ...(mailError ? { mailError } : {}),
      },
      corsHeaders(),
    );
  } catch (error) {
    context.log.error("Unhandled contact API error", {
      message: error?.message || String(error),
      stack: error?.stack,
    });
    json(
      context,
      500,
      {
        ok: false,
        code: "INTERNAL_ERROR",
        message:
          "Die Anfrage konnte nicht verarbeitet werden. Bitte versuchen Sie es später erneut oder schreiben Sie an info@brokervision.ch.",
        detail: String(error?.message || error),
      },
      corsHeaders(),
    );
  }
};
