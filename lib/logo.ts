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

/**
 * Final Weit refinements – subtle differences only.
 * Base reference: wide shallow First (Überblick).
 */
export const concepts = [
  {
    id: "horizont",
    number: "01",
    name: "Horizont",
    direction: "Basis",
    summary:
      "Die ausgewogene Weit-Silhouette. Breite und Winkel im Gleichgewicht – Überblick als ruhige Leitform.",
  },
  {
    id: "neigung",
    number: "02",
    name: "Neigung",
    direction: "Winkel",
    summary:
      "Etwas steilerer First bei gleicher Spannweite. Mehr Führung in der Silhouette, ohne steil zu werden.",
  },
  {
    id: "spannweite",
    number: "03",
    name: "Spannweite",
    direction: "Breite",
    summary:
      "Noch etwas breiter und flacher. Maximale Weite – Überblick und Vertrauen als dominante Geste.",
  },
  {
    id: "linie",
    number: "04",
    name: "Linie",
    direction: "Goldakzent",
    summary:
      "Weit mit goldener Innenkante. Das Dach bleibt dominant; die Linie ordnet den Raum darunter.",
  },
  {
    id: "feld",
    number: "05",
    name: "Feld",
    direction: "Innenraum",
    summary:
      "Weit mit goldener Fläche im Innenraum. Fachwissen, Prozesse und Technologie als ein Feld unter dem Dach.",
  },
] as const;
