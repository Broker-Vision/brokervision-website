import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function ImprintPage() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title="Impressum"
        lead="Angaben gemäss Schweizer Recht zur Betreiberin dieser Website."
      />
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <div className="space-y-6 text-navy-800/85">
          <p>
            <strong className="text-navy-900">{site.legalName}</strong>
            <br />
            {site.address.street}
            <br />
            {site.address.zip} {site.address.city}
            <br />
            {site.address.country}
          </p>
          <p>
            Geschäftsführung: {site.managingDirector}
            <br />
            UID: {site.uid}
            <br />
            E-Mail:{" "}
            <a className="underline decoration-gold-400 underline-offset-4" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
          <p>
            Diese Website dient als vorläufiger Unternehmensauftritt. Inhalte
            können sich ändern.
          </p>
        </div>
      </section>
    </>
  );
}
