import type { Metadata } from "next";
import Image from "next/image";
import { LogoMark } from "@/components/Logo";
import { PageHero } from "@/components/PageHero";
import { brandColors } from "@/lib/logo";

export const metadata: Metadata = {
  title: "Marke",
  description: "Logo-Varianten der Broker Vision GmbH.",
};

const files = [
  { href: "/brand/logo-mark.svg", label: "Symbol, transparent" },
  { href: "/brand/logo-mark-on-light.svg", label: "Symbol auf Hell" },
  { href: "/brand/logo-mark-on-dark.svg", label: "Symbol auf Dunkel" },
  { href: "/brand/logo-wordmark.svg", label: "Symbol + Wortmarke" },
  { href: "/brand/logo-wordmark-on-light.svg", label: "Wortmarke auf Hell" },
  { href: "/brand/logo-wordmark-on-dark.svg", label: "Wortmarke auf Dunkel" },
  { href: "/brand/favicon-32.svg", label: "Favicon 32×32" },
  { href: "/brand/app-icon.svg", label: "App-Icon" },
];

export default function BrandPage() {
  return (
    <>
      <PageHero
        eyebrow="Marke"
        title="Das BV-Monogramm."
        lead="Geometrische Ligatur aus B und V. Gleiche Strichstärke, gemeinsame Kante, zwei Farben: Dunkelblau für Struktur, Gold für Weitsicht."
      />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <figure className="rounded-2xl border border-navy-900/10 bg-white p-10">
            <LogoMark size={160} title="Broker Vision Monogramm auf Hell" />
            <figcaption className="mt-6 text-sm text-navy-800/70">
              Symbol auf hellem Grund · {brandColors.navy} / {brandColors.gold}
            </figcaption>
          </figure>
          <figure className="rounded-2xl bg-navy-950 p-10">
            <LogoMark inverted size={160} title="Broker Vision Monogramm auf Dunkel" />
            <figcaption className="mt-6 text-sm text-white/60">
              Symbol auf dunklem Grund · {brandColors.white} / {brandColors.gold}
            </figcaption>
          </figure>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <figure className="rounded-2xl border border-navy-900/10 bg-white px-8 py-10">
            <Image
              src="/brand/logo-wordmark.svg"
              alt="Broker Vision Wortmarke hell"
              width={420}
              height={80}
              className="h-14 w-auto"
            />
            <figcaption className="mt-6 text-sm text-navy-800/70">
              Symbol + Schriftzug, heller Hintergrund
            </figcaption>
          </figure>
          <figure className="rounded-2xl bg-navy-950 px-8 py-10">
            <Image
              src="/brand/logo-wordmark-inverted.svg"
              alt="Broker Vision Wortmarke dunkel"
              width={420}
              height={80}
              className="h-14 w-auto"
            />
            <figcaption className="mt-6 text-sm text-white/60">
              Symbol + Schriftzug, dunkler Hintergrund
            </figcaption>
          </figure>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <figure className="flex items-center gap-6 rounded-2xl bg-navy-950 p-8">
            <Image src="/brand/favicon-32.svg" alt="Favicon 32 Pixel" width={32} height={32} />
            <Image src="/brand/favicon-32.svg" alt="" width={64} height={64} />
            <figcaption className="text-sm text-white/70">Favicon 32×32, 2× vergrössert</figcaption>
          </figure>
          <figure className="flex items-center gap-6 rounded-2xl bg-paper p-8">
            <Image src="/brand/app-icon.svg" alt="App-Icon" width={96} height={96} className="rounded-[22%]" />
            <figcaption className="text-sm text-navy-800/70">App-Icon, abgerundetes Quadrat</figcaption>
          </figure>
        </div>

        <ul className="mt-12 grid gap-2 text-sm text-navy-800/80 sm:grid-cols-2">
          {files.map((file) => (
            <li key={file.href}>
              <a className="underline decoration-gold-400 underline-offset-4" href={file.href}>
                {file.label}
              </a>
              <span className="text-navy-800/40"> · {file.href}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
