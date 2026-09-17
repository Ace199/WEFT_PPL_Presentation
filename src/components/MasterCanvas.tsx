"use client";
import {
  useEffect,
  useReducer,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import dynamic from "next/dynamic";
import { nodes, presets, type View } from "@/data/graph";
import { canvasReducer } from "@/lib/canvas-state";
import { visualTargets, edgePath } from "@/lib/visual-targets";
import { motion } from "@/lib/motion";
import type { ViewContent } from "@/content/home";
import { viewRoutes } from "@/content/destinations";
import { sitePath } from "@/lib/paths";
import { GraphStructure } from "./Diagrams";
import { useReducedMotion } from "./useReducedMotion";
import { EditableText, useEditingActivity } from "./editor/TextPreview";
import styles from "./MasterCanvas.module.css";
const Ambient = dynamic(() => import("./CanvasAmbient"), { ssr: false });
const initialTargets = visualTargets({ mode: "overview" });
const order: View[] = ["overview", "organize", "transform", "extend"];
export function MasterCanvas({ views }: { views: ViewContent[] }) {
  const [state, dispatch] = useReducer(canvasReducer, { mode: "overview" });
  const [debug, setDebug] = useState(false);
  const [inView, setInView] = useState(false);
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
  const reset = () => {
    cancelLeave();
    locked.current = false;
    dispatch({ type: "RESET" });
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "150px" },
    );
    if (root.current) observer.observe(root.current);
    return () => {
      observer.disconnect();
      clearTimeout(leave.current);
    };
  }, []);
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
  useEffect(() => {
    if (!root.current) return;
    let cancelled = false;
    let timeline: gsap.core.Timeline | undefined;
    const element = root.current;
    const next = visualTargets(state);
    element.dataset.settled = "false";
    const apply = async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;
      timeline = gsap.timeline({
        defaults: {
          duration: reduced
            ? 0
            : state.mode === "transform"
              ? motion.preview
              : motion.normal,
          ease: motion.ease,
          overwrite: "auto",
        },
        onComplete: () => {
          element.dataset.settled = "true";
        },
      });
      next.nodes.forEach((node) => {
        const group = element.querySelector(`[data-node="${node.id}"]`);
        const hit = element.querySelector(`[data-hit="${node.id}"]`);
        timeline!.to(
          group,
          {
            attr: { transform: `translate(${node.x} ${node.y})` },
            opacity: node.opacity,
          },
          0,
        );
        timeline!.to(
          hit,
          { left: `${node.x / 11}%`, top: `${node.y / 6.8}%` },
          0,
        );
      });
      next.edges.forEach((edge) =>
        timeline!.to(
          element.querySelector(`[data-edge="${edge.id}"]`),
          { attr: { d: edgePath(edge.a, edge.b) }, opacity: edge.opacity },
          0,
        ),
      );
      timeline.to(
        element.querySelector(".graph-structure"),
        {
          opacity:
            state.mode === "organize"
              ? 0.12
              : state.mode === "transform"
                ? 0.3
                : 0.85,
        },
        0,
      );
    };
    void apply();
    return () => {
      cancelled = true;
      timeline?.kill();
    };
  }, [state, reduced]);
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
        if (e.key === "Escape") reset();
      }}
    >
      <div className={styles.composition}>
        {inView && !reduced && !editing ? <Ambient /> : null}
        <header className={styles.heading}>
          <h2 id="views-title">
            <EditableText id="master.title" />
          </h2>
          <p>
            <EditableText id="master.subtitle" />
          </p>
        </header>
        <div className={styles.stage}>
          <svg className={styles.graph} viewBox="0 0 1100 680" aria-hidden="true">
            <GraphStructure />
            <g fill="none">
              {initialTargets.edges.map((edge) => (
                <path
                  key={edge.id}
                  data-edge={edge.id}
                  d={edgePath(edge.a, edge.b)}
                  opacity={edge.opacity}
                  stroke={edge.relation === "evolves" ? "#afbab4" : "#a0d9c2"}
                  strokeWidth="1"
                  strokeDasharray={
                    edge.relation === "evolves" ? "6 7" : undefined
                  }
                />
              ))}
            </g>
            {initialTargets.nodes.map((node) => (
              <g
                key={node.id}
                data-node={node.id}
                transform={`translate(${node.x} ${node.y})`}
                opacity={node.opacity}
              >
                <circle
                  r="11"
                  fill="#1d211f"
                  stroke={node.role === "future" ? "#adb6b0" : "#d8e4dd"}
                  strokeWidth=".8"
                />
                <circle
                  r={targets.nodes.find((n) => n.id === node.id)?.active ? 5 : 3}
                  fill={
                    targets.nodes.find((n) => n.id === node.id)?.active
                      ? "#9ce4c7"
                      : "#d0d6d2"
                  }
                />
                <text
                  className={styles.nodeLabel}
                  x={node.role === "future" ? -16 : 15}
                  y="-15"
                  textAnchor={node.role === "future" ? "end" : "start"}
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
          <div className={styles.hits} aria-label="检查生产模型节点">
            {initialTargets.nodes.map((node) => (
              <button
                key={node.id}
                data-hit={node.id}
                aria-label={`检查 ${node.label}`}
                aria-pressed={state.focusedNode === node.id}
                tabIndex={
                  presets[state.mode].visibleNodes.includes(node.id) ? 0 : -1
                }
                hidden={!presets[state.mode].visibleNodes.includes(node.id)}
                style={{ left: `${node.x / 11}%`, top: `${node.y / 6.8}%` }}
                onFocus={() => dispatch({ type: "FOCUS_NODE", id: node.id })}
                onBlur={() => dispatch({ type: "BLUR_NODE" })}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse")
                    dispatch({ type: "FOCUS_NODE", id: node.id });
                }}
                onPointerLeave={() => dispatch({ type: "BLUR_NODE" })}
                onClick={() => dispatch({ type: "FOCUS_NODE", id: node.id })}
              />
            ))}
          </div>
        </div>
        <div className={styles.controllers} aria-label="观察角度">
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
              <p>{focused.description}</p>
            </>
          ) : selected ? (
            <>
              <b>
                {state.mode === "extend"
                  ? "— 现有结构　┄ 未来方向"
                  : state.mode === "transform"
                    ? "TRANSFORM PREVIEW"
                    : "COMPLEXITY → MODEL"}
              </b>
              <p>
                <EditableText id={`views.${selected.mode}.description`} />
              </p>
              {state.mode === "transform" ? (
                <p className={styles.transformMoves}>
                  最新 → 兼容 · 整包 → 独立模块
                  <br />
                  局部变化 → 完整状态 · 书面规则 → 可执行流程
                </p>
              ) : null}
            </>
          ) : (
            <>
              <b>SHARED PRODUCTION MODEL</b>
              <p>任务、制作成果、版本与依赖，在同一模型中连接。</p>
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
          <span className={styles.hint}>选择一个视角，或检查图中节点。</span>
        </div>
      </div>
      <details className={styles.textModel}>
        <summary>查看模型文字说明</summary>
        <dl>
          {nodes
            .filter((n) => presets[state.mode].visibleNodes.includes(n.id))
            .map((n) => (
              <div key={n.id}>
                <dt>{n.label}</dt>
                <dd>{n.description}</dd>
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
        <p className={styles.noScript}>
          静态概览：Context → Product → Version → Dependency → Resolution →
          Composition → State → Validation。交互预览需要
          JavaScript；下方保留完整文字说明。
        </p>
      </noscript>
    </section>
  );
}
