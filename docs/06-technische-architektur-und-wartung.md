# Technische Architektur und Wartung

## Stack

- Next.js App Router
- React
- TypeScript
- PostgreSQL
- Node `pg`
- eigenes Auth-/Session-System
- eigene CMS-Oberfläche
- Docker Compose
- Caddy für Produktion vorbereitet

Quellen:

- Next.js Self-Hosting: https://nextjs.org/docs/app/guides/self-hosting
- Next.js Standalone Output: https://nextjs.org/docs/app/api-reference/config/next-config-js/output
- Docker Next.js Guide: https://docs.docker.com/guides/nextjs/containerize/

## Warum dieser Ansatz

vonLaim braucht:

- kontrollierte Inhaltsstruktur
- eigene Admin-Oberfläche
- keine WordPress-Abhängigkeit
- echte Datenbank
- saubere Deploybarkeit auf KVM
- spätere Erweiterbarkeit für Rollen, Medien, Branchen- und Regionseiten

Eine vollständig freie Pagebuilder-Struktur wurde bewusst vermieden, weil sie oft Layoutqualität, SEO-Struktur und Wartbarkeit schwächt.

## Datenbank

Migrationen:

- `db/migrations/001_init.sql`
- `db/migrations/002_cms_branch_region_analytics.sql`

Tabellen:

- `users`
- `sessions`
- `media`
- `posts`
- `services`
- `branch_pages`
- `region_pages`
- `projects`
- `testimonials`
- `faqs`
- `content_blocks`
- `site_settings`
- `leads`
- `analytics_events`

Migrationsbefehl:

```bash
npm run db:migrate
```

Seed:

```bash
npm run db:seed
```

Reset:

```bash
npm run db:reset
```

## Lokaler Start

1. `.env.example` nach `.env` kopieren.
2. PostgreSQL starten:

```bash
docker compose up -d postgres
```

3. Migration ausführen:

```bash
npm run db:migrate
```

4. Seed ausführen:

```bash
npm run db:seed
```

5. Dev-Server starten:

```bash
npm run dev
```

## Produktion auf Hostinger KVM

Empfohlen:

- Ubuntu Server
- Docker und Docker Compose
- Caddy als Reverse Proxy
- PostgreSQL im Container oder verwaltete DB
- externe Backups
- UFW Firewall
- SSH-Key Login
- Umgebungsvariablen außerhalb des Repos

Produktionsschritte:

1. Domain auf Server zeigen lassen.
2. `Caddyfile` mit finaler Domain und E-Mail anpassen.
3. `.env` auf dem Server mit starkem `POSTGRES_PASSWORD`, `SESSION_SECRET`, `ADMIN_EMAIL` und `ADMIN_PASSWORD` anlegen.
4. sichere Admin-Zugangsdaten setzen und niemals die lokalen Seed-Zugangsdaten verwenden.
5. `docker compose --profile production up -d --build`
6. Migrationen ausführen.
7. Seed nur initial oder kontrolliert ausführen.

## Auth

Aktuell:

- Admin-Login über E-Mail und Passwort
- bcrypt Hashing
- serverseitige Sessions
- HTTP-only Session-Cookie
- Session-Hash mit `SESSION_SECRET`

Nächste Ausbaustufen:

- Rate Limiting
- 2FA
- Rollen `admin`, `editor`, `client`
- Audit Log
- Admin-IP-Filter optional

## Medien

Aktuell:

- lokale Speicherung in `public/uploads`
- Medien-Metadaten in PostgreSQL
- Upload-Limit 6 MB
- erlaubte Typen: JPG, PNG, WebP, AVIF

Nächste Ausbaustufen:

- S3-kompatibler Storage
- automatische AVIF/WebP-Derivate
- Fokuspunkt
- Bildrechte/Copyright-Feld
- CDN

## Kontaktformular

Aktuell:

- Validierung mit Zod
- Speicherung in `leads`
- Weiterleitung zu `/danke`
- Honeypot-Feld gegen einfache Bots
- Feldlängenbegrenzung
- einfache Wiederholungsbremse pro E-Mail-Adresse
- Website-Check-Felder werden strukturiert in der Lead-Nachricht gespeichert

Nächste Ausbaustufen:

- E-Mail-Benachrichtigung via SMTP
- stärkeres Rate Limiting nach IP oder Edge-Middleware
- Rate Limiting
- Lead-Status
- Export
- Löschfunktion

## Backups

Empfohlen:

- tägliches `pg_dump`
- tägliches Media-Backup
- externe Kopie außerhalb des Servers
- Restore-Test mindestens quartalsweise

## Monitoring

Implementiert:

- internes First-party Analytics-Dashboard unter `/admin/analytics`
- Events nur nach Analytics-Einwilligung
- Seitenaufrufe, Sessions, Klicks, Scroll-Tiefe, Formularstart und Formularabsendung
- gehashte IP statt Klar-IP
- keine externen Tracking- oder Werbeskripte

Empfohlen:

- Uptime-Monitoring
- Server-RAM/CPU/Disk Monitoring
- Log-Rotation
- Error Tracking
- Search Console
- Bing Webmaster Tools
- Core Web Vitals Beobachtung

## Skalierung

Kurzfristig:

- weitere CMS-Felder
- SMTP
- weitere Branchen- und Regionseiten im CMS
- Projekt-Detailseiten

Mittelfristig:

- Rollen und Rechte
- S3 Storage
- Preview mit Draft Mode
- strukturiertes Page-Block-System
- mehrsprachige Struktur

Langfristig:

- Mandantenfähigkeit für Kundenprojekte
- Audit-Logs
- Workflow-Freigaben
- tieferes Analytics-Dashboard mit Zeitreihen und Export
