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

## Typografie

Website-Schrift: **Inter** (Google Fonts).

Logo und Wortmarke bleiben davon unabhängig und unverändert.

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
- Kontakt-API vorbereitet unter `api/contact` (Azure Functions)

### Kontaktformular (produktiv vorbereitet)

- Cloudflare Turnstile (Client + serverseitige Prüfung)
- Azure Function `POST /api/contact` mit Validierung und Rate-Limiting
- Speicherung in Azure Table Storage
- Microsoft Graph Mail an `chris@brokervision.ch` (aktivierbar via `CONTACT_MAIL_ENABLED=true`)
- Kein SMTP, keine provisorischen Mailversender
- Setup: `docs/contact-api.md` und `.env.example`

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
