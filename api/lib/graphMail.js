/**
 * Microsoft Graph mail sender (Microsoft 365).
 * Enable with CONTACT_MAIL_ENABLED=true and Graph app credentials.
 * No SMTP. Uses client-credentials flow + users/{from}/sendMail.
 */

const { fetchWithTimeout, readBodyPreview } = require("./http");

const GRAPH_TIMEOUT_MS = Number(process.env.GRAPH_TIMEOUT_MS || 12000);

function graphEnv() {
  return {
    tenantId: process.env.GRAPH_TENANT_ID || "",
    clientId: process.env.GRAPH_CLIENT_ID || "",
    clientSecret: process.env.GRAPH_CLIENT_SECRET || "",
    mailFrom: process.env.GRAPH_MAIL_FROM || process.env.CONTACT_MAIL_FROM || "info@brokervision.ch",
    mailTo: process.env.GRAPH_MAIL_TO || process.env.CONTACT_MAIL_TO || "info@brokervision.ch",
  };
}

async function getGraphToken() {
  const { tenantId, clientId, clientSecret } = graphEnv();

  if (!tenantId || !clientId || !clientSecret) {
    return {
      ok: false,
      code: "GRAPH_NOT_CONFIGURED",
      detail: `missing:${[
        !tenantId ? "GRAPH_TENANT_ID" : null,
        !clientId ? "GRAPH_CLIENT_ID" : null,
        !clientSecret ? "GRAPH_CLIENT_SECRET" : null,
      ]
        .filter(Boolean)
        .join(",")}`,
    };
  }

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  });

  let response;
  try {
    response = await fetchWithTimeout(
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      },
      GRAPH_TIMEOUT_MS,
    );
  } catch (error) {
    return {
      ok: false,
      code: "GRAPH_TOKEN_TIMEOUT",
      detail: error?.name === "AbortError" ? `aborted after ${GRAPH_TIMEOUT_MS}ms` : String(error?.message || error),
    };
  }

  if (!response.ok) {
    const detail = await readBodyPreview(response);
    return { ok: false, code: "GRAPH_TOKEN_FAILED", status: response.status, detail };
  }

  const json = await response.json();
  return { ok: true, accessToken: json.access_token };
}

function isMailEnabled() {
  const flag = String(process.env.CONTACT_MAIL_ENABLED || "").toLowerCase();
  return flag === "true" || flag === "1" || flag === "yes";
}

/**
 * Probe Graph client-credentials auth (no mail send).
 * Safe for public diagnostics: returns AAD error text, never secrets.
 */
async function diagnoseGraph() {
  const enabled = isMailEnabled();
  const { tenantId, clientId, clientSecret, mailFrom, mailTo } = graphEnv();
  const base = {
    enabled,
    tenantIdSet: Boolean(tenantId),
    clientIdSet: Boolean(clientId),
    clientSecretSet: Boolean(clientSecret),
    mailFrom,
    mailTo,
    tenantIdSuffix: tenantId ? tenantId.slice(-12) : "",
    clientIdSuffix: clientId ? clientId.slice(-12) : "",
  };

  if (!enabled) {
    return { ...base, ok: true, skipped: true, reason: "MAIL_DISABLED" };
  }

  const tokenResult = await getGraphToken();
  if (!tokenResult.ok) {
    return {
      ...base,
      ok: false,
      code: tokenResult.code,
      status: tokenResult.status || null,
      detail: tokenResult.detail || null,
    };
  }

  return { ...base, ok: true, code: "GRAPH_TOKEN_OK" };
}

/**
 * Send notification mail via Microsoft Graph when enabled.
 * Safe no-op when CONTACT_MAIL_ENABLED is false.
 */
async function sendGraphNotification(inquiry) {
  if (!isMailEnabled()) {
    return { ok: true, skipped: true, reason: "MAIL_DISABLED" };
  }

  const { mailFrom, mailTo } = graphEnv();

  const tokenResult = await getGraphToken();
  if (!tokenResult.ok) {
    return tokenResult;
  }

  const subject = `Kontaktanfrage: ${inquiry.interest} – ${inquiry.name}`;
  const content = [
    "Neue Kontaktanfrage über brokervision.ch",
    "",
    `ID: ${inquiry.id}`,
    `Zeit: ${inquiry.receivedAt}`,
    `Name: ${inquiry.name}`,
    `Unternehmen: ${inquiry.company || "–"}`,
    `E-Mail: ${inquiry.email}`,
    `Telefon: ${inquiry.phone || "–"}`,
    `Thema: ${inquiry.interest}`,
    "",
    inquiry.message,
  ].join("\n");

  const payload = {
    message: {
      subject,
      body: {
        contentType: "Text",
        content,
      },
      toRecipients: [{ emailAddress: { address: mailTo } }],
      replyTo: [{ emailAddress: { address: inquiry.email, name: inquiry.name } }],
    },
    saveToSentItems: true,
  };

  let response;
  try {
    response = await fetchWithTimeout(
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(mailFrom)}/sendMail`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenResult.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
      GRAPH_TIMEOUT_MS,
    );
  } catch (error) {
    return {
      ok: false,
      code: "GRAPH_SEND_TIMEOUT",
      detail: error?.name === "AbortError" ? `aborted after ${GRAPH_TIMEOUT_MS}ms` : String(error?.message || error),
    };
  }

  if (!response.ok) {
    const detail = await readBodyPreview(response);
    return { ok: false, code: "GRAPH_SEND_FAILED", status: response.status, detail };
  }

  return { ok: true, mailed: true };
}

module.exports = { sendGraphNotification, isMailEnabled, getGraphToken, diagnoseGraph };
