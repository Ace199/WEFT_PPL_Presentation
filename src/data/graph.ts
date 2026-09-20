export type View = "overview" | "organize" | "transform" | "operate";
export type Role =
  | "context"
  | "product"
  | "version"
  | "dependency"
  | "state"
  | "validation"
  | "resolution"
  | "composition"
  | "execution"
  | "host";
export type Point = { x: number; y: number };
export interface GraphNode {
  id: string;
  label: string;
  role: Role;
  description: string;
  tags: View[];
}
const core = [
  ["context", "CONTEXT", "任务上下文：明确这次工作属于哪里。"],
  ["product", "PRODUCT", "制作成果：可以独立交付、选择和组合的单位。"],
  ["version", "VERSION", "版本：记录某项制作成果的一次具体交付。"],
  ["dependency", "DEPENDENCY", "依赖：记录制作成果之间需要满足的关系。"],
  ["state", "STATE", "状态：保留完整的当前镜头状态，包括明确删除。"],
  ["validation", "VALIDATION", "校验：在发布边界执行交付规则。"],
  ["resolution", "RESOLUTION", "解析：先确定兼容范围，再选择具体版本。"],
  ["composition", "COMPOSITION", "组合：将独立选定的制作模块组装到工作环境。"],
] as const;
export const nodes: GraphNode[] = [
  ...core.map(([id, label, description]) => ({
    id,
    label,
    role: id,
    description,
    tags: ["overview", "organize", "transform", "operate"] as View[],
  })),
  ...([
    ["builder", "BUILDER", "Builder：将任务上下文和制作模块带入工作的起始场景。"],
    ["loader", "LOADER", "Loader：在工作环境中发现、选择和载入制作成果。"],
    ["publish", "PUBLISH", "Publish：把交付规则放进收集、检查和发布的执行边界。"],
    ["review", "REVIEW", "Review：通过 Dailies 工作流让制作成果进入审阅。"],
    ["maya", "MAYA", "Maya：共享生产模型连接的制作环境之一。"],
    ["houdini", "HOUDINI", "Houdini：共享生产模型连接的制作与组合环境之一。"],
  ] as const).map(([id, label, description]) => ({
    id, label, description, role: (id === "maya" || id === "houdini" ? "host" : "execution") as Role,
    tags: ["operate"] as View[],
  })),
];
export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relation:
    "contains" | "depends" | "validates" | "resolves" | "composes" | "executes";
}
export const edges: GraphEdge[] = [
  // Conceptual relationships, not a claim of a universal tool sequence per DCC.
  ...["builder", "loader", "publish", "review"].map(target => ({
    id: `model-${target}`, source: "context", target, relation: "executes" as const,
  })),
  {id:"publish-state",source:"publish",target:"state",relation:"contains"},
  ...["maya", "houdini"].map(source => ({
    id: `${source}-workspace`, source, target: "composition", relation: "composes" as const,
  })),
  {id:"builder-maya",source:"builder",target:"maya",relation:"executes"},
  {id:"resolution-houdini",source:"resolution",target:"houdini",relation:"resolves"},
  {
    id: "context-product",
    source: "context",
    target: "product",
    relation: "contains",
  },
  {
    id: "product-version",
    source: "product",
    target: "version",
    relation: "contains",
  },
  {
    id: "version-dependency",
    source: "version",
    target: "dependency",
    relation: "depends",
  },
  {
    id: "dependency-resolution",
    source: "dependency",
    target: "resolution",
    relation: "resolves",
  },
  {
    id: "resolution-composition",
    source: "resolution",
    target: "composition",
    relation: "composes",
  },
  {
    id: "product-composition",
    source: "product",
    target: "composition",
    relation: "composes",
  },
  {
    id: "composition-state",
    source: "composition",
    target: "state",
    relation: "contains",
  },
  {
    id: "state-validation",
    source: "state",
    target: "validation",
    relation: "validates",
  },
  {
    id: "validation-version",
    source: "validation",
    target: "version",
    relation: "validates",
  },
];
const overview: Point[] = [
  { x: 210, y: 335 },
  { x: 380, y: 330 },
  { x: 525, y: 190 },
  { x: 525, y: 275 },
  { x: 565, y: 440 },
  { x: 625, y: 355 },
  { x: 380, y: 425 },
  { x: 835, y: 385 },
];
const organize: Point[] = [
  { x: 240, y: 255 },
  { x: 405, y: 255 },
  { x: 570, y: 255 },
  { x: 735, y: 255 },
  { x: 735, y: 410 },
  { x: 570, y: 410 },
  { x: 405, y: 410 },
  { x: 240, y: 410 },
];
const transform: Point[] = [
  { x: 225, y: 300 },
  { x: 415, y: 205 },
  { x: 415, y: 340 },
  { x: 610, y: 340 },
  { x: 625, y: 440 },
  { x: 830, y: 440 },
  { x: 815, y: 275 },
  { x: 625, y: 205 },
];
export interface ViewPreset {
  positions: Record<string, Point>;
  visibleNodes: string[];
  activeNodes: string[];
}
const operatePositions: Record<string, Point> = {
  context:{x:665,y:169}, product:{x:665,y:285}, version:{x:277,y:502},
  dependency:{x:515,y:289}, state:{x:665,y:372}, validation:{x:665,y:285},
  resolution:{x:467,y:316}, composition:{x:1105,y:388},
  builder:{x:500,y:91}, loader:{x:610,y:62}, publish:{x:720,y:62},
  review:{x:830,y:91}, maya:{x:760,y:451}, houdini:{x:570,y:451},
};
export const presets = Object.fromEntries(
  (["overview", "organize", "transform", "operate"] as View[]).map((view) => {
    const layout = { overview, organize, transform, operate: overview }[view];
    return [
      view,
      {
        positions: Object.fromEntries(
          nodes.map((n, i) => [n.id, view === "operate" ? operatePositions[n.id] : layout[i] ?? operatePositions[n.id]]),
        ),
        visibleNodes: nodes.filter(n => n.tags.includes(view)).map((n) => n.id),
        activeNodes:
          view === "overview"
            ? ["product", "state", "composition"]
            : nodes.filter(n => n.tags.includes(view)).map(n => n.id),
      },
    ];
  }),
) as Record<View, ViewPreset>;
