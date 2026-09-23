# Broker Vision

Vorläufige Firmenwebseite der **Broker Vision GmbH**, Aarau.

## Seiten

- Startseite `/`
- Über uns `/ueber-uns`
- Lösungen `/loesungen`
- Kontakt `/kontakt`
- Marke `/marke` – fünf Logo-Konzepte zur Auswahl
- Impressum `/impressum`
- Datenschutz `/datenschutz`

## Logo-Konzepte

Unter `public/brand/concepts/` liegen fünf Verfeinerungen der Leitform **First** (kein Haus, keine Vernetzungspunkte, keine Buchstaben):

1. Massiv – reine Leitform
2. Spitze – Führung am First
3. Raum – Einheit unter dem Dach
4. Weit – Überblick
5. Kante – Ordnung

Farben: Dunkelblau `#0B1F3A`, Gold `#C9A45C`.

## Technik

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Statischer Export (`output: "export"`) für Azure Static Web Apps

## Lokal starten

```bash
npm install
npm run dev
```

Die Entwicklungsumgebung läuft unter [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Der statische Output liegt im Ordner `out/`.
