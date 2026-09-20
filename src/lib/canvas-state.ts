import { nodes, presets, type View } from "@/data/graph";
export type MasterState =
  | { mode: "overview" | "organize" | "operate"; focusedNode?: string; pinnedNode?: string }
  | { mode: "transform"; scene: "preview"; focusedNode?: string; pinnedNode?: string };
export type CanvasEvent =
  | { type: "ENTER_VIEW"; view: View }
  | { type: "FOCUS_NODE"; id: string }
  | { type: "BLUR_NODE" }
  | { type: "SELECT_NODE"; id: string }
  | { type: "CLEAR_NODE" }
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
      return { ...state, focusedNode: state.pinnedNode };
    case "SELECT_NODE":
      if (!nodes.some(n => n.id === event.id) || !presets[state.mode].visibleNodes.includes(event.id)) return state;
      return state.pinnedNode === event.id
        ? { ...state, focusedNode: undefined, pinnedNode: undefined }
        : { ...state, focusedNode: event.id, pinnedNode: event.id };
    case "CLEAR_NODE":
      return { ...state, focusedNode: undefined, pinnedNode: undefined };
    case "RESET":
      return { mode: "overview" };
  }
}
