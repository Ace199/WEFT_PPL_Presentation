import { SiteHeader } from "@/components/SiteHeader";
import { decisionCards } from "@/content/decisionCards";
import { decisions } from "@/content/decisions";
import { sitePath } from "@/lib/paths";
import { DesignText as T } from "./DesignText";
import { DecisionDeck } from "./DecisionDeck";
import { DecisionDiagram } from "./DecisionDiagrams";
import { ProductionSpecimen } from "./ProductionSpecimen";
import { CompatibilityComparison } from "./CompatibilityComparison";
import styles from "./DesignPage.module.css";

function DecisionCard({
  decision: d,
}: {
  decision: (typeof decisions)[number];
}) {
  const narrative = decisionCards[d.id];
  return (
    <article className={styles.card} aria-labelledby={`title-${d.id}`}>
      <header className={styles.cardHeader}>
        <span>
          {d.index} / {d.category}
        </span>
        <span>FIG. 02.{d.index}</span>
      </header>
      <div
        className={styles.cardBody}
        data-card-scroll=""
        tabIndex={0}
        role="region"
        aria-label={`${d.category} — 可上下滚动 / Scroll for details`}
      >
        <section className={styles.decisionPart} data-card-part="decision">
          <p className={styles.partLabel}>PART 01 / DECISION</p>
          <h3 id={`title-${d.id}`}>
            <T {...d.title} />
          </h3>
          <p className={styles.decisionSummary}>
            <T {...d.summary} />
          </p>
          <p className={styles.inlineShift}>
            <span>{d.id === "state" ? "STATE MODEL" : "SYSTEM SHIFT"}</span> {d.from} <span aria-hidden="true">→</span>{" "}
            {d.to}
          </p>
        </section>
        <section
          className={styles.comparisonPart}
          data-card-part="comparison"
          aria-label={d.id === "state" ? "Modular publish → Full shot state" : "Before → WEFT / PPL"}
        >
          <h4 className={styles.partLabel}>{d.id === "state" ? "PART 02 / MODULAR PUBLISH → FULL STATE" : "PART 02 / BEFORE → WEFT / PPL"}</h4>
          {d.id === "compatibility" ? (
            <CompatibilityComparison />
          ) : d.id === "state" ? (
            <figure className={styles.afterModel}>
              <p className={styles.decisionSummary}><T {...narrative.problem} /></p>
              <DecisionDiagram id={d.id} />
              <figcaption>
                <T {...narrative.takeaway} />
                <small><T zh="概念示意" en="CONCEPTUAL DIAGRAM" /></small>
              </figcaption>
            </figure>
          ) : (
            <div className={styles.comparisonGrid}>
              <div className={styles.beforeModel}>
                <h5>BEFORE</h5>
                <pre>{narrative.before}</pre>
                <p>
                  <T {...narrative.problem} />
                </p>
              </div>
              <figure className={styles.afterModel}>
                <h5>WEFT / PPL</h5>
                <DecisionDiagram id={d.id} />
                <figcaption>
                  <T {...narrative.takeaway} />
                  <small>
                    <T zh="概念示意" en="CONCEPTUAL DIAGRAM" />
                  </small>
                </figcaption>
              </figure>
            </div>
          )}
        </section>
        <section
          className={styles.examplePart}
          data-card-part="example"
          aria-label="Project example"
        >
          <h4 className={styles.partLabel}>PART 03 / PROJECT EXAMPLE</h4>
          <h5>{narrative.example}</h5>
          <ProductionSpecimen id={d.id} />
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
      <SiteHeader current="design-innovation" boundaryId="design-viewer" />
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
