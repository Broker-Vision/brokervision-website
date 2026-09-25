/**
 * Cloudflare Turnstile server-side verification.
 * Docs: https://developers.cloudflare.com/turnstile/
 */

const { fetchWithTimeout } = require("./http");

async function verifyTurnstile(token, remoteIp) {
  const secret = process.env.CONTACT_TURNSTILE_SECRET_KEY || process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return { ok: false, code: "TURNSTILE_NOT_CONFIGURED", message: "Turnstile ist nicht konfiguriert." };
  }
  if (!token) {
    return { ok: false, code: "TURNSTILE_MISSING", message: "Sicherheitsprüfung fehlt." };
  }

  const form = new URLSearchParams();
  form.set("secret", secret);
  form.set("response", token);
  if (remoteIp) form.set("remoteip", remoteIp);

  let response;
  try {
    response = await fetchWithTimeout(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: form.toString(),
      },
      Number(process.env.TURNSTILE_TIMEOUT_MS || 10000),
    );
  } catch (error) {
    return {
      ok: false,
      code: "TURNSTILE_UNAVAILABLE",
      message: "Sicherheitsprüfung vorübergehend nicht erreichbar.",
      detail: String(error?.message || error),
    };
  }

  if (!response.ok) {
    return {
      ok: false,
      code: "TURNSTILE_UNAVAILABLE",
      message: "Sicherheitsprüfung vorübergehend nicht erreichbar.",
    };
  }

  const result = await response.json();
  if (!result.success) {
    return {
      ok: false,
      code: "TURNSTILE_FAILED",
      message: "Sicherheitsprüfung fehlgeschlagen. Bitte versuchen Sie es erneut.",
      codes: result["error-codes"] || [],
    };
  }

  return { ok: true };
}

function getTurnstileSiteKey() {
  return (
    process.env.CONTACT_TURNSTILE_SITE_KEY ||
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    ""
  );
}

module.exports = { verifyTurnstile, getTurnstileSiteKey };
