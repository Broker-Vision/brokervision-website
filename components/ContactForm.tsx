"use client";

import { FormEvent, useState } from "react";

const interests = [
  "Allgemeine Anfrage",
  "Plattform-Übersicht",
  "Offerten & Dokumentenanalyse",
  "Workflow-Automatisierung",
  "CRM & Dokumentenmanagement",
  "Sicherheit & Cloud",
];

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

const empty: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  interest: interests[0],
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState<FormState>(empty);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
      setError("Bitte Name, E-Mail und Nachricht ausfüllen.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      setError("Bitte eine gültige E-Mail-Adresse angeben.");
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-navy-900/10 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-500">
          Nachricht erfasst
        </p>
        <h2 className="font-display mt-3 text-3xl text-navy-900">Vielen Dank.</h2>
        <p className="mt-3 text-navy-800/80">
          Ihre Anfrage ist vorbereitet. Das Formular versendet derzeit noch keine
          Daten an einen Server. Bitte schreiben Sie uns direkt an{" "}
          <a className="underline decoration-gold-400 underline-offset-4" href="mailto:info@brokervision.ch">
            info@brokervision.ch
          </a>
          .
        </p>
        <button
          type="button"
          className="mt-6 text-sm font-medium text-navy-900 underline underline-offset-4"
          onClick={() => {
            setSent(false);
            setValues(empty);
          }}
        >
          Weitere Nachricht verfassen
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-navy-900">Name *</span>
          <input
            className="w-full rounded-lg border border-navy-900/15 bg-paper px-3 py-2.5 outline-none ring-gold-400/40 transition focus:ring-2"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            required
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-navy-900">Unternehmen</span>
          <input
            className="w-full rounded-lg border border-navy-900/15 bg-paper px-3 py-2.5 outline-none ring-gold-400/40 transition focus:ring-2"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(event) => update("company", event.target.value)}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-navy-900">E-Mail *</span>
          <input
            className="w-full rounded-lg border border-navy-900/15 bg-paper px-3 py-2.5 outline-none ring-gold-400/40 transition focus:ring-2"
            type="email"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            required
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-navy-900">Telefon</span>
          <input
            className="w-full rounded-lg border border-navy-900/15 bg-paper px-3 py-2.5 outline-none ring-gold-400/40 transition focus:ring-2"
            type="tel"
            name="phone"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
          />
        </label>
      </div>

      <label className="mt-5 block text-sm">
        <span className="mb-1.5 block font-medium text-navy-900">Interesse</span>
        <select
          className="w-full rounded-lg border border-navy-900/15 bg-paper px-3 py-2.5 outline-none ring-gold-400/40 transition focus:ring-2"
          name="interest"
          value={values.interest}
          onChange={(event) => update("interest", event.target.value)}
        >
          {interests.map((interest) => (
            <option key={interest} value={interest}>
              {interest}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-5 block text-sm">
        <span className="mb-1.5 block font-medium text-navy-900">Nachricht *</span>
        <textarea
          className="min-h-32 w-full rounded-lg border border-navy-900/15 bg-paper px-3 py-2.5 outline-none ring-gold-400/40 transition focus:ring-2"
          name="message"
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          required
        />
      </label>

      {error ? (
        <p className="mt-4 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-navy-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-navy-800 sm:w-auto"
      >
        Nachricht senden
      </button>
      <p className="mt-3 text-xs text-navy-800/60">
        Pflichtfelder sind mit * gekennzeichnet. Versand wird in einem späteren Schritt angebunden.
      </p>
    </form>
  );
}
