"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { demoFrames } from "@/lib/demo";

export function PlatformDemo() {
  const labelId = useId();
  const [step, setStep] = useState(0);
  const [assetsReady, setAssetsReady] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const current = demoFrames[step];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const probe = new window.Image();
    probe.onload = () => {
      if (!cancelled) setAssetsReady(true);
    };
    probe.onerror = () => {
      if (!cancelled) setAssetsReady(false);
    };
    probe.src = demoFrames[0].src;
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!assetsReady || reducedMotion) return;
    const timer = window.setTimeout(() => {
      setStep((currentStep) => (currentStep + 1) % demoFrames.length);
    }, current.durationMs);
    return () => window.clearTimeout(timer);
  }, [step, current.durationMs, assetsReady, reducedMotion]);

  // Preload remaining frames once first asset is confirmed.
  useEffect(() => {
    if (!assetsReady) return;
    demoFrames.forEach((frame) => {
      const img = new window.Image();
      img.src = frame.src;
    });
  }, [assetsReady]);

  if (assetsReady === null) {
    return (
      <div
        id="in-aktion"
        className="flex min-h-[16rem] items-center justify-center rounded-2xl border border-white/10 bg-[#071526] sm:min-h-[22rem]"
        aria-busy="true"
      >
        <p className="text-sm text-white/50">Produktansichten werden geladen…</p>
      </div>
    );
  }

  if (!assetsReady) {
    return (
      <div
        id="in-aktion"
        className="overflow-hidden rounded-2xl border border-white/15 bg-[#071526] px-6 py-10 text-center sm:px-10 sm:py-14"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-400">
          Echte Plattform
        </p>
        <p className="font-display mx-auto mt-3 max-w-lg text-2xl text-white sm:text-3xl">
          Broker Vision ist produktiv im Einsatz – wir zeigen Ihnen die Software live.
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/60">
          Für die Website-Demo werden Original-Screenshots aus dem System eingebunden.
          Bis dahin vereinbaren Sie eine Live-Demo direkt mit uns.
        </p>
        <Link
          href="/kontakt/?thema=live-demo"
          className="mt-7 inline-flex items-center justify-center rounded-full bg-gold-400 px-6 py-3 text-sm font-medium text-navy-950 transition hover:bg-gold-300"
        >
          Live-Demo anfragen
        </Link>
      </div>
    );
  }

  return (
    <div id="in-aktion" className="w-full" aria-labelledby={labelId}>
      <p id={labelId} className="sr-only">
        Automatische Produktdemo mit echten Screenshots aus Broker Vision.
      </p>

      <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#050d18] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.85)]">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#050d18] sm:aspect-[16/9]">
          {demoFrames.map((frame, index) => {
            const active = index === step;
            return (
              <div
                key={frame.id}
                className={[
                  "absolute inset-0 transition-opacity duration-700 ease-in-out",
                  active ? "opacity-100" : "opacity-0",
                ].join(" ")}
                aria-hidden={!active}
              >
                <Image
                  src={frame.src}
                  alt={`Broker Vision – ${frame.title}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 1024px"
                  className="object-cover object-top"
                />
              </div>
            );
          })}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 via-navy-950/35 to-transparent px-4 pb-4 pt-16 sm:px-5 sm:pb-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-400">
                  {current.title}
                </p>
                <p className="mt-1 text-sm text-white/90 sm:text-base">{current.caption}</p>
              </div>
              <div className="flex items-center gap-1.5" aria-hidden="true">
                {demoFrames.map((frame, index) => (
                  <span
                    key={frame.id}
                    className={[
                      "h-1.5 rounded-full transition-all duration-500",
                      index === step
                        ? "w-6 bg-gold-400"
                        : index < step
                          ? "w-1.5 bg-gold-400/45"
                          : "w-1.5 bg-white/25",
                    ].join(" ")}
                  />
                ))}
              </div>
            </div>
            <div className="demo-progress mt-3 h-0.5 overflow-hidden rounded-full bg-white/15">
              <div
                key={step}
                className="demo-progress-fill h-full rounded-full bg-gold-400"
                style={{
                  animationDuration: reducedMotion ? "0ms" : `${current.durationMs}ms`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-center text-xs text-white/45 sm:text-left">
          Echte Screenshots aus Broker Vision · automatische Endlosschleife
        </p>
        <Link
          href="/kontakt/?thema=live-demo"
          className="inline-flex items-center justify-center rounded-full bg-gold-400 px-5 py-2.5 text-sm font-medium text-navy-950 transition hover:bg-gold-300"
        >
          Live-Demo anfragen
        </Link>
      </div>
    </div>
  );
}
