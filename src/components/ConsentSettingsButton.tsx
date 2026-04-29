"use client";

export function ConsentSettingsButton() {
  return (
    <button
      className="footer-button-link"
      type="button"
      onClick={() => window.dispatchEvent(new Event("vonlaim-open-consent"))}
    >
      Cookie-Einstellungen
    </button>
  );
}
