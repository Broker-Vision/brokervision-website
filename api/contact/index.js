/**
 * Contact intake for Broker Vision (Azure Static Web Apps Functions).
 *
 * Prepared for:
 * - validation & spam checks
 * - optional Azure Storage persistence (env: CONTACT_STORAGE_CONNECTION_STRING)
 * - optional e-mail notification (env: CONTACT_NOTIFY_WEBHOOK_URL)
 *
 * No production secrets are committed. Without configuration the API returns
 * HTTP 501 with code NOT_CONFIGURED so the website can fall back gracefully.
 */

const INTERESTS = [
  "Allgemeine Anfrage",
  "Plattform-Übersicht",
  "Offerten & Dokumentenanalyse",
  "Workflow-Automatisierung",
  "CRM & Dokumentenmanagement",
  "Sicherheit & Cloud",
];

const MIN_FILL_MS = 2500;
const MAX_MESSAGE = 5000;

function json(context, status, body) {
  context.res = {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
    body,
  };
}

function validate(body) {
  const name = String(body?.name || "").trim();
  const company = String(body?.company || "").trim();
  const email = String(body?.email || "").trim().toLowerCase();
  const phone = String(body?.phone || "").trim();
  const interest = String(body?.interest || "").trim();
  const message = String(body?.message || "").trim();
  const website = String(body?.website || "").trim();
  const openedAt = Number(body?.openedAt || 0);
  const privacyAccepted = Boolean(body?.privacyAccepted);

  if (website) return { spam: true };
  if (!openedAt || Date.now() - openedAt < MIN_FILL_MS) return { spam: true };

  if (!name || name.length > 120) return { error: "Ungültiger Name." };
  if (company.length > 160) return { error: "Ungültiges Unternehmen." };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Ungültige E-Mail-Adresse." };
  }
  if (phone.length > 40) return { error: "Ungültige Telefonnummer." };
  if (!INTERESTS.includes(interest)) return { error: "Ungültiges Thema." };
  if (!message || message.length < 10 || message.length > MAX_MESSAGE) {
    return { error: "Ungültige Nachricht." };
  }
  if (!privacyAccepted) return { error: "Datenschutzhinweis nicht bestätigt." };

  return {
    data: {
      name,
      company,
      email,
      phone,
      interest,
      message,
      privacyAccepted: true,
      source: "website-contact",
    },
  };
}

module.exports = async function (context, req) {
  if (req.method === "OPTIONS") {
    context.res = {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
    return;
  }

  const result = validate(req.body || {});
  if (result.spam) {
    // Silent acceptance for bots – no storage, no e-mail.
    json(context, 200, { ok: true });
    return;
  }
  if (result.error) {
    json(context, 400, { ok: false, message: result.error });
    return;
  }

  const storageConfigured = Boolean(process.env.CONTACT_STORAGE_CONNECTION_STRING);
  const notifyConfigured = Boolean(process.env.CONTACT_NOTIFY_WEBHOOK_URL);

  if (!storageConfigured && !notifyConfigured) {
    json(context, 501, {
      ok: false,
      code: "NOT_CONFIGURED",
      message:
        "Kontakt-API ist bereit, aber noch nicht mit Speicher oder Versand verbunden.",
    });
    return;
  }

  const inquiry = {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    ...result.data,
    status: "new",
  };

  // Persistence & notification hooks – activated when env vars are set in Azure.
  // Implementation will use Azure Storage / webhook without embedding secrets in git.
  context.log("Contact inquiry accepted", {
    id: inquiry.id,
    interest: inquiry.interest,
    storageConfigured,
    notifyConfigured,
  });

  json(context, 200, { ok: true, id: inquiry.id });
};
