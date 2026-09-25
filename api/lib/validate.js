const INTERESTS = [
  "Allgemeine Anfrage",
  "Plattform-Übersicht",
  "Offerten & Dokumentenanalyse",
  "Workflow-Automatisierung",
  "CRM & Dokumentenmanagement",
  "Sicherheit & Cloud",
];

const LIMITS = {
  minFillMs: 2500,
  maxMessage: 5000,
  maxName: 120,
  maxCompany: 160,
  maxPhone: 40,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Server-side validation for contact submissions.
 * @returns {{ spam?: boolean, error?: string, data?: object }}
 */
function validateContactBody(body) {
  const name = String(body?.name || "").trim();
  const company = String(body?.company || "").trim();
  const email = String(body?.email || "").trim().toLowerCase();
  const phone = String(body?.phone || "").trim();
  const interest = String(body?.interest || "").trim();
  const message = String(body?.message || "").trim();
  const website = String(body?.website || "").trim();
  const openedAt = Number(body?.openedAt || 0);
  const privacyAccepted = Boolean(body?.privacyAccepted);
  const turnstileToken = String(body?.turnstileToken || "").trim();

  if (website) return { spam: true };
  if (!openedAt || Date.now() - openedAt < LIMITS.minFillMs) return { spam: true };

  if (!name || name.length > LIMITS.maxName) return { error: "Ungültiger Name." };
  if (company.length > LIMITS.maxCompany) return { error: "Ungültiges Unternehmen." };
  if (!email || !emailPattern.test(email)) return { error: "Ungültige E-Mail-Adresse." };
  if (phone.length > LIMITS.maxPhone) return { error: "Ungültige Telefonnummer." };
  if (!INTERESTS.includes(interest)) return { error: "Ungültiges Thema." };
  if (!message || message.length < 10 || message.length > LIMITS.maxMessage) {
    return { error: "Ungültige Nachricht." };
  }
  if (!privacyAccepted) return { error: "Datenschutzhinweis nicht bestätigt." };
  if (!turnstileToken) return { error: "Sicherheitsprüfung fehlt. Bitte laden Sie die Seite neu." };

  return {
    data: {
      name,
      company,
      email,
      phone,
      interest,
      message,
      privacyAccepted: true,
      turnstileToken,
      source: "website-contact",
    },
  };
}

module.exports = { INTERESTS, LIMITS, validateContactBody };
