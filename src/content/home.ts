export interface ViewContent {
  mode: "organize" | "transform" | "operate";
  index: string;
  title: string;
  question: string;
  description: string;
}
export const home = {
  name: "WEFT / PPL",
  hero: {
    title: "WEFT / PPL",
    subtitle: "跨软件协作的动画生产系统",
    description: "让不同人、不同软件产出的制作成果，能够正确交接和组合。",
    facts: ["Maya / Houdini", "2-person team", "Active Production"],
  },
  summary: {
    title: "独立变化，也能协同工作。",
    description:
      "WEFT / PPL 将任务、制作成果、版本与依赖组织进共享的 Production Model，连接 Maya 与 Houdini 的工作流程。",
  },
  master: {
    title: "ONE SYSTEM / THREE VIEWS",
    subtitle: "同一个系统，三个观察角度。",
  },
  views: [
    {
      mode: "organize",
      index: "01",
      title: "SYSTEMATIC THINKING",
      question: "复杂生产，如何成为系统？",
      description: "将人、软件与文件之间的复杂关系，组织成共享的生产模型。",
    },
    {
      mode: "transform",
      index: "02",
      title: "DESIGN & INNOVATION",
      question: "重新审视默认假设，由此形成新的设计判断。",
      description:
        "先确定兼容范围，再选择版本；让模块独立变化，让交付规则可以执行。",
    },
    {
      mode: "operate",
      index: "03",
      title: "IN PRACTICE",
      question: "设计如何进入真实制作？",
      description: "Builder、Loader、Publish 与跨 DCC 工作流如何执行同一套 Production Model。",
    },
  ] satisfies ViewContent[],
  proof: {
    title: "IN PRODUCTION",
    description: "",
    facts: [
      ["DCC Software", "Maya 2022 / Houdini 21–22"],
      ["SYSTEM", "Rez / Ftrack / Pyblish"],
      ["WORKFLOW", "Builder / Loader / Publish / Dailies"],
      ["Production Format", "USD / Alembic"],
      ["STATUS", "Active / 2026"],
      ["PROJECT", "动画电影《赵子龙》"],
    ],
    figures: [
      {
        id: "01",
        title: "SHOT BUILDER",
        caption: "选择模块与版本，组装镜头。",
        image: "/images/proof/shot-builder.png",
        prototype: "/images/proof/shot-builder-prototype.png",
        width: 1122,
        height: 879,
        alt: "Shot Builder 实际界面：模块、版本选择与组装状态。",
      },
      {
        id: "02",
        title: "PUBLISH / QC",
        caption: "收集、检查与发布，形成明确的交付流程。",
        image: "/images/proof/publish.png",
        prototype: "/images/proof/publish-prototype.png",
        width: 563,
        height: 913,
        alt: "Publish 实际界面：收集、检查、发布与集成步骤。",
      },
    ],
    attribution:
      "2026.04–08 核心开发 · 两人团队。作者作为 Lead Pipeline TD / System Designer 主导架构与核心实现；另一位成员扩展 Production Modules，并主导场景组装核心能力。",
    note: "实际工具界面",
  },
  footer: { tagline: "SAME PIPELINE\nMORE POSSIBILITIES" },
};

// Stable IDs map only to plain, visible copy. Facts, brands in navigation,
// graph labels, URLs, asset paths and motion settings intentionally stay outside.
export const editableFields = {
  "hero.title": {
    label: "Hero 标题",
    kind: "single",
    baseline: home.hero.title,
  },
  "hero.subtitle": {
    label: "Hero 副标题",
    kind: "single",
    baseline: home.hero.subtitle,
  },
  "hero.description": {
    label: "Hero 说明",
    kind: "multi",
    baseline: home.hero.description,
  },
  "summary.title": {
    label: "系统摘要标题",
    kind: "single",
    baseline: home.summary.title,
  },
  "summary.description": {
    label: "系统摘要说明",
    kind: "multi",
    baseline: home.summary.description,
  },
  "master.title": {
    label: "Master Canvas 标题",
    kind: "single",
    baseline: home.master.title,
  },
  "master.subtitle": {
    label: "Master Canvas 副标题",
    kind: "single",
    baseline: home.master.subtitle,
  },
  "views.organize.title": {
    label: "Organize 视角标题",
    kind: "single",
    baseline: home.views[0].title,
  },
  "views.organize.question": {
    label: "Organize 引导文案",
    kind: "multi",
    baseline: home.views[0].question,
  },
  "views.organize.description": {
    label: "Organize 说明",
    kind: "multi",
    baseline: home.views[0].description,
  },
  "views.transform.title": {
    label: "Transform 视角标题",
    kind: "single",
    baseline: home.views[1].title,
  },
  "views.transform.question": {
    label: "Transform 引导文案",
    kind: "multi",
    baseline: home.views[1].question,
  },
  "views.transform.description": {
    label: "Transform 说明",
    kind: "multi",
    baseline: home.views[1].description,
  },
  "views.operate.title": {
    label: "Operate 视角标题",
    kind: "single",
    baseline: home.views[2].title,
  },
  "views.operate.question": {
    label: "Operate 引导文案",
    kind: "multi",
    baseline: home.views[2].question,
  },
  "views.operate.description": {
    label: "Operate 说明",
    kind: "multi",
    baseline: home.views[2].description,
  },
  "proof.title": {
    label: "生产实践标题",
    kind: "single",
    baseline: home.proof.title,
  },
  "proof.description": {
    label: "生产实践说明",
    kind: "multi",
    baseline: home.proof.description,
  },
  "proof.fig01.title": {
    label: "图 01 标题",
    kind: "single",
    baseline: home.proof.figures[0].title,
  },
  "proof.fig01.caption": {
    label: "图 01 图注",
    kind: "multi",
    baseline: home.proof.figures[0].caption,
  },
  "proof.fig02.title": {
    label: "图 02 标题",
    kind: "single",
    baseline: home.proof.figures[1].title,
  },
  "proof.fig02.caption": {
    label: "图 02 图注",
    kind: "multi",
    baseline: home.proof.figures[1].caption,
  },
  "footer.tagline": {
    label: "页脚展示文案",
    kind: "multi",
    baseline: home.footer.tagline,
  },
} as const;
export type EditableFieldId = keyof typeof editableFields;
export type FieldRegistry = Record<
  EditableFieldId,
  {
    readonly label: string;
    readonly kind: "single" | "multi";
    readonly baseline: string;
  }
>;
