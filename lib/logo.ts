export const brandColors = {
  navy: "#0B1F3A",
  gold: "#C9A45C",
  white: "#FFFFFF",
  paper: "#F7F5F0",
} as const;

export type MarkTone = "light" | "dark";

export function markColors(inverted: boolean) {
  return {
    primary: inverted ? brandColors.white : brandColors.navy,
    gold: brandColors.gold,
  };
}

export const concepts = [
  {
    id: "blickfeld",
    number: "01",
    name: "Blickfeld",
    direction: "Vision / Orientierung",
    summary:
      "Ein Ursprung, drei Strahlen, ein Horizontbogen. Überblick, Richtung und Navigation – der Blick nach vorn, ohne Ornament.",
  },
  {
    id: "konnex",
    number: "02",
    name: "Konnex",
    direction: "Vernetzung",
    summary:
      "Drei Pole um ein goldenes Zentrum. Menschen, Prozesse und Technologie laufen in einem Punkt zusammen – der Broker als Verbindungsstück.",
  },
  {
    id: "versatz",
    number: "03",
    name: "Versatz",
    direction: "Transformation",
    summary:
      "Zwei Quadrate, bewusst verschoben. Der nächste Zustand liegt nicht übereinander, sondern versetzt – Digitalisierung als Bewegung.",
  },
  {
    id: "register",
    number: "04",
    name: "Register",
    direction: "Präzision",
    summary:
      "Passkreuze und ein ruhender Punkt. Spezifikation, Prüfung, Kontrolle – das Zeichen für Massarbeit statt Dekoration.",
  },
  {
    id: "synthese",
    number: "05",
    name: "Synthese",
    direction: "Intelligentes System",
    summary:
      "Quadrat (Struktur, Technologie) und Kreis (Wissen, Beratung) überlagern sich. Die goldene Schnittmenge ist der Kern.",
  },
] as const;
