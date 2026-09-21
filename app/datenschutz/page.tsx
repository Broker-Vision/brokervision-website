import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutz",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title="Datenschutz"
        lead="Kurzer Hinweis zum Umgang mit Daten auf dieser vorläufigen Website."
      />
      <section className="mx-auto max-w-3xl space-y-6 px-5 py-16 text-navy-800/85 sm:px-8">
        <p>
          Verantwortliche Stelle ist {site.legalName}, {site.address.street},{" "}
          {site.address.zip} {site.address.city}.
        </p>
        <p>
          Diese Website ist statisch und setzt keine Tracking-Cookies ein. Beim
          Aufruf können technische Zugriffsdaten (z. B. IP-Adresse, Zeitpunkt,
          aufgerufene Seite) serverseitig in Logs gespeichert werden, soweit der
          Hosting-Anbieter dies vorsieht.
        </p>
        <p>
          Das Kontaktformular versendet in der aktuellen Fassung keine Daten an
          einen Server. Wenn Sie uns per E-Mail schreiben, verarbeiten wir Ihre
          Angaben zur Beantwortung der Anfrage.
        </p>
        <p>
          Anfragen zum Datenschutz richten Sie bitte an{" "}
          <a className="underline decoration-gold-400 underline-offset-4" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </section>
    </>
  );
}
