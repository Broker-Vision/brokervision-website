"use client";

import Link from "next/link";
import { FormEvent, useEffect, useId, useState, type ReactNode } from "react";
import {
  contactConfig,
  contactInterests,
  emptyContactForm,
  fetchContactConfig,
  validateContactPayload,
  type ContactFieldErrors,
  type ContactPayload,
  type ContactPublicConfig,
} from "@/lib/contact";
import { TurnstileWidget, resetTurnstile } from "@/components/TurnstileWidget";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; id?: string }
  | { status: "error"; message: string; code?: string };

const fieldClass =
  "w-full rounded-lg border border-navy-900/15 bg-paper px-3 py-2.5 outline-none ring-gold-400/40 transition focus:ring-2 disabled:opacity-60";
const fieldErrorClass = "border-red-400 focus:ring-red-300/50";

export function ContactForm() {
  const formId = useId();
  const [values, setValues] = useState(() => emptyContactForm());
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submit, setSubmit] = useState<SubmitState>({ status: "idle" });
  const [config, setConfig] = useState<ContactPublicConfig | null>(null);
  const [configError, setConfigError] = useState<string | null>(null);
  const [turnstileReady, setTurnstileReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchContactConfig()
      .then((data) => {
        if (cancelled) return;
        setConfig(data);
        if (!data.turnstileSiteKey || !data.turnstileRequired) {
          setConfigError(
            "Die Sicherheitsprüfung ist noch nicht konfiguriert. Bitte schreiben Sie an info@brokervision.ch.",
          );
        }
      })
      .catch(() => {
        if (cancelled) return;
        setConfigError(
          "Der Kontaktdienst ist vorübergehend nicht erreichbar. Bitte schreiben Sie an info@brokervision.ch.",
        );
      });
    return () => {
      cancelled = true;
    };
  }, []);

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

    if (configError || !config?.turnstileRequired) {
      setFormError(
        configError ||
          "Der Kontaktdienst ist noch nicht vollständig konfiguriert. Bitte schreiben Sie an info@brokervision.ch.",
      );
      return;
    }

    const validation = validateContactPayload(values, { requireTurnstile: true });
    if (!validation.ok) {
      if (validation.form === "spam") {
        setSubmit({ status: "success" });
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

      let payload: { code?: string; message?: string; ok?: boolean; id?: string } = {};
      try {
        payload = await response.json();
      } catch {
        payload = {};
      }

      if (response.ok && payload.ok) {
        setSubmit({ status: "success", id: payload.id });
        setValues(emptyContactForm());
        resetTurnstile();
        setTurnstileReady(false);
        return;
      }

      if (response.status === 429) {
        setSubmit({
          status: "error",
          code: "RATE_LIMITED",
          message:
            payload.message ||
            "Zu viele Anfragen. Bitte warten Sie einen Moment und versuchen Sie es erneut.",
        });
        resetTurnstile();
        update("turnstileToken", "");
        return;
      }

      if (response.status === 400) {
        setSubmit({ status: "idle" });
        if (payload.code === "TURNSTILE_FAILED" || payload.code === "TURNSTILE_MISSING") {
          setFieldErrors({ turnstileToken: payload.message || "Sicherheitsprüfung fehlgeschlagen." });
          resetTurnstile();
          update("turnstileToken", "");
        }
        setFormError(payload.message || "Bitte prüfen Sie Ihre Angaben.");
        return;
      }

      setSubmit({
        status: "error",
        code: payload.code,
        message:
          payload.message ||
          "Die Anfrage konnte nicht übermittelt werden. Bitte versuchen Sie es erneut oder schreiben Sie an info@brokervision.ch.",
      });
      resetTurnstile();
      update("turnstileToken", "");
    } catch {
      setSubmit({
        status: "error",
        code: "NETWORK",
        message:
          "Die Verbindung zum Kontaktdienst ist fehlgeschlagen. Bitte versuchen Sie es erneut oder schreiben Sie an info@brokervision.ch.",
      });
      resetTurnstile();
      update("turnstileToken", "");
    }
  }

  if (submit.status === "success") {
    return (
      <div
        className="rounded-2xl border border-navy-900/10 bg-white p-8 shadow-sm"
        role="status"
        aria-live="polite"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-500">
          Anfrage erhalten
        </p>
        <h2 className="font-display mt-3 text-3xl text-navy-900">Vielen Dank.</h2>
        <p className="mt-3 leading-relaxed text-navy-800/80">
          Wir haben Ihre Nachricht entgegengenommen und melden uns in der Regel innerhalb
          weniger Werktage.
        </p>
        {submit.id ? (
          <p className="mt-3 text-xs text-navy-800/50">Referenz: {submit.id}</p>
        ) : null}
        <button
          type="button"
          className="mt-6 text-sm font-medium text-navy-900 underline underline-offset-4"
          onClick={() => {
            setSubmit({ status: "idle" });
            setValues(emptyContactForm());
            setFieldErrors({});
            setFormError(null);
            setTurnstileReady(false);
          }}
        >
          Weitere Nachricht verfassen
        </button>
      </div>
    );
  }

  const busy = submit.status === "submitting";
  const serviceBlocked = Boolean(configError);

  return (
    <form
      id={formId}
      onSubmit={onSubmit}
      className="relative rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" required error={fieldErrors.name} htmlFor={`${formId}-name`}>
          <input
            id={`${formId}-name`}
            className={`${fieldClass} ${fieldErrors.name ? fieldErrorClass : ""}`}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            disabled={busy || serviceBlocked}
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
            disabled={busy || serviceBlocked}
            aria-invalid={Boolean(fieldErrors.company)}
          />
        </Field>
        <Field label="E-Mail" required error={fieldErrors.email} htmlFor={`${formId}-email`}>
          <input
            id={`${formId}-email`}
            className={`${fieldClass} ${fieldErrors.email ? fieldErrorClass : ""}`}
            type="email"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            disabled={busy || serviceBlocked}
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
            disabled={busy || serviceBlocked}
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
          disabled={busy || serviceBlocked}
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
          disabled={busy || serviceBlocked}
          required
          maxLength={contactConfig.maxMessageLength}
          aria-invalid={Boolean(fieldErrors.message)}
        />
      </Field>

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
            disabled={busy || serviceBlocked}
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

      <div className="mt-5">
        <p className="mb-2 text-sm font-medium text-navy-900">Sicherheitsprüfung *</p>
        {config?.turnstileSiteKey ? (
          <TurnstileWidget
            siteKey={config.turnstileSiteKey}
            disabled={busy || serviceBlocked}
            onToken={(token) => {
              update("turnstileToken", token);
              setTurnstileReady(true);
            }}
            onExpire={() => {
              update("turnstileToken", "");
              setTurnstileReady(false);
            }}
            onError={() => {
              update("turnstileToken", "");
              setTurnstileReady(false);
              setFormError(
                "Die Sicherheitsprüfung konnte nicht geladen werden. Bitte laden Sie die Seite neu.",
              );
            }}
          />
        ) : (
          <p className="text-sm text-navy-800/60">Sicherheitsprüfung wird geladen…</p>
        )}
        {fieldErrors.turnstileToken ? (
          <p className="mt-2 text-sm text-red-700" role="alert">
            {fieldErrors.turnstileToken}
          </p>
        ) : null}
        {!turnstileReady && config?.turnstileSiteKey ? (
          <p className="mt-2 text-xs text-navy-800/50">
            Bitte schliessen Sie die Sicherheitsprüfung ab, bevor Sie senden.
          </p>
        ) : null}
      </div>

      {configError ? (
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950" role="status">
          {configError}{" "}
          <a
            className="font-medium underline decoration-gold-400 underline-offset-4"
            href={`mailto:${contactConfig.recipientEmail}`}
          >
            {contactConfig.recipientEmail}
          </a>
        </p>
      ) : null}

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
        disabled={busy || serviceBlocked || !turnstileReady}
        className="mt-6 w-full rounded-full bg-navy-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {busy ? "Wird gesendet…" : "Nachricht senden"}
      </button>
      <p className="mt-3 text-xs text-navy-800/60">
        Pflichtfelder sind mit * gekennzeichnet. Geschützt mit Cloudflare Turnstile. Anfragen
        werden in Azure gespeichert; der E-Mail-Versand an {contactConfig.recipientEmail} erfolgt
        über Microsoft Graph, sobald aktiviert.
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
