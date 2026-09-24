import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { site, values } from "@/lib/site";

export const metadata: Metadata = {
  title: "Über uns",
  description: `Über ${site.name}: spezialisiertes Softwareunternehmen für Versicherungsbroker mit über 20 Jahren Branchenerfahrung.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Über uns"
        title="Spezialisiert auf Broker. Gebaut für den Alltag."
        lead="Broker Vision ist ein Softwareunternehmen für Versicherungsbroker, Finanzberater und Beratungsunternehmen in der Schweiz – mit tiefem Branchen-Know-how und Fokus auf Digitalisierung und Automatisierung."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl sm:text-4xl">Herkunft und Anspruch</h2>
            <p className="mt-5 leading-relaxed text-navy-800/80">
              Broker Vision entstand aus über 20 Jahren Erfahrung in der
              Versicherungsbranche und fundierter Praxis im Brokergeschäft. Aus der
              Beobachtung, dass viele Brokerunternehmen dieselben Herausforderungen teilen –
              und dass viele bestehende Systeme Daten verwalten, die tägliche Arbeit aber
              oft nicht wirklich abnehmen.
            </p>
            <p className="mt-4 leading-relaxed text-navy-800/80">
              Deshalb verbinden wir Branchenerfahrung mit Softwareentwicklung,
              Digitalisierung und Automatisierung. Ziel ist ein digitaler Arbeitsplatz, der
              Administration reduziert und Beratung stärkt.
            </p>
            <p className="mt-4 leading-relaxed text-navy-800/80">
              «{site.tagline}»
            </p>
          </div>
          <aside className="lg:col-span-5">
            <div className="border border-navy-900/10 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-500">
                Kurzprofil
              </p>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-navy-800/55">Unternehmen</dt>
                  <dd className="mt-1 font-medium text-navy-900">{site.legalName}</dd>
                </div>
                <div>
                  <dt className="text-navy-800/55">Sitz</dt>
                  <dd className="mt-1 font-medium text-navy-900">
                    {site.address.street}, {site.address.zip} {site.address.city}
                  </dd>
                </div>
                <div>
                  <dt className="text-navy-800/55">Fokus</dt>
                  <dd className="mt-1 font-medium text-navy-900">
                    Digitaler Arbeitsplatz für Versicherungsbroker
                  </dd>
                </div>
                <div>
                  <dt className="text-navy-800/55">Kompetenzen</dt>
                  <dd className="mt-1 font-medium text-navy-900">
                    Brokergeschäft, Softwareentwicklung, Digitalisierung, Automatisierung
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-navy-50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="font-serif text-3xl sm:text-4xl">Worauf wir setzen</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <article key={value.title} className="bg-white p-6">
                <h3 className="font-serif text-2xl">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-800/75">{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="bg-navy-900 px-6 py-10 text-white sm:px-10">
          <h2 className="font-serif text-3xl">Nächster Schritt</h2>
          <p className="mt-3 max-w-2xl text-white/75">
            Sie möchten prüfen, wie die Plattform in Ihrem Haus wirken kann? Schreiben Sie
            uns – wir freuen uns auf den Austausch.
          </p>
          <Link
            href="/kontakt/"
            className="mt-6 inline-flex rounded-full bg-gold-400 px-5 py-2.5 text-sm font-medium text-navy-950 hover:bg-gold-300"
          >
            Kontakt
          </Link>
        </div>
      </section>
    </>
  );
}
