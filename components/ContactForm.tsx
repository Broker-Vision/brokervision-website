"use client";

import Link from "next/link";
import { FormEvent, useId, useState, type ReactNode } from "react";
import {
  buildMailtoDraft,
  contactConfig,
  contactInterests,
  emptyContactForm,
  validateContactPayload,
  type ContactFieldErrors,
  type ContactPayload,
} from "@/lib/contact";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; mode: "api" | "mailto" }
  | { status: "error"; message: string };

const fieldClass =
  "w-full rounded-lg border border-navy-900/15 bg-paper px-3 py-2.5 outline-none ring-gold-400/40 transition focus:ring-2 disabled:opacity-60";
const fieldErrorClass = "border-red-400 focus:ring-red-300/50";

export function ContactForm() {
  const formId = useId();
  const [values, setValues] = useState(() => emptyContactForm());
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submit, setSubmit] = useState<SubmitState>({ status: "idle" });

  function update<K extends keyof ContactPayload>(key: K, value: ContactPayload[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => {
      if (!(key in current)) return current;
      const next = { ...current };
      delete next[key as keyof ContactFieldErrors];
      return next;
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setFieldErrors({});

    const validation = validateContactPayload(values);
    if (!validation.ok) {
      if (validation.form === "spam") {
        // Silent success for bots – no data leaves the browser.
        setSubmit({ status: "success", mode: "api" });
        return;
      }
      setFieldErrors(validation.fields);
      setFormError(validation.form ?? "Bitte prüfen Sie Ihre Angaben.");
      return;
    }

    setSubmit({ status: "submitting" });

    try {
      const response = await fetch(contactConfig.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(validation.data),
      });

      let payload: { code?: string; message?: string; ok?: boolean } = {};
      try {
        payload = await response.json();
      } catch {
        payload = {};
      }

      if (response.ok && payload.ok) {
        setSubmit({ status: "success", mode: "api" });
        setValues(emptyContactForm());
        return;
      }

      if (response.status === 501 || payload.code === "NOT_CONFIGURED") {
        setSubmit({ status: "success", mode: "mailto" });
        return;
      }

      if (response.status === 400 && payload.message) {
        setSubmit({ status: "idle" });
        setFormError(payload.message);
        return;
      }

      setSubmit({
        status: "error",
        message:
          payload.message ||
          "Die Anfrage konnte nicht übermittelt werden. Bitte versuchen Sie es erneut oder schreiben Sie uns per E-Mail.",
      });
    } catch {
      // API not reachable (local static export / API not yet deployed).
      setSubmit({ status: "success", mode: "mailto" });
    }
  }

  if (submit.status === "success") {
    const mailto = buildMailtoDraft(
      submit.mode === "mailto"
        ? values.name
          ? values
          : {
              ...emptyContactForm(),
              name: "Ihre Angaben",
              email: "ihre@email.ch",
              interest: contactInterests[0],
              message: "Bitte fügen Sie hier Ihre Nachricht ein.",
              privacyAccepted: true,
            }
        : emptyContactForm(),
    );

    return (
      <div
        className="rounded-2xl border border-navy-900/10 bg-white p-8 shadow-sm"
        role="status"
        aria-live="polite"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-500">
          {submit.mode === "api" ? "Anfrage erhalten" : "Angaben geprüft"}
        </p>
        <h2 className="font-display mt-3 text-3xl text-navy-900">Vielen Dank.</h2>
        {submit.mode === "api" ? (
          <p className="mt-3 leading-relaxed text-navy-800/80">
            Wir haben Ihre Nachricht entgegengenommen und melden uns in der Regel innerhalb
            weniger Werktage.
          </p>
        ) : (
          <div className="mt-3 space-y-3 leading-relaxed text-navy-800/80">
            <p>
              Ihre Angaben sind gültig. Der automatische Versand und die Speicherung der
              Anfragen werden vorbereitet und sind noch nicht produktiv aktiviert.
            </p>
            <p>
              Bitte senden Sie Ihre Anfrage vorübergehend per E-Mail an{" "}
              <a
                className="font-medium text-navy-900 underline decoration-gold-400 underline-offset-4"
                href={`mailto:${contactConfig.recipientEmail}`}
              >
                {contactConfig.recipientEmail}
              </a>
              .
            </p>
            <a
              href={mailto}
              className="inline-flex rounded-full bg-navy-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy-800"
            >
              E-Mail mit Ihren Angaben öffnen
            </a>
          </div>
        )}
        <button
          type="button"
          className="mt-6 text-sm font-medium text-navy-900 underline underline-offset-4"
          onClick={() => {
            setSubmit({ status: "idle" });
            setValues(emptyContactForm());
            setFieldErrors({});
            setFormError(null);
          }}
        >
          Weitere Nachricht verfassen
        </button>
      </div>
    );
  }

  const busy = submit.status === "submitting";

  return (
    <form
      id={formId}
      onSubmit={onSubmit}
      className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Name"
          required
          error={fieldErrors.name}
          htmlFor={`${formId}-name`}
        >
          <input
            id={`${formId}-name`}
            className={`${fieldClass} ${fieldErrors.name ? fieldErrorClass : ""}`}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            disabled={busy}
            required
            aria-invalid={Boolean(fieldErrors.name)}
          />
        </Field>
        <Field label="Unternehmen" error={fieldErrors.company} htmlFor={`${formId}-company`}>
          <input
            id={`${formId}-company`}
            className={`${fieldClass} ${fieldErrors.company ? fieldErrorClass : ""}`}
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(event) => update("company", event.target.value)}
            disabled={busy}
            aria-invalid={Boolean(fieldErrors.company)}
          />
        </Field>
        <Field
          label="E-Mail"
          required
          error={fieldErrors.email}
          htmlFor={`${formId}-email`}
        >
          <input
            id={`${formId}-email`}
            className={`${fieldClass} ${fieldErrors.email ? fieldErrorClass : ""}`}
            type="email"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            disabled={busy}
            required
            aria-invalid={Boolean(fieldErrors.email)}
          />
        </Field>
        <Field label="Telefon" error={fieldErrors.phone} htmlFor={`${formId}-phone`}>
          <input
            id={`${formId}-phone`}
            className={`${fieldClass} ${fieldErrors.phone ? fieldErrorClass : ""}`}
            type="tel"
            name="phone"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            disabled={busy}
            aria-invalid={Boolean(fieldErrors.phone)}
          />
        </Field>
      </div>

      <Field
        className="mt-5"
        label="Interesse"
        required
        error={fieldErrors.interest}
        htmlFor={`${formId}-interest`}
      >
        <select
          id={`${formId}-interest`}
          className={`${fieldClass} ${fieldErrors.interest ? fieldErrorClass : ""}`}
          name="interest"
          value={values.interest}
          onChange={(event) => update("interest", event.target.value)}
          disabled={busy}
          aria-invalid={Boolean(fieldErrors.interest)}
        >
          {contactInterests.map((interest) => (
            <option key={interest} value={interest}>
              {interest}
            </option>
          ))}
        </select>
      </Field>

      <Field
        className="mt-5"
        label="Nachricht"
        required
        error={fieldErrors.message}
        htmlFor={`${formId}-message`}
      >
        <textarea
          id={`${formId}-message`}
          className={`min-h-32 ${fieldClass} ${fieldErrors.message ? fieldErrorClass : ""}`}
          name="message"
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          disabled={busy}
          required
          maxLength={contactConfig.maxMessageLength}
          aria-invalid={Boolean(fieldErrors.message)}
        />
      </Field>

      {/* Honeypot – for bots only; visually hidden, not in tab order. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          tabIndex={-1}
          autoComplete="off"
          name="website"
          value={values.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>

      <div className="mt-5">
        <label className="flex items-start gap-3 text-sm text-navy-800/80">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-navy-900/25 text-navy-900 focus:ring-gold-400"
            checked={values.privacyAccepted}
            onChange={(event) => update("privacyAccepted", event.target.checked)}
            disabled={busy}
            aria-invalid={Boolean(fieldErrors.privacyAccepted)}
          />
          <span>
            Ich habe die{" "}
            <Link
              href="/datenschutz/"
              className="font-medium text-navy-900 underline decoration-gold-400 underline-offset-4"
            >
              Datenschutzerklärung
            </Link>{" "}
            gelesen und bin mit der Verarbeitung meiner Angaben zur Bearbeitung der Anfrage
            einverstanden. *
          </span>
        </label>
        {fieldErrors.privacyAccepted ? (
          <p className="mt-2 text-sm text-red-700" role="alert">
            {fieldErrors.privacyAccepted}
          </p>
        ) : null}
      </div>

      {formError ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {formError}
        </p>
      ) : null}

      {submit.status === "error" ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {submit.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className="mt-6 w-full rounded-full bg-navy-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {busy ? "Wird gesendet…" : "Nachricht senden"}
      </button>
      <p className="mt-3 text-xs text-navy-800/60">
        Pflichtfelder sind mit * gekennzeichnet. Spam-Schutz und Speicherung der Anfragen sind
        vorbereitet; produktive Zugangsdaten werden später hinterlegt.
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  htmlFor,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  error?: string;
  htmlFor: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`block text-sm ${className}`}>
      <label htmlFor={htmlFor} className="mb-1.5 block font-medium text-navy-900">
        {label}
        {required ? " *" : null}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
