export const brandColors = {
  navy: "#0B1F3A",
  gold: "#C9A45C",
  white: "#FFFFFF",
  paper: "#F7F5F0",
} as const;

export function markColors(inverted: boolean) {
  return {
    primary: inverted ? brandColors.white : brandColors.navy,
    gold: brandColors.gold,
  };
}

/** Filled chevron / roof peak. Thickness `t` is the horizontal foot width. */
export function chevronPath(
  cx: number,
  top: number,
  bottom: number,
  half: number,
  t: number,
): string {
  const innerTop = top + (t / half) * (bottom - top);
  const innerHalf = half - t;
  return [
    `M${cx} ${top}`,
    `L${cx + half} ${bottom}`,
    `L${cx + innerHalf} ${bottom}`,
    `L${cx} ${innerTop}`,
    `L${cx - innerHalf} ${bottom}`,
    `L${cx - half} ${bottom}`,
    "Z",
  ].join(" ");
}

export const concepts = [
  {
    id: "first",
    number: "01",
    name: "First",
    direction: "Leitform",
    summary:
      "Ein massives Dachdreieck, unten offen. Führung und Überblick als reine Silhouette – stark genug für ein App-Icon.",
  },
  {
    id: "giebel",
    number: "02",
    name: "Giebel",
    direction: "Orientierung",
    summary:
      "Zwei Schenkel, ein goldener Firstpunkt. Konstruktion statt Haus: Richtung, Klarheit, das Mass der Linie.",
  },
  {
    id: "kanzel",
    number: "03",
    name: "Kanzel",
    direction: "Alles unter einem Dach",
    summary:
      "Ein Schutzdach schwebt über drei Polen. Broker, Versicherer und Technologie – orchestriert, nicht bloss verbunden.",
  },
  {
    id: "schicht",
    number: "04",
    name: "Schicht",
    direction: "Struktur",
    summary:
      "Zwei ineinander liegende Dachdreiecke. Die innere Goldlinie ist die gemeinsame Ordnung unter der äusseren Form.",
  },
  {
    id: "bumerang",
    number: "05",
    name: "Bumerang",
    direction: "Schutzdach",
    summary:
      "Ein flaches, weites Chevron. Weniger Spitze, mehr Klammer: ein modernes Dach, das spannt und hält.",
  },
] as const;
