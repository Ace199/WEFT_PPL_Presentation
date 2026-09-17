import { nodes, presets, type View } from "@/data/graph";
export type MasterState =
  | { mode: "overview" | "organize" | "extend"; focusedNode?: string }
  | { mode: "transform"; scene: "preview"; focusedNode?: string };
export type CanvasEvent =
  | { type: "ENTER_VIEW"; view: View }
  | { type: "FOCUS_NODE"; id: string }
  | { type: "BLUR_NODE" }
  | { type: "RESET" };
export function canvasReducer(
  state: MasterState,
  event: CanvasEvent,
): MasterState {
  switch (event.type) {
    case "ENTER_VIEW":
      return event.view === "transform"
        ? { mode: "transform", scene: "preview" }
        : { mode: event.view };
    case "FOCUS_NODE":
      return nodes.some((n) => n.id === event.id) &&
        presets[state.mode].visibleNodes.includes(event.id)
        ? { ...state, focusedNode: event.id }
        : state;
    case "BLUR_NODE":
      return { ...state, focusedNode: undefined };
    case "RESET":
      return { mode: "overview" };
  }
}
