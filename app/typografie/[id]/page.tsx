import type { Metadata } from "next";
import Link from "next/link";
import { FontPreview } from "@/components/FontPreview";
import { fontCandidates } from "@/lib/fonts";

export function generateStaticParams() {
  return fontCandidates.map((font) => ({ id: font.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const font = fontCandidates.find((item) => item.id === id);
  return {
    title: font ? `Typografie · ${font.name}` : "Typografie",
    robots: { index: false, follow: false },
  };
}

export default async function FontVariantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const font = fontCandidates.find((item) => item.id === id);

  if (!font) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-24">
        <h1 className="font-display text-3xl">Variante nicht gefunden</h1>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">
        Typografie-Variante
      </p>
      <h1 className="font-display mt-2 text-3xl text-navy-900 sm:text-4xl">{font.name}</h1>
      <p className="mt-3 max-w-2xl text-navy-800/75">
        Eigenständige Vorschau. Logo unverändert. Zurück zum{" "}
        <Link href="/typografie/" className="underline decoration-gold-400 underline-offset-4">
          Vergleich
        </Link>
        .
      </p>
      <div className="mt-8">
        <FontPreview
          id={font.id}
          name={font.name}
          summary={font.summary}
          className={font.className}
        />
      </div>
    </section>
  );
}
