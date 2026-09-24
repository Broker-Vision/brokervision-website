import localFont from "next/font/local";

export const fontInter = localFont({
  src: [
    { path: "../public/fonts/inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/inter-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/inter-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/inter-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const fontManrope = localFont({
  src: [
    { path: "../public/fonts/manrope-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/manrope-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/manrope-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/manrope-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
});

export const fontJakarta = localFont({
  src: [
    {
      path: "../public/fonts/plus-jakarta-sans-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/plus-jakarta-sans-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/plus-jakarta-sans-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/plus-jakarta-sans-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-jakarta",
  display: "swap",
});

export const fontCandidates = [
  {
    id: "inter",
    name: "Inter",
    className: "font-candidate-inter",
    summary:
      "Neutrale SaaS-Standardschrift. Klar, effizient, breit etabliert – wirkt professionell, aber weniger eigenständig.",
  },
  {
    id: "manrope",
    name: "Manrope",
    className: "font-candidate-manrope",
    summary:
      "Weichere geometrische Sans. Modern und zugänglich, mit etwas mehr Charakter für vertrauenswürdige Markenauftritte.",
  },
  {
    id: "jakarta",
    name: "Plus Jakarta Sans",
    className: "font-candidate-jakarta",
    summary:
      "Zeitgemässe Produkt-Sans. Präzise und hochwertig – oft gewählt für etablierte Software- und Plattformmarken.",
  },
] as const;
