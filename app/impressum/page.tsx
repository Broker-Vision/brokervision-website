import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum und Anbieterkennzeichnung der ${site.legalName}.`,
};

export default function ImprintPage() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title="Impressum"
        lead="Transparente Angaben zur Betreiberin dieser Website gemäss Schweizer Recht."
      />
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <div className="space-y-10 text-navy-800/85">
          <div>
            <h2 className="font-display text-2xl text-navy-900">Anbieterin</h2>
            <p className="mt-4 leading-relaxed">
              <strong className="text-navy-900">{site.legalName}</strong>
              <br />
              {site.address.street}
              <br />
              {site.address.zip} {site.address.city}
              <br />
              {site.address.country}
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-navy-900">Kontakt</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-navy-800/55">E-Mail</dt>
                <dd className="mt-1">
                  <a
                    className="font-medium text-navy-900 underline decoration-gold-400 underline-offset-4"
                    href={`mailto:${site.email}`}
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-navy-800/55">Website</dt>
                <dd className="mt-1">
                  <a
                    className="font-medium text-navy-900 underline decoration-gold-400 underline-offset-4"
                    href={site.url}
                  >
                    {site.url.replace(/^https?:\/\//, "")}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="font-display text-2xl text-navy-900">Handelsregister & UID</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-navy-800/55">Unternehmens-Identifikationsnummer (UID)</dt>
                <dd className="mt-1 font-medium text-navy-900">{site.uid}</dd>
              </div>
              <div>
                <dt className="text-navy-800/55">Rechtsform</dt>
                <dd className="mt-1 font-medium text-navy-900">Gesellschaft mit beschränkter Haftung (GmbH)</dd>
              </div>
              <div>
                <dt className="text-navy-800/55">Sitz</dt>
                <dd className="mt-1 font-medium text-navy-900">
                  {site.address.zip} {site.address.city}, {site.address.country}
                </dd>
              </div>
              <div>
                <dt className="text-navy-800/55">Geschäftsführung</dt>
                <dd className="mt-1 font-medium text-navy-900">{site.managingDirector}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="font-display text-2xl text-navy-900">Inhaltliche Verantwortung</h2>
            <p className="mt-4 leading-relaxed">
              Für den Inhalt dieser Website ist {site.legalName} verantwortlich. Wir
              bemühen uns um korrekte und aktuelle Informationen. Trotz sorgfältiger
              Prüfung kann keine Garantie für Vollständigkeit oder Richtigkeit
              übernommen werden.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-navy-900">Haftungshinweis</h2>
            <p className="mt-4 leading-relaxed">
              Externe Links führen zu Inhalten Dritter. Für diese Inhalte sind die
              jeweiligen Betreiber verantwortlich. Sollten Sie auf problematische Inhalte
              stossen, bitten wir um einen Hinweis an {site.email}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
