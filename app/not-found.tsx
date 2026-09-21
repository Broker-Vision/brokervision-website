import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">404</p>
      <h1 className="font-serif mt-4 text-4xl">Seite nicht gefunden</h1>
      <p className="mt-4 text-navy-800/75">
        Die gewünschte Adresse existiert nicht oder wurde verschoben.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-navy-900 px-5 py-2.5 text-sm font-medium text-white"
      >
        Zur Startseite
      </Link>
    </section>
  );
}
