import Link from "next/link";
import { PlatformDemo } from "@/components/PlatformDemo";
import {
  benefits,
  challenges,
  platformModules,
  site,
  values,
} from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">
              Broker Vision
            </p>
            <h1 className="font-display mt-4 text-3xl leading-[1.12] sm:text-5xl lg:text-[3.25rem]">
              Diese Plattform spart Ihnen Arbeit.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Police hochladen – Ausschreibung versenden. Automatisiert, nachvollziehbar,
              unter Kontrolle des Brokers.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/kontakt/?thema=live-demo"
                className="inline-flex items-center justify-center rounded-full bg-gold-400 px-6 py-3 text-sm font-medium text-navy-950 transition hover:bg-gold-300"
              >
                Live-Demo anfragen
              </Link>
              <Link
                href="/plattform/"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white/5"
              >
                Plattform entdecken
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-5xl sm:mt-10">
            <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-400/90">
              Broker Vision in Aktion
            </p>
            <PlatformDemo />
          </div>
        </div>
      </section>

      <section className="border-b border-navy-900/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-3 sm:px-8">
          {[
            { label: "Fokus", value: "Versicherungsbroker" },
            { label: "Erfahrung", value: "Über 20 Jahre Branche" },
            { label: "Ansatz", value: "Plattform statt Insellösung" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs uppercase tracking-[0.18em] text-gold-500">{item.label}</p>
              <p className="mt-2 font-display text-2xl text-navy-900">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">
          Die Herausforderung
        </p>
        <h2 className="font-display mt-3 max-w-2xl text-3xl sm:text-4xl">
          Viele Systeme verwalten Daten. Broker Vision automatisiert Arbeit.
        </h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-navy-800/80">
          Viele Brokerunternehmen kämpfen täglich mit denselben Reibungen im Alltag:
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 border-l-2 border-gold-400 bg-white px-4 py-3 text-sm text-navy-900"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-navy-50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">
                Warum Broker Vision
              </p>
              <h2 className="font-display mt-3 text-3xl sm:text-4xl">
                Entstanden aus dem Brokeralltag – nicht aus dem Katalog.
              </h2>
              <p className="mt-5 leading-relaxed text-navy-800/80">
                Broker Vision entstand nicht, weil eine weitere Software entwickelt
                werden sollte. Broker Vision entstand aus der Beobachtung, dass viele
                Brokerunternehmen dieselben Herausforderungen haben.
              </p>
              <p className="mt-4 leading-relaxed text-navy-800/80">
                Viele Softwarelösungen wurden nicht aus dem Brokeralltag heraus
                entwickelt. Sie verwalten Daten, nehmen Brokern die tägliche Arbeit
                aber häufig nicht wirklich ab.
              </p>
            </div>
            <blockquote className="rounded-2xl bg-navy-900 p-8 text-white sm:p-10">
              <p className="font-display text-2xl leading-snug sm:text-3xl">
                «{site.tagline}»
              </p>
              <p className="mt-6 text-sm text-white/60">Broker Vision · Leitsatz</p>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">
              Plattform
            </p>
            <h2 className="font-display mt-3 max-w-xl text-3xl sm:text-4xl">
              Eine Plattform. Module, die zusammenarbeiten.
            </h2>
            <p className="mt-4 max-w-2xl text-navy-800/80">
              Broker Vision ist der digitale Arbeitsplatz für Versicherungsbroker –
              nicht eine Sammlung isolierter Produkte.
            </p>
          </div>
          <Link
            href="/plattform/"
            className="text-sm font-medium text-navy-900 underline decoration-gold-400 underline-offset-4"
          >
            Zur Plattform
          </Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {platformModules.map((module) => (
            <article
              key={module.slug}
              className="border border-navy-900/10 bg-white p-6"
            >
              {"upcoming" in module && module.upcoming ? (
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-500">
                  In Vorbereitung
                </p>
              ) : (
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-800/40">
                  Modul
                </p>
              )}
              <h3 className="font-display mt-2 text-xl text-navy-900">{module.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-800/75">
                {module.excerpt}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">
          Nutzen
        </p>
        <h2 className="font-display mt-3 max-w-2xl text-3xl sm:text-4xl">
          Was Broker Vision im Alltag verändert.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <article key={benefit.title} className="border-t border-navy-900/15 pt-5">
              <p className="text-xs text-gold-500">0{index + 1}</p>
              <h3 className="font-display mt-2 text-xl text-navy-900">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-800/75">{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-navy-50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">
                Sicherheit
              </p>
              <h2 className="font-display mt-3 text-3xl sm:text-4xl">
                Sicherheit als Wettbewerbsvorteil.
              </h2>
              <p className="mt-5 leading-relaxed text-navy-800/80">
                Sensible Kundendaten, steigende Cyberrisiken und regulatorische
                Anforderungen verlangen professionelle Softwarelösungen.
              </p>
              <p className="mt-4 leading-relaxed text-navy-800/80">
                Broker Vision setzt auf moderne Cloud-Technologie, hohe
                Sicherheitsstandards und kontinuierliche Weiterentwicklung – damit
                Vertrauen und Compliance im digitalen Arbeitsplatz mitwachsen.
              </p>
            </div>
            <ul className="space-y-4">
              {[
                "Professioneller Umgang mit sensiblen Kundendaten",
                "Moderne Cloud-Architektur und aktuelle Sicherheitsstandards",
                "Kontinuierliche Weiterentwicklung statt Stillstand",
                "Nachvollziehbare Prozesse für Teams und Audits",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 bg-white px-5 py-4 text-sm text-navy-900"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">
              Über uns
            </p>
            <h2 className="font-display mt-3 text-3xl sm:text-4xl">
              Spezialisiertes Softwareunternehmen mit Branchen-Know-how.
            </h2>
            <p className="mt-5 leading-relaxed text-navy-800/80">
              Broker Vision verbindet tiefes Verständnis für das Brokergeschäft mit
              moderner Softwareentwicklung, Digitalisierung und Automatisierung.
            </p>
            <Link
              href="/ueber-uns/"
              className="mt-6 inline-flex text-sm font-medium text-navy-900 underline decoration-gold-400 underline-offset-4"
            >
              Mehr über Broker Vision
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {values.map((value) => (
              <article key={value.title} className="border border-navy-900/10 bg-white p-5">
                <h3 className="font-display text-xl">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-800/75">{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-20">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl">Lassen Sie uns sprechen.</h2>
            <p className="mt-3 max-w-lg text-white/70">
              Ob Einstieg in die Plattform oder konkrete Prozessfrage: Wir zeigen,
              wo Automatisierung im Brokeralltag den grössten Hebel hat.
            </p>
          </div>
          <Link
            href="/kontakt/"
            className="inline-flex items-center justify-center rounded-full bg-gold-400 px-6 py-3 text-sm font-medium text-navy-950 transition hover:bg-gold-300"
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </section>
    </>
  );
}
