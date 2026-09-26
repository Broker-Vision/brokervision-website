import { site } from "@/lib/site";

export const contactInterests = [
  "Allgemeine Anfrage",
  "Live-Demo",
  "Plattform-Übersicht",
  "Offerten & Dokumentenanalyse",
  "Workflow-Automatisierung",
  "CRM & Dokumentenmanagement",
  "Sicherheit & Cloud",
] as const;

export type ContactInterest = (typeof contactInterests)[number];

/** Client payload for the contact API. */
export type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  /** Privacy consent must be true. */
  privacyAccepted: boolean;
  /** Honeypot – must stay empty. */
  website: string;
  /** Client timestamp (ms) when the form was opened. */
  openedAt: number;
  /** Cloudflare Turnstile token. */
  turnstileToken: string;
};

export type ContactFieldErrors = Partial<
  Record<
    | "name"
    | "company"
    | "email"
    | "phone"
    | "interest"
    | "message"
    | "privacyAccepted"
    | "turnstileToken",
    string
  >
>;

export type ContactValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; fields: ContactFieldErrors; form?: string };

/** Record shape stored in Azure Table Storage. */
export type ContactInquiryRecord = {
  id: string;
  receivedAt: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  source: "website-contact";
  status: "new" | "notified" | "archived";
  mailStatus: "pending" | "sent" | "failed" | "disabled" | "skipped";
};

export type ContactPublicConfig = {
  ok: boolean;
  turnstileSiteKey: string;
  turnstileRequired: boolean;
  mailEnabled: boolean;
  storageConfigured: boolean;
};

export const contactConfig = {
  endpoint: "/api/contact",
  recipientEmail: site.email,
  minFillMs: 2500,
  maxMessageLength: 5000,
  maxNameLength: 120,
  maxCompanyLength: 160,
  maxPhoneLength: 40,
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function emptyContactForm(): ContactPayload {
  return {
    name: "",
    company: "",
    email: "",
    phone: "",
    interest: contactInterests[0],
    message: "",
    privacyAccepted: false,
    website: "",
    openedAt: Date.now(),
    turnstileToken: "",
  };
}

export function validateContactPayload(
  raw: Partial<ContactPayload>,
  options?: { now?: number; requireTurnstile?: boolean },
): ContactValidationResult {
  const now = options?.now ?? Date.now();
  const requireTurnstile = options?.requireTurnstile ?? true;
  const fields: ContactFieldErrors = {};

  const name = (raw.name ?? "").trim();
  const company = (raw.company ?? "").trim();
  const email = (raw.email ?? "").trim().toLowerCase();
  const phone = (raw.phone ?? "").trim();
  const interest = (raw.interest ?? "").trim();
  const message = (raw.message ?? "").trim();
  const website = (raw.website ?? "").trim();
  const openedAt = typeof raw.openedAt === "number" ? raw.openedAt : 0;
  const privacyAccepted = Boolean(raw.privacyAccepted);
  const turnstileToken = (raw.turnstileToken ?? "").trim();

  if (!name) fields.name = "Bitte geben Sie Ihren Namen an.";
  else if (name.length > contactConfig.maxNameLength) fields.name = "Der Name ist zu lang.";

  if (company.length > contactConfig.maxCompanyLength) {
    fields.company = "Der Unternehmensname ist zu lang.";
  }

  if (!email) fields.email = "Bitte geben Sie Ihre E-Mail-Adresse an.";
  else if (!emailPattern.test(email)) fields.email = "Bitte eine gültige E-Mail-Adresse angeben.";

  if (phone.length > contactConfig.maxPhoneLength) fields.phone = "Die Telefonnummer ist zu lang.";

  if (!interest || !(contactInterests as readonly string[]).includes(interest)) {
    fields.interest = "Bitte wählen Sie ein Thema.";
  }

  if (!message) fields.message = "Bitte formulieren Sie Ihre Nachricht.";
  else if (message.length < 10) fields.message = "Die Nachricht ist zu kurz.";
  else if (message.length > contactConfig.maxMessageLength) {
    fields.message = "Die Nachricht ist zu lang.";
  }

  if (!privacyAccepted) {
    fields.privacyAccepted = "Bitte bestätigen Sie den Hinweis zum Datenschutz.";
  }

  if (requireTurnstile && !turnstileToken) {
    fields.turnstileToken = "Bitte bestätigen Sie die Sicherheitsprüfung.";
  }

  if (Object.keys(fields).length > 0) {
    return { ok: false, fields, form: "Bitte prüfen Sie die markierten Felder." };
  }

  if (website) return { ok: false, fields: {}, form: "spam" };
  if (!openedAt || now - openedAt < contactConfig.minFillMs) {
    return { ok: false, fields: {}, form: "spam" };
  }

  return {
    ok: true,
    data: {
      name,
      company,
      email,
      phone,
      interest,
      message,
      privacyAccepted,
      website: "",
      openedAt,
      turnstileToken,
    },
  };
}

export async function fetchContactConfig(): Promise<ContactPublicConfig> {
  const response = await fetch(contactConfig.endpoint, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("CONFIG_UNAVAILABLE");
  }
  return (await response.json()) as ContactPublicConfig;
}
