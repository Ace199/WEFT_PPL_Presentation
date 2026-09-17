"use client";
import { useLanguage } from "./Language";
import {
  useEffect,
  useReducer,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { nodes, presets, type View } from "@/data/graph";
import { canvasReducer } from "@/lib/canvas-state";
import { visualTargets } from "@/lib/visual-targets";
import { motion } from "@/lib/motion";
import type { ViewContent } from "@/content/home";
import { viewRoutes } from "@/content/destinations";
import { sitePath } from "@/lib/paths";
import { ProductionScene } from "./ProductionScene";
import { useReducedMotion } from "./useReducedMotion";
import { EditableText, useEditingActivity } from "./editor/TextPreview";
import styles from "./MasterCanvas.module.css";
const order: View[] = ["overview", "organize", "transform", "extend"];
export function MasterCanvas({ views }: { views: ViewContent[] }) {
  const {t} = useLanguage();
  const [state, dispatch] = useReducer(canvasReducer, { mode: "overview" });
  const [debug, setDebug] = useState(false);
  const root = useRef<HTMLElement>(null);
  const leave = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const locked = useRef(false);
  const reduced = useReducedMotion();
  const editing = useEditingActivity();
  const targets = visualTargets(state);
  const selected = views.find((v) => v.mode === state.mode);
  const focused = nodes.find((n) => n.id === state.focusedNode);
  const cancelLeave = () => clearTimeout(leave.current);
  const enter = (view: View, pin = false) => {
    cancelLeave();
    if (pin) locked.current = true;
    dispatch({ type: "ENTER_VIEW", view });
  };
  const inspect = (id?: string) => dispatch(id ? {type: "FOCUS_NODE", id} : {type: "BLUR_NODE"});
  const selectNode = (id: string) => {
    cancelLeave();
    locked.current = true;
    dispatch({type: "SELECT_NODE", id});
  };
  const reset = () => {
    cancelLeave();
    locked.current = false;
    dispatch({ type: "RESET" });
  };
  useEffect(() => () => clearTimeout(leave.current), []);
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const key = (event: globalThis.KeyboardEvent) => {
      if (
        event.key.toLowerCase() === "d" &&
        !(event.target instanceof HTMLInputElement)
      )
        setDebug((v) => !v);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  const keys = (event: KeyboardEvent<HTMLButtonElement>, current: View) => {
    let index = order.indexOf(current);
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      index = (index + 1) % 4;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      index = (index + 3) % 4;
    else if (event.key === "Home") index = 0;
    else if (event.key === "End") index = 3;
    else return;
    event.preventDefault();
    locked.current = true;
    root.current
      ?.querySelector<HTMLButtonElement>(`[data-control="${order[index]}"]`)
      ?.focus();
  };
  return (
    <section
      id="views"
      ref={root}
      className={styles.master}
      aria-labelledby="views-title"
      data-mode={state.mode}
      data-settled="false"
      data-focused-node={state.focusedNode ?? ""}
      data-pinned-node={state.pinnedNode ?? ""}
      onPointerEnter={cancelLeave}
      onPointerLeave={(e) => {
        if (
          e.pointerType === "mouse" &&
          !locked.current &&
          !root.current?.contains(document.activeElement)
        )
          leave.current = setTimeout(reset, motion.leaveDelay);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          if (state.focusedNode || state.pinnedNode) dispatch({type: "CLEAR_NODE"});
          else reset();
        }
      }}
    >
      <div className={styles.composition}>
        <header className={styles.heading}>
          <h2 id="views-title">
            <EditableText id="master.title" />
          </h2>
          <p>
            <EditableText id="master.subtitle" />
          </p>
        </header>
        <div className={styles.stage}>
          <ProductionScene mode={state.mode} quiet={reduced || editing}
            focusedNode={state.focusedNode} pinnedNode={state.pinnedNode}
            onInspect={inspect} onSelect={selectNode}
            onClear={() => dispatch({type: "CLEAR_NODE"})} />
        </div>
        <div className={styles.inspector} aria-label={t("检查生产模型节点")}>
          {nodes.filter(node => presets[state.mode].visibleNodes.includes(node.id)).map(node => (
            <button key={node.id} data-hit={node.id}
              aria-label={`${t("检查")} ${node.label}`} aria-pressed={state.pinnedNode === node.id}
              data-active={state.focusedNode === node.id}
              onFocus={() => dispatch({type:"FOCUS_NODE",id:node.id})}
              onBlur={() => dispatch({type:"BLUR_NODE"})}
              onPointerEnter={e => {if(e.pointerType==="mouse") dispatch({type:"FOCUS_NODE",id:node.id});}}
              onPointerLeave={e => {if(document.activeElement !== e.currentTarget) inspect();}}
              onClick={() => selectNode(node.id)}>
              {node.label}
            </button>
          ))}
        </div>
        <div className={styles.controllers} aria-label={t("观察角度")}>
          {views.map((view) => (
            <div
              key={view.mode}
              className={`${styles.control} ${styles[view.mode]}`}
            >
              <button
                id={`view-${view.mode}`}
                className={styles.previewControl}
                data-control={view.mode}
                aria-pressed={state.mode === view.mode}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") {
                    locked.current = false;
                    enter(view.mode);
                  }
                }}
                onFocus={() => enter(view.mode)}
                onClick={() => enter(view.mode, true)}
                onKeyDown={(e) => keys(e, view.mode)}
              >
                <span className={styles.controlIndex}>
                  {view.index} / <EditableText id={`views.${view.mode}.title`} />
                </span>
                <span className={styles.dash}>—</span>
                <strong>
                  <EditableText id={`views.${view.mode}.question`} />
                </strong>
              </button>
              <a
                className={styles.action}
                href={sitePath(viewRoutes[view.mode])}
                aria-label={`EXPLORE ${view.title}`}
                onFocus={() => enter(view.mode)}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") enter(view.mode);
                }}
              >
                EXPLORE <span aria-hidden="true">↗</span>
              </a>
            </div>
          ))}
        </div>
        <div className={styles.explanation} aria-live="polite" aria-atomic="true">
          {focused ? (
            <>
              <b>{focused.label}</b>
              <p>{t(focused.description)}</p>
            </>
          ) : selected ? (
            <>
              <b>
                {state.mode === "extend"
                  ? t("— 现有结构　┄ 未来方向")
                  : state.mode === "transform"
                    ? "TRANSFORM PREVIEW"
                    : "COMPLEXITY → MODEL"}
              </b>
              <p>
                <EditableText id={`views.${selected.mode}.description`} />
              </p>
              {state.mode === "transform" ? (
                <p className={styles.transformMoves}>{t("最新 → 兼容 · 整包 → 独立模块")}<br />{t("局部变化 → 完整状态 · 书面规则 → 可执行流程")}</p>
              ) : null}
            </>
          ) : (
            <>
              <b>SHARED PRODUCTION MODEL</b>
              <p>{t("任务、制作成果、版本与依赖，在同一模型中连接。")}</p>
            </>
          )}
        </div>
        <div className={styles.bottom}>
          <button
            data-control="overview"
            aria-pressed={state.mode === "overview"}
            onFocus={() => enter("overview")}
            onClick={reset}
            onKeyDown={(e) => keys(e, "overview")}
          >
            OVERVIEW <span aria-hidden="true">↺</span>
          </button>
          <span className={styles.mode}>
            VIEW MODE /{" "}
            {state.mode === "transform"
              ? "TRANSFORM PREVIEW"
              : state.mode.toUpperCase()}
          </span>
          <span className={styles.hint}>{t("结构示意 · 版本号仅作说明")}</span>
        </div>
      </div>
      <details className={styles.textModel}>
        <summary>{t("查看模型文字说明")}</summary>
        <dl>
          {nodes
            .filter((n) => presets[state.mode].visibleNodes.includes(n.id))
            .map((n) => (
              <div key={n.id}>
                <dt>{n.label}</dt>
                <dd>{t(n.description)}</dd>
              </div>
            ))}
        </dl>
      </details>
      {debug ? (
        <pre className={styles.debug}>
          {JSON.stringify(
            {
              ...state,
              reducedMotion: reduced,
              content: "LOCAL",
              nodes: targets.nodes.filter((n) => n.visible).length,
            },
            null,
            2,
          )}
        </pre>
      ) : null}
      <noscript>
        <p className={styles.noScript}>{t("静态概览：Context → Product → Version → Dependency → Resolution → Composition → State → Validation。交互预览需要 JavaScript；下方保留完整文字说明。")}</p>
      </noscript>
    </section>
  );
}
