# Broker Vision

Firmenwebseite der **Broker Vision GmbH**, Aarau – der digitale Arbeitsplatz für Versicherungsbroker.

## Seiten

- Startseite `/`
- Plattform `/plattform`
- Über uns `/ueber-uns`
- Kontakt `/kontakt`
- Marke `/marke` – finale Marke Feld (nicht in der Hauptnavigation)
- Impressum `/impressum`
- Datenschutz `/datenschutz`

## Positionierung

Broker Vision entwickelt digitale Lösungen für Versicherungsbroker, Finanzberater und Beratungsunternehmen in der Schweiz.

Leitsatz: **Menschen sollen beraten. Software soll arbeiten.**

## Logo

Offizielle Marke: Variante **Feld** (Weit mit goldenem Innenraum).

Dateien unter `public/brand/`:

- `logo-mark.svg` / `logo-mark-inverted.svg`
- `favicon-32.svg`
- `app-icon.svg` / `apple-touch-icon.svg`
- `og-image.png` – Open Graph / Social Preview

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
