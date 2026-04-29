"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

type ConsentState = {
  essential: true;
  analytics: boolean;
  decidedAt: string;
};

const storageKey = "vonlaim-consent-v1";
const defaultConsent: ConsentState = {
  essential: true,
  analytics: false,
  decidedAt: ""
};

function readConsent(): ConsentState | null {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    return {
      essential: true,
      analytics: Boolean(parsed.analytics),
      decidedAt: parsed.decidedAt || ""
    };
  } catch {
    return null;
  }
}

function writeConsent(consent: ConsentState) {
  window.localStorage.setItem(storageKey, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent("vonlaim-consent-updated", { detail: consent }));
}

export function CookieConsent() {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith("/admin");
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    if (isAdminPath) {
      setOpen(false);
      return;
    }

    const saved = readConsent();
    setConsent(saved);
    setOpen(!saved);
    setAnalytics(saved?.analytics ?? false);

    const openSettings = () => {
      const current = readConsent();
      setConsent(current);
      setAnalytics(current?.analytics ?? false);
      setSettings(true);
      setOpen(true);
    };

    window.addEventListener("vonlaim-open-consent", openSettings);
    return () => window.removeEventListener("vonlaim-open-consent", openSettings);
  }, [isAdminPath]);

  const hasDecision = useMemo(() => Boolean(consent?.decidedAt), [consent]);

  function save(nextAnalytics: boolean) {
    const next: ConsentState = {
      essential: true,
      analytics: nextAnalytics,
      decidedAt: new Date().toISOString()
    };
    writeConsent(next);
    setConsent(next);
    setAnalytics(next.analytics);
    setOpen(false);
    setSettings(false);
  }

  if (isAdminPath) return null;

  if (!open) {
    return (
      <button
        className="privacy-fab"
        type="button"
        onClick={() => {
          setSettings(true);
          setOpen(true);
        }}
      >
        Datenschutz
      </button>
    );
  }

  return (
    <div className="consent-shell" role="region" aria-label="Cookie- und Datenschutzeinstellungen">
      <div className="consent-panel">
        <div>
          <span className="eyebrow">Datenschutz</span>
          <h2>Cookies und Analytics einstellen</h2>
          <p>
            Wir nutzen technisch notwendige Funktionen für den Betrieb der Website.
            Optionale Analytics helfen uns zu verstehen, welche Seiten und Kontaktwege
            funktionieren. Analytics startet erst nach Ihrer Zustimmung.
          </p>
        </div>

        {settings ? (
          <div className="consent-settings">
            <label className="consent-row">
              <span>
                <strong>Notwendige Funktionen</strong>
                <small>Erforderlich für Sicherheit, Admin-Login und die gewählte Datenschutzeinstellung.</small>
              </span>
              <input type="checkbox" checked disabled />
            </label>
            <label className="consent-row">
              <span>
                <strong>First-party Analytics</strong>
                <small>Erfasst Seitenaufrufe, Klicks und Formularinteraktionen pseudonymisiert für die Website-Optimierung.</small>
              </span>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
              />
            </label>
          </div>
        ) : null}

        <div className="consent-actions">
          <button className="btn btn-accent consent-choice" type="button" onClick={() => save(false)}>
            Ablehnen
          </button>
          <button className="btn btn-secondary" type="button" onClick={() => setSettings((value) => !value)}>
            Einstellungen
          </button>
          <button className="btn btn-accent consent-choice" type="button" onClick={() => save(settings ? analytics : true)}>
            {settings ? "Auswahl speichern" : "Akzeptieren"}
          </button>
        </div>
        <p className="muted">
          Sie können Ihre Auswahl jederzeit über „Datenschutz“ ändern.
          {hasDecision ? " Ihre bisherige Auswahl wurde geladen." : ""}
        </p>
      </div>
    </div>
  );
}
