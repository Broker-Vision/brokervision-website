# Kontaktformular – Azure Functions + Microsoft Graph

## Überblick

```
Browser (Turnstile)
  → POST /api/contact (Azure Function)
    → Cloudflare Turnstile siteverify
    → Validierung + Rate-Limit
    → Azure Table Storage (ContactInquiries)
    → optional: Microsoft Graph sendMail → info@brokervision.ch
```

Kein SMTP. Keine Drittanbieter-Mailrelay. Mailversand nur über Microsoft Graph.

## Azure Application Settings

| Variable | Zweck |
|---|---|
| `CONTACT_TURNSTILE_SITE_KEY` | Öffentlicher Turnstile Site Key |
| `CONTACT_TURNSTILE_SECRET_KEY` | Geheimer Turnstile Key |
| `CONTACT_STORAGE_CONNECTION_STRING` | Azure Storage Connection String (sonst `AzureWebJobsStorage`) |
| `CONTACT_TABLE_NAME` | Tabellenname, Default `ContactInquiries` |
| `CONTACT_RATE_LIMIT_WINDOW_MS` | Zeitfenster Rate-Limit (Default 60000) |
| `CONTACT_RATE_LIMIT_MAX` | Max. Requests / Fenster / IP (Default 5) |
| `CONTACT_MAIL_ENABLED` | `true` aktiviert Graph-Mail |
| `GRAPH_TENANT_ID` | Entra ID Tenant |
| `GRAPH_CLIENT_ID` | App Registration Client ID |
| `GRAPH_CLIENT_SECRET` | App Registration Secret |
| `GRAPH_MAIL_FROM` | Absender-Mailbox (z. B. info@brokervision.ch) |
| `GRAPH_MAIL_TO` | Empfänger (z. B. info@brokervision.ch) |

## Microsoft Graph vorbereiten

1. Entra ID App Registration erstellen
2. Application permission `Mail.Send` erteilen und Admin Consent
3. App darf als `GRAPH_MAIL_FROM` senden (Mailbox-Zugriff)
4. Secrets in SWA/Function App Settings hinterlegen
5. `CONTACT_MAIL_ENABLED=true` setzen

Ohne Mail-Flag werden Anfragen trotzdem gespeichert (`mailStatus=disabled`).

## Cloudflare Turnstile

1. Widget im Cloudflare Dashboard erstellen
2. Site Key + Secret Key in Application Settings setzen
3. Domain(s) freigeben (inkl. `*.azurestaticapps.net` für Tests)

## Test

```bash
curl -s https://<host>/api/contact
curl -s -X POST https://<host>/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"...","email":"...","interest":"Allgemeine Anfrage","message":"...","privacyAccepted":true,"website":"","openedAt":1234567890123,"turnstileToken":"..."}'
```
