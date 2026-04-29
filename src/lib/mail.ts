import "server-only";

import nodemailer from "nodemailer";

type LeadNotificationInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  serviceInterest: string;
  message: string;
};

function smtpReady() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD &&
      process.env.SMTP_FROM &&
      process.env.CONTACT_EMAIL
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendLeadNotification(input: LeadNotificationInput) {
  if (!smtpReady()) {
    console.warn("Lead-Mail nicht versendet: SMTP-Konfiguration fehlt.");
    return { ok: false, skipped: true };
  }

  const port = Number(process.env.SMTP_PORT);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

  const subject = `Neue Website-Anfrage: ${input.company || input.name}`;
  const replyTo = input.email;
  const text = [
    "Neue Anfrage über vonlaim.de",
    "",
    `Name: ${input.name}`,
    `Betrieb: ${input.company || "-"}`,
    `E-Mail: ${input.email}`,
    `Telefon: ${input.phone || "-"}`,
    `Interesse: ${input.serviceInterest || "-"}`,
    "",
    input.message
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.55;color:#121417">
      <h1 style="font-size:22px;margin:0 0 16px">Neue Anfrage über vonlaim.de</h1>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:680px">
        <tr><td style="padding:8px 0;font-weight:700">Name</td><td>${escapeHtml(input.name)}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700">Betrieb</td><td>${escapeHtml(input.company || "-")}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700">E-Mail</td><td>${escapeHtml(input.email)}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700">Telefon</td><td>${escapeHtml(input.phone || "-")}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700">Interesse</td><td>${escapeHtml(input.serviceInterest || "-")}</td></tr>
      </table>
      <h2 style="font-size:18px;margin:24px 0 8px">Nachricht</h2>
      <pre style="white-space:pre-wrap;font-family:Arial,sans-serif;background:#f5f5f2;border:1px solid #deded7;border-radius:8px;padding:16px">${escapeHtml(input.message)}</pre>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.CONTACT_EMAIL,
    replyTo,
    subject,
    text,
    html
  });

  return { ok: true, skipped: false };
}
