import { ChapterText as T, ChapterElement } from "./ChapterText";
import { SiteHeader } from "@/components/SiteHeader";
import { sitePath } from "@/lib/paths";
import { Reveal } from "./Reveal";
import {
  Enforcement,
  Granularity,
  History,
  Icon,
  Network,
} from "./Illustrations";
import styles from "./SystematicPage.module.css";

const semantics = [
  ["CONTEXT", "正在做什么", 180, 42],
  ["VERSION", "发布版本", 310, 119],
  ["STATE", "完整状态", 310, 240],
  ["VALIDATION", "交付规则", 180, 298],
  ["DEPENDENCY", "依赖输入", 48, 240],
  ["PRODUCT", "成果身份", 48, 119],
] as const;

function SharedModel() {
  return (
    <Reveal className={styles.model}>
      <div data-step="0" className={styles.reality}>
        <p className={styles.eyebrow}>PRODUCTION REALITY</p>
        <div className={styles.realityGroup}>
          <p>
            PEOPLE / TASKS
            <small>
              <T text={"人员 / 任务"} />
            </small>
          </p>
          <svg className={styles.peopleIcons} viewBox="0 0 210 62" aria-hidden="true">
            <Icon kind="person" x={31} y={32} scale={0.72} />
            <Icon kind="person" x={93} y={32} scale={0.72} />
          </svg>
          <p className={styles.subtle}>
            <T text={"导演 / 艺术家 / 技术 / 制作"} />
            <br />
            <T text={"任务 / 协作 / 决策"} />
          </p>
        </div>
        <div className={styles.realityGroup}>
          <p>
            PRODUCTION PRODUCTS
            <small>
              <T text={"制作成果"} />
            </small>
          </p>
          <svg className={styles.productIcons} viewBox="0 0 260 78" aria-hidden="true">
            <Icon kind="camera" x={30} y={37} scale={0.56} />
            <Icon kind="cube" x={99} y={37} scale={0.56} />
            <Icon kind="cloth" x={182} y={37} scale={0.72} />
          </svg>
          <p className={styles.subtle}>
            <T text={"镜头 / 场景 / 资产 / 其他"} />
          </p>
          <div className={styles.formatGroup}>
            <p>
              PRODUCTION FORMATS
              <small>
                <T text={"生产格式"} />
              </small>
            </p>
            <div className={styles.formatLogos}>
              <img src={sitePath("/images/formats/usd.png")} alt="USD" />
              <img
                className={styles.alembicLogo}
                src={sitePath("/images/formats/alembic-transparent.png")}
                alt="Alembic"
              />
              <span>.usd / .abc</span>
            </div>
          </div>
        </div>
      </div>
      <div data-step="1" className={styles.semantics}>
        <p className={styles.eyebrow}>
          SHARED SEMANTICS
          <small>
            <T text={"共享的生产语义"} />
          </small>
        </p>
        <ChapterElement
          as="svg"
          viewBox="0 0 360 340"
          role="img"
          label="Context、Product、Version、Dependency、State、Validation 六个共享语义组成生产模型。"
        >
          <circle
            cx="180"
            cy="170"
            r="118"
            fill="none"
            stroke="currentColor"
            strokeDasharray="3 4"
            opacity=".5"
          />
          {semantics.map(([label, desc, x, y], i) => (
            <g key={label}>
              <rect
                x={x - 60}
                y={y - 20}
                width="120"
                height="58"
                fill="#192622"
              />
              <text x={x} y={y} textAnchor="middle">
                <T text={label} />
              </text>
              <text x={x} y={y + 22} textAnchor="middle" fill="#96e0ca">
                <T text={desc} />
              </text>
              <path
                data-draw
                d={
                  i === 0
                    ? "M180 80V116"
                    : i === 3
                      ? "M180 220V264"
                      : i === 1
                        ? "M253 145 232 155"
                        : i === 5
                          ? "M108 155 87 145"
                          : ""
                }
                stroke="#96e0ca"
                fill="none"
              />
            </g>
          ))}
          <text x="180" y="168" textAnchor="middle">
            PRODUCTION
            <tspan x="180" dy="25">
              SEMANTICS
            </tspan>
          </text>
        </ChapterElement>
      </div>
      <div data-step="2" className={styles.execution}>
        <p className={styles.eyebrow}>
          EXECUTION
          <small>
            <T text={"执行层"} />
          </small>
        </p>
        {[
          ["gear", "BUILD / LOAD", "构建 / 加载"],
          ["publish", "PUBLISH", "发布"],
          ["resolve", "RESOLVE", "解析依赖"],
          ["compose", "COMPOSE", "组合生成"],
          ["sphere", "REVIEW", "检查 / 审阅"],
        ].map(([kind, label, desc]) => (
          <div className={styles.executionRow} key={label}>
            <svg viewBox="-33 -35 66 70" aria-hidden="true">
              <Icon kind={kind} />
            </svg>
            <p>
              <T text={label} />
              <small>
                <T text={desc} />
              </small>
            </p>
          </div>
        ))}
        <div data-step="3" className={styles.dcc}>
          <p>
            DCC SOFTWARE
            <small>
              <T text="生产软件" />
            </small>
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={sitePath("/images/logos/maya.png")} width="48" height="48" alt="Maya" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={sitePath("/images/logos/houdini.png")} width="48" height="48" alt="Houdini" />
        </div>
      </div>
    </Reveal>
  );
}

export function SystematicPage() {
  return (
    <div className={styles.page} id="top">
      <noscript><style>{`[data-reveal][data-motion="pending"] [data-step]{opacity:1!important}`}</style></noscript>
      <a className="skip" href="#systematic-main">
        <T text={"跳到正文"} />
      </a>
      <SiteHeader
        current="systematic-thinking"
        boundaryId="systematic-change"
      />
      <main id="systematic-main">
        <section className={styles.hero} aria-labelledby="systematic-title">
          <p className={styles.eyebrow}>01 / SYSTEMATIC THINKING</p>
          <h1 id="systematic-title">
            <T text={"动画生产，不是一条线，"} />
            <br />
            <T text={"而是一套协作系统。"} />
          </h1>
          <p className={styles.lead}>
            <T
              text={
                "不同的人、软件与制作环节，持续产生、修改、交接和组合制作成果。"
              }
            />
          </p>
          <figure className={styles.network}>
            <figcaption className={styles.eyebrow}>
              ANIMATION PRODUCTION SYSTEM{" "}
              <span>
                <T text={"概念示意"} />
              </span>
            </figcaption>
            <Reveal slow maxScrollRate={10}>
              <ChapterElement
                as="div"
                className={styles.networkScroll}
                role="region"
                label="生产依赖网络，小屏可横向滚动"
                tabIndex={0}
              >
                <Network />
              </ChapterElement>
            </Reveal>
          </figure>
          <div className={styles.handoff}>
            <strong>
              <T text={"每一次交接，都不只是传一个文件。"} />
            </strong>
            <p>
              PRODUCT　 /　 VERSION　 /　 DEPENDENCY　 /　 STATE　 /　 RULES
            </p>
          </div>
        </section>
        <section
          id="systematic-change"
          className={styles.change}
          aria-labelledby="change-title"
        >
          <h2 id="change-title">
            <T text={"真正复杂的，"} />
            <br />
            <T text={"是让独立演进的成果始终正确协作。"} />
          </h2>
          <p>
            <T
              text={
                "模型、动画、材质、镜头资源和生产规则，都以不同节奏持续演进。"
              }
            />
            <br />
            <T
              text={
                "Production System 需要保证：历史成果仍然有效，局部变化不会扩大影响范围、生产规则真正进入执行过程。"
              }
            />
          </p>
          <h3>
            <T
              text={
                "怎样让不同节奏的生产持续向前，而不破坏已经成立的成果、状态和规则？"
              }
            />
          </h3>
        </section>
        <ChapterElement
          as="section"
          className={styles.problems}
          label="三个核心生产问题"
        >
          <p className={styles.eyebrow}>THREE CORE PRODUCTION PROBLEMS</p>
          <article className={styles.problem}>
            <div>
              <p className={styles.eyebrow}>01 / ENFORCEMENT</p>
              <h2>RULES NEED EXECUTION</h2>
              <h3>
                <T text={"生产规则，需要进入执行边界。"} />
              </h3>
            </div>
            <Reveal sequence={1} speed={2}>
              <Enforcement />
            </Reveal>
          </article>
          <article className={styles.problem}>
            <div>
              <p className={styles.eyebrow}>02 / GRANULARITY</p>
              <h2>
                LOCAL CHANGE ≠<br />
                GLOBAL REPUBLISH
              </h2>
              <h3>
                <T text={"局部变化，不应该要求整体重新发布。"} />
              </h3>
              <p>
                <T text={"本次变化，不等于当前完整状态。"} />
              </p>
            </div>
            <Reveal sequence={2}>
              <Granularity />
            </Reveal>
          </article>
          <article className={styles.problem}>
            <div>
              <p className={styles.eyebrow}>03 / HISTORY</p>
              <h2>
                EVOLVE WITHOUT
                <br />
                INVALIDATING
              </h2>
              <h3>
                <T text={"上游持续演进，历史成果仍要保持有效。"} />
              </h3>
              <p>
                <T text={"工作阶段跟随最新；已发布成果保留历史兼容。"} />
              </p>
            </div>
            <Reveal sequence={3}>
              <History />
            </Reveal>
          </article>
        </ChapterElement>
        <section className={styles.dark} aria-labelledby="shared-title">
          <p className={styles.eyebrow}>SHARED PRODUCTION MODEL</p>
          <h2 id="shared-title">
            <T text={"统一的不是软件，"} />
            <br />
            <T text={"而是生产语义。"} />
          </h2>
          <SharedModel />
          <div className={styles.modelNote}>
            <p>Different tools. Shared production semantics.</p>
            <p>
              <T
                text={
                  "Maya 与 Houdini 执行不同操作，但共享对 Context、Product、Version、Dependency、State 和 Validation 的理解。"
                }
              />
            </p>
          </div>
        </section>
        <section className={styles.next} aria-labelledby="next-title">
          <div>
            <p className={styles.eyebrow}>FROM MODEL TO DESIGN DECISIONS</p>
            <h2 id="next-title">
              <T text={"问题被重新建模，"} />
              <br />
              <T text={"默认假设也需要重新审视。"} />
            </h2>
          </div>
          <div>
            <p>Compatibility　/　Modularity　/　State　/　Executable Rules</p>
            <a href={sitePath("/design-innovation/")}>
              02 / DESIGN &amp; INNOVATION ↗
            </a>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <span>WEFT / PPL · SYSTEMATIC THINKING</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </div>
  );
}
