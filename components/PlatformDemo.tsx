"use client";

import { useEffect, useId, useState } from "react";

type DemoStep = {
  id: string;
  title: string;
  status: string;
  durationMs: number;
};

const steps: DemoStep[] = [
  {
    id: "upload",
    title: "Police wird hochgeladen",
    status: "Upload",
    durationMs: 1400,
  },
  {
    id: "ocr",
    title: "OCR analysiert das Dokument",
    status: "OCR",
    durationMs: 1600,
  },
  {
    id: "client",
    title: "Kunde wird erkannt",
    status: "Erkennung",
    durationMs: 1200,
  },
  {
    id: "insurer",
    title: "Gesellschaft wird erkannt",
    status: "Erkennung",
    durationMs: 1200,
  },
  {
    id: "data",
    title: "Relevante Daten werden übernommen",
    status: "Übernahme",
    durationMs: 1400,
  },
  {
    id: "prepare",
    title: "Ausschreibung wird vorbereitet",
    status: "Vorbereitung",
    durationMs: 1400,
  },
  {
    id: "send",
    title: "Ausschreibung wird versendet",
    status: "Versand",
    durationMs: 1800,
  },
];

export function PlatformDemo() {
  const labelId = useId();
  const [step, setStep] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const current = steps[step];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setTimeout(() => {
      setStep((currentStep) => (currentStep + 1) % steps.length);
    }, current.durationMs);
    return () => window.clearTimeout(timer);
  }, [step, current.durationMs, reducedMotion]);

  return (
    <div id="in-aktion" className="w-full" aria-labelledby={labelId}>
      <p id={labelId} className="sr-only">
        Automatische Produktdemo: Vom Police-Upload bis zum Versand der Ausschreibung.
      </p>

      <div
        className="overflow-hidden rounded-2xl border border-white/15 bg-[#071526] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.85)]"
        role="img"
        aria-label={`Demo-Schritt: ${current.title}`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2.5 sm:px-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 hidden text-xs text-white/45 sm:inline">Broker Vision</span>
          </div>
          <div className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/55">
            app.brokervision.ch
          </div>
          <span className="rounded-full bg-gold-400/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-300">
            {current.status}
          </span>
        </div>

        <div className="grid lg:grid-cols-[11.5rem_minmax(0,1fr)]">
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

          <div className="min-w-0">
            <div className="border-b border-white/10 px-4 py-3 sm:px-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-gold-400/90">
                    Vorgang · Ausschreibung
                  </p>
                  <p className="mt-1 text-sm font-medium text-white sm:text-base">
                    {current.title}
                  </p>
                </div>
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  {steps.map((item, index) => (
                    <span
                      key={item.id}
                      className={[
                        "h-1.5 rounded-full transition-all duration-500",
                        index === step
                          ? "w-6 bg-gold-400"
                          : index < step
                            ? "w-1.5 bg-gold-400/50"
                            : "w-1.5 bg-white/20",
                      ].join(" ")}
                    />
                  ))}
                </div>
              </div>
              <div className="demo-progress mt-3 h-0.5 overflow-hidden rounded-full bg-white/10">
                <div
                  key={step}
                  className="demo-progress-fill h-full rounded-full bg-gold-400"
                  style={{
                    animationDuration: reducedMotion ? "0ms" : `${current.durationMs}ms`,
                  }}
                />
              </div>
            </div>

            <div className="relative min-h-[19rem] p-4 sm:min-h-[22rem] sm:p-5">
              <DemoStage step={step} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoStage({ step }: { step: number }) {
  switch (step) {
    case 0:
      return (
        <div className="demo-fade flex h-full min-h-[17rem] flex-col items-center justify-center rounded-xl border border-dashed border-gold-400/35 bg-gradient-to-b from-white/[0.06] to-transparent px-4 py-8 text-center sm:min-h-[19rem]">
          <div className="demo-float relative flex h-20 w-16 flex-col items-center justify-end rounded-md border border-white/15 bg-white shadow-lg shadow-black/30">
            <div className="absolute inset-x-2 top-3 space-y-1.5">
              <div className="h-1 rounded bg-navy-900/15" />
              <div className="h-1 w-3/4 rounded bg-navy-900/10" />
              <div className="h-1 w-2/3 rounded bg-navy-900/10" />
            </div>
            <span className="mb-2 rounded bg-gold-400 px-1.5 py-0.5 text-[9px] font-semibold text-navy-950">
              PDF
            </span>
          </div>
          <p className="mt-5 text-sm font-medium text-white">Police_Sach_2026.pdf</p>
          <p className="mt-1 text-xs text-white/50">Wird in den Arbeitsplatz geladen…</p>
          <div className="mt-4 h-1.5 w-40 overflow-hidden rounded-full bg-white/10">
            <div className="demo-upload-bar h-full rounded-full bg-gold-400" />
          </div>
        </div>
      );

    case 1:
      return (
        <div className="demo-fade relative overflow-hidden rounded-xl border border-white/10 bg-[#0a1b31] p-3 sm:p-4">
          <div className="rounded-lg bg-white p-4 text-navy-900 shadow-sm sm:p-5">
            <div className="flex items-center justify-between">
              <div className="h-2.5 w-28 rounded bg-navy-900/15" />
              <div className="h-2.5 w-16 rounded bg-navy-900/10" />
            </div>
            <div className="mt-5 space-y-2.5">
              <div className="h-2 w-full rounded bg-navy-900/10" />
              <div className="h-2 w-[90%] rounded bg-navy-900/10" />
              <div className="h-2 w-[82%] rounded bg-navy-900/10" />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="h-14 rounded-md bg-navy-900/[0.06]" />
                <div className="h-14 rounded-md bg-navy-900/[0.06]" />
              </div>
              <div className="h-2 w-[70%] rounded bg-navy-900/10" />
              <div className="h-2 w-[88%] rounded bg-navy-900/10" />
            </div>
          </div>
          <div className="demo-scan pointer-events-none absolute inset-x-6 top-10 h-12 rounded-sm bg-gradient-to-b from-gold-400/0 via-gold-400/40 to-gold-400/0 sm:inset-x-8" />
          <p className="mt-3 text-center text-xs font-medium text-gold-300 sm:text-sm">
            OCR liest Felder, Beträge und Vertragsdaten…
          </p>
        </div>
      );

    case 2:
      return (
        <div className="demo-fade grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/40">Dokument</p>
            <div className="mt-3 space-y-2 rounded-lg bg-white/95 p-3">
              <div className="h-2 w-24 rounded bg-navy-900/15" />
              <div className="demo-highlight rounded bg-gold-400/25 px-2 py-1.5">
                <div className="h-2 w-40 rounded bg-navy-900/40" />
              </div>
              <div className="h-2 w-full rounded bg-navy-900/10" />
              <div className="h-2 w-4/5 rounded bg-navy-900/10" />
            </div>
          </div>
          <div className="demo-pop flex flex-col justify-center rounded-xl border border-gold-400/40 bg-gold-400/10 p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-gold-400">Kunde erkannt</p>
            <p className="font-display mt-2 text-xl text-white">Muster AG</p>
            <p className="mt-1 text-sm text-white/65">Zürich · UID CHE-123.456.789</p>
            <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Confidence 98%
            </span>
          </div>
        </div>
      );

    case 3:
      return (
        <div className="demo-fade grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/40">Dokument</p>
            <div className="mt-3 space-y-2 rounded-lg bg-white/95 p-3">
              <div className="h-2 w-24 rounded bg-navy-900/15" />
              <div className="h-2 w-40 rounded bg-navy-900/10" />
              <div className="demo-highlight rounded bg-gold-400/25 px-2 py-1.5">
                <div className="h-2 w-28 rounded bg-navy-900/40" />
              </div>
              <div className="h-2 w-full rounded bg-navy-900/10" />
            </div>
          </div>
          <div className="demo-pop flex flex-col justify-center rounded-xl border border-gold-400/40 bg-gold-400/10 p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-gold-400">
              Gesellschaft erkannt
            </p>
            <p className="font-display mt-2 text-xl text-white">AXA Versicherungen</p>
            <p className="mt-1 text-sm text-white/65">Bestandspolice · Sach</p>
            <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Confidence 96%
            </span>
          </div>
        </div>
      );

    case 4:
      return (
        <div className="demo-fade">
          <p className="mb-3 text-[11px] uppercase tracking-[0.14em] text-gold-400">
            Übernommene Felder
          </p>
          <div className="grid gap-2.5 sm:grid-cols-2">
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
                className="demo-field rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <p className="text-[10px] uppercase tracking-[0.12em] text-white/40">{field.label}</p>
                <p className="mt-1 text-sm font-medium text-white">{field.value}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 5:
      return (
        <div className="demo-fade rounded-xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold-400">
                Ausschreibung · Entwurf
              </p>
              <p className="font-display mt-1 text-lg text-white sm:text-xl">
                Sachversicherung · Muster AG
              </p>
            </div>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-white/70">
              Automatisch erstellt
            </span>
          </div>
          <div className="mt-5 space-y-2.5">
            {[
              "Deckungsdaten aus Police übernommen",
              "4 Gesellschaften als Empfänger gesetzt",
              "Frist und Begleitschreiben vorbereitet",
            ].map((line, index) => (
              <div
                key={line}
                className="demo-field flex items-center gap-3 rounded-lg border border-white/10 bg-[#071526] px-3 py-2.5 text-sm text-white/85"
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
        <div className="demo-fade flex min-h-[17rem] flex-col items-center justify-center rounded-xl border border-gold-400/30 bg-gradient-to-b from-gold-400/15 via-gold-400/5 to-transparent px-4 py-8 text-center sm:min-h-[19rem]">
          <div className="demo-pop flex h-14 w-14 items-center justify-center rounded-full bg-gold-400 text-navy-950 shadow-[0_0_40px_rgba(201,164,92,0.35)]">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
              <path d="m5 12 5 5L20 7" />
            </svg>
          </div>
          <p className="font-display mt-5 text-xl text-white sm:text-2xl">Ausschreibung versendet</p>
          <p className="mt-2 max-w-sm text-sm text-white/60">
            An 4 Gesellschaften zugestellt – ohne Tipparbeit, ohne Medienbruch.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {["AXA", "Zurich", "Helvetia", "Mobiliar"].map((name) => (
              <span
                key={name}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-white/75"
              >
                {name} ✓
              </span>
            ))}
          </div>
        </div>
      );
  }
}
