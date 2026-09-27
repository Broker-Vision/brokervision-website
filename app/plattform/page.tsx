import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ProductDemo } from "@/components/ProductDemo";
import { benefits, platformModules, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Plattform",
  description:
    "Broker Vision – der digitale Arbeitsplatz für Versicherungsbroker. Demo, Module und Nutzen auf einen Blick.",
};

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Plattform"
        title={site.headline}
        lead={site.subheadline}
      />

      <section className="bg-navy-950 text-white">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">
                Demo
              </p>
              <h2 className="font-display mt-3 text-3xl sm:text-4xl">Produkt in Aktion.</h2>
              <p className="mt-2 max-w-lg text-white/65">
                Automatische Datenerfassung. Schnellere Ausschreibungen. Weniger Fehler.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/demo/"
                className="inline-flex items-center justify-center rounded-full bg-gold-400 px-5 py-2.5 text-sm font-medium text-navy-950 transition hover:bg-gold-300"
              >
                Demo ansehen
              </Link>
              <Link
                href="/demo/explore/"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white hover:bg-white/5"
              >
                Demo selbst erkunden
              </Link>
            </div>
          </div>
          <div className="mt-8 sm:mt-10">
            <ProductDemo mode="autoplay" size="full" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">Nutzen</p>
        <h2 className="font-display mt-3 max-w-xl text-3xl sm:text-4xl">
          Was die Plattform im Alltag bringt.
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <li key={benefit.title} className="border-t border-navy-900/15 pt-4">
              <h3 className="font-display text-xl text-navy-900">{benefit.title}</h3>
              <p className="mt-2 text-sm text-navy-800/75">{benefit.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-navy-50">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">Module</p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl sm:text-4xl">
            Bausteine eines Arbeitsplatzes
          </h2>
          <ol className="mt-10 space-y-4">
            {platformModules.map((module, index) => (
              <li
                key={module.slug}
                id={module.slug}
                className="grid gap-3 border border-navy-900/10 bg-white p-5 sm:p-6 lg:grid-cols-[5rem_1fr]"
              >
                <p className="font-display text-2xl text-gold-500">0{index + 1}</p>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl text-navy-900 sm:text-2xl">
                      {module.title}
                    </h3>
                    {"upcoming" in module && module.upcoming ? (
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-500">
                        In Vorbereitung
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-navy-800/80 sm:text-base">
                    {module.details}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-navy-950 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-16">
          <div>
            <h2 className="font-display text-3xl">Passt Broker Vision zu Ihnen?</h2>
            <p className="mt-2 max-w-xl text-white/70">
              Demo ansehen – oder im Gespräch den Einsatz in Ihrem Betrieb klären.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/demo/"
              className="inline-flex rounded-full bg-gold-400 px-5 py-2.5 text-sm font-medium text-navy-950 hover:bg-gold-300"
            >
              Demo ansehen
            </Link>
            <Link
              href="/kontakt/"
              className="inline-flex rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium text-white hover:border-white hover:bg-white/5"
            >
              Gespräch vereinbaren
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
