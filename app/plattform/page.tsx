import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { platformModules, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Plattform",
  description:
    "Broker Vision – der digitale Arbeitsplatz für Versicherungsbroker. Eine Plattform mit Modulen für Offerten, CRM, Workflows, OCR und Dokumente.",
};

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Plattform"
        title="Der digitale Arbeitsplatz für Versicherungsbroker."
        lead="Broker Vision ist eine zentrale Plattform – keine Sammlung isolierter Produkte. Module greifen ineinander und automatisieren Arbeit im Brokeralltag."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl sm:text-4xl">Plattform statt Einzelprodukte</h2>
          <p className="mt-5 leading-relaxed text-navy-800/80">
            Viele bestehende Systeme verwalten Daten. Broker Vision automatisiert Arbeit:
            Offerten vorbereiten, Dokumente analysieren, Prozesse führen und Bestände im
            Kontext halten – in einem digitalen Arbeitsplatz.
          </p>
          <p className="mt-4 leading-relaxed text-navy-800/80">
            «{site.tagline}»
          </p>
        </div>
      </section>

      <section className="bg-navy-50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">
            Module
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl sm:text-4xl">
            Bausteine einer gemeinsamen Plattform
          </h2>
          <ol className="mt-12 space-y-6">
            {platformModules.map((module, index) => (
              <li
                key={module.slug}
                id={module.slug}
                className="grid gap-4 border border-navy-900/10 bg-white p-6 sm:p-8 lg:grid-cols-[6rem_1fr]"
              >
                <p className="font-display text-3xl text-gold-500">0{index + 1}</p>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-2xl text-navy-900 sm:text-3xl">
                      {module.title}
                    </h3>
                    {"upcoming" in module && module.upcoming ? (
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-500">
                        In Vorbereitung
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 max-w-3xl leading-relaxed text-navy-800/80">
                    {module.details}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl">
              Dokumentenanalyse und Automatisierung
            </h2>
            <p className="mt-4 leading-relaxed text-navy-800/80">
              Wo OCR, Dokumentenanalyse und Workflow-Automatisierung greifen, setzt Broker
              Vision gezielt auf moderne Erkennungstechnologien – inklusive KI dort, wo sie
              den Prozess messbar entlastet. Nicht als Marketingthema, sondern als Werkzeug
              im Brokeralltag.
            </p>
          </div>
          <div className="border border-navy-900/10 bg-navy-950 p-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
              In Aktion
            </p>
            <p className="font-display mt-3 text-2xl leading-snug">
              Vom Upload zur Ausschreibung – ohne Medienbruch.
            </p>
            <Link
              href="/#in-aktion"
              className="mt-6 inline-flex text-sm font-medium text-gold-300 underline underline-offset-4 hover:text-gold-400"
            >
              Ablauf auf der Startseite ansehen
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-navy-950 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-20">
          <div>
            <h2 className="font-display text-3xl">Passt Broker Vision zu Ihrem Unternehmen?</h2>
            <p className="mt-2 max-w-xl text-white/70">
              Schildern Sie uns Ihren Kontext. Wir zeigen, welche Module zuerst den grössten
              Nutzen bringen.
            </p>
          </div>
          <Link
            href="/kontakt/"
            className="inline-flex rounded-full bg-gold-400 px-5 py-2.5 text-sm font-medium text-navy-950 hover:bg-gold-300"
          >
            Gespräch vereinbaren
          </Link>
        </div>
      </section>
    </>
  );
}
