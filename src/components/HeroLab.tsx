import { CheckCircle2, Gauge, MapPinned, MousePointerClick } from "lucide-react";

export function HeroLab() {
  return (
    <div className="hero-lab" aria-label="Visualisierung eines conversion-orientierten Website-Systems">
      <div className="lab-canvas">
        <div className="lab-toolbar">
          <span>Website-System</span>
          <span>Bayern / Handwerk</span>
        </div>
        <div className="lab-signal-flow" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="lab-grid">
          <div className="lab-panel">
            <span className="eyebrow">
              <Gauge size={16} aria-hidden="true" /> Prüfung
            </span>
            <h3 style={{ marginTop: "0.8rem" }}>Erster Eindruck</h3>
            <ul className="plain-list">
              <li>
                <CheckCircle2 size={18} aria-hidden="true" />
                Leistungen sofort verständlich
              </li>
              <li>
                <CheckCircle2 size={18} aria-hidden="true" />
                Kontaktwege mobil sichtbar
              </li>
              <li>
                <CheckCircle2 size={18} aria-hidden="true" />
                Region und Gewerk klar
              </li>
            </ul>
          </div>
          <div className="lab-preview">
            <div className="lab-preview-top" />
            <div className="lab-browser-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="lab-preview-body">
              <div className="lab-line dark" />
              <div className="lab-line" style={{ width: "92%" }} />
              <div className="lab-line" style={{ width: "70%" }} />
              <div className="lab-line lime" />
            </div>
          </div>
          <div className="lab-panel">
            <span className="eyebrow">
              <MapPinned size={16} aria-hidden="true" /> Local SEO
            </span>
            <h3 style={{ marginTop: "0.8rem" }}>Bayern zuerst, Deutschland skalierbar</h3>
          </div>
          <div className="lab-panel">
            <span className="eyebrow">
              <MousePointerClick size={16} aria-hidden="true" /> Anfrage
            </span>
            <h3 style={{ marginTop: "0.8rem" }}>Weniger Reibung bis zum Gespräch</h3>
          </div>
        </div>
        <div className="lab-note">
          <strong>01</strong>
          <span>Eine Website, die nicht nur gut aussieht, sondern Entscheidungen leichter macht.</span>
          <div className="lab-metric" aria-hidden="true">
            <div className="metric-bar" />
            <div className="metric-bar" style={{ animationDelay: "220ms" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
