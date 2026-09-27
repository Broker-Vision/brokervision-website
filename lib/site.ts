export const site = {
  name: "Broker Vision",
  legalName: "Broker Vision GmbH",
  tagline: "Menschen sollen beraten. Software soll arbeiten.",
  headline: "Der digitale Arbeitsplatz für Versicherungsbroker.",
  subheadline: "Weniger Administration. Mehr Beratung.",
  description:
    "Broker Vision – der digitale Arbeitsplatz für Versicherungsbroker. Weniger Administration, automatische Datenerfassung, schnellere Ausschreibungen.",
  url: "https://brokervision.ch",
  address: {
    street: "Furorastrasse 1a",
    zip: "5032",
    city: "Aarau Rohr",
    country: "Schweiz",
  },
  email: "info@brokervision.ch",
  uid: "CHE-270.690.907",
  managingDirector: "Christian Michel",
} as const;

export const navigation = [
  { href: "/", label: "Startseite" },
  { href: "/demo/", label: "Demo", prominent: true },
  { href: "/plattform/", label: "Plattform" },
  { href: "/ueber-uns/", label: "Über uns" },
  { href: "/kontakt/", label: "Kontakt" },
] as const;

/** Platform modules – sold as one platform, not standalone products. */
export const platformModules = [
  {
    slug: "offerten",
    title: "Offerten",
    excerpt: "Schnellere Ausschreibungen – vorbereitet aus erkannten Daten.",
    details:
      "Dokumente erfassen, Daten übernehmen, Ausschreibungen versenden. Der Broker behält die Kontrolle.",
  },
  {
    slug: "crm",
    title: "CRM",
    excerpt: "Kunden und Mandate im Brokerkontext – nicht als generisches CRM.",
    details:
      "Kunden, Gesellschaften und Vorgänge an einem Ort. Überblick ohne Tool-Wechsel.",
  },
  {
    slug: "workflow",
    title: "Workflow",
    excerpt: "Weniger E-Mail-Pingpong. Klare Abläufe im Team.",
    details:
      "Fristen, Zuständigkeiten und Freigaben nachvollziehbar – automatisch geführt.",
  },
  {
    slug: "ocr",
    title: "OCR & Analyse",
    excerpt: "Automatische Datenerfassung aus Policen und Formularen.",
    details:
      "Dokumente analysieren, Felder erkennen, Folgeprozesse vorbereiten – inkl. KI wo sinnvoll.",
  },
  {
    slug: "dokumente",
    title: "Dokumente",
    excerpt: "Alles zum Mandat – findbar und verknüpft.",
    details:
      "Geordnete Ablage rund um Mandate und Prozesse statt verstreuter Postfächer.",
  },
  {
    slug: "kundenportal",
    title: "Kundenportal",
    excerpt: "Geplant: digitaler Austausch mit Endkunden.",
    details:
      "In Vorbereitung – abgestimmt auf den Brokerprozess, nicht als isolierte App.",
    upcoming: true,
  },
] as const;

export const benefits = [
  {
    title: "Weniger Administration",
    text: "Wiederkehrende Arbeit übernimmt die Software.",
  },
  {
    title: "Mehr Zeit für Kunden",
    text: "Beratung statt Tipparbeit und Nachfasserei.",
  },
  {
    title: "Automatische Datenerfassung",
    text: "OCR liest Policen – Felder landen strukturiert im System.",
  },
  {
    title: "Schnellere Ausschreibungen",
    text: "Vom Dokument zum Versand in Minuten.",
  },
  {
    title: "Weniger Fehler",
    text: "Automatisierte Übernahme senkt manuelle Risiken.",
  },
  {
    title: "Mehr Wachstum, gleiches Team",
    text: "Mehr Volumen ohne proportional mehr Administration.",
  },
] as const;

export const values = [
  {
    title: "Branchenerfahrung",
    text: "Über 20 Jahre Versicherungsbranche und Brokergeschäft.",
  },
  {
    title: "Automatisierung",
    text: "Software arbeitet – Menschen beraten.",
  },
  {
    title: "Plattform",
    text: "Ein digitaler Arbeitsplatz statt Insellösungen.",
  },
] as const;
