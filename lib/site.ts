export const site = {
  name: "Broker Vision",
  legalName: "Broker Vision GmbH",
  tagline: "Menschen sollen beraten. Software soll arbeiten.",
  headline: "Der digitale Arbeitsplatz für Versicherungsbroker.",
  subheadline: "Weniger Administration. Mehr Beratung.",
  description:
    "Broker Vision entwickelt digitale Lösungen für Versicherungsbroker, Finanzberater und Beratungsunternehmen in der Schweiz. Entstanden aus über 20 Jahren Erfahrung in der Versicherungsbranche und fundierter Praxis im Brokergeschäft.",
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
  { href: "/plattform/", label: "Plattform" },
  { href: "/ueber-uns/", label: "Über uns" },
  { href: "/kontakt/", label: "Kontakt" },
] as const;

/** Platform modules – sold as one platform, not standalone products. */
export const platformModules = [
  {
    slug: "offerten",
    title: "Broker Vision Offerten",
    excerpt:
      "Offerten und Ausschreibungen strukturiert vorbereiten, prüfen und versenden – ohne Medienbrüche.",
    details:
      "Dokumente werden erfasst, Daten vorbereitet und Ausschreibungen effizient erstellt. Der Broker behält die Kontrolle, die Software übernimmt die repetitive Arbeit.",
  },
  {
    slug: "crm",
    title: "Broker Vision CRM",
    excerpt:
      "Beziehungen, Mandate und Kontakte im Kontext des Brokeralltags – nicht als generisches CRM.",
    details:
      "Kunden, Gesellschaften und Vorgänge an einem Ort. So bleibt der Überblick über Bestände und Beratungshandlungen erhalten, ohne dass Teams zwischen Werkzeugen springen müssen.",
  },
  {
    slug: "workflow",
    title: "Broker Vision Workflow-Automatisierung",
    excerpt:
      "Wiederkehrende Abläufe digitalisieren und automatisieren – von der Aufgabe bis zur Freigabe.",
    details:
      "Fristen, Zuständigkeiten und Schritte werden nachvollziehbar geführt. Weniger E-Mail-Pingpong, mehr klar definierte Prozesse im Team.",
  },
  {
    slug: "ocr",
    title: "Broker Vision OCR & Dokumentenanalyse",
    excerpt:
      "Policen, Offerten und Formulare automatisch auslesen und strukturieren – inkl. KI-gestützter Erkennung wo sinnvoll.",
    details:
      "Dokumente werden analysiert, relevante Daten erkannt und für Folgeprozesse aufbereitet. KI unterstützt die Dokumentenanalyse und Automatisierung – ohne leere Marketingversprechen.",
  },
  {
    slug: "dokumente",
    title: "Broker Vision Dokumentenmanagement",
    excerpt:
      "Dokumente sicher ablegen, finden und mit Vorgängen verknüpfen.",
    details:
      "Statt verstreuter Ablagen und Postfächer entsteht eine geordnete Dokumentenlage rund um Mandate und Prozesse – revisionssicher und im Alltag nutzbar.",
  },
  {
    slug: "kundenportal",
    title: "Kundenportal",
    excerpt:
      "Geplantes Modul für den direkten, digitalen Austausch mit Endkunden.",
    details:
      "In Vorbereitung: ein Kundenportal, das Beratung und Service über die Plattform hinweg ergänzt – abgestimmt auf den Brokerprozess, nicht als isolierte App.",
    upcoming: true,
  },
] as const;

export const challenges = [
  "manuellen Arbeiten",
  "administrativen Tätigkeiten",
  "Dokumentenflut",
  "E-Mails",
  "Medienbrüchen",
  "fehlender Automatisierung",
] as const;

export const benefits = [
  {
    title: "Administration reduzieren",
    text: "Wiederkehrende Tätigkeiten wandern in die Software – Teams gewinnen Raum für echte Beratung.",
  },
  {
    title: "Mehr Zeit für Kunden",
    text: "Weniger Tipparbeit und Nachfasserei, mehr Gespräch und Betreuung.",
  },
  {
    title: "Prozesse vereinfachen",
    text: "Klare Abläufe statt Medienbrüche zwischen Postfach, Tabellen und Insellösungen.",
  },
  {
    title: "Fehler reduzieren",
    text: "Automatisierte Erfassung und strukturierte Formulare senken das Risiko manueller Fehler.",
  },
  {
    title: "Wachstum mit gleichem Personalbestand",
    text: "Mehr Volumen bewältigen, ohne proportional mehr Administrative aufzubauen.",
  },
  {
    title: "Servicequalität verbessern",
    text: "Schnellere Durchlaufzeiten und nachvollziehbare Vorgänge stärken den Kundenservice.",
  },
] as const;

export const actionSteps = [
  "Police wird hochgeladen",
  "OCR analysiert das Dokument",
  "Kunde wird erkannt",
  "Gesellschaft wird erkannt",
  "Relevante Daten werden übernommen",
  "Ausschreibung wird vorbereitet",
  "Ausschreibung wird versendet",
] as const;

export const values = [
  {
    title: "Branchenerfahrung",
    text: "Über 20 Jahre in der Versicherungsbranche und fundierte Praxis im Brokergeschäft prägen Produkt und Prioritäten.",
  },
  {
    title: "Automatisierung",
    text: "Viele Systeme verwalten Daten. Broker Vision automatisiert Arbeit – damit Software den Alltag trägt.",
  },
  {
    title: "Plattformdenken",
    text: "Module greifen ineinander: Offerten, CRM, Workflows, Dokumente und Analyse als ein digitaler Arbeitsplatz.",
  },
] as const;
