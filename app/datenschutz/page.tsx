import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: `Datenschutzerklärung der ${site.legalName} gemäss Schweizer Datenschutzgesetz (DSG).`,
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title="Datenschutzerklärung"
        lead="Informationen zur Bearbeitung von Personendaten auf dieser Website – abgestimmt auf Broker Vision und die genutzten Azure-Dienste."
      />
      <section className="mx-auto max-w-6xl px-5 py-16 text-navy-800/85 sm:px-8 sm:py-24">
        <div className="max-w-3xl space-y-12">
          <p className="text-sm text-navy-800/60">Stand: September 2026</p>

          <section>
            <h2 className="font-display text-2xl text-navy-900 sm:text-3xl">1. Verantwortliche Stelle</h2>
            <div className="mt-4 space-y-4 leading-relaxed">
              <p>
                Verantwortlich für die Bearbeitung von Personendaten im Zusammenhang mit
                dieser Website ist:
              </p>
              <p>
                <strong className="text-navy-900">{site.legalName}</strong>
                <br />
                {site.address.street}
                <br />
                {site.address.zip} {site.address.city}
                <br />
                {site.address.country}
                <br />
                E-Mail:{" "}
                <a
                  className="underline decoration-gold-400 underline-offset-4"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
                <br />
                UID: {site.uid}
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 sm:text-3xl">2. Geltungsbereich</h2>
            <p className="mt-4 leading-relaxed">
              Diese Datenschutzerklärung gilt für den Besuch der Website{" "}
              {site.url.replace(/^https?:\/\//, "")}, für Anfragen über das
              Kontaktformular sowie für die damit verbundene E-Mail-Kommunikation. Sie
              richtet sich nach dem Schweizer Datenschutzgesetz (DSG).
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 sm:text-3xl">3. Hosting (Azure Static Web Apps)</h2>
            <div className="mt-4 space-y-4 leading-relaxed">
              <p>
                Diese Website wird über Microsoft Azure Static Web Apps bereitgestellt.
                Beim Aufruf werden technisch notwendige Verbindungsdaten an die
                Azure-Infrastruktur übermittelt, damit die Website ausgeliefert und
                erreichbar bleibt.
              </p>
              <p>
                Bearbeitet werden dabei insbesondere IP-Adresse, Zeitpunkt des Zugriffs,
                aufgerufene URL, Referrer (soweit übermittelt) sowie Browser- und
                Geräteinformationen. Die Bearbeitung erfolgt zur sicheren und stabilen
                Bereitstellung des Online-Auftritts.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 sm:text-3xl">4. Domain & Azure DNS</h2>
            <p className="mt-4 leading-relaxed">
              Die Domainverwaltung und Namensauflösung können über Azure DNS erfolgen.
              DNS-Dienste verarbeiten technische Abfragedaten, die für die Erreichbarkeit
              der Website erforderlich sind. Es werden keine Tracking-Profile über DNS
              aufgebaut.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 sm:text-3xl">5. Azure Storage</h2>
            <div className="mt-4 space-y-4 leading-relaxed">
              <p>
                Für den Betrieb und die Weiterentwicklung der Website sowie für die
                geplante Speicherung von Kontaktanfragen kann Azure Storage eingesetzt
                werden (z. B. Ablage von Anfragen oder betriebsnotwendigen Dateien).
              </p>
              <p>
                Sobald die Speicherung von Kontaktanfragen produktiv aktiviert ist, werden
                die übermittelten Formularinhalte in Azure Storage abgelegt, um Anfragen
                nachvollziehbar zu bearbeiten. Ohne hinterlegte Zugangsdaten findet keine
                produktive Speicherung statt.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 sm:text-3xl">6. Serverlogs</h2>
            <p className="mt-4 leading-relaxed">
              Azure und verbundene Dienste können Server- und Anwendungslogs führen.
              Darin können technische Ereignisse wie Zugriffe, Fehler und
              Sicherheitsrelevante Meldungen enthalten sein. Logs dienen dem Betrieb,
              der Fehleranalyse und dem Schutz der Infrastruktur. Sie werden nur so
              lange aufbewahrt, wie es für diese Zwecke erforderlich oder von den
              Dienstleistern vorgesehen ist.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 sm:text-3xl">7. Kontaktformular</h2>
            <div className="mt-4 space-y-4 leading-relaxed">
              <p>
                Über das Kontaktformular können Sie uns Name, optional Unternehmen,
                E-Mail-Adresse, optional Telefonnummer, Themenwahl und Nachricht
                übermitteln. Die Bearbeitung erfolgt, um Ihre Anfrage zu beantworten und
                den geschäftlichen Kontakt zu führen.
              </p>
              <p>
                Das Formular enthält technische Massnahmen zur Spam-Reduktion (u. a.
                Honeypot-Feld und Zeitprüfung). Die Architektur sieht vor, Anfragen an eine
                Azure-Function zu übergeben, optional in Azure Storage zu speichern und
                per E-Mail/Notification weiterzuleiten. Produktive Zugangsdaten sind
                derzeit nicht hinterlegt; bis zur Aktivierung kann die Übermittlung über
                einen E-Mail-Fallback erfolgen.
              </p>
              <p>
                Mit dem Absenden bestätigen Sie, dass Sie unsere Hinweise zum Datenschutz
                zur Kenntnis genommen haben.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 sm:text-3xl">8. E-Mail-Kommunikation</h2>
            <p className="mt-4 leading-relaxed">
              Wenn Sie uns per E-Mail kontaktieren oder wir Ihre Formularanfrage
              beantworten, bearbeiten wir die dabei übermittelten Personendaten zur
              Korrespondenz und Nachverfolgung. E-Mails können über geschäftliche
              Postfächer und unterstützende Cloud-Dienste verarbeitet werden.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 sm:text-3xl">9. Cookies & Tracking</h2>
            <p className="mt-4 leading-relaxed">
              Diese Website setzt keine Tracking-Cookies und keine Analyse-Tools von
              Drittanbietern zu Werbe- oder Profilierungszwecken ein. Technisch notwendige
              Mechanismen des Hostings bleiben davon unberührt.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 sm:text-3xl">10. Weitergabe an Auftragsbearbeiter</h2>
            <p className="mt-4 leading-relaxed">
              Zur Bereitstellung der Website und zugehöriger Funktionen setzen wir
              Microsoft Azure (Hosting, DNS, Storage, Functions) ein. Die Übermittlung
              erfolgt nur soweit für den Betrieb erforderlich. Microsoft kann Daten in der
              EU/EWR oder in weiteren Regionen bearbeiten, soweit dies vertraglich und
              technisch vorgesehen ist. Weitere Empfänger erhalten Daten nur, wenn dies
              zur Erfüllung einer Anfrage nötig ist, gesetzlich verlangt wird oder Sie
              eingewilligt haben.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 sm:text-3xl">11. Speicherdauer</h2>
            <p className="mt-4 leading-relaxed">
              Personendaten werden nur so lange aufbewahrt, wie es für die genannten
              Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.
              Kontaktanfragen und zugehörige Korrespondenz werden in der Regel bis zum
              Abschluss der Bearbeitung und einer angemessenen Nachfrist gelöscht oder
              eingeschränkt, sofern keine längere Aufbewahrung nötig ist.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 sm:text-3xl">12. Ihre Rechte (DSG)</h2>
            <div className="mt-4 space-y-4 leading-relaxed">
              <p>
                Nach Massgabe des Schweizer DSG können Sie Auskunft über die Bearbeitung
                Ihrer Personendaten verlangen sowie unter den gesetzlichen Voraussetzungen
                Berichtigung, Löschung, Einschränkung der Bearbeitung, Herausgabe oder
                Übertragung Ihrer Daten und Widerspruch gegen bestimmte Bearbeitungen
                geltend machen. Zur Ausübung Ihrer Rechte kontaktieren Sie uns unter{" "}
                <a
                  className="underline decoration-gold-400 underline-offset-4"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
                .
              </p>
              <p>
                Sie haben zudem das Recht, eine Meldung beim Eidgenössischen
                Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) einzureichen.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 sm:text-3xl">13. Datensicherheit</h2>
            <p className="mt-4 leading-relaxed">
              Wir treffen angemessene technische und organisatorische Massnahmen, um
              Personendaten vor Verlust, Manipulation und unberechtigtem Zugriff zu
              schützen. Die Website wird über HTTPS bereitgestellt. Absolute Sicherheit
              kann bei der Übertragung über das Internet nicht garantiert werden.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 sm:text-3xl">14. Änderungen</h2>
            <p className="mt-4 leading-relaxed">
              Wir können diese Datenschutzerklärung anpassen, wenn sich die Website,
              unsere Prozesse oder gesetzliche Anforderungen ändern. Es gilt die jeweils
              auf dieser Seite veröffentlichte Fassung.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-navy-900 sm:text-3xl">15. Kontakt Datenschutz</h2>
            <p className="mt-4 leading-relaxed">
              Fragen zum Datenschutz richten Sie bitte an{" "}
              <a
                className="underline decoration-gold-400 underline-offset-4"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
