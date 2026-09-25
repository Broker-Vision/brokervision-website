/**
 * Microsoft Graph mail sender (Microsoft 365).
 * Enable with CONTACT_MAIL_ENABLED=true and Graph app credentials.
 * No SMTP. Uses client-credentials flow + users/{from}/sendMail.
 */

async function getGraphToken() {
  const tenantId = process.env.GRAPH_TENANT_ID;
  const clientId = process.env.GRAPH_CLIENT_ID;
  const clientSecret = process.env.GRAPH_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    return { ok: false, code: "GRAPH_NOT_CONFIGURED" };
  }

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  });

  const response = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    },
  );

  if (!response.ok) {
    const detail = await response.text();
    return { ok: false, code: "GRAPH_TOKEN_FAILED", detail };
  }

  const json = await response.json();
  return { ok: true, accessToken: json.access_token };
}

function isMailEnabled() {
  const flag = String(process.env.CONTACT_MAIL_ENABLED || "").toLowerCase();
  return flag === "true" || flag === "1" || flag === "yes";
}

/**
 * Send notification mail via Microsoft Graph when enabled.
 * Safe no-op when CONTACT_MAIL_ENABLED is false.
 */
async function sendGraphNotification(inquiry) {
  if (!isMailEnabled()) {
    return { ok: true, skipped: true, reason: "MAIL_DISABLED" };
  }

  const mailFrom = process.env.GRAPH_MAIL_FROM || process.env.CONTACT_MAIL_FROM || "info@brokervision.ch";
  const mailTo = process.env.GRAPH_MAIL_TO || process.env.CONTACT_MAIL_TO || "info@brokervision.ch";

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

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(mailFrom)}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenResult.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    const detail = await response.text();
    return { ok: false, code: "GRAPH_SEND_FAILED", detail };
  }

  return { ok: true, mailed: true };
}

module.exports = { sendGraphNotification, isMailEnabled, getGraphToken };
