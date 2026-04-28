import type { CSSProperties } from "react";

const motionCards = [
  {
    kicker: "01 / Gefunden",
    title: "Webdesign für Elektriker in Bayern",
    text: "Suchintention, Region und Leistung werden sofort klar."
  },
  {
    kicker: "02 / Verstanden",
    title: "Leistungen, Vertrauen, Kontakt",
    text: "Besucher sehen in Sekunden, ob der Betrieb passt."
  },
  {
    kicker: "03 / Angefragt",
    title: "Telefon, Formular, Erstgespräch",
    text: "Der nächste Schritt liegt sichtbar im Blickfeld."
  }
];

const steps = ["Suche", "Website", "Vertrauen", "Anfrage"];

export function HeroMotionBackdrop() {
  return (
    <div className="hero-motion-backdrop" aria-hidden="true">
      <div className="hero-motion-grid" />
      <div className="hero-motion-grid hero-motion-grid-fine" />
      <div className="hero-motion-scan" />
      <div className="hero-motion-beam hero-motion-beam-one" />
      <div className="hero-motion-beam hero-motion-beam-two" />

      <svg className="hero-motion-map" viewBox="0 0 780 420">
        <path className="motion-path motion-path-one" d="M24 260 C132 122 254 302 378 168 S612 92 750 226" />
        <path className="motion-path motion-path-two" d="M60 88 C206 46 284 166 392 134 S548 26 716 90" />
        <path className="motion-path motion-path-three" d="M92 352 C220 248 340 360 472 276 S636 234 742 316" />
        <rect className="motion-node motion-node-one" x="20" y="252" width="10" height="10" rx="2" />
        <rect className="motion-node motion-node-two" x="372" y="162" width="12" height="12" rx="2" />
        <rect className="motion-node motion-node-three" x="744" y="220" width="10" height="10" rx="2" />
        <rect className="motion-node motion-node-four" x="54" y="82" width="9" height="9" rx="2" />
        <rect className="motion-node motion-node-five" x="710" y="84" width="12" height="12" rx="2" />
      </svg>

      <div className="hero-motion-reel">
        {motionCards.map((card, index) => (
          <div
            className="hero-motion-card"
            key={card.kicker}
            style={{ "--card-index": index } as CSSProperties}
          >
            <span>{card.kicker}</span>
            <strong>{card.title}</strong>
            <p>{card.text}</p>
          </div>
        ))}
      </div>

      <div className="hero-motion-timeline">
        {steps.map((step, index) => (
          <span key={step} style={{ "--step-index": index } as CSSProperties}>
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}
