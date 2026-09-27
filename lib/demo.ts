export type DemoStep = {
  id: string;
  title: string;
  status: string;
  benefit: string;
  durationMs: number;
};

/** Produktablauf der technischen Demo – Autoplay und Explore. */
export const demoSteps: DemoStep[] = [
  {
    id: "upload",
    title: "Police wird hochgeladen",
    status: "Upload",
    benefit: "Ein Dokument statt zehn E-Mails und Ordner.",
    durationMs: 1400,
  },
  {
    id: "ocr",
    title: "OCR analysiert das Dokument",
    status: "OCR",
    benefit: "Automatische Datenerfassung – ohne Tipparbeit.",
    durationMs: 1600,
  },
  {
    id: "client",
    title: "Kunde wird erkannt",
    status: "Erkennung",
    benefit: "Weniger Fehler bei Stammdaten und Mandaten.",
    durationMs: 1200,
  },
  {
    id: "insurer",
    title: "Gesellschaft wird erkannt",
    status: "Erkennung",
    benefit: "Bestand und Gesellschaft klar zugeordnet.",
    durationMs: 1200,
  },
  {
    id: "data",
    title: "Relevante Daten werden übernommen",
    status: "Übernahme",
    benefit: "Weniger Administration. Mehr Zeit für Kunden.",
    durationMs: 1400,
  },
  {
    id: "prepare",
    title: "Ausschreibung wird vorbereitet",
    status: "Vorbereitung",
    benefit: "Schnellere Ausschreibungen – versandfertig.",
    durationMs: 1400,
  },
  {
    id: "send",
    title: "Ausschreibung wird versendet",
    status: "Versand",
    benefit: "Mehr Wachstum mit gleichem Personalbestand.",
    durationMs: 1800,
  },
];
