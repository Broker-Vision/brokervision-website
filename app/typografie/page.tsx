import type { Metadata } from "next";
import Link from "next/link";
import { FontPreview } from "@/components/FontPreview";
import { PageHero } from "@/components/PageHero";
import { fontCandidates } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Typografie-Vergleich",
  description:
    "Vergleich der Schriftvarianten Inter, Manrope und Plus Jakarta Sans für Broker Vision.",
  robots: { index: false, follow: false },
};

export default function TypographyPage() {
  return (
    <>
      <PageHero
        eyebrow="Typografie"
        title="Drei Sans-Serif-Varianten im Vergleich."
        lead="Inter, Manrope und Plus Jakarta Sans – jeweils mit dem unveränderten Broker-Vision-Logo und denselben Inhalten. Aktuell bleibt Space Grotesk auf der Website aktiv, bis die Auswahl feststeht."
      />

      <section className="border-b border-navy-900/10 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-3 px-5 py-5 sm:px-8">
          {fontCandidates.map((font) => (
            <a
              key={font.id}
              href={`#${font.id}`}
              className="rounded-full border border-navy-900/15 px-4 py-2 text-sm font-medium text-navy-900 transition hover:border-gold-400 hover:text-navy-950"
            >
              {font.name}
            </a>
          ))}
          {fontCandidates.map((font) => (
            <Link
              key={`${font.id}-solo`}
              href={`/typografie/${font.id}/`}
              className="rounded-full bg-navy-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-navy-800"
            >
              Nur {font.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-5 py-12 sm:px-8 sm:py-16">
        {fontCandidates.map((font) => (
          <FontPreview
            key={font.id}
            id={font.id}
            name={font.name}
            summary={font.summary}
            className={font.className}
          />
        ))}
      </section>
    </>
  );
}
