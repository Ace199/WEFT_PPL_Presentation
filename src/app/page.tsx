import { LocalizedText as T, LocalizedElement } from "@/components/Language";
import { home, editableFields } from "@/content/home";
import { sitePath } from "@/lib/paths";
import {
  EditableText,
  TextPreviewProvider,
} from "@/components/editor/TextPreview";
import { MasterCanvas } from "@/components/MasterCanvas";
import { ResolveDiagram, SummaryDiagram } from "@/components/Diagrams";
import { MotionFigure } from "@/components/MotionFigure";
import styles from "./page.module.css";
import { GlyphText } from "@/components/GlyphText";
import { HeroTextMotion } from "@/components/HeroTextMotion";
import {
  HeroFactsMotion,
  ProductionFactsMotion,
} from "@/components/HeroFactsMotion";
import { SiteHeader } from "@/components/SiteHeader";
import { ProofImage } from "@/components/ProofImage";
import { ProductionFactValue } from "@/components/ProductionFactValue";

export default function HomePage() {
  return (
    <TextPreviewProvider fields={editableFields} showLauncher={false}>
      <div id="top" className={styles.site} data-section-scroll-snap>
        <a className="skip" href="#main">
          <T text="跳至正文" />
        </a>
        <SiteHeader />
        <main id="main">
          <section className={styles.hero} aria-labelledby="hero-title">
            <HeroTextMotion />
            <div className={styles.heroText}>
              <h1 id="hero-title">
                <EditableText id="hero.title" glyphs />
              </h1>
              <h2>
                <EditableText id="hero.subtitle" glyphs />
              </h2>
              <p>
                <EditableText id="hero.description" glyphs />
              </p>
            </div>
            <MotionFigure kind="hero" className={styles.heroDiagram}>
              <ResolveDiagram />
            </MotionFigure>
            <HeroFactsMotion className={styles.heroFacts}>
              {home.hero.facts.map((fact) => (
                <li key={fact}>
                  <GlyphText text={fact} />
                </li>
              ))}
            </HeroFactsMotion>
          </section>
          <section
            id="summary"
            className={styles.summary}
            aria-labelledby="summary-title"
          >
            <div className={styles.summaryVisual}>
              <MotionFigure kind="summary">
                <SummaryDiagram />
              </MotionFigure>
              <ol>
                <li>{<T text="分散的成果" />}</li>
                <li>{<T text="有序的组织" />}</li>
                <li>{<T text="协同的生产" />}</li>
              </ol>
            </div>
            <div className={styles.summaryCopy}>
              <h2 id="summary-title">
                <EditableText id="summary.title" />
              </h2>
              <p>
                <EditableText id="summary.description" />
              </p>
            </div>
          </section>
          <MasterCanvas views={home.views} />
          <section
            id="production"
            className={styles.production}
            aria-labelledby="production-title"
          >
            <div className={styles.productionMeta}>
              <h2 id="production-title">
                <EditableText id="proof.title" />
              </h2>
              <p>
                <EditableText id="proof.description" />
              </p>
              <ProductionFactsMotion>
                {home.proof.facts.map(([key, value]) => (
                  <div key={key} data-typing-row>
                    <dt>
                      <GlyphText text={key} hero={false} />
                    </dt>
                    <dd>
                      <ProductionFactValue value={value} category={key} />
                    </dd>
                  </div>
                ))}
              </ProductionFactsMotion>
            </div>
            {home.proof.figures.map((figure) => (
              <figure key={figure.id} className={styles.proofFigure}>
                <h3>
                  FIG. {figure.id} /{" "}
                  <EditableText
                    id={
                      figure.id === "01"
                        ? "proof.fig01.title"
                        : "proof.fig02.title"
                    }
                  />
                </h3>
                <ProofImage
                  className={styles.proofCapture}
                  title={figure.title}
                  image={figure.image}
                  prototype={figure.prototype}
                  width={figure.width}
                  height={figure.height}
                  alt={figure.alt}
                />
                <figcaption>
                  <EditableText
                    id={
                      figure.id === "01"
                        ? "proof.fig01.caption"
                        : "proof.fig02.caption"
                    }
                  />
                </figcaption>
              </figure>
            ))}
            <div className={styles.provenance}>
              <p>{<T text={home.proof.attribution} />}</p>
              <p>{<T text={home.proof.note} />}</p>
            </div>
          </section>
        </main>
        <footer className={styles.footer}>
          <div className={styles.footerBrand}>
            <b>{home.name}</b>
            <p>
              <EditableText id="footer.tagline" />
            </p>
          </div>
          <MotionFigure kind="footer" className={styles.footerDiagram}>
            <LocalizedElement as="svg"
              viewBox="0 0 330 140"
              role="img"
              label="人、数据与软件在同一生产系统中连接"
            >
              <g fill="none" stroke="currentColor" strokeWidth="1">
                <circle data-circle="0" cx="100" cy="60" r="43" />
                <circle data-circle="1" cx="165" cy="60" r="43" />
                <circle data-circle="2" cx="230" cy="60" r="43" />
                <path d="M100 60H230" />
              </g>
              <g fill="currentColor">
                {[100, 165, 230].map((x) => (
                  <circle key={x} cx={x} cy="60" r="4" />
                ))}
              </g>
              <g textAnchor="middle" fontSize="17" fontFamily="var(--mono)">
                <text x="100" y="132">
                  PEOPLE
                </text>
                <text x="165" y="132">
                  DATA
                </text>
                <text x="230" y="132">
                  SOFTWARE
                </text>
              </g>
            </LocalizedElement>
          </MotionFigure>
          <div className={styles.footerLinks}>
            <a href={sitePath("/contact/")}>
              03 / CONTACT <span aria-hidden="true">↗</span>
            </a>
            <a href="#top">
              BACK TO TOP <span aria-hidden="true">↑</span>
            </a>
          </div>
        </footer>
      </div>
    </TextPreviewProvider>
  );
}
