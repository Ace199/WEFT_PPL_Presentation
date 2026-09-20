import type { Copy, DecisionId } from "./decisions";

export const decisionCards: Record<
  DecisionId,
  {
    before: string;
    problem: Copy;
    takeaway: Copy;
    example: string;
  }
> = {
  compatibility: {
    before:
      "TIME →\nAsset   G2 ─────────→ G3\n\nHistorical Shot A\n        └─ forced to follow G3",
    problem: {
      zh: "把当前资产的最新版本当成所有历史结果的唯一输入，上游的小修改也可能迫使已发布、可正常渲染的 Animation / RigCache 失效。",
      en: "Treating the current asset latest as the only input for every historical result can invalidate published, renderable Animation / RigCache after a small upstream change.",
    },
    takeaway: {
      zh: "历史成果保留兼容依赖，新工作继续向前。Mint 表示合法的兼容关系，而非最新版本。",
      en: "Historical work keeps compatible dependencies; new work moves forward. Mint marks a valid compatibility relation, not the latest version.",
    },
    example: "RigCache USD / Compatibility Reference",
  },
  modularity: {
    before:
      "Ani v001\n├ Camera\n├ Character A\n├ Character B\n└ Set\n\nCharacter A changes\n         ↓\nWhole package gets another version",
    problem: {
      zh: "版本属于整个 Ani Package，局部资源的演进历史被整体包版本吞掉。",
      en: "The version belongs to the whole Ani package, obscuring each resource’s own history.",
    },
    takeaway: {
      zh: "改变的是 Version Ownership 和 Composition Model：每个模块保留身份、版本、依赖和状态，再显式组合进 Workspace。",
      en: "Change version ownership and the composition model: each module keeps its identity, version, dependency and state before explicit workspace composition.",
    },
    example: "Shot Builder / Resource Tree",
  },
  state: {
    before:
      "PUBLISH\nA  v003\n\nWhat changed this time?\n         ≠\nWhat exists now?",
    problem: {
      zh: "仅记录“这次 A 变了”，无法单独回答整个 Shot 当前是什么状态；下游只能猜测、回溯或重建历史。",
      en: "Recording only that A changed cannot describe the current shot. Downstream work must guess, trace or reconstruct its history.",
    },
    takeaway: {
      zh: "这次发生了什么变化，与现在完整存在什么，是两个不同的问题。",
      en: "What changed this time? ≠ What exists now?",
    },
    example: "Publish Delta / Current Shot State",
  },
  execution: {
    before:
      "PIPELINE GUIDE\n\n• Naming conventions\n• Directory structure\n• Dependency rules\n• Check before publishing\n\n         ↓\nArtist remembers correctly",
    problem: {
      zh: "Documentation 描述了规则，但没有执行规则；正确交付仍然依赖 Artist 的记忆。",
      en: "Documentation describes rules but does not execute them. Correct delivery still depends on artists remembering.",
    },
    takeaway: {
      zh: "Builder 减少无效起始状态；Resolution 约束依赖；Publish / QC 验证交付边界。",
      en: "Builder reduces invalid starting states; Resolution constrains dependencies; Publish / QC validates the delivery boundary.",
    },
    example: "Publish / QC Execution",
  },
};
