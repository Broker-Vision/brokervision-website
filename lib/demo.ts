export type DemoFrame = {
  id: string;
  title: string;
  caption: string;
  src: string;
  durationMs: number;
};

/** Echte Plattform-Screenshots unter /public/demo/ */
export const demoFrames: DemoFrame[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    caption: "Der digitale Arbeitsplatz auf einen Blick.",
    src: "/demo/01-dashboard.webp",
    durationMs: 3200,
  },
  {
    id: "upload",
    title: "Police hochladen",
    caption: "Dokument erfassen – ohne Medienbruch.",
    src: "/demo/02-upload.webp",
    durationMs: 3000,
  },
  {
    id: "analyse",
    title: "Analyse",
    caption: "OCR und Dokumentenanalyse laufen automatisch.",
    src: "/demo/03-analyse.webp",
    durationMs: 3400,
  },
  {
    id: "daten",
    title: "Daten erkannt",
    caption: "Kunde, Gesellschaft und Vertragsdaten strukturiert.",
    src: "/demo/04-daten.webp",
    durationMs: 3200,
  },
  {
    id: "ausschreibung",
    title: "Ausschreibung",
    caption: "Ausschreibung wird aus erkannten Daten vorbereitet.",
    src: "/demo/05-ausschreibung.webp",
    durationMs: 3200,
  },
  {
    id: "ergebnis",
    title: "Ergebnis",
    caption: "Versandfertig – der Broker behält die Kontrolle.",
    src: "/demo/06-ergebnis.webp",
    durationMs: 3600,
  },
];
