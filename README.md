# Broker Vision

Vorläufige Firmenwebseite der **Broker Vision GmbH**, Aarau.

## Seiten

- Startseite `/`
- Über uns `/ueber-uns`
- Lösungen `/loesungen`
- Kontakt `/kontakt`
- Impressum `/impressum`
- Datenschutz `/datenschutz`
- Marke `/marke`

## Logo

SVG-Monogramm (BV-Ligatur) in Dunkelblau `#0B1F3A` und Gold `#C9A45C`.

Dateien unter `public/brand/`:

- `logo-mark.svg` – nur Symbol
- `logo-mark-on-light.svg` / `logo-mark-on-dark.svg`
- `logo-wordmark.svg` – Symbol + Broker Vision
- `logo-wordmark-on-light.svg` / `logo-wordmark-on-dark.svg`
- `favicon-32.svg`
- `app-icon.svg`

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
