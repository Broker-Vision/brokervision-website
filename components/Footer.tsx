import Link from "next/link";
import { Logo } from "./Logo";
import { navigation, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo inverted />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
            {site.description}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
            Navigation
          </p>
          <ul className="mt-4 space-y-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/75 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
            Kontakt
          </p>
          <address className="mt-4 not-italic text-sm leading-relaxed text-white/75">
            {site.legalName}
            <br />
            {site.address.street}
            <br />
            {site.address.zip} {site.address.city}
            <br />
            <a href={`mailto:${site.email}`} className="mt-3 inline-block text-white hover:text-gold-300">
              {site.email}
            </a>
          </address>
        </div>
      </div>

      <div className="hairline" />

      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {site.legalName}. Alle Rechte vorbehalten.
        </p>
        <div className="flex gap-5">
          <Link href="/impressum/" className="hover:text-white">
            Impressum
          </Link>
          <Link href="/datenschutz/" className="hover:text-white">
            Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  );
}
