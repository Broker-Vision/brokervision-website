"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const DEMO_HOSTS = new Set(["demo.brokervision.ch", "demo.localhost"]);

/**
 * Auf demo.brokervision.ch:
 * / → /demo/
 * /explore → /demo/explore/
 *
 * Azure SWA kann Host-Regeln nicht in staticwebapp.config abbilden;
 * deshalb clientseitige Umleitung nach dem ersten Paint.
 */
export function DemoHostRedirect() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const host = window.location.hostname.toLowerCase();
    if (!DEMO_HOSTS.has(host)) return;

    const path = pathname || "/";
    if (path === "/" || path === "") {
      router.replace("/demo/");
      return;
    }
    if (path === "/explore" || path === "/explore/") {
      router.replace("/demo/explore/");
    }
  }, [pathname, router]);

  return null;
}
