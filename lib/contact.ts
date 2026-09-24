import { site } from "@/lib/site";

export const contactInterests = [
  "Allgemeine Anfrage",
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
};

export type ContactFieldErrors = Partial<
  Record<
    "name" | "company" | "email" | "phone" | "interest" | "message" | "privacyAccepted",
    string
  >
>;

export type ContactValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; fields: ContactFieldErrors; form?: string };

/** Record shape prepared for Azure Storage (Table/Blob) once credentials exist. */
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
};

export const contactConfig = {
  /** Relative SWA Functions endpoint – no secrets in the client. */
  endpoint: "/api/contact",
  recipientEmail: site.email,
  minFillMs: 2500,
  maxMessageLength: 5000,
  maxNameLength: 120,
  maxCompanyLength: 160,
  maxPhoneLength: 40,
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function emptyContactForm(): Omit<ContactPayload, "openedAt"> & { openedAt: number } {
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
  };
}

export function validateContactPayload(
  raw: Partial<ContactPayload>,
  options?: { now?: number },
): ContactValidationResult {
  const now = options?.now ?? Date.now();
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

  if (!name) fields.name = "Bitte geben Sie Ihren Namen an.";
  else if (name.length > contactConfig.maxNameLength) {
    fields.name = "Der Name ist zu lang.";
  }

  if (company.length > contactConfig.maxCompanyLength) {
    fields.company = "Der Unternehmensname ist zu lang.";
  }

  if (!email) fields.email = "Bitte geben Sie Ihre E-Mail-Adresse an.";
  else if (!emailPattern.test(email)) fields.email = "Bitte eine gültige E-Mail-Adresse angeben.";

  if (phone.length > contactConfig.maxPhoneLength) {
    fields.phone = "Die Telefonnummer ist zu lang.";
  }

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

  if (Object.keys(fields).length > 0) {
    return { ok: false, fields, form: "Bitte prüfen Sie die markierten Felder." };
  }

  // Honeypot or unrealistically fast submit → treat as spam (silent reject on server).
  if (website) {
    return { ok: false, fields: {}, form: "spam" };
  }
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
    },
  };
}

export function buildMailtoDraft(data: ContactPayload): string {
  const subject = encodeURIComponent(`Kontaktanfrage: ${data.interest}`);
  const body = encodeURIComponent(
    [
      `Name: ${data.name}`,
      `Unternehmen: ${data.company || "–"}`,
      `E-Mail: ${data.email}`,
      `Telefon: ${data.phone || "–"}`,
      `Thema: ${data.interest}`,
      "",
      data.message,
    ].join("\n"),
  );
  return `mailto:${contactConfig.recipientEmail}?subject=${subject}&body=${body}`;
}
