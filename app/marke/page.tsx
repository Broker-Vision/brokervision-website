import type { Metadata } from "next";
import { markComponents } from "@/components/brand/Marks";
import { PageHero } from "@/components/PageHero";
import { concepts } from "@/lib/logo";

export const metadata: Metadata = {
  title: "Markenkonzepte",
  description: "Fünf Logo-Konzepte für Broker Vision – ohne Buchstaben, zur Auswahl.",
};

export default function BrandPage() {
  return (
    <>
      <PageHero
        eyebrow="Markenentwicklung"
        title="Fünf Symbole. Noch keine Wahl."
        lead="Keine Buchstaben, keine Versicherungs-Klischees. Jedes Zeichen ist geometrisch konstruiert – schlicht, skalierbar, in Dunkelblau und Gold. Bitte vergleichen, nicht entscheiden lassen."
      />

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {concepts.map((concept) => {
            const Mark = markComponents[concept.id];
            return (
              <article
                key={concept.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-navy-900/10 bg-white"
              >
                <div className="flex items-center justify-center bg-paper px-4 py-8">
                  <Mark size={148} title={concept.name} instanceId={`${concept.id}-light`} />
                </div>
                <div className="flex items-center justify-center bg-navy-950 px-4 py-6">
                  <Mark
                    inverted
                    size={96}
                    title={`${concept.name} auf Dunkel`}
                    instanceId={`${concept.id}-dark`}
                  />
                </div>
                <div className="flex flex-1 flex-col px-5 py-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500">
                    {concept.number} · {concept.direction}
                  </p>
                  <h2 className="font-serif mt-2 text-2xl text-navy-900">{concept.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-navy-800/75">{concept.summary}</p>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-10 max-w-3xl text-sm text-navy-800/65">
          Die bisherigen BV-Monogramme sind verworfen. Header und Footer zeigen vorläufig nur
          die Wortmarke, bis ein Symbol gewählt ist.
        </p>
      </section>
    </>
  );
}
