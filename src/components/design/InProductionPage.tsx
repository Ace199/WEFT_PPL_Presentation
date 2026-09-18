import { SiteHeader } from "@/components/SiteHeader";
import { decisions, type Copy } from "@/content/decisions";
import { sitePath } from "@/lib/paths";
import { DesignText as T } from "./DesignText";
import { DesignFooter } from "./DesignPage";
import { ProductionArtifact } from "./ProductionArtifact";
import styles from "./DesignPage.module.css";

const details: { paragraphs: Copy[]; boundary: Copy }[] = [
  {
    paragraphs: [
      {
        zh: "工作阶段使用当前生产状态，方便制作继续向前。正式发布时，已经使用的依赖关系被保留下来，使历史成果拥有自己的兼容依据。",
        en: "Working references follow the current production state. At publish time, the dependencies actually used are retained, giving published results their own compatibility basis.",
      },
      {
        zh: "RigCache USD 同时承载本地动画几何、逻辑 Surface 依赖和兼容约束。下游先根据约束确定可选 Surface 范围，再在这个范围中寻找版本。",
        en: "RigCache USD combines local animated geometry, a logical Surface dependency and a compatibility constraint. Downstream resolution establishes the eligible Surface scope before choosing a version within it.",
      },
      {
        zh: "例如，Shot A 已发布的成果保留 G2 依赖；Shot B 的新工作可以使用 G3。两条路径都可以成立，兼容性取决于各自的依赖关系。",
        en: "For example, Shot A’s published result retains a G2 dependency while new work on Shot B uses G3. Both paths can be valid: compatibility is determined by their respective dependencies.",
      },
    ],
    boundary: {
      zh: "这里展示的是生产结构的简化表达。无兼容候选时的处理、Resolver 刷新行为仍需单独的运行时记录核验。",
      en: "This is a simplified representation of the production structure. Missing-candidate behavior and resolver refresh behavior still require separate runtime records.",
    },
  },
  {
    paragraphs: [
      {
        zh: "镜头工作场景由可独立选择的 Production Modules 组成。Shot Builder 将资源树、版本选择与状态放在同一处，让局部更新拥有明确的作用范围。",
        en: "A shot workspace consists of independently selectable production modules. Shot Builder presents the resource tree, version selection and state together, giving each local update an explicit scope.",
      },
      {
        zh: "Camera、Set、RigCache 及适用的下游模块可以分别发现、选版和更新。组合进入 Houdini 场景之后，各模块仍保留自己的身份和版本边界。",
        en: "Camera, Set, RigCache and applicable downstream modules can be discovered, version-selected and updated separately. Composition into Houdini preserves each module’s identity and version boundary.",
      },
      {
        zh: "这张真实界面节选保留了资源树、Version 和 State 列及原始状态。它说明工具如何组织资源，并不表示图中每个资源都已加载或组装完成。",
        en: "This original UI crop retains the resource tree, Version and State columns and their actual states. It shows resource organization, not a claim that every visible resource is loaded or assembled.",
      },
    ],
    boundary: {
      zh: "Hair 可以出现在资源结构中，但完整 Hair Assembly 仍在演进；这里不将资源可见性当作完整组装的证明。",
      en: "Hair can appear in the resource structure, while complete Hair assembly is still evolving. Resource visibility does not establish completed assembly.",
    },
  },
  {
    paragraphs: [
      {
        zh: "一次 Publish 可以只描述本次发生的变化。系统将这些变化与之前的记录合并，保留未变化的条目，形成当前完整镜头状态。",
        en: "A publish can describe only the current change. The system merges it into the previous record, retains unchanged entries and maintains the full current shot state.",
      },
      {
        zh: "在简化示例中，A 从 v002 更新为 v003，B v001 与 Cam v003 保留。Change 回答“这次改了什么”，Current Record 回答“现在有哪些成果”。",
        en: "In this simplified example, A moves from v002 to v003 while B v001 and Cam v003 remain. The change describes what happened this time; the current record describes what exists now.",
      },
      {
        zh: "更细的记录语义还包含 Task Record、Ani Master Record 与显式删除标记。删除需要被明确记录，不能仅因本次未发布某个条目就将它当作删除。",
        en: "The deeper record semantics include task records, the animation master record and explicit deletion markers. Deletion must be recorded explicitly; omission from one publish does not mean removal.",
      },
    ],
    boundary: {
      zh: "此处的数据是简化语义示例，并非生产记录的原样导出。Shot Builder 的具体记录来源和并发主记录更新，仍需独立核验。",
      en: "The data is a simplified semantic example, not a raw production record export. Shot Builder’s exact record source and concurrent master-record updates still require separate verification.",
    },
  },
  {
    paragraphs: [
      {
        zh: "Builder 在制作起点建立正确上下文；Resolution 在选择依赖时应用规则；Publish / QC 在正式交付边界检查成果。规则按其影响范围进入对应执行点。",
        en: "Builder establishes the starting context; resolution applies dependency rules; Publish / QC checks work at the delivery boundary. Each rule is attached to the execution point where it matters.",
      },
      {
        zh: "交付检查通过后才能继续相应发布路径；检查失败则报告问题并停止该路径。Artist 仍需要明确选择上下文、资源和版本。",
        en: "Passing delivery checks permits the corresponding publish path to continue. Failing checks reports the problem and stops that path. Artists still explicitly select context, resources and versions.",
      },
      {
        zh: "界面中的 Collect、QC Context 与 Pub Context，将收集、上下文检查与发布组织在同一执行入口。底部控件展示 Collect / QC / Publish 的执行阶段。",
        en: "Collect, QC Context and Pub Context bring collection, context checks and publishing into one execution interface. The controls below show the Collect / QC / Publish stages.",
      },
    ],
    boundary: {
      zh: "这张截图展示规则进入工具的方式，不代表所有检查均通过，也不代表发布具备完整事务恢复能力。发布恢复属于后续工程方向。",
      en: "The screenshot shows how rules enter the tool. It does not establish that every check passed or that publishing has full transactional recovery. Recovery remains a future engineering direction.",
    },
  },
];
export function InProductionPage() {
  return (
    <div className={styles.page} id="top">
      <a className="skip" href="#production-main">
        <T zh="跳到正文" en="Skip to content" />
      </a>
      <SiteHeader current="in-production" boundaryId="production-details" />
      <main id="production-main">
        <section className={styles.detailIntro}>
          <p className={styles.label}>IN PRODUCTION</p>
          <h1>
            <T
              zh="设计如何进入真实生产。"
              en="Design decisions in real production."
            />
          </h1>
          <p>How the design decisions exist in production.</p>
          <p>
            <T
              zh="从四项设计决策，进入它们对应的生产结构、记录语义与执行界面。"
              en="Explore the production structures, record semantics and execution interfaces behind the four decisions."
            />
          </p>
          <nav className={styles.detailNav} aria-label="Production chapters">
            {decisions.map((d) => (
              <a href={`#${d.id}`} key={d.id}>
                {d.index} / {d.category}
              </a>
            ))}
          </nav>
        </section>
        <div className={styles.details} id="production-details">
          {decisions.map((d, i) => (
            <section
              id={d.id}
              key={d.id}
              aria-labelledby={`production-${d.id}`}
            >
              <p className={styles.label}>
                02.{d.index} / {d.category}
              </p>
              <div className={styles.detailGrid}>
                <div>
                  <h2 id={`production-${d.id}`}>
                    <T {...d.title} />
                  </h2>
                  {details[i].paragraphs.map((p, j) => (
                    <p key={j}>
                      <T {...p} />
                    </p>
                  ))}
                </div>
                <div>
                  <ProductionArtifact id={d.id} />
                  <p className={styles.boundary}>
                    <T {...details[i].boundary} />
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>
        <div className={styles.next}>
          <a href={sitePath("/design-innovation/")}>
            ← 02 / DESIGN &amp; INNOVATION
          </a>
        </div>
      </main>
      <DesignFooter />
    </div>
  );
}
