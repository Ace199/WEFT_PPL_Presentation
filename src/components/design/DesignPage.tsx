import { SiteHeader } from "@/components/SiteHeader";
import { decisions } from "@/content/decisions";
import { sitePath } from "@/lib/paths";
import { DesignText as T } from "./DesignText";
import { DecisionDeck } from "./DecisionDeck";
import { DecisionDiagram } from "./DecisionDiagrams";
import { ProductionArtifact } from "./ProductionArtifact";
import styles from "./DesignPage.module.css";

function DecisionCard({
  decision: d,
}: {
  decision: (typeof decisions)[number];
}) {
  return (
    <article className={styles.card} aria-labelledby={`title-${d.id}`}>
      <header className={styles.cardHeader}>
        <span>
          {d.index} / {d.category}
        </span>
        <span>FIG. 02.{d.index}</span>
      </header>
      <div className={styles.cardMain}>
        <div className={styles.statement}>
          <h3 id={`title-${d.id}`}>
            <T {...d.title} />
          </h3>
          <p className={styles.summary}>
            <T {...d.summary} />
          </p>
          <div className={styles.shift}>
            <p className={styles.label}>SYSTEM SHIFT</p>
            <p>{d.from}</p>
            <span aria-hidden="true">↓</span>
            <p>{d.to}</p>
          </div>
        </div>
        <figure className={styles.mainFigure}>
          <DecisionDiagram id={d.id} />
          <figcaption>
            <T {...d.diagramNote} />
            <span>
              <T zh="概念示意" en="CONCEPTUAL DIAGRAM" />
            </span>
          </figcaption>
        </figure>
      </div>
      <div className={styles.cardLower}>
        <section className={styles.diagnosis} aria-label="Model diagnosis">
          <h4 className={styles.label}>MODEL DIAGNOSIS</h4>
          <dl>
            <dt>SURFACE SYMPTOM</dt>
            <dd>
              <T {...d.symptom} />
            </dd>
            <dt>UNDERLYING CAUSE</dt>
            <dd>
              <T {...d.cause} />
            </dd>
          </dl>
        </section>
        <section className={styles.production} aria-label="In production">
          <h4 className={styles.label}>IN PRODUCTION</h4>
          <ProductionArtifact id={d.id} />
          <p>
            <T {...d.meaning} />
          </p>
          <a className={styles.more} href={sitePath(`/in-production/#${d.id}`)}>
            <T {...d.cta} /> ↗
          </a>
        </section>
      </div>
    </article>
  );
}
function Synthesis() {
  const labels = [
    ["COMPATIBILITY", "如何保持历史有效", "Keep history valid"],
    ["MODULE", "如何独立组合", "Compose independently"],
    ["STATE", "如何保持完整状态", "Maintain full state"],
    ["RULE", "如何进入执行", "Enter execution"],
  ];
  return (
    <section className={styles.synthesis} aria-labelledby="synthesis-title">
      <div>
        <p className={styles.label}>SYNTHESIS</p>
        <h2 id="synthesis-title">
          <T
            zh={"不是更多工具，\n而是更明确的系统。"}
            en={"Not more tools.\nA more explicit system."}
          />
        </h2>
      </div>
      <div className={styles.synthesisModel}>
        <div className={styles.synthesisItems}>
          {labels.map(([label, zh, en]) => (
            <div key={label}>
              <span>{label}</span>
              <p>
                <T zh={zh} en={en} />
              </p>
              <i aria-hidden="true" />
            </div>
          ))}
        </div>
        <div className={styles.synthesisResult}>
          EXPLICIT PRODUCTION MODEL
          <p>
            <T zh="明确的生产模型" en="A shared, explicit model" />
          </p>
        </div>
      </div>
    </section>
  );
}
export function DesignFooter() {
  return (
    <footer className={styles.footer}>
      <a href={sitePath("/")}>WEFT / PPL</a>
      <a href="#top">BACK TO TOP ↑</a>
    </footer>
  );
}
export function DesignPage() {
  return (
    <div className={styles.page} id="top">
      <a className="skip" href="#design-main">
        <T zh="跳到正文" en="Skip to content" />
      </a>
      <SiteHeader current="design-innovation" boundaryId="design-model" />
      <main id="design-main">
        <section className={styles.hero} aria-labelledby="design-title">
          <p className={styles.label}>02 / DESIGN &amp; INNOVATION</p>
          <h1 id="design-title">
            <T
              zh={"重新审视生产的\n默认假设。"}
              en={"Rethinking the defaults\nof production."}
            />
          </h1>
          <p className={styles.heroEnglish}>
            TRANSFORMING PRODUCTION ASSUMPTIONS
          </p>
          <p className={styles.heroIntro}>
            <T
              zh="当版本、依赖与变化暴露出边界，WEFT / PPL 选择重新审视生产模型，而不是继续增加补丁。"
              en="When versions, dependencies and change expose the limits, WEFT / PPL rethinks the production model instead of adding more patches."
            />
          </p>
        </section>
        <DecisionDeck
          cards={decisions.map((d) => (
            <DecisionCard key={d.id} decision={d} />
          ))}
        >
          <Synthesis />
        </DecisionDeck>
        <section className={styles.next} aria-labelledby="next-title">
          <div>
            <h2 id="next-title">
              <T
                zh="从明确的模型，走向持续演进。"
                en="From explicit models to continued evolution."
              />
            </h2>
            <p>TRANSFORM IDEAS INTO A MORE RELIABLE PRODUCTION SYSTEM.</p>
          </div>
          <a href={sitePath("/next/")}>03 / WHAT COMES NEXT ↗</a>
        </section>
      </main>
      <DesignFooter />
    </div>
  );
}
