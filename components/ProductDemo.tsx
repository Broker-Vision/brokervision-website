"use client";

import { useEffect, useId, useState } from "react";
import { demoSteps } from "@/lib/demo";

type ProductDemoProps = {
  /** Autoplay: läuft ohne Interaktion. Explore: Nutzer steuert Schritte. */
  mode?: "autoplay" | "explore";
  /** Hero: kompakter für First Viewport. Full: mehr Raum auf Demo-Seiten. */
  size?: "hero" | "full";
  className?: string;
  /** Optional DOM-id; nur einmal pro Seite setzen. */
  id?: string;
};

export function ProductDemo({
  mode = "autoplay",
  size = "full",
  className = "",
  id,
}: ProductDemoProps) {
  const labelId = useId();
  const [step, setStep] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hint, setHint] = useState(mode === "explore");
  const current = demoSteps[step];
  const isLast = step === demoSteps.length - 1;
  const isHero = size === "hero";
  const isExplore = mode === "explore";

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (mode !== "autoplay" || reducedMotion) return;
    const timer = window.setTimeout(() => {
      setStep((currentStep) => (currentStep + 1) % demoSteps.length);
    }, current.durationMs);
    return () => window.clearTimeout(timer);
  }, [step, current.durationMs, mode, reducedMotion]);

  useEffect(() => {
    if (!hint) return;
    const timer = window.setTimeout(() => setHint(false), 3500);
    return () => window.clearTimeout(timer);
  }, [hint]);

  function goNext() {
    setHint(false);
    setStep((currentStep) => (currentStep + 1) % demoSteps.length);
  }

  function goTo(index: number) {
    setHint(false);
    setStep(index);
  }

  const stageMin = isHero
    ? "min-h-[12.5rem] sm:min-h-[16rem] lg:min-h-[18rem]"
    : "min-h-[19rem] sm:min-h-[22rem]";

  const chrome = (
    <div
      className={[
        "overflow-hidden rounded-2xl border border-white/15 bg-[#071526] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.85)]",
        isExplore ? "cursor-pointer transition hover:border-gold-400/35" : "",
      ].join(" ")}
      role={isExplore ? "button" : "img"}
      tabIndex={isExplore ? 0 : undefined}
      aria-label={
        isExplore
          ? isLast
            ? "Demo neu starten"
            : `Weiter zu: ${demoSteps[(step + 1) % demoSteps.length].title}`
          : `Demo-Schritt: ${current.title}`
      }
      onClick={isExplore ? goNext : undefined}
      onKeyDown={
        isExplore
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                goNext();
              }
            }
          : undefined
      }
    >
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 sm:px-4 sm:py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 hidden text-xs text-white/45 sm:inline">Broker Vision</span>
        </div>
        <div className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/55 sm:px-3 sm:text-[11px]">
          app.brokervision.ch
        </div>
        <span className="rounded-full bg-gold-400/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-gold-300 sm:px-2.5 sm:py-1 sm:text-[10px]">
          {current.status}
        </span>
      </div>

      <div className={isHero ? "" : "grid lg:grid-cols-[11.5rem_minmax(0,1fr)]"}>
        {!isHero ? (
          <aside className="hidden border-r border-white/10 bg-white/[0.03] p-3 lg:block">
            <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
              Arbeitsplatz
            </p>
            <ul className="mt-3 space-y-1">
              {["Offerten", "Dokumente", "CRM", "Workflows"].map((item, index) => (
                <li
                  key={item}
                  className={[
                    "rounded-lg px-2.5 py-2 text-xs",
                    index === 0
                      ? "bg-gold-400/15 font-medium text-gold-300"
                      : "text-white/50",
                  ].join(" ")}
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        ) : null}

        <div className="min-w-0">
          <div className="border-b border-white/10 px-3 py-2.5 sm:px-5 sm:py-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.14em] text-gold-400/90 sm:text-[11px]">
                  Vorgang · Ausschreibung
                </p>
                <p className="mt-0.5 truncate text-sm font-medium text-white sm:mt-1 sm:text-base">
                  {current.title}
                </p>
              </div>
              <div className="flex items-center gap-1.5" aria-hidden="true">
                {demoSteps.map((item, index) => (
                  <span
                    key={item.id}
                    className={[
                      "h-1.5 rounded-full transition-all duration-500",
                      index === step
                        ? "w-5 bg-gold-400 sm:w-6"
                        : index < step
                          ? "w-1.5 bg-gold-400/50"
                          : "w-1.5 bg-white/20",
                    ].join(" ")}
                  />
                ))}
              </div>
            </div>
            {mode === "autoplay" ? (
              <div className="demo-progress mt-2.5 h-0.5 overflow-hidden rounded-full bg-white/10 sm:mt-3">
                <div
                  key={step}
                  className="demo-progress-fill h-full rounded-full bg-gold-400"
                  style={{
                    animationDuration: reducedMotion ? "0ms" : `${current.durationMs}ms`,
                  }}
                />
              </div>
            ) : (
              <div className="mt-2.5 h-0.5 overflow-hidden rounded-full bg-white/10 sm:mt-3">
                <div
                  className="h-full rounded-full bg-gold-400 transition-[width] duration-500 ease-out"
                  style={{ width: `${((step + 1) / demoSteps.length) * 100}%` }}
                />
              </div>
            )}
          </div>

          <div className={["relative p-3 sm:p-5", stageMin].join(" ")}>
            <DemoStage step={step} compact={isHero} />
            {isExplore ? (
              <div className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-white/20 bg-navy-950/70 px-2.5 py-1 text-[10px] text-white/70 backdrop-blur sm:bottom-4 sm:right-4 sm:px-3 sm:py-1.5 sm:text-[11px]">
                {isLast ? "Erneut →" : "Weiter →"}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div id={id} className={["w-full", className].join(" ")} aria-labelledby={labelId}>
      <p id={labelId} className="sr-only">
        {mode === "autoplay"
          ? "Automatische Produktdemo: Vom Police-Upload bis zum Versand der Ausschreibung."
          : "Interaktive Produktdemo: Schritte selbst durchklicken."}
      </p>

      {isExplore ? (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] lg:items-start lg:gap-8">
          <ol className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0">
            {demoSteps.map((item, index) => {
              const active = index === step;
              const done = index < step;
              return (
                <li key={item.id} className="min-w-[10.5rem] shrink-0 lg:min-w-0">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      goTo(index);
                    }}
                    className={[
                      "flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition",
                      active
                        ? "border-gold-400/70 bg-gold-400/15"
                        : done
                          ? "border-white/15 bg-white/5 hover:border-white/30"
                          : "border-white/10 bg-white/[0.03] hover:border-white/25",
                    ].join(" ")}
                    aria-current={active ? "step" : undefined}
                  >
                    <span
                      className={[
                        "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                        active
                          ? "bg-gold-400 text-navy-950"
                          : done
                            ? "bg-white/20 text-white"
                            : "bg-white/10 text-white/60",
                      ].join(" ")}
                    >
                      {done && !active ? "✓" : index + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-white">{item.title}</span>
                      <span className="mt-0.5 hidden text-xs text-white/55 lg:block">
                        {item.benefit}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-white/65">
                Schritt {step + 1} von {demoSteps.length}
                <span className="mx-2 text-white/25">·</span>
                <span className="text-gold-300">{current.benefit}</span>
              </p>
              {hint ? (
                <p className="demo-hint text-xs text-gold-300/90">Zum Fortfahren tippen</p>
              ) : null}
            </div>
            {chrome}
          </div>
        </div>
      ) : (
        chrome
      )}
    </div>
  );
}

function DemoStage({ step, compact }: { step: number; compact?: boolean }) {
  const stagePad = compact ? "min-h-[10.5rem] sm:min-h-[14rem]" : "min-h-[17rem] sm:min-h-[19rem]";

  switch (step) {
    case 0:
      return (
        <div
          className={[
            "demo-fade flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-gold-400/35 bg-gradient-to-b from-white/[0.06] to-transparent px-3 py-6 text-center sm:px-4 sm:py-8",
            stagePad,
          ].join(" ")}
        >
          <div className="demo-float relative flex h-16 w-12 flex-col items-center justify-end rounded-md border border-white/15 bg-white shadow-lg shadow-black/30 sm:h-20 sm:w-16">
            <div className="absolute inset-x-2 top-2.5 space-y-1 sm:top-3 sm:space-y-1.5">
              <div className="h-1 rounded bg-navy-900/15" />
              <div className="h-1 w-3/4 rounded bg-navy-900/10" />
              <div className="h-1 w-2/3 rounded bg-navy-900/10" />
            </div>
            <span className="mb-1.5 rounded bg-gold-400 px-1.5 py-0.5 text-[9px] font-semibold text-navy-950 sm:mb-2">
              PDF
            </span>
          </div>
          <p className="mt-3 text-sm font-medium text-white sm:mt-5">Police_Sach_2026.pdf</p>
          <p className="mt-1 text-xs text-white/50">Wird in den Arbeitsplatz geladen…</p>
          <div className="mt-3 h-1.5 w-36 overflow-hidden rounded-full bg-white/10 sm:mt-4 sm:w-40">
            <div className="demo-upload-bar h-full rounded-full bg-gold-400" />
          </div>
        </div>
      );

    case 1:
      return (
        <div className="demo-fade relative overflow-hidden rounded-xl border border-white/10 bg-[#0a1b31] p-3 sm:p-4">
          <div className="rounded-lg bg-white p-3 text-navy-900 shadow-sm sm:p-5">
            <div className="flex items-center justify-between">
              <div className="h-2 w-24 rounded bg-navy-900/15 sm:h-2.5 sm:w-28" />
              <div className="h-2 w-12 rounded bg-navy-900/10 sm:h-2.5 sm:w-16" />
            </div>
            <div className="mt-4 space-y-2 sm:mt-5 sm:space-y-2.5">
              <div className="h-2 w-full rounded bg-navy-900/10" />
              <div className="h-2 w-[90%] rounded bg-navy-900/10" />
              <div className="h-2 w-[82%] rounded bg-navy-900/10" />
              <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 sm:gap-3">
                <div className="h-10 rounded-md bg-navy-900/[0.06] sm:h-14" />
                <div className="h-10 rounded-md bg-navy-900/[0.06] sm:h-14" />
              </div>
            </div>
          </div>
          <div className="demo-scan pointer-events-none absolute inset-x-5 top-8 h-10 rounded-sm bg-gradient-to-b from-gold-400/0 via-gold-400/40 to-gold-400/0 sm:inset-x-8 sm:top-10 sm:h-12" />
          <p className="mt-2 text-center text-xs font-medium text-gold-300 sm:mt-3 sm:text-sm">
            OCR liest Felder, Beträge und Vertragsdaten…
          </p>
        </div>
      );

    case 2:
      return (
        <div className="demo-fade grid gap-3 sm:grid-cols-[1.1fr_0.9fr] sm:gap-4">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 sm:p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/40">Dokument</p>
            <div className="mt-2 space-y-2 rounded-lg bg-white/95 p-3 sm:mt-3">
              <div className="h-2 w-24 rounded bg-navy-900/15" />
              <div className="demo-highlight rounded bg-gold-400/25 px-2 py-1.5">
                <div className="h-2 w-36 rounded bg-navy-900/40 sm:w-40" />
              </div>
              <div className="h-2 w-full rounded bg-navy-900/10" />
              <div className="h-2 w-4/5 rounded bg-navy-900/10" />
            </div>
          </div>
          <div className="demo-pop flex flex-col justify-center rounded-xl border border-gold-400/40 bg-gold-400/10 p-3 sm:p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-gold-400">Kunde erkannt</p>
            <p className="font-display mt-1.5 text-lg text-white sm:mt-2 sm:text-xl">Muster AG</p>
            <p className="mt-1 text-xs text-white/65 sm:text-sm">Zürich · UID CHE-123.456.789</p>
            <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] text-emerald-300 sm:mt-4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Confidence 98%
            </span>
          </div>
        </div>
      );

    case 3:
      return (
        <div className="demo-fade grid gap-3 sm:grid-cols-[1.1fr_0.9fr] sm:gap-4">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 sm:p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/40">Dokument</p>
            <div className="mt-2 space-y-2 rounded-lg bg-white/95 p-3 sm:mt-3">
              <div className="h-2 w-24 rounded bg-navy-900/15" />
              <div className="h-2 w-40 rounded bg-navy-900/10" />
              <div className="demo-highlight rounded bg-gold-400/25 px-2 py-1.5">
                <div className="h-2 w-28 rounded bg-navy-900/40" />
              </div>
              <div className="h-2 w-full rounded bg-navy-900/10" />
            </div>
          </div>
          <div className="demo-pop flex flex-col justify-center rounded-xl border border-gold-400/40 bg-gold-400/10 p-3 sm:p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-gold-400">
              Gesellschaft erkannt
            </p>
            <p className="font-display mt-1.5 text-lg text-white sm:mt-2 sm:text-xl">
              AXA Versicherungen
            </p>
            <p className="mt-1 text-xs text-white/65 sm:text-sm">Bestandspolice · Sach</p>
            <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] text-emerald-300 sm:mt-4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Confidence 96%
            </span>
          </div>
        </div>
      );

    case 4:
      return (
        <div className="demo-fade">
          <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-gold-400 sm:mb-3">
            Übernommene Felder
          </p>
          <div className="grid gap-2 sm:grid-cols-2 sm:gap-2.5">
            {[
              { label: "Kunde", value: "Muster AG" },
              { label: "Gesellschaft", value: "AXA" },
              { label: "Sparte", value: "Sachversicherung" },
              { label: "Vertragsnr.", value: "CH-48291-AX" },
              { label: "Jahresprämie", value: "CHF 18’450" },
              { label: "Ablauf", value: "31.12.2026" },
            ].map((field, index) => (
              <div
                key={field.label}
                className="demo-field rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 sm:py-2.5"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <p className="text-[10px] uppercase tracking-[0.12em] text-white/40">{field.label}</p>
                <p className="mt-0.5 text-sm font-medium text-white sm:mt-1">{field.value}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 5:
      return (
        <div className="demo-fade rounded-xl border border-white/10 bg-white/[0.04] p-3 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold-400">
                Ausschreibung · Entwurf
              </p>
              <p className="font-display mt-1 text-base text-white sm:text-xl">
                Sachversicherung · Muster AG
              </p>
            </div>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-white/70">
              Automatisch erstellt
            </span>
          </div>
          <div className="mt-3 space-y-2 sm:mt-5 sm:space-y-2.5">
            {[
              "Deckungsdaten aus Police übernommen",
              "4 Gesellschaften als Empfänger gesetzt",
              "Frist und Begleitschreiben vorbereitet",
            ].map((line, index) => (
              <div
                key={line}
                className="demo-field flex items-center gap-3 rounded-lg border border-white/10 bg-[#071526] px-3 py-2 text-sm text-white/85 sm:py-2.5"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-400/20 text-[10px] text-gold-300">
                  ✓
                </span>
                {line}
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return (
        <div
          className={[
            "demo-fade flex flex-col items-center justify-center rounded-xl border border-gold-400/30 bg-gradient-to-b from-gold-400/15 via-gold-400/5 to-transparent px-3 py-6 text-center sm:px-4 sm:py-8",
            stagePad,
          ].join(" ")}
        >
          <div className="demo-pop flex h-12 w-12 items-center justify-center rounded-full bg-gold-400 text-navy-950 shadow-[0_0_40px_rgba(201,164,92,0.35)] sm:h-14 sm:w-14">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              aria-hidden
            >
              <path d="m5 12 5 5L20 7" />
            </svg>
          </div>
          <p className="font-display mt-4 text-lg text-white sm:mt-5 sm:text-2xl">
            Ausschreibung versendet
          </p>
          <p className="mt-2 max-w-sm text-xs text-white/60 sm:text-sm">
            An 4 Gesellschaften – ohne Tipparbeit, ohne Medienbruch.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5 sm:mt-5 sm:gap-2">
            {["AXA", "Zurich", "Helvetia", "Mobiliar"].map((name) => (
              <span
                key={name}
                className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] text-white/75 sm:px-3 sm:text-[11px]"
              >
                {name} ✓
              </span>
            ))}
          </div>
        </div>
      );
  }
}
