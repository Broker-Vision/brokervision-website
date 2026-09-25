"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";

type DemoStep = {
  id: string;
  title: string;
  benefit: string;
  stageLabel: string;
};

const steps: DemoStep[] = [
  {
    id: "upload",
    title: "Police hochladen",
    benefit: "Ein Dokument statt zehn E-Mails und Ordner.",
    stageLabel: "Upload",
  },
  {
    id: "analyze",
    title: "Dokument wird analysiert",
    benefit: "Die Software liest – der Broker muss nicht tippen.",
    stageLabel: "Analyse",
  },
  {
    id: "extract",
    title: "Daten werden erkannt",
    benefit: "Police, Prämie und Decungen strukturiert erfasst.",
    stageLabel: "Erkennung",
  },
  {
    id: "prepare",
    title: "Ausschreibung wird vorbereitet",
    benefit: "Formulare und Empfänger entstehen automatisch.",
    stageLabel: "Vorbereitung",
  },
  {
    id: "review",
    title: "Broker prüft die Angaben",
    benefit: "Kontrolle bleibt beim Menschen – Arbeit bei der Software.",
    stageLabel: "Prüfung",
  },
  {
    id: "send",
    title: "Ausschreibung wird versendet",
    benefit: "Versandfertig in Minuten statt in Stunden.",
    stageLabel: "Versand",
  },
];

const extractedFields = [
  { label: "Versicherungsnehmer", value: "Muster AG, Zürich" },
  { label: "Sparte", value: "Sachversicherung" },
  { label: "Vertragsnummer", value: "CH-48291-AX" },
  { label: "Jahresprämie", value: "CHF 18’450" },
  { label: "Ablauf", value: "31.12.2026" },
  { label: "Selbstbehalt", value: "CHF 1’000" },
];

export function PlatformDemo() {
  const labelId = useId();
  const [step, setStep] = useState(0);
  const [autoHint, setAutoHint] = useState(true);
  const current = steps[step];
  const isLast = step === steps.length - 1;

  useEffect(() => {
    if (!autoHint) return;
    const timer = window.setTimeout(() => setAutoHint(false), 4000);
    return () => window.clearTimeout(timer);
  }, [autoHint]);

  function goNext() {
    setAutoHint(false);
    setStep((currentStep) => (currentStep + 1) % steps.length);
  }

  function goTo(index: number) {
    setAutoHint(false);
    setStep(index);
  }

  return (
    <section
      id="in-aktion"
      className="relative overflow-hidden bg-navy-950 text-white"
      aria-labelledby={labelId}
    >
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-70" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">
            Broker Vision in Aktion
          </p>
          <h2 id={labelId} className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl">
            Vom Dokument zur Ausschreibung – in sechs Schritten.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
            Kein Login. Keine echte OCR. Eine interaktive Demo, die in Sekunden zeigt,
            welchen Nutzen die Plattform im Brokeralltag bietet.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)] lg:items-start lg:gap-10">
          <ol className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0">
            {steps.map((item, index) => {
              const active = index === step;
              const done = index < step;
              return (
                <li key={item.id} className="min-w-[11.5rem] shrink-0 lg:min-w-0">
                  <button
                    type="button"
                    onClick={() => goTo(index)}
                    className={[
                      "flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition",
                      active
                        ? "border-gold-400/70 bg-gold-400/15 shadow-[0_0_0_1px_rgba(201,164,92,0.25)]"
                        : done
                          ? "border-white/15 bg-white/5 hover:border-white/30"
                          : "border-white/10 bg-white/[0.03] hover:border-white/25",
                    ].join(" ")}
                    aria-current={active ? "step" : undefined}
                  >
                    <span
                      className={[
                        "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
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
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-white/65">
                Schritt {step + 1} von {steps.length}
                <span className="mx-2 text-white/25">·</span>
                <span className="text-gold-300">{current.benefit}</span>
              </p>
              {autoHint ? (
                <p className="demo-hint text-xs text-gold-300/90">Zum Fortfahren klicken</p>
              ) : null}
            </div>

            <div className="demo-progress mb-5 h-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gold-400 transition-[width] duration-500 ease-out"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>

            <button
              type="button"
              onClick={goNext}
              className="group block w-full overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.09] to-white/[0.03] text-left shadow-[0_24px_80px_-32px_rgba(0,0,0,0.7)] outline-none ring-gold-400/40 transition hover:border-gold-400/40 focus-visible:ring-2"
              aria-label={isLast ? "Demo neu starten" : `Weiter zu: ${steps[(step + 1) % steps.length].title}`}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-gold-300/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                  <span className="ml-2 text-xs text-white/45">broker-vision.app</span>
                </div>
                <span className="rounded-full bg-gold-400/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-300">
                  {current.stageLabel}
                </span>
              </div>

              <div className="relative min-h-[22rem] p-4 sm:min-h-[24rem] sm:p-6">
                <DemoStage step={step} />
                <div className="pointer-events-none absolute bottom-4 right-4 rounded-full border border-white/20 bg-navy-950/70 px-3 py-1.5 text-[11px] text-white/70 backdrop-blur sm:bottom-5 sm:right-5">
                  {isLast ? "Erneut abspielen →" : "Weiter →"}
                </div>
              </div>
            </button>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-white/55">
                Interaktive Produktdemo – ohne Anmeldung, ohne echte Dokumentenverarbeitung.
              </p>
              <Link
                href="/kontakt/"
                className="inline-flex items-center justify-center rounded-full bg-gold-400 px-5 py-2.5 text-sm font-medium text-navy-950 transition hover:bg-gold-300"
              >
                Demo im Gespräch vertiefen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoStage({ step }: { step: number }) {
  switch (step) {
    case 0:
      return (
        <div className="demo-fade flex h-full min-h-[20rem] flex-col items-center justify-center rounded-xl border border-dashed border-gold-400/40 bg-navy-900/60 px-4 py-10 text-center">
          <div className="demo-pulse flex h-16 w-16 items-center justify-center rounded-2xl border border-gold-400/50 bg-gold-400/10 text-gold-300">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <path d="M12 16V4m0 0 4 4m-4-4L8 8" />
              <path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
            </svg>
          </div>
          <p className="font-display mt-5 text-xl text-white sm:text-2xl">Police hier ablegen</p>
          <p className="mt-2 max-w-sm text-sm text-white/60">
            Beispiel: «Police_Sach_2026.pdf» – ein Klick startet den Demo-Ablauf.
          </p>
          <span className="mt-6 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/80">
            Police_Sach_2026.pdf · 1.2 MB
          </span>
        </div>
      );
    case 1:
      return (
        <div className="demo-fade relative overflow-hidden rounded-xl border border-white/10 bg-navy-900/70 p-4 sm:p-5">
          <div className="rounded-lg bg-white px-4 py-5 text-navy-900 shadow-sm">
            <div className="h-2 w-24 rounded bg-navy-900/15" />
            <div className="mt-4 space-y-2">
              <div className="h-2 w-full rounded bg-navy-900/10" />
              <div className="h-2 w-[88%] rounded bg-navy-900/10" />
              <div className="h-2 w-[78%] rounded bg-navy-900/10" />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="h-16 rounded bg-navy-900/[0.08]" />
                <div className="h-16 rounded bg-navy-900/[0.08]" />
              </div>
            </div>
          </div>
          <div className="demo-scan pointer-events-none absolute inset-x-4 top-8 h-10 rounded-sm bg-gradient-to-b from-gold-400/0 via-gold-400/35 to-gold-400/0 sm:inset-x-5" />
          <p className="mt-4 text-center text-sm text-gold-300">Dokument wird analysiert…</p>
        </div>
      );
    case 2:
      return (
        <div className="demo-fade grid gap-3 sm:grid-cols-2">
          {extractedFields.map((field, index) => (
            <div
              key={field.label}
              className="rounded-xl border border-white/10 bg-navy-900/65 px-4 py-3"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <p className="text-[11px] uppercase tracking-[0.14em] text-gold-400/90">{field.label}</p>
              <p className="mt-1.5 text-sm font-medium text-white">{field.value}</p>
            </div>
          ))}
        </div>
      );
    case 3:
      return (
        <div className="demo-fade rounded-xl border border-white/10 bg-navy-900/65 p-4 sm:p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-400">
            Ausschreibung · Entwurf
          </p>
          <p className="font-display mt-2 text-xl text-white">Sachversicherung · Muster AG</p>
          <div className="mt-5 space-y-3">
            {[
              "Empfänger: 4 Gesellschaften vorausgewählt",
              "Deckungsdaten aus Police übernommen",
              "Frist und Begleitschreiben vorbereitet",
            ].map((line) => (
              <div
                key={line}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/85"
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
    case 4:
      return (
        <div className="demo-fade rounded-xl border border-white/10 bg-navy-900/65 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-400">
              Prüfung durch Broker
            </p>
            <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
              Freigabe bereit
            </span>
          </div>
          <ul className="mt-5 space-y-3">
            {[
              { label: "Versicherungsnehmer", value: "Muster AG – korrekt" },
              { label: "Prämie / SB", value: "CHF 18’450 / 1’000 – geprüft" },
              { label: "Gesellschaften", value: "4 Empfänger – bestätigt" },
            ].map((row) => (
              <li
                key={row.label}
                className="flex items-start justify-between gap-4 border-b border-white/10 pb-3 text-sm last:border-0 last:pb-0"
              >
                <span className="text-white/55">{row.label}</span>
                <span className="text-right font-medium text-white">{row.value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-white/50">
            Der Broker entscheidet – die Plattform hat die Vorarbeit erledigt.
          </p>
        </div>
      );
    default:
      return (
        <div className="demo-fade flex min-h-[20rem] flex-col items-center justify-center rounded-xl border border-gold-400/30 bg-gradient-to-b from-gold-400/15 to-navy-900/40 px-4 py-10 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-400 text-navy-950">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="m5 12 5 5L20 7" />
            </svg>
          </div>
          <p className="font-display mt-5 text-2xl text-white">Ausschreibung versendet</p>
          <p className="mt-2 max-w-sm text-sm text-white/65">
            An 4 Gesellschaften zugestellt. Der Broker startet den nächsten Fall – ohne Medienbruch.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-[11px] text-white/70">
            {["AXA", "Zurich", "Helvetia", "Mobiliar"].map((name) => (
              <span key={name} className="rounded-full border border-white/15 bg-white/5 px-3 py-1">
                {name} ✓
              </span>
            ))}
          </div>
        </div>
      );
  }
}
