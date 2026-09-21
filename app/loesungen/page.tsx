import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { solutions } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lösungen",
  description:
    "Digitale Lösungen von Broker Vision: Mandatsüberblick, Prozesse, Integrationen und individuelle Softwareentwicklung für Broker.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Lösungen"
        title="Was wir für Broker bauen."
        lead="Vier Schwerpunkte – vom klaren Bestandsbild bis zur massgeschneiderten Anwendung. Jede Lösung folgt demselben Anspruch: weniger Reibung, mehr Überblick."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <ol className="space-y-8">
          {solutions.map((solution, index) => (
            <li
              key={solution.slug}
              id={solution.slug}
              className="grid gap-6 rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[7rem_1fr]"
            >
              <p className="font-serif text-3xl text-gold-500">0{index + 1}</p>
              <div>
                <h2 className="font-serif text-3xl text-navy-900">{solution.title}</h2>
                <p className="mt-3 max-w-3xl leading-relaxed text-navy-800/80">
                  {solution.details}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-navy-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl">So arbeiten wir</h2>
            <p className="mt-4 leading-relaxed text-navy-800/80">
              Zuerst verstehen wir Mandat, Bestand und interne Abläufe. Danach
              skizzieren wir den kleinsten sinnvollen Schritt – oft reicht ein
              klarer Prozess oder eine gezielte Integration, bevor eine neue
              Plattform entsteht.
            </p>
          </div>
          <ol className="space-y-4">
            {[
              "Bestandsaufnahme und Zielbild",
              "Priorisierung nach Nutzen im Alltag",
              "Umsetzung in klaren Iterationen",
              "Übergabe, Betrieb und Weiterentwicklung",
            ].map((step, index) => (
              <li
                key={step}
                className="flex items-center gap-4 rounded-xl bg-white px-4 py-3 text-sm text-navy-900"
              >
                <span className="font-serif text-lg text-gold-500">0{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-navy-950 px-6 py-10 text-white sm:flex-row sm:items-center sm:px-10">
          <div>
            <h2 className="font-serif text-3xl">Passt das zu Ihrem Haus?</h2>
            <p className="mt-2 max-w-xl text-white/70">
              Schildern Sie uns kurz Ihren Kontext. Wir sagen ehrlich, ob und wie
              wir helfen können.
            </p>
          </div>
          <Link
            href="/kontakt/"
            className="inline-flex rounded-full bg-gold-400 px-5 py-2.5 text-sm font-medium text-navy-950 hover:bg-gold-300"
          >
            Anfrage senden
          </Link>
        </div>
      </section>
    </>
  );
}
