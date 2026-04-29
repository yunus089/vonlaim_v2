# Deployment-Runbook für vonLaim

Dieses Runbook ist für den ersten Livegang auf `https://www.vonlaim.de` vorbereitet.

## 1. Server-Voraussetzungen

- Ubuntu Server auf dem Hostinger KVM
- DNS zeigt auf die öffentliche Server-IP:
  - `A` Record für `vonlaim.de`
  - `A` Record für `www.vonlaim.de`
- Firewall:
  - SSH offen
  - HTTP `80` offen
  - HTTPS `443` offen
  - Datenbank-Port nicht öffentlich freigeben
- Docker und Docker Compose installiert

## 2. Produktions-Secrets erzeugen

Lokal oder auf dem Server:

```bash
npm run secrets:generate
```

Die ausgegebenen Werte in die Server-`.env` übernehmen. Nicht committen.

## 3. Server-`.env`

Auf dem Server im Projektordner eine `.env` anlegen:

```env
POSTGRES_PASSWORD=...
DATABASE_URL=postgres://vonlaim:...@postgres:5432/vonlaim
APP_URL=https://www.vonlaim.de
SESSION_SECRET=...
ADMIN_EMAIL=admin@vonlaim.de
ADMIN_PASSWORD=...
CONTACT_EMAIL=kontakt@vonlaim.de
```

Wichtig:

- `POSTGRES_PASSWORD` im `DATABASE_URL` identisch verwenden.
- `SESSION_SECRET` mindestens 32 Zeichen.
- `ADMIN_PASSWORD` nicht das lokale Seed-Passwort verwenden.

## 4. Preflight

Vor dem Start:

```bash
npm run deploy:preflight
docker compose config --quiet
npm run typecheck
npm run build
```

## 5. Container starten

```bash
docker compose --profile production up -d --build
```

Status prüfen:

```bash
docker compose ps
docker compose logs -f web
docker compose logs -f caddy
```

## 6. Datenbank vorbereiten

Im laufenden Web-Container:

```bash
docker compose exec web npm run db:migrate
docker compose exec web npm run db:seed
```

Danach Admin öffnen:

```text
https://www.vonlaim.de/admin
```

## 7. Live-Checks

Im Browser prüfen:

- Startseite lädt ohne sichtbare Fehler.
- Mobile Header und Sticky-Kontakt funktionieren.
- `/leistungen`, `/warum-vonlaim`, `/blog`, `/faq`, `/kontakt` laden.
- `/impressum`, `/datenschutz`, `/cookies` laden.
- `/robots.txt`, `/sitemap.xml`, `/llms.txt` erreichbar.
- Kontaktformular speichert eine Anfrage und leitet auf `/danke`.
- `/admin` leitet ohne Login auf `/admin/login`.
- Login mit Produktionsdaten funktioniert.

## 8. Nach dem Launch

Empfohlen direkt nach Livegang:

- Google Search Console einrichten.
- Bing Webmaster Tools einrichten.
- Sitemap einreichen.
- Uptime-Monitoring aktivieren.
- Regelmäßige Backups für Postgres und Uploads einrichten.
- SMTP-Benachrichtigung oder anderes Lead-Alerting ergänzen.
- Einfaches Rate-Limiting/Spam-Konzept bei höherem Traffic weiter ausbauen.

## 9. Rollback

Wenn der neue Stand nicht sauber läuft:

```bash
docker compose logs --tail=200 web
docker compose logs --tail=200 caddy
docker compose down
```

Bei Datenbankproblemen zuerst keine Volumes löschen. `postgres16_data` enthält die Live-Daten.
