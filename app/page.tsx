import Link from "next/link";
import { ProductDemo } from "@/components/ProductDemo";
import { benefits, platformModules, site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-gold-400/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 bottom-0 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-5 px-5 pb-8 pt-5 sm:gap-8 sm:px-8 sm:pb-14 sm:pt-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.28fr)] lg:gap-10 lg:pb-16 lg:pt-12">
          <div className="min-w-0 lg:pr-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-400 sm:text-xs">
              Broker Vision
            </p>
            <h1 className="font-display mt-2 text-[1.65rem] leading-[1.12] sm:mt-3 sm:text-4xl lg:text-[2.65rem]">
              {site.headline}
            </h1>
            <p className="mt-2 text-sm text-white/70 sm:mt-3 sm:text-lg">{site.subheadline}</p>
            <div className="mt-4 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:gap-3">
              <Link
                href="/demo/"
                className="inline-flex items-center justify-center rounded-full bg-gold-400 px-5 py-2.5 text-sm font-medium text-navy-950 transition hover:bg-gold-300 sm:px-6 sm:py-3"
              >
                Demo ansehen
              </Link>
              <Link
                href="/demo/explore/"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white hover:bg-white/5 sm:px-6 sm:py-3"
              >
                Demo selbst erkunden
              </Link>
            </div>
          </div>

          <div className="min-w-0">
            <ProductDemo mode="autoplay" size="hero" id="in-aktion" />
          </div>
        </div>
      </section>

      <section className="border-b border-navy-900/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:grid-cols-3 sm:gap-8 sm:px-8 sm:py-10">
          {[
            { label: "Nutzen", value: "Weniger Administration" },
            { label: "Fokus", value: "Mehr Zeit für Kunden" },
            { label: "Ergebnis", value: "Schnellere Ausschreibungen" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs uppercase tracking-[0.18em] text-gold-500">{item.label}</p>
              <p className="mt-2 font-display text-xl text-navy-900 sm:text-2xl">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">Nutzen</p>
        <h2 className="font-display mt-3 max-w-xl text-3xl sm:text-4xl">
          Was Broker Vision verändert.
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <article key={benefit.title} className="border-t border-navy-900/15 pt-4">
              <p className="text-xs text-gold-500">0{index + 1}</p>
              <h3 className="font-display mt-1.5 text-xl text-navy-900">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-800/75">{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-navy-950 text-white">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">
                Produkt
              </p>
              <h2 className="font-display mt-3 text-3xl sm:text-4xl">Sehen statt lesen.</h2>
              <p className="mt-3 max-w-lg text-white/65">
                Die Demo zeigt den Ablauf: Upload, Erkennung, Ausschreibung.
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
                Selbst erkunden
              </Link>
            </div>
          </div>
          <div className="mt-8 sm:mt-10">
            <ProductDemo mode="autoplay" size="full" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">
              Plattform
            </p>
            <h2 className="font-display mt-3 text-3xl sm:text-4xl">
              Ein Arbeitsplatz. Module, die zusammenspielen.
            </h2>
          </div>
          <Link
            href="/plattform/"
            className="text-sm font-medium text-navy-900 underline decoration-gold-400 underline-offset-4"
          >
            Zur Plattform
          </Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platformModules.map((module) => (
            <article key={module.slug} className="border border-navy-900/10 bg-white p-5">
              {"upcoming" in module && module.upcoming ? (
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-500">
                  In Vorbereitung
                </p>
              ) : (
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-800/40">
                  Modul
                </p>
              )}
              <h3 className="font-display mt-1.5 text-xl text-navy-900">{module.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-800/75">{module.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-navy-50">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <blockquote className="max-w-3xl">
            <p className="font-display text-2xl leading-snug text-navy-900 sm:text-3xl">
              «{site.tagline}»
            </p>
            <p className="mt-4 text-sm text-navy-800/55">Broker Vision</p>
          </blockquote>
        </div>
      </section>

      <section className="bg-navy-950 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-16">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl">Bereit für den nächsten Schritt?</h2>
            <p className="mt-2 max-w-lg text-white/70">
              Demo ansehen – oder im Gespräch die Live-Plattform vertiefen.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/demo/"
              className="inline-flex items-center justify-center rounded-full bg-gold-400 px-6 py-3 text-sm font-medium text-navy-950 transition hover:bg-gold-300"
            >
              Demo ansehen
            </Link>
            <Link
              href="/kontakt/"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white/5"
            >
              Kontakt
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
