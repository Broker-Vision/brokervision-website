import Link from "next/link";
import { solutions, values } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-10 hidden h-[28rem] w-[28rem] rounded-full vision-ring lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 top-28 hidden h-[20rem] w-[20rem] rounded-full vision-ring lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-24 top-48 hidden h-8 w-8 rounded-full bg-gold-400/80 lg:block"
        />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">
              Broker Vision GmbH · Aarau
            </p>
            <h1 className="font-serif mt-5 text-4xl leading-[1.12] sm:text-5xl lg:text-6xl">
              Digitale Klarheit für die Versicherungs- und Finanzbranche.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Wir entwickeln Software und digitale Prozesse für unabhängige Broker.
              Überblick statt Fragmentierung – damit Beratung, Mandat und Bestand
              zusammenpassen.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/loesungen/"
                className="inline-flex items-center justify-center rounded-full bg-gold-400 px-6 py-3 text-sm font-medium text-navy-950 transition hover:bg-gold-300"
              >
                Lösungen entdecken
              </Link>
              <Link
                href="/kontakt/"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white/5"
              >
                Gespräch vereinbaren
              </Link>
            </div>
          </div>

          <aside className="self-end rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-gold-400">Fokus</p>
            <ul className="mt-5 space-y-4">
              {[
                "Mandats- und Bestandsüberblick",
                "Digitale Brokerprozesse",
                "Massgeschneiderte Software",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-white/10 pt-5 text-sm text-white/60">
              Vorläufige Firmenwebseite – Inhalt und Angebote werden laufend ergänzt.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-b border-navy-900/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-3 sm:px-8">
          {[
            { label: "Standort", value: "Aarau, Schweiz" },
            { label: "Branche", value: "Versicherung & Finance" },
            { label: "Ansatz", value: "Software mit Weitblick" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs uppercase tracking-[0.18em] text-gold-500">{item.label}</p>
              <p className="mt-2 font-serif text-2xl text-navy-900">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">
          Wofür wir stehen
        </p>
        <h2 className="font-serif mt-3 max-w-2xl text-3xl sm:text-4xl">
          Werkzeuge, die den Beratungsalltag ordnen.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((value, index) => (
            <article
              key={value.title}
              className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm"
            >
              <p className="text-xs text-gold-500">0{index + 1}</p>
              <h3 className="font-serif mt-3 text-2xl">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-800/75">{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-navy-50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">
                Lösungen
              </p>
              <h2 className="font-serif mt-3 max-w-xl text-3xl sm:text-4xl">
                Vom Überblick bis zur individuellen Plattform.
              </h2>
            </div>
            <Link
              href="/loesungen/"
              className="text-sm font-medium text-navy-900 underline decoration-gold-400 underline-offset-4"
            >
              Alle Lösungen
            </Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {solutions.map((solution) => (
              <article
                key={solution.slug}
                className="rounded-2xl border border-navy-900/10 bg-white p-6"
              >
                <h3 className="font-serif text-2xl text-navy-900">{solution.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-800/75">
                  {solution.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">
              Über uns
            </p>
            <h2 className="font-serif mt-3 text-3xl sm:text-4xl">
              Ein IT-Unternehmen mit Blick für Broker.
            </h2>
            <p className="mt-5 leading-relaxed text-navy-800/80">
              Broker Vision GmbH mit Sitz in Aarau entwickelt digitale Lösungen
              für die Versicherungs- und Finanzbranche. Unser Name ist Programm:
              Wir schaffen Sicht auf Mandate, Bestände und Prozesse – ruhig,
              präzise und ohne unnötige Komplexität.
            </p>
            <Link
              href="/ueber-uns/"
              className="mt-6 inline-flex text-sm font-medium text-navy-900 underline decoration-gold-400 underline-offset-4"
            >
              Mehr über Broker Vision
            </Link>
          </div>
          <div className="rounded-2xl bg-navy-900 p-8 text-white sm:p-10">
            <p className="font-serif text-2xl leading-snug sm:text-3xl">
              «Software soll den Broker entlasten – nicht den Beratungsprozess
              ersetzen.»
            </p>
            <p className="mt-6 text-sm text-white/60">Broker Vision · Produktleitgedanke</p>
          </div>
        </div>
      </section>

      <section className="bg-navy-950 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-20">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl">Lassen Sie uns sprechen.</h2>
            <p className="mt-3 max-w-lg text-white/70">
              Ob erste Idee oder konkretes Vorhaben: Wir hören zu und ordnen,
              was digital sinnvoll ist.
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
