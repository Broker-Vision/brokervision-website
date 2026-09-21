import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { site, values } from "@/lib/site";

export const metadata: Metadata = {
  title: "Über uns",
  description: `Wer hinter ${site.name} steht und wie wir für Broker in der Versicherungs- und Finanzbranche arbeiten.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Über uns"
        title="Sicht schaffen. Verantwortung tragen."
        lead="Broker Vision GmbH ist ein IT-Unternehmen in Aarau. Wir verbinden Softwareentwicklung mit dem Verständnis für unabhängige Versicherungs- und Finanzberatung."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl sm:text-4xl">Die Firma</h2>
            <p className="mt-5 leading-relaxed text-navy-800/80">
              Unabhängige Broker bewegen sich zwischen Mandanten, Gesellschaften
              und Regulatorik. Informationen liegen oft verteilt – in Postfächern,
              Tabellen und Insellösungen. Genau dort setzen wir an.
            </p>
            <p className="mt-4 leading-relaxed text-navy-800/80">
              Als Softwareunternehmen entwickeln wir digitale Werkzeuge, die
              Überblick herstellen: über Bestände, Fristen, Dokumente und
              Zusammenarbeit im Team. Nicht als Allzweckprodukt von der Stange,
              sondern als klare, nachvollziehbare Lösung für den Brokeralltag.
            </p>
            <p className="mt-4 leading-relaxed text-navy-800/80">
              Diese Website ist ein vorläufiges Grundgerüst. Inhalte, Angebote
              und Referenzen werden schrittweise ergänzt.
            </p>
          </div>
          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-500">
                Kurzprofil
              </p>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-navy-800/55">Firma</dt>
                  <dd className="mt-1 font-medium text-navy-900">{site.legalName}</dd>
                </div>
                <div>
                  <dt className="text-navy-800/55">Sitz</dt>
                  <dd className="mt-1 font-medium text-navy-900">
                    {site.address.street}, {site.address.zip} {site.address.city}
                  </dd>
                </div>
                <div>
                  <dt className="text-navy-800/55">Tätigkeit</dt>
                  <dd className="mt-1 font-medium text-navy-900">
                    IT-Dienstleistungen, Softwareentwicklung
                  </dd>
                </div>
                <div>
                  <dt className="text-navy-800/55">Geschäftsführung</dt>
                  <dd className="mt-1 font-medium text-navy-900">{site.managingDirector}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-navy-50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="font-serif text-3xl sm:text-4xl">Haltung</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <article key={value.title} className="rounded-2xl bg-white p-6">
                <h3 className="font-serif text-2xl">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-800/75">{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="rounded-2xl bg-navy-900 px-6 py-10 text-white sm:px-10">
          <h2 className="font-serif text-3xl">Nächster Schritt</h2>
          <p className="mt-3 max-w-2xl text-white/75">
            Sie möchten prüfen, ob wir zu einem Vorhaben passen? Schreiben Sie uns –
            unverbindlich und ohne Folienmarathon.
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
