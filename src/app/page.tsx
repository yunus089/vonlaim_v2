import type { CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  ClipboardCheck,
  Construction,
  FileSearch,
  Gauge,
  Globe2,
  Hammer,
  MapPinned,
  MessageSquareText,
  MousePointerClick,
  Phone,
  Radar,
  Route,
  ScanSearch,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Wrench,
  XCircle
} from "lucide-react";
import { HeroMotionBackdrop } from "@/components/HeroMotionBackdrop";
import { HeroLab } from "@/components/HeroLab";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import {
  getContentBlocks,
  getFaqs,
  getPublishedPosts,
  getServices
} from "@/lib/public-content";
import {
  fitFor,
  notFitFor,
  projectPaths,
  websiteCheckSteps,
  whyNowReasons
} from "@/lib/site-data";

export const dynamic = "force-dynamic";

const siteUrl = process.env.APP_URL ?? "https://www.vonlaim.de";
const homeDescription =
  "vonLaim baut Websites für Handwerksbetriebe, die klar wirken, bei Google besser gefunden werden und Anfragen erleichtern.";

const industries = [
  "SHK",
  "Solar",
  "Elektro",
  "Dach",
  "Bau",
  "Maler",
  "Trockenbau",
  "Reinigung"
];

const kineticWords = [
  "Sichtbar",
  "Verstanden",
  "Angefragt",
  "Gefunden",
  "Glaubwürdig",
  "Pflegbar"
];

const authorityFacts = [
  ["Betriebe", "Für Handwerksbetriebe, technische Dienstleister und lokale Unternehmen, die online so klar wirken wollen wie beim Kunden vor Ort."],
  ["Region", "Aus Germering bei München, stark für Bayern aufgebaut und sauber erweiterbar für weitere Regionen in Deutschland."],
  ["Sichtbarkeit", "Leistungen, Einzugsgebiet und Kundenfragen werden so sortiert, dass Menschen, Google und KI-Suche den Betrieb schneller einordnen."],
  ["Anfrage", "Besucher erkennen schneller, ob Ihr Betrieb passt, was als Nächstes passiert und wie sie ohne Umwege Kontakt aufnehmen."]
];

const answerBlocks = [
  {
    title: "Was macht vonLaim?",
    text:
      "vonLaim entwickelt Websites für Handwerksbetriebe, die professionell wirken, bei Google verständlich strukturiert sind und passende Kundenanfragen erleichtern. Dazu gehören Strategie, Webdesign, Texte, Local SEO, Kontaktwege, FAQ-Struktur und laufende Pflege."
  },
  {
    title: "Für wen ist vonLaim geeignet?",
    text:
      "vonLaim ist geeignet für Betriebe aus Elektro, SHK, Solar, Dach, Bau, Maler, Trockenbau, Reinigung und ähnlichen lokalen Gewerken, die online klarer gefunden und besser verstanden werden wollen."
  },
  {
    title: "In welcher Region arbeitet vonLaim?",
    text:
      "vonLaim sitzt in Germering bei München. Der Schwerpunkt liegt auf Bayern, besonders dem Raum München und Fürstenfeldbruck. Digitale Website-Projekte sind auch für Betriebe in ganz Deutschland möglich."
  }
];

export default async function HomePage() {
  const [services, posts, faqs, blocks] = await Promise.all([
    getServices(),
    getPublishedPosts(3),
    getFaqs(),
    getContentBlocks()
  ]);
  const visibleFaqs = faqs.slice(0, 7);
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: "vonLaim | Websites für Handwerksbetriebe in Bayern",
        description: homeDescription,
        inLanguage: "de-DE",
        isPartOf: {
          "@id": `${siteUrl}/#website`
        },
        about: {
          "@id": `${siteUrl}/#organization`
        },
        primaryAudience: {
          "@type": "Audience",
          audienceType:
            "Handwerksbetriebe, technische Dienstleister und lokale Service-Unternehmen"
        },
        mainEntity: {
          "@id": `${siteUrl}/#website-service`
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#organization`,
        name: "vonLaim",
        url: siteUrl,
        slogan: "Webseiten, die Handwerk sichtbar machen.",
        description: homeDescription,
        areaServed: [
          {
            "@type": "AdministrativeArea",
            name: "Bayern"
          },
          {
            "@type": "Country",
            name: "Deutschland"
          }
        ],
        email: "kontakt@vonlaim.de",
        telephone: "+4915205200600",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Kriegerstr. 3a",
          postalCode: "82110",
          addressLocality: "Germering",
          addressRegion: "Bayern",
          addressCountry: "DE"
        },
        knowsAbout: [
          "Webdesign für Handwerker",
          "Handwerker-Websites",
          "Local SEO",
          "Conversion-Optimierung",
          "Website-Relaunch für lokale Betriebe",
          "CMS für Unternehmenswebsites"
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Website-Angebote für Handwerksbetriebe",
          itemListElement: projectPaths.map((path) => ({
            "@type": "Offer",
            name: path.title,
            description: `${path.forWhom} ${path.outcome}`,
            url: `${siteUrl}${path.href}`
          }))
        },
        potentialAction: {
          "@type": "ContactAction",
          name: "Kostenlosen Website-Check anfragen",
          target: `${siteUrl}/kontakt`
        },
        makesOffer: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            "@id": `${siteUrl}/leistungen#${service.slug}`,
            name: service.title,
            description: service.summary,
            areaServed: ["Bayern", "Deutschland"],
            audience: {
              "@type": "Audience",
              audienceType: "Handwerk und lokale Dienstleister"
            }
          }
        }))
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#website-service`,
        name: "Webdesign für Handwerksbetriebe",
        provider: {
          "@id": `${siteUrl}/#organization`
        },
        serviceType:
          "Moderne, conversion-orientierte Websites für Handwerksbetriebe",
        areaServed: ["Bayern", "Deutschland"],
        audience: {
          "@type": "Audience",
          audienceType:
            "SHK, Solar, Elektrik, Sanitär, Dach, Bau, Maler, Trockenbau, Reinigung und lokale Servicebetriebe"
        },
        description:
          "vonLaim plant, gestaltet und betreibt Websites, die lokale Betriebe professionell sichtbar machen, Vertrauen aufbauen und direkte Anfragen erleichtern."
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#homepage-faq`,
        mainEntity: visibleFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer
          }
        }))
      }
    ]
  };

  return (
    <>
      <JsonLd data={homeSchema} />
      <section className="hero">
        <HeroMotionBackdrop />
        <div className="container hero-layout">
          <Reveal>
            <span className="eyebrow">
              <MapPinned size={16} aria-hidden="true" />
              Webdesign für Handwerk in Bayern
            </span>
            <h1>
              Ihre Handwerker-Website sollte vor dem ersten Anruf Vertrauen schaffen.
            </h1>
            <p className="lead">
              vonLaim entwickelt Websites für Handwerksbetriebe und technische
              Dienstleister, die Leistungen klar erklären, lokal besser
              eingeordnet werden und passende Anfragen erleichtern. Ohne
              Baukasten-Look, ohne leere Versprechen und ohne Texte, die nach
              Werbeagentur klingen.
            </p>
            <div className="hero-cta">
              <Link className="btn btn-accent" href="/kontakt" data-magnetic>
                Kostenlosen Website-Check anfragen
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="btn btn-secondary" href="/leistungen" data-magnetic>
                Leistungen ansehen
              </Link>
            </div>
            <p className="cta-microcopy">
              15 bis 20 Minuten. Kein Newsletter. Ehrliche Einschätzung, welcher nächste Schritt sinnvoll ist.
            </p>
            <div className="trust-row" aria-label="Vertrauensmerkmale">
              <span className="chip">
                <Construction size={16} aria-hidden="true" />
                Für SHK, Elektro, Solar, Dach & Bau
              </span>
              <span className="chip">
                <Search size={16} aria-hidden="true" />
                Bayern zuerst, deutschlandweit erweiterbar
              </span>
              <span className="chip">
                <Phone size={16} aria-hidden="true" />
                Passende Anfragen statt Rätselraten
              </span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <HeroLab />
          </Reveal>
        </div>
      </section>

      <section className="kinetic-band" aria-label="vonLaim Wirkungsprinzipien">
        <div className="kinetic-track" aria-hidden="true">
          {[...kineticWords, ...kineticWords].map((word, index) => (
            <span key={`${word}-${index}`}>{word}</span>
          ))}
        </div>
      </section>

      <section className="section check-section">
        <div className="container check-layout">
          <div className="check-copy">
            <span className="eyebrow">
              <ScanSearch size={16} aria-hidden="true" />
              Kostenloser Website-Check
            </span>
            <h2>Erst prüfen, dann entscheiden, ob ein Projekt wirklich sinnvoll ist.</h2>
            <p>
              Viele Betriebe brauchen nicht sofort „alles neu“. Manchmal ist
              die Struktur der größte Hebel, manchmal der Kontaktweg, manchmal
              die lokale Sichtbarkeit. Im Website-Check klären wir, was Ihrer
              Website gerade am meisten hilft.
            </p>
            <div className="hero-cta">
              <Link className="btn btn-accent" href="/kontakt">
                Website-Check anfragen
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a className="btn btn-secondary" href="tel:+4915205200600">
                Direkt anrufen
              </a>
            </div>
            <p className="cta-microcopy">
              Kostenlos. Ohne automatische Angebotsstrecke. Wenn kein Relaunch nötig ist, sagen wir das.
            </p>
          </div>
          <div className="check-steps">
            {websiteCheckSteps.map((step, index) => {
              const StepIcon = [Clock3, ShieldCheck, Target][index] ?? CheckCircle2;
              return (
                <article className="card step-card" key={step.title}>
                  <span className="card-icon">
                    <StepIcon size={22} aria-hidden="true" />
                  </span>
                  <h3>{step.title}</h3>
                  <p className="muted">{step.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Kurz erklärt</span>
              <h2>vonLaim ist die Website-Werkstatt für Betriebe, die online klarer überzeugen wollen.</h2>
            </div>
            <p>
              Das Angebot kommt aus Germering bei München und richtet sich an
              Handwerksbetriebe, technische Dienstleister und lokale
              Servicebetriebe in Bayern und Deutschland.
            </p>
          </div>
          <div className="grid-3">
            {answerBlocks.map((block) => (
              <article className="card" key={block.title}>
                <h3>{block.title}</h3>
                <p className="muted">{block.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section signal-section">
        <div className="container signal-grid">
          <div className="signal-panel signal-panel-main">
            <span className="eyebrow">
              <Radar size={16} aria-hidden="true" />
              Digitaler erster Eindruck
            </span>
            <h2>Ihre Website muss erklären, Vertrauen schaffen und den nächsten Schritt leicht machen.</h2>
            <p>
              Gute Arbeit allein reicht online nicht aus. Besucher müssen in
              wenigen Sekunden verstehen, was Sie anbieten, wo Sie arbeiten und
              warum sie gerade Ihren Betrieb anfragen sollten.
            </p>
          </div>
          <div className="signal-panel signal-meter" data-magnetic>
            <Gauge size={24} aria-hidden="true" />
            <strong>3 Sekunden</strong>
            <span>bis Besucher erkennen, ob Ihr Betrieb für ihr Anliegen grundsätzlich passt.</span>
          </div>
          <div className="signal-panel signal-meter" data-magnetic>
            <ShieldCheck size={24} aria-hidden="true" />
            <strong>0 leere Versprechen</strong>
            <span>keine Fake-Bewertungen, keine Platz-1-Garantien, keine Sprache, die erst übersetzt werden muss.</span>
          </div>
          <div className="signal-panel signal-meter" data-magnetic>
            <MousePointerClick size={24} aria-hidden="true" />
            <strong>1 klarer Schritt</strong>
            <span>aus einem glaubwürdigen ersten Eindruck wird eine Anfrage, ein Anruf oder ein Erstgespräch.</span>
          </div>
        </div>
      </section>

      <section className="section authority-reel-section" aria-labelledby="authority-reel-title">
        <div className="container authority-reel">
          <div className="authority-copy">
            <span className="eyebrow">
              <FileSearch size={16} aria-hidden="true" />
              Sichtbarkeit mit Substanz
            </span>
            <h2 id="authority-reel-title">
              Damit Kunden, Google und KI-Suche sofort einordnen, wofür Ihr Betrieb steht.
            </h2>
            <p>
              Eine gute Website beantwortet die wichtigsten Fragen, bevor
              jemand anruft: Was bieten Sie an? In welcher Region arbeiten Sie?
              Für welche Aufträge sind Sie der richtige Betrieb? Und wie nimmt
              man unkompliziert Kontakt auf?
            </p>
            <div className="authority-facts" aria-label="vonLaim Entitätsfakten">
              {authorityFacts.map(([label, text]) => (
                <div className="authority-fact" key={label}>
                  <strong>{label}</strong>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reel-stage" data-magnetic aria-label="Animierte Such- und Anfragekette">
            <div className="reel-chrome">
              <span>Sichtbarkeits-Reel</span>
              <span>01 / Handwerk</span>
            </div>
            <div className="reel-screen">
              <div className="reel-scan" aria-hidden="true" />
              <div className="reel-frame reel-frame-one">
                <span className="reel-kicker">Suchanfrage</span>
                <strong>„Elektriker für Altbausanierung in München“</strong>
                <p>Leistung, Region und Betrieb werden sofort erkennbar statt irgendwo im Text versteckt.</p>
              </div>
              <div className="reel-frame reel-frame-two">
                <span className="reel-kicker">Einordnung</span>
                <strong>Passt dieser Betrieb?</strong>
                <p>Leistungen, Einzugsgebiet, Arbeitsweise und Vertrauenssignale geben schnell Orientierung.</p>
              </div>
              <div className="reel-frame reel-frame-three">
                <span className="reel-kicker">Anfrage</span>
                <strong>Vom ersten Eindruck zur Anfrage.</strong>
                <p>Telefon, Formular und Erstgespräch sind sichtbar, sobald Vertrauen entsteht.</p>
              </div>
              <div className="reel-radar" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="reel-footer">
              <span>
                <Globe2 size={16} aria-hidden="true" />
                Germering, München, Bayern
              </span>
              <span>
                <Route size={16} aria-hidden="true" />
                klare Fakten statt Rätseltext
              </span>
              <Link href="/kontakt">
                Erstgespräch
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{blocks.home_problem?.eyebrow ?? "Ausgangslage"}</span>
              <h2>{blocks.home_problem?.title ?? "Viele starke Betriebe wirken online schwächer, als sie wirklich sind."}</h2>
            </div>
            <p>
              {blocks.home_problem?.body ??
                "Das Problem ist selten die Arbeit vor Ort. Es ist der erste digitale Eindruck: veraltete Optik, unklare Leistungen, wenig regionale Einordnung oder ein Kontaktweg, der zu viel Geduld verlangt."}
            </p>
          </div>
          <div className="grid-3">
            {[
              ["Der erste Eindruck bremst", "Ihre Qualität ist da, aber die Website zeigt sie nicht schnell genug."],
              ["Leistungen und Region bleiben unklar", "Interessenten erkennen nicht sofort, ob Ihr Betrieb für ihr Anliegen und ihren Ort passt."],
              ["Kontakt kostet zu viel Aufwand", "Wenn Telefon, Formular oder nächster Schritt nicht klar sind, gehen passende Anfragen verloren."]
            ].map(([title, text], index) => (
              <Reveal delay={index * 80} key={title}>
                <article className="card">
                  <CheckCircle2 size={22} aria-hidden="true" />
                  <h3 style={{ marginTop: "1rem" }}>{title}</h3>
                  <p className="muted">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt offer-path-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">
                <Route size={16} aria-hidden="true" />
                Projektwege
              </span>
              <h2>Drei sinnvolle Einstiege, je nachdem wo Ihr Betrieb gerade steht.</h2>
            </div>
            <p>
              Nicht jeder Betrieb braucht sofort einen großen Relaunch. vonLaim
              macht den nächsten Schritt greifbar: prüfen, neu aufbauen,
              verbessern oder nach dem Launch weiter ausbauen.
            </p>
          </div>
          <div className="grid-4">
            {projectPaths.map((path, index) => {
              const PathIcon = [ScanSearch, Hammer, Construction, Wrench][index] ?? Sparkles;
              return (
                <Reveal delay={index * 70} key={path.title}>
                  <article className="card offer-card">
                    <div>
                      <span className="card-icon">
                        <PathIcon size={22} aria-hidden="true" />
                      </span>
                      <p className="eyebrow" style={{ marginTop: "1.2rem" }}>
                        {path.eyebrow}
                      </p>
                      <h3>{path.title}</h3>
                      <p>{path.forWhom}</p>
                      <p className="muted">{path.outcome}</p>
                    </div>
                    <Link href={path.href} className="btn btn-secondary">
                      {path.cta}
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Leistungen</span>
              <h2>Alles, was Ihre Website braucht, um Vertrauen aufzubauen und Anfragen zu erleichtern.</h2>
            </div>
            <p>
              Strategie, Texte, Design, Technik und lokale Sichtbarkeit greifen
              bei vonLaim zusammen. So entsteht kein hübsches Online-Prospekt,
              sondern ein Auftritt, der Ihrem Betrieb im Alltag hilft.
            </p>
          </div>
          <div className="grid-4">
            {services.map((service, index) => (
              <Reveal delay={index * 80} key={service.id}>
                <article className="card service-card">
                  <div>
                    <span className="card-icon">
                      <Icon name={service.icon} />
                    </span>
                    <p className="eyebrow" style={{ marginTop: "1.2rem" }}>
                      {service.eyebrow}
                    </p>
                    <h3>{service.title}</h3>
                    <p className="muted">{service.summary}</p>
                  </div>
                  <Link href="/leistungen" className="btn btn-secondary">
                    Mehr dazu
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section industry-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Gewerke</span>
              <h2>Für technische Betriebe, bei denen Vertrauen, Region und Erreichbarkeit zählen.</h2>
            </div>
            <p>
              Ob SHK, Elektro, Solar, Dach, Bau, Maler, Trockenbau oder
              Reinigung: Jede Branche hat eigene Kundenfragen. Die
              Website-Struktur wird darauf vorbereitet, Leistungen, Einwände
              und regionale Suchanfragen sauber abzubilden.
            </p>
          </div>
          <div className="industry-orbit" aria-label="Wichtige Zielbranchen">
            {industries.map((industry, index) => (
              <span className="industry-pill" style={{ "--i": index } as CSSProperties} key={industry}>
                <BadgeCheck size={16} aria-hidden="true" />
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container fit-grid">
          <article className="fit-panel fit-positive">
            <span className="eyebrow">
              <CheckCircle2 size={16} aria-hidden="true" />
              Für wen vonLaim passt
            </span>
            <h2>Für Betriebe, die online ernst genommen werden wollen.</h2>
            <p>
              vonLaim passt zu Handwerksbetrieben und technischen
              Dienstleistern, die eine hochwertige Website möchten, aber keinen
              komplizierten Agenturprozess brauchen.
            </p>
            <ul className="plain-list">
              {fitFor.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="fit-panel fit-negative">
            <span className="eyebrow">
              <XCircle size={16} aria-hidden="true" />
              Nicht passend
            </span>
            <h2>Nicht die richtige Wahl, wenn Sie nur irgendeine schnelle Website suchen.</h2>
            <p>
              Die Seite soll kein unnötiges Projekt verkaufen. Sie soll zeigen,
              wann Qualität, Struktur, regionale Sichtbarkeit und spätere
              Pflege wirklich wichtig sind.
            </p>
            <ul className="plain-list">
              {notFitFor.map((item) => (
                <li key={item}>
                  <XCircle size={18} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">{blocks.home_process?.eyebrow ?? "Ablauf"}</span>
              <h2>{blocks.home_process?.title ?? "Ein Website-Projekt, das neben Ihrem Tagesgeschäft machbar bleibt."}</h2>
            </div>
            <p>{blocks.home_process?.body}</p>
          </div>
          <div className="grid-4 process">
            {[
              ["Orientierung", "Betrieb, Leistungen, Region, Zielkunden und wertvolle Anfragen klären."],
              ["Struktur & Inhalte", "Seitenaufbau, Texte, Kontaktwege und SEO-Grundlage festlegen."],
              ["Design & Umsetzung", "Hochwertig gestalten, technisch sauber bauen und mobil prüfen."],
              ["Launch & Weiterentwicklung", "Veröffentlichen, testen und später mit Referenzen, FAQs oder neuen Seiten ausbauen."]
            ].map(([title, text]) => (
              <article className="card" key={title}>
                <h3>{title}</h3>
                <p className="muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container grid-2">
          <div>
              <span className="eyebrow">Referenzen vorbereitet</span>
            <h2>Vertrauen wächst mit echten Projekten, nicht mit erfundenen Erfolgszahlen.</h2>
            <p className="lead">
              vonLaim zeigt keine erfundenen Bewertungen. Der Bereich ist so
              vorbereitet, dass später echte Fallstudien mit Ausgangslage,
              Umsetzung, Ergebnis, Screenshots und belastbaren Aussagen sauber
              erscheinen.
            </p>
          </div>
          <div className="proof-card">
            <ClipboardCheck size={28} aria-hidden="true" />
            <h3 style={{ marginTop: "1rem" }}>Case-Study-Struktur</h3>
            <ul className="plain-list">
              <li>
                <CheckCircle2 size={18} aria-hidden="true" />
                Branche, Region und Ziel des Projekts
              </li>
              <li>
                <CheckCircle2 size={18} aria-hidden="true" />
                Vorher/Nachher-Logik ohne leere Versprechen
              </li>
              <li>
                <CheckCircle2 size={18} aria-hidden="true" />
                Sichtbare Ergebnisse nur mit belastbaren Daten
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section why-now-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">
                <MessageSquareText size={16} aria-hidden="true" />
                Warum jetzt prüfen lassen?
              </span>
              <h2>Eine schwache Website kostet oft nicht laut. Sie kostet leise.</h2>
            </div>
            <p>
              Wenn Ihre Website nicht klar zeigt, welche Aufträge Sie wollen,
              entscheidet der Besucher selbst, ob Sie passen. Genau dort
              entstehen falsche Anfragen, Preisdruck und unnötige Rückfragen.
            </p>
          </div>
          <div className="grid-3">
            {whyNowReasons.map((reason, index) => (
              <Reveal delay={index * 80} key={reason.title}>
                <article className="card reason-card">
                  <Target size={22} aria-hidden="true" />
                  <h3>{reason.title}</h3>
                  <p className="muted">{reason.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="quality-gate">
            <div>
              <span className="eyebrow">
                <Sparkles size={16} aria-hidden="true" />
                Qualitätscheck
              </span>
            <h2>Schön reicht nicht. Jede Seite muss Vertrauen, Orientierung oder Kontakt erleichtern.</h2>
            </div>
            <div className="quality-grid">
              {[
              ["UX", "klare Hierarchie, ein sinnvoller nächster Schritt"],
              ["Mobile", "große Touch-Ziele, sichtbarer Kontakt, keine versteckten CTAs"],
              ["SEO", "sprechende Struktur, lokale Entität, saubere Metadaten"],
              ["Motion", "Aufmerksamkeit und Orientierung statt Ablenkung"],
                ["CMS", "pflegbare Inhalte ohne Layoutbruch"],
                ["Performance", "wenig Ballast, keine schweren Show-Effekte"]
              ].map(([label, text]) => (
                <div className="quality-item" key={label}>
                  <strong>{label}</strong>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Insights</span>
              <h2>Wissen, das Website-Entscheidungen leichter macht.</h2>
            </div>
            <Link className="btn btn-secondary" href="/blog">
              Alle Beiträge
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid-3">
            {posts.map((post) => (
              <article className="card blog-card" key={post.id}>
                <div>
                  <p className="blog-meta">{post.category}</p>
                  <h3>{post.title}</h3>
                  <p className="muted">{post.excerpt}</p>
                </div>
                <Link className="btn btn-secondary" href={`/blog/${post.slug}`}>
                  Lesen
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">FAQ</span>
              <h2>Klare Antworten, bevor Sie Zeit in ein Projekt investieren.</h2>
            </div>
            <p>
              Kosten, Dauer, Aufwand, Relaunch, SEO, Inhalte und Pflege: Die
              wichtigsten Fragen werden offen beantwortet, damit Sie einschätzen
              können, ob vonLaim zu Ihrem Betrieb passt.
            </p>
          </div>
          <div className="faq-list">
            {visibleFaqs.map((faq) => (
              <details className="faq-item" key={faq.id}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band">
            <span className="eyebrow">{blocks.home_final_cta?.eyebrow ?? "Kostenloser Website-Check"}</span>
            <h2>{blocks.home_final_cta?.title ?? "Passt Ihre Website noch zu Ihrem Betrieb?"}</h2>
            <p className="lead">
              {blocks.home_final_cta?.body ??
                "Wenn Ihre Website veraltet wirkt, unklare Anfragen bringt oder Ihre Leistungen nicht sauber erklärt, lohnt sich ein ruhiger Blick von außen. Im Website-Check klären wir, was ein sinnvoller nächster Schritt wäre."}
            </p>
            <div className="hero-cta">
              <Link className="btn btn-accent" href={blocks.home_final_cta?.cta_href ?? "/kontakt"}>
                {blocks.home_final_cta?.cta_label ?? "Kostenlosen Website-Check anfragen"}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a className="btn btn-secondary" href="tel:+4915205200600">
                Direkt anrufen
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
