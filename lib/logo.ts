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

/** Open triangle under a roof (no base wall). */
export function openPeakPath(
  cx: number,
  top: number,
  bottom: number,
  half: number,
): string {
  return [`M${cx} ${top}`, `L${cx + half} ${bottom}`, `L${cx - half} ${bottom}`, "Z"].join(" ");
}

export const concepts = [
  {
    id: "massiv",
    number: "01",
    name: "Massiv",
    direction: "Leitform",
    summary:
      "Die reine First-Silhouette, etwas kräftiger und ikonischer. Führung und Überblick ohne Zusatz – die Marke ist das Dach.",
  },
  {
    id: "spitze",
    number: "02",
    name: "Spitze",
    direction: "Führung",
    summary:
      "Das Dach trägt, die Goldspitze markiert die übergeordnete Instanz. Ein Akzent oben – nicht Vernetzung unten.",
  },
  {
    id: "raum",
    number: "03",
    name: "Raum",
    direction: "Einheit",
    summary:
      "Unter dem Dach liegt ein goldenes Feld. Fachwissen, Prozesse und Technologie als ein Raum – geschlossen in der Form, offen nach unten.",
  },
  {
    id: "weit",
    number: "04",
    name: "Weit",
    direction: "Überblick",
    summary:
      "Breiter, flacher First. Mehr Spannweite: Überblick und Vertrauen statt steiler Spitze.",
  },
  {
    id: "kante",
    number: "05",
    name: "Kante",
    direction: "Ordnung",
    summary:
      "Massives Dach mit goldener Innenkante. Die Leitform bleibt dominant; die Kante hält den Raum darunter in Ordnung.",
  },
] as const;
