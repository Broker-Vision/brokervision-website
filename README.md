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

Unter `public/brand/concepts/` liegen fünf Dachdreieck-Varianten (keine Häuser, keine Buchstaben):

1. First – Leitform
2. Giebel – Orientierung
3. Kanzel – alles unter einem Dach
4. Schicht – Struktur
5. Bumerang – Schutzdach

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
