import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Lösungen",
  description: "Die Inhalte zu Lösungen finden Sie unter Plattform.",
  robots: { index: false, follow: true },
};

/** Legacy route – content moved to /plattform/. */
export default function SolutionsRedirectPage() {
  return (
    <>
      <PageHero
        eyebrow="Hinweis"
        title="Inhalt unter Plattform."
        lead="Die frühere Lösungsübersicht ist in die Broker-Vision-Plattform überführt worden."
      />
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <Link
          href="/plattform/"
          className="inline-flex rounded-full bg-gold-400 px-6 py-3 text-sm font-medium text-navy-950 hover:bg-gold-300"
        >
          Zur Plattform
        </Link>
      </section>
    </>
  );
}
