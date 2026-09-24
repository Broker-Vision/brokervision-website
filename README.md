# Broker Vision

Vorläufige Firmenwebseite der **Broker Vision GmbH**, Aarau.

## Seiten

- Startseite `/`
- Über uns `/ueber-uns`
- Lösungen `/loesungen`
- Kontakt `/kontakt`
- Marke `/marke` – finale Marke Feld und verworfene Entwürfe
- Impressum `/impressum`
- Datenschutz `/datenschutz`

## Logo

Offizielle Marke: Variante **Feld** (Weit mit goldenem Innenraum).

Dateien unter `public/brand/`:

- `logo-mark.svg` / `logo-mark-inverted.svg`
- `favicon-32.svg`
- `app-icon.svg` / `apple-touch-icon.svg`
- `og-image.png` – Open Graph / Social Preview

Weitere Weit-Entwürfe bleiben unter `/marke` als verworfene Varianten dokumentiert.

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
