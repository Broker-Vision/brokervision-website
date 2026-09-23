import type { Metadata } from "next";
import { LogoLockup, markComponents } from "@/components/brand/Marks";
import { PageHero } from "@/components/PageHero";
import { concepts } from "@/lib/logo";

export const metadata: Metadata = {
  title: "Finale Logo-Auswahl",
  description:
    "Fünf finale Verfeinerungen von Variante Weit – zur Auswahl des Logos für Broker Vision.",
};

export default function BrandPage() {
  return (
    <>
      <PageHero
        eyebrow="Finale Auswahl · Weit"
        title="Fünf Verfeinerungen."
        lead="Nur noch Variante Weit. Subtile Unterschiede in Breite, Winkel, Goldakzent und Innenraum. Ziel: das finale Logo wählen."
      />

      <section className="mx-auto max-w-6xl space-y-8 px-5 py-14 sm:px-8">
        {concepts.map((concept) => {
          const Mark = markComponents[concept.id];
          return (
            <article
              key={concept.id}
              className="overflow-hidden rounded-2xl border border-navy-900/10 bg-white"
            >
              <div className="flex flex-col gap-1 border-b border-navy-900/8 px-6 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:px-8">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-500">
                    {concept.number} · {concept.direction}
                  </p>
                  <h2 className="font-serif mt-1 text-3xl text-navy-900">{concept.name}</h2>
                </div>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-navy-800/70 sm:mt-0 sm:text-right">
                  {concept.summary}
                </p>
              </div>

              <div className="grid gap-px bg-navy-900/8 sm:grid-cols-2 lg:grid-cols-4">
                <figure className="flex flex-col items-center justify-center bg-paper px-6 py-10">
                  <Mark size={120} title={`${concept.name} Logo`} />
                  <figcaption className="mt-5 text-xs uppercase tracking-[0.16em] text-navy-800/50">
                    Logo
                  </figcaption>
                </figure>

                <figure className="flex flex-col items-center justify-center bg-navy-950 px-6 py-10">
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-navy-900">
                    <Mark inverted size={28} title={`${concept.name} Favicon`} />
                  </div>
                  <figcaption className="mt-5 text-xs uppercase tracking-[0.16em] text-white/45">
                    Favicon
                  </figcaption>
                </figure>

                <figure className="flex flex-col items-center justify-center bg-paper px-6 py-10">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-[22%] bg-navy-950">
                    <Mark inverted size={52} title={`${concept.name} App-Icon`} />
                  </div>
                  <figcaption className="mt-5 text-xs uppercase tracking-[0.16em] text-navy-800/50">
                    App-Icon
                  </figcaption>
                </figure>

                <figure className="flex flex-col items-center justify-center gap-6 bg-white px-6 py-8 sm:bg-paper">
                  <LogoLockup mark={concept.id} size={36} />
                  <div className="rounded-lg bg-navy-950 px-5 py-3">
                    <LogoLockup mark={concept.id} inverted size={36} />
                  </div>
                  <figcaption className="text-xs uppercase tracking-[0.16em] text-navy-800/50">
                    Mit Schriftzug
                  </figcaption>
                </figure>
              </div>
            </article>
          );
        })}

        <p className="max-w-3xl text-sm text-navy-800/65">
          Ausgangspunkt ist ausschliesslich Variante Weit. Massiv und Kante flossen als Impulse
          für Goldakzent und Proportion ein – ohne neue Konzepte. Bitte eine Variante als finales
          Logo wählen.
        </p>
      </section>
    </>
  );
}
