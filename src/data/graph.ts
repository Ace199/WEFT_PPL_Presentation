export type View = "overview" | "organize" | "transform" | "extend";
export type Role =
  | "context"
  | "product"
  | "version"
  | "dependency"
  | "state"
  | "validation"
  | "resolution"
  | "composition"
  | "future";
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
    tags: ["overview", "organize", "transform", "extend"] as View[],
  })),
  ...[
    "Governance",
    "Recovery",
    "Observability",
    "Regression",
    "Scale-aware coordination",
  ].map((label, i) => ({
    id: `future-${i}`,
    label: label.toUpperCase(),
    role: "future" as const,
    description: `${label}：未来演进方向，尚不表示已实现。`,
    tags: ["extend"] as View[],
  })),
];
export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relation:
    "contains" | "depends" | "validates" | "resolves" | "composes" | "evolves";
}
export const edges: GraphEdge[] = [
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
  ...["validation", "state", "context", "version", "composition"].map(
    (source, i) => ({
      id: `future-edge-${i}`,
      source,
      target: `future-${i}`,
      relation: "evolves" as const,
    }),
  ),
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
const extend: Point[] = overview.map((p) => ({ x: p.x * 0.74 + 35, y: p.y }));
const future: Point[] = [
  { x: 910, y: 220 },
  { x: 980, y: 295 },
  { x: 970, y: 365 },
  { x: 940, y: 435 },
  { x: 845, y: 490 },
];
export interface ViewPreset {
  positions: Record<string, Point>;
  visibleNodes: string[];
  activeNodes: string[];
}
export const presets = Object.fromEntries(
  (["overview", "organize", "transform", "extend"] as View[]).map((view) => {
    const layout = { overview, organize, transform, extend }[view];
    return [
      view,
      {
        positions: Object.fromEntries(
          nodes.map((n, i) => [n.id, i < 8 ? layout[i] : future[i - 8]]),
        ),
        visibleNodes: nodes
          .filter((n) => n.role !== "future" || view === "extend")
          .map((n) => n.id),
        activeNodes:
          view === "overview"
            ? ["product", "state", "composition"]
            : core.map((n) => n[0]),
      },
    ];
  }),
) as Record<View, ViewPreset>;
