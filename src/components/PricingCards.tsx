import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { pricingAddOns, pricingOffers } from "@/lib/site-data";

export function PricingCards() {
  return (
    <div className="pricing-stack">
      <div className="grid-4 pricing-grid">
        {pricingOffers.map((offer) => (
          <article
            className={`card pricing-card${offer.featured ? " pricing-card-featured" : ""}`}
            key={offer.title}
          >
            <div className="pricing-card-top">
              <p className="eyebrow">{offer.eyebrow}</p>
              <h3>{offer.title}</h3>
              <div className="pricing-price">{offer.price}</div>
              <p className="muted">{offer.summary}</p>
            </div>
            <div className="pricing-card-bottom">
              <ul className="pricing-points">
                {offer.points.map((point) => (
                  <li key={point}>
                    <CheckCircle2 size={16} aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Link className={`btn ${offer.featured ? "btn-accent" : "btn-secondary"}`} href={offer.href}>
                {offer.cta}
                {offer.featured ? <Sparkles size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}
              </Link>
            </div>
          </article>
        ))}
      </div>
      {pricingAddOns.map((addOn) => (
        <aside className="pricing-addon" key={addOn.title}>
          <div>
            <p className="eyebrow">{addOn.eyebrow}</p>
            <h3>{addOn.title}</h3>
            <p>{addOn.summary}</p>
          </div>
          <div className="pricing-addon-price">{addOn.price}</div>
          <ul className="pricing-points">
            {addOn.points.map((point) => (
              <li key={point}>
                <CheckCircle2 size={16} aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </aside>
      ))}
    </div>
  );
}
