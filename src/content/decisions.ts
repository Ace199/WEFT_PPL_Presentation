export type DecisionId = "compatibility" | "modularity" | "state" | "execution";
export type Copy = { zh: string; en: string };
const copy = (zh: string, en: string): Copy => ({ zh, en });
export const decisions = [
  {
    id: "compatibility",
    index: "01",
    category: "COMPATIBILITY",
    label: "Compatible History",
    title: copy(
      "从追随最新，\n到保留兼容历史。",
      "From chasing the latest\nto preserving compatible history.",
    ),
    summary: copy(
      "工作继续向前，\n已经成立的历史成果仍然有效。",
      "Work moves forward.\nPublished results remain valid.",
    ),
    from: "Global latest",
    to: "Compatibility-scoped resolution",
    symptom: copy(
      "历史成果随上游演进而失效。",
      "Historical results break as upstream work evolves.",
    ),
    cause: copy(
      "没有保留 Compatibility History，\n把 Global Latest 当成唯一合法输入。",
      "Compatibility history is not preserved;\nglobal latest becomes the only accepted input.",
    ),
    meaning: copy(
      "已发布 RigCache 保留自己的兼容范围，下游根据这个范围寻找对应 Surface，而不是强制跟随全局最新。",
      "Published RigCache retains its compatibility scope. Downstream resolution finds a Surface within that scope, rather than forcing the global latest.",
    ),
    cta: copy(
      "查看兼容关系如何在生产中工作",
      "See how compatibility works in production",
    ),
    indexLabel: copy("兼容历史", "Compatible history"),
    diagramNote: copy(
      "工作状态向前演进，发布状态保留历史依赖。",
      "Working state moves forward. Published state preserves compatibility.",
    ),
  },
  {
    id: "modularity",
    index: "02",
    category: "MODULARITY",
    label: "Composable Modules",
    title: copy(
      "从整体发布，\n到可组合的生产模块。",
      "From whole packages\nto composable production modules.",
    ),
    summary: copy(
      "变化发生在哪个模块，\n版本边界就落在哪个模块。\n独立 Module 可以分别演进、选版和更新。",
      "Version boundaries follow the module that changes.\nIndependent modules evolve, select versions and update separately.",
    ),
    from: "Monolithic Package",
    to: "Composable Production Modules",
    symptom: copy(
      "局部修改会牵引整体重发。",
      "A local change forces the whole package to be republished.",
    ),
    cause: copy(
      "把独立 Production Products\n绑定在一个整体版本包中。",
      "Independent production products are bound\nto a single package version.",
    ),
    meaning: copy(
      "Shot Builder 将镜头理解为一组可以独立发现、选版和更新的 Production Modules。",
      "Shot Builder treats a shot as production modules that can be discovered, version-selected and updated independently.",
    ),
    cta: copy(
      "查看模块如何进入工作场景",
      "See how modules enter the workspace",
    ),
    indexLabel: copy("模块化工作场景", "Modular workspaces"),
    diagramNote: copy(
      "显式组合进入工作场景，各模块保留自己的身份、版本、依赖和状态。",
      "Explicit composition preserves each module’s identity, version, dependency and state.",
    ),
  },
  {
    id: "state",
    index: "03",
    category: "STATE",
    label: "Full State",
    title: copy(
      "变化是事件，\n状态是完整快照。",
      "A change is an event.\nA state is a full snapshot.",
    ),
    summary: copy(
      "模块独立发布后，每次交付只包含局部变化。\n系统同时维护整个镜头当前完整的 Production State。",
      "With modules published independently, each delivery contains a partial change.\nThe system also maintains the complete current production state of the shot.",
    ),
    from: "Partial Change",
    to: "Materialized Full State",
    symptom: copy(
      "局部发布后，\n难以理解当前完整状态。",
      "After a partial publish,\nthe complete current state is unclear.",
    ),
    cause: copy(
      "把 Change 和 State 混成同一个概念。",
      "Change and state are treated as the same concept.",
    ),
    meaning: copy(
      "Publish 记录本次变化，同时维护累计的 Current Shot State。",
      "Publish records the current change while maintaining the accumulated current shot state.",
    ),
    cta: copy(
      "查看局部发布如何维护完整状态",
      "See how partial publishes maintain full state",
    ),
    indexLabel: copy("局部发布与完整状态", "Partial change, full state"),
    diagramNote: copy(
      "只更新发生变化的 A，B 和 Camera 的状态被保留。",
      "Update A; retain the state of B and Camera.",
    ),
  },
  {
    id: "execution",
    index: "04",
    category: "EXECUTION",
    label: "Executable Rules",
    title: copy(
      "让关键规则，\n进入执行边界。",
      "Put critical rules\nat execution boundaries.",
    ),
    summary: copy(
      "影响 Production Correctness 的规则，不应该只停留在说明文档或 Artist 的记忆里。",
      "Rules that affect production correctness should not rely only on documentation or artists’ memory.",
    ),
    from: "Written Rules",
    to: "Executable Workflow",
    symptom: copy(
      "交付规则依赖 Artist 记忆。",
      "Delivery rules depend on artists remembering them.",
    ),
    cause: copy(
      "把说明文档当成执行机制。",
      "Documentation is treated as an execution mechanism.",
    ),
    meaning: copy(
      "Production Rules 被放进 Builder 和 Publish / QC 的实际执行路径，而不是只存在于 Pipeline 文档。",
      "Production rules run inside Builder and Publish / QC, rather than living only in pipeline documentation.",
    ),
    cta: copy("查看规则如何进入执行流程", "See how rules enter execution"),
    indexLabel: copy("Builder / Publish / QC", "Builder / Publish / QC"),
    diagramNote: copy(
      "规则附着于执行点：建立正确起点、约束依赖，并检查交付边界。",
      "Rules attach to execution points: starting state, dependencies and delivery boundaries.",
    ),
  },
] satisfies Array<{
  id: DecisionId;
  index: string;
  category: string;
  label: string;
  title: Copy;
  summary: Copy;
  from: string;
  to: string;
  symptom: Copy;
  cause: Copy;
  meaning: Copy;
  cta: Copy;
  indexLabel: Copy;
  diagramNote: Copy;
}>;
