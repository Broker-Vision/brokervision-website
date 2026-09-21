"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { navigation } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/92 text-white backdrop-blur-md">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="relative z-10" aria-label="Broker Vision – Startseite">
          <Logo inverted />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Hauptnavigation">
          {navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm tracking-wide transition-colors ${
                  active ? "text-gold-400" : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/kontakt/"
            className="rounded-full bg-gold-400 px-4 py-2 text-sm font-medium text-navy-950 transition hover:bg-gold-300"
          >
            Gespräch vereinbaren
          </Link>
        </nav>

        <button
          type="button"
          className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-md md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Menü schliessen" : "Menü öffnen"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menü</span>
          <span className="flex flex-col gap-1.5">
            <span
              className={`block h-px w-5 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`block h-px w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
            <span
              className={`block h-px w-5 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-white/10 bg-navy-950 px-5 py-6 md:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile Navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-lg ${pathname === item.href ? "text-gold-400" : "text-white"}`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/kontakt/"
              className="mt-2 inline-flex w-fit rounded-full bg-gold-400 px-4 py-2 text-sm font-medium text-navy-950"
            >
              Gespräch vereinbaren
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
