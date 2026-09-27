import type { Metadata } from "next";
import Link from "next/link";
import { ProductDemo } from "@/components/ProductDemo";

export const metadata: Metadata = {
  title: "Demo erkunden",
  description:
    "Broker Vision interaktiv erkunden: Schritte selbst steuern – vom Upload bis zum Versand.",
};

export default function DemoExplorePage() {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-gold-400/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">
            Demo erkunden
          </p>
          <h1 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl">
            Selbst durchklicken.
          </h1>
          <p className="mt-3 text-base text-white/70 sm:text-lg">
            Jeder Schritt zeigt den Nutzen: weniger Administration, schnellere Ausschreibungen,
            mehr Zeit für Kunden.
          </p>
        </div>

        <div className="mt-8 sm:mt-10">
          <ProductDemo mode="explore" size="full" />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/50">
            Interaktive Demo – Tippen Sie auf die Oberfläche oder wählen Sie einen Schritt.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/demo/"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white hover:bg-white/5"
            >
              Autoplay ansehen
            </Link>
            <Link
              href="/kontakt/?thema=live-demo"
              className="inline-flex items-center justify-center rounded-full bg-gold-400 px-5 py-2.5 text-sm font-medium text-navy-950 transition hover:bg-gold-300"
            >
              Live-Gespräch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
