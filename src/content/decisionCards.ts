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
      zh: "承接模块化发布：Camera、角色等模块可以分别更新，因此单次发布只描述本次变化。将变化合并到已有状态，才能得到镜头当前完整的资源组合。",
      en: "Building on modular publishing: cameras, characters and other modules can update independently, so each publish describes only its changes. Merging those changes into the existing state produces the complete current shot composition.",
    },
    takeaway: {
      zh: "本次更新 A，保留未变更的 B 与 Camera；局部发布持续汇入完整镜头状态。",
      en: "Update A while retaining unchanged B and Camera; partial publishes accumulate into the full shot state.",
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
