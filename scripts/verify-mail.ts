import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import nodemailer from "nodemailer";

function loadLocalEnv() {
  const filePath = path.join(process.cwd(), ".env");
  if (!existsSync(filePath)) return;

  const lines = readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (!process.env[key]) {
      process.env[key] = rest.join("=").replace(/^["']|["']$/g, "");
    }
  }
}

loadLocalEnv();

const port = Number(process.env.SMTP_PORT || 465);
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: port === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  },
  tls: {
    servername: process.env.SMTP_HOST
  }
});

transporter
  .verify()
  .then(() => {
    console.log("SMTP-Verbindung erfolgreich.");
  })
  .catch((error) => {
    console.error("SMTP-Verbindung fehlgeschlagen.");
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
