import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: `Kontaktieren Sie ${site.legalName} in Aarau für ein Gespräch zur Broker-Vision-Plattform.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Wir sind erreichbar."
        lead="Ob Einstieg in die Plattform oder konkrete Prozessfrage: Schreiben Sie uns. Wir antworten in der Regel innerhalb weniger Werktage."
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.15fr]">
        <aside>
          <h2 className="font-display text-3xl">Angaben</h2>
          <address className="mt-6 not-italic leading-relaxed text-navy-800/80">
            <strong className="text-navy-900">{site.legalName}</strong>
            <br />
            {site.address.street}
            <br />
            {site.address.zip} {site.address.city}
            <br />
            {site.address.country}
          </address>
          <p className="mt-6 text-sm">
            <span className="block text-navy-800/55">E-Mail</span>
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-navy-900 underline decoration-gold-400 underline-offset-4"
            >
              {site.email}
            </a>
          </p>
          <p className="mt-4 text-sm text-navy-800/70">
            UID {site.uid}
          </p>
        </aside>
        <ContactForm />
      </section>
    </>
  );
}
