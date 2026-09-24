import type { Metadata } from "next";
import { LogoLockup, markComponents } from "@/components/brand/Marks";
import { PageHero } from "@/components/PageHero";
import { concepts } from "@/lib/logo";

export const metadata: Metadata = {
  title: "Marke",
  description:
    "Finale Marke Broker Vision: Variante Feld. Weitere Weit-Verfeinerungen als verworfene Entwürfe.",
};

export default function BrandPage() {
  const selected = concepts.find((concept) => concept.selected)!;
  const drafts = concepts.filter((concept) => !concept.selected);
  const SelectedMark = markComponents[selected.id];

  return (
    <>
      <PageHero
        eyebrow="Marke"
        title="Final ausgewählte Marke."
        lead="Variante Feld ist das offizielle Logo von Broker Vision. Das Dach steht für Überblick und Führung; das goldene Feld vereint Fachwissen, Prozesse und Technologie."
      />

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <article className="overflow-hidden rounded-2xl border-2 border-gold-400 bg-white">
          <div className="flex flex-col gap-2 border-b border-navy-900/8 bg-navy-950 px-6 py-5 text-white sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-400">
                Final ausgewählte Marke · {selected.number} · {selected.direction}
              </p>
              <h2 className="font-serif mt-1 text-3xl">{selected.name}</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/70 sm:text-right">
              {selected.summary}
            </p>
          </div>

          <div className="grid gap-px bg-navy-900/8 sm:grid-cols-2 lg:grid-cols-4">
            <figure className="flex flex-col items-center justify-center bg-paper px-6 py-10">
              <SelectedMark size={120} title="Broker Vision Logo Feld" />
              <figcaption className="mt-5 text-xs uppercase tracking-[0.16em] text-navy-800/50">
                Logo
              </figcaption>
            </figure>
            <figure className="flex flex-col items-center justify-center bg-navy-950 px-6 py-10">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-navy-900">
                <SelectedMark inverted size={28} title="Favicon" />
              </div>
              <figcaption className="mt-5 text-xs uppercase tracking-[0.16em] text-white/45">
                Favicon
              </figcaption>
            </figure>
            <figure className="flex flex-col items-center justify-center bg-paper px-6 py-10">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-[22%] bg-navy-950">
                <SelectedMark inverted size={52} title="App-Icon" />
              </div>
              <figcaption className="mt-5 text-xs uppercase tracking-[0.16em] text-navy-800/50">
                App-Icon
              </figcaption>
            </figure>
            <figure className="flex flex-col items-center justify-center gap-6 bg-white px-6 py-8 sm:bg-paper">
              <LogoLockup mark={selected.id} size={36} />
              <div className="rounded-lg bg-navy-950 px-5 py-3">
                <LogoLockup mark={selected.id} inverted size={36} />
              </div>
              <figcaption className="text-xs uppercase tracking-[0.16em] text-navy-800/50">
                Mit Schriftzug
              </figcaption>
            </figure>
          </div>
        </article>
      </section>

      <section className="border-t border-navy-900/10 bg-navy-50">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-800/45">
            Verworfene Entwürfe
          </p>
          <h2 className="font-serif mt-2 text-3xl text-navy-900">Nicht ausgewählt</h2>
          <p className="mt-3 max-w-2xl text-sm text-navy-800/70">
            Die übrigen Weit-Verfeinerungen bleiben als Dokumentation der Entscheidung sichtbar.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {drafts.map((concept) => {
              const Mark = markComponents[concept.id];
              return (
                <article
                  key={concept.id}
                  className="overflow-hidden rounded-2xl border border-navy-900/10 bg-white opacity-80"
                >
                  <div className="flex items-center justify-center bg-paper px-4 py-8 grayscale-[35%]">
                    <Mark size={96} title={concept.name} />
                  </div>
                  <div className="px-5 py-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy-800/40">
                      {concept.number} · Entwurf
                    </p>
                    <h3 className="font-serif mt-1 text-xl text-navy-900">{concept.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-800/60">{concept.summary}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
