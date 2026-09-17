import { edges, nodes, presets, type Point } from "@/data/graph";
import type { MasterState } from "./canvas-state";
export function visualTargets(state: MasterState) {
  const preset = presets[state.mode];
  const connected = new Set([state.focusedNode]);
  edges
    .filter(
      (e) => e.source === state.focusedNode || e.target === state.focusedNode,
    )
    .forEach((e) => {
      connected.add(e.source);
      connected.add(e.target);
    });
  return {
    nodes: nodes.map((n) => ({
      ...n,
      ...preset.positions[n.id],
      visible: preset.visibleNodes.includes(n.id),
      active: preset.activeNodes.includes(n.id),
      opacity: !preset.visibleNodes.includes(n.id)
        ? 0
        : state.focusedNode && !connected.has(n.id)
          ? 0.25
          : 1,
    })),
    edges: edges.map((e) => ({
      ...e,
      a: preset.positions[e.source],
      b: preset.positions[e.target],
      opacity: !preset.visibleNodes.includes(e.target)
        ? 0
        : state.focusedNode &&
            e.source !== state.focusedNode &&
            e.target !== state.focusedNode
          ? 0.16
          : e.relation === "evolves"
            ? 0.55
            : 0.7,
    })),
  };
}
export function edgePath(a: Point, b: Point) {
  return `M${a.x},${a.y} C${(a.x + b.x) / 2},${a.y} ${(a.x + b.x) / 2},${b.y} ${b.x},${b.y}`;
}
