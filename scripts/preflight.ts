import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

type Check = {
  name: string;
  ok: boolean;
  detail: string;
};

const root = process.cwd();
const envPath = path.join(root, ".env");

function parseEnvFile(filePath: string) {
  const values = new Map<string, string>();
  if (!existsSync(filePath)) return values;

  const lines = readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    values.set(key, rest.join("=").replace(/^["']|["']$/g, ""));
  }
  return values;
}

const envFile = parseEnvFile(envPath);

function env(key: string) {
  return process.env[key] ?? envFile.get(key) ?? "";
}

function isPlaceholder(value: string) {
  return /replace-with|change-this|changeme|localhost|vonlaim:vonlaim/i.test(value);
}

const appUrl = env("APP_URL");
const databaseUrl = env("DATABASE_URL");
const sessionSecret = env("SESSION_SECRET");
const adminEmail = env("ADMIN_EMAIL");
const adminPassword = env("ADMIN_PASSWORD");
const postgresPassword = env("POSTGRES_PASSWORD");
const contactEmail = env("CONTACT_EMAIL");
const smtpHost = env("SMTP_HOST");
const smtpPort = env("SMTP_PORT");
const smtpUser = env("SMTP_USER");
const smtpPassword = env("SMTP_PASSWORD");
const smtpFrom = env("SMTP_FROM");

const checks: Check[] = [
  {
    name: ".env vorhanden",
    ok: existsSync(envPath),
    detail: existsSync(envPath) ? ".env gefunden" : ".env fehlt im Projekt-/Server-Root"
  },
  {
    name: "APP_URL",
    ok: appUrl === "https://www.vonlaim.de",
    detail: appUrl || "nicht gesetzt"
  },
  {
    name: "POSTGRES_PASSWORD",
    ok: postgresPassword.length >= 20 && !isPlaceholder(postgresPassword),
    detail: postgresPassword ? "gesetzt" : "nicht gesetzt"
  },
  {
    name: "DATABASE_URL",
    ok: databaseUrl.includes("@postgres:5432/vonlaim") && !isPlaceholder(databaseUrl),
    detail: databaseUrl ? "gesetzt" : "nicht gesetzt"
  },
  {
    name: "SESSION_SECRET",
    ok: sessionSecret.length >= 32 && !isPlaceholder(sessionSecret),
    detail: sessionSecret ? `${sessionSecret.length} Zeichen` : "nicht gesetzt"
  },
  {
    name: "ADMIN_EMAIL",
    ok: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail) && !adminEmail.endsWith(".local"),
    detail: adminEmail || "nicht gesetzt"
  },
  {
    name: "ADMIN_PASSWORD",
    ok: adminPassword.length >= 18 && !isPlaceholder(adminPassword),
    detail: adminPassword ? "gesetzt" : "nicht gesetzt"
  },
  {
    name: "CONTACT_EMAIL",
    ok: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail),
    detail: contactEmail || "nicht gesetzt"
  },
  {
    name: "SMTP_HOST",
    ok: Boolean(smtpHost) && !isPlaceholder(smtpHost),
    detail: smtpHost || "nicht gesetzt"
  },
  {
    name: "SMTP_PORT",
    ok: ["465", "587"].includes(smtpPort),
    detail: smtpPort || "nicht gesetzt"
  },
  {
    name: "SMTP_USER",
    ok: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(smtpUser),
    detail: smtpUser || "nicht gesetzt"
  },
  {
    name: "SMTP_PASSWORD",
    ok: smtpPassword.length >= 8 && !isPlaceholder(smtpPassword),
    detail: smtpPassword ? "gesetzt" : "nicht gesetzt"
  },
  {
    name: "SMTP_FROM",
    ok: smtpFrom.includes("@") && !isPlaceholder(smtpFrom),
    detail: smtpFrom || "nicht gesetzt"
  },
  {
    name: "Caddyfile Domain",
    ok:
      existsSync(path.join(root, "Caddyfile")) &&
      readFileSync(path.join(root, "Caddyfile"), "utf8").includes("www.vonlaim.de"),
    detail: "www.vonlaim.de / vonlaim.de erwartet"
  },
  {
    name: "Dockerfile",
    ok: existsSync(path.join(root, "Dockerfile")),
    detail: "Dockerfile erwartet"
  },
  {
    name: "docker-compose.yml",
    ok: existsSync(path.join(root, "docker-compose.yml")),
    detail: "docker-compose.yml erwartet"
  }
];

for (const check of checks) {
  console.log(`${check.ok ? "OK " : "FAIL"} ${check.name}: ${check.detail}`);
}

const failed = checks.filter((check) => !check.ok);
if (failed.length > 0) {
  console.error(`\nPreflight fehlgeschlagen: ${failed.length} Punkt(e) offen.`);
  process.exit(1);
}

console.log("\nPreflight erfolgreich. Die Produktionskonfiguration ist startklar.");
