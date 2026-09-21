export const site = {
  name: "Broker Vision",
  legalName: "Broker Vision GmbH",
  tagline: "Digitale Klarheit für Broker.",
  description:
    "Broker Vision entwickelt digitale Lösungen für unabhängige Versicherungs- und Finanzbroker in der Schweiz.",
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
  { href: "/ueber-uns/", label: "Über uns" },
  { href: "/loesungen/", label: "Lösungen" },
  { href: "/kontakt/", label: "Kontakt" },
] as const;

export const solutions = [
  {
    slug: "portfolio",
    title: "Portfolio & Mandatsüberblick",
    excerpt:
      "Ein klarer Blick auf Mandate, Policen und Beziehungen – damit Beratung auf vollständigen Informationen basiert.",
    details:
      "Broker arbeiten mit komplexen Beständen über mehrere Gesellschaften hinweg. Wir strukturieren diese Daten so, dass Teams jederzeit wissen, was gilt, was ausläuft und wo Handlungsbedarf besteht.",
  },
  {
    slug: "prozesse",
    title: "Prozesse & Workflows",
    excerpt:
      "Vom Erstgespräch bis zur Policierung: nachvollziehbare Abläufe statt verstreuter E-Mails und Tabellen.",
    details:
      "Wir digitalisieren wiederkehrende Schritte im Brokeralltag – Aufgaben, Fristen, Dokumente und Freigaben – und halten sie prüfbar. Weniger Reibung intern, mehr Zeit beim Kunden.",
  },
  {
    slug: "integrationen",
    title: "Integrationen & Datenaustausch",
    excerpt:
      "Anbindungen an bestehende Systeme, damit Informationen nicht in Silos liegen bleiben.",
    details:
      "Schnittstellen zu CRM, Dokumentenablage und Branchensystemen reduzieren Doppelspurigkeiten. Daten fliessen dorthin, wo sie gebraucht werden – sicher und nachvollziehbar.",
  },
  {
    slug: "entwicklung",
    title: "Individuelle Softwareentwicklung",
    excerpt:
      "Massgeschneiderte Anwendungen, wenn Standardprodukte den Beratungsprozess nicht abbilden.",
    details:
      "Jedes Brokerhaus arbeitet anders. Wir entwickeln fokussierte Werkzeuge um eure bestehenden Prozesse herum – nicht umgekehrt. Von der Idee über Prototyp bis zum produktiven Betrieb.",
  },
] as const;

export const values = [
  {
    title: "Präzision",
    text: "In Versicherung und Vorsorge zählt jedes Detail. Unsere Lösungen sind darauf ausgelegt, Komplexität zu ordnen, nicht zu verdecken.",
  },
  {
    title: "Unabhängigkeit",
    text: "Wir bauen Werkzeuge für unabhängige Broker – ohne Vertriebsdruck, mit klarem Fokus auf den Mandatsalltag.",
  },
  {
    title: "Langfristigkeit",
    text: "Software soll über Jahre tragen. Wir setzen auf nachvollziehbare Architektur, ruhige Oberflächen und Partnerschaft auf Augenhöhe.",
  },
] as const;
