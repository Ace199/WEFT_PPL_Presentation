"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "../useReducedMotion";
import { useEditingActivity } from "../editor/TextPreview";
import { DesignText as T } from "./DesignText";
import styles from "./CompatibilityComparison.module.css";

type Point3 = [number, number, number];
function cubeGeometry(angle: number) {
  const project = ([x, y, z]: Point3) => {
    const xx = x * Math.cos(angle) + z * Math.sin(angle);
    const zz = -x * Math.sin(angle) + z * Math.cos(angle);
    return `${(xx * 24).toFixed(3)},${((y + zz * 0.5) * 24).toFixed(3)}`;
  };
  const faces: { normal: Point3; corners: Point3[] }[] = [
    {
      normal: [0, -1, 0],
      corners: [
        [-1, -1, -1],
        [1, -1, -1],
        [1, -1, 1],
        [-1, -1, 1],
      ],
    },
    {
      normal: [1, 0, 0],
      corners: [
        [1, -1, -1],
        [1, 1, -1],
        [1, 1, 1],
        [1, -1, 1],
      ],
    },
    {
      normal: [-1, 0, 0],
      corners: [
        [-1, -1, 1],
        [-1, 1, 1],
        [-1, 1, -1],
        [-1, -1, -1],
      ],
    },
    {
      normal: [0, 0, 1],
      corners: [
        [-1, -1, 1],
        [1, -1, 1],
        [1, 1, 1],
        [-1, 1, 1],
      ],
    },
    {
      normal: [0, 0, -1],
      corners: [
        [1, -1, -1],
        [-1, -1, -1],
        [-1, 1, -1],
        [1, 1, -1],
      ],
    },
  ];
  const mix = (a: Point3, b: Point3, t: number): Point3 =>
    [0, 1, 2].map((i) => a[i] + (b[i] - a[i]) * t) as Point3;
  let outline = "",
    grid = "";
  for (const {
    normal: [nx, ny, nz],
    corners: c,
  } of faces) {
    if (-ny * 0.5 - nx * Math.sin(angle) + nz * Math.cos(angle) <= 0) continue;
    outline += `M${c.map(project).join("L")}Z `;
    for (let i = 1; i < 5; i++) {
      const t = i / 5;
      grid += `M${project(mix(c[0], c[1], t))}L${project(mix(c[3], c[2], t))} `;
      grid += `M${project(mix(c[0], c[3], t))}L${project(mix(c[1], c[2], t))} `;
    }
  }
  return { outline, grid };
}
function Cube({
  x,
  y,
  moving = false,
  mint = false,
}: {
  x: number;
  y: number;
  moving?: boolean;
  mint?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        data-rotating-cube={moving ? "" : undefined}
        d={cubeGeometry(0.65).outline}
        fill={mint ? "var(--mint)" : "var(--paper)"}
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        data-cube-grid=""
        d={cubeGeometry(0.65).grid}
        fill="none"
        stroke="currentColor"
        strokeWidth=".7"
        opacity=".24"
      />
    </g>
  );
}
function Label({ x, y, lines }: { x: number; y: number; lines: string[] }) {
  return (
    <text x={x} y={y} textAnchor="middle">
      {lines.map((line, i) => (
        <tspan key={line} x={x} dy={i ? 19 : 0}>
          {line}
        </tspan>
      ))}
    </text>
  );
}
function Surface({
  x,
  y,
  sphere = false,
}: {
  x: number;
  y: number;
  sphere?: boolean;
}) {
  return sphere ? <ModelSphere x={x} y={y} mint /> : <Cube x={x} y={y} mint />;
}
function ModelSphere({
  x,
  y,
  mint = false,
}: {
  x: number;
  y: number;
  mint?: boolean;
}) {
  return (
    <g
      transform={`translate(${x} ${y})`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <circle r="29" fill={mint ? "var(--mint)" : "var(--paper)"} />
      <g strokeWidth=".7" opacity=".32">
        {[0.24, 0.48, 0.7, 0.88].map((ratio) => (
          <ellipse key={ratio} rx={29 * ratio} ry="29" />
        ))}
        <path d="M0 -29V29" />
        {[-0.8, -0.6, -0.3, 0, 0.3, 0.6, 0.8].map((latitude) => {
          const radius = 29 * Math.sqrt(1 - latitude * latitude);
          return (
            <ellipse
              key={latitude}
              cy={29 * latitude * 0.98}
              rx={radius}
              ry={radius * 0.16}
            />
          );
        })}
      </g>
      <circle r="29" />
    </g>
  );
}

export function CompatibilityComparison() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const editing = useEditingActivity();
  useEffect(() => {
    const el = root.current;
    if (!el || reduced || editing) return;
    const paths = [
      ...el.querySelectorAll<SVGPathElement>("[data-rotating-cube]"),
    ];
    let frame = 0,
      visible = false,
      previous = 0,
      angle = 0.65;
    const panel = el.closest("[data-panel]");
    const tick = (now: number) => {
      angle += previous ? Math.min(now - previous, 40) * 0.00055 : 0;
      previous = now;
      const geometry = cubeGeometry(angle);
      paths.forEach((path) => {
        path.setAttribute("d", geometry.outline);
        path.parentElement
          ?.querySelector("[data-cube-grid]")
          ?.setAttribute("d", geometry.grid);
      });
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      const running =
        visible &&
        !document.hidden &&
        panel?.getAttribute("data-active") !== "false";
      el.dataset.rotating = String(running);
      if (running) frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(el);
    const active = new MutationObserver(sync);
    if (panel)
      active.observe(panel, {
        attributes: true,
        attributeFilter: ["data-active"],
      });
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      active.disconnect();
      document.removeEventListener("visibilitychange", sync);
      el.dataset.rotating = "false";
      paths.forEach((path) => {
        path.setAttribute("d", cubeGeometry(0.65).outline);
        path.parentElement
          ?.querySelector("[data-cube-grid]")
          ?.setAttribute("d", cubeGeometry(0.65).grid);
      });
    };
  }, [reduced, editing]);
  return (
    <div
      ref={root}
      className={styles.comparison}
      data-compatibility-comparison=""
      data-rotating="false"
    >
      <figure>
        <h5>BEFORE</h5>
        <svg
          viewBox="0 0 640 480"
          role="img"
          aria-label="Before: forcing an incompatible new Surface onto historical RigCache invalidates the historical publish."
        >
          <defs>
            <marker
              id="compat-before-arrow"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M1 1L7 4L1 7" fill="none" stroke="currentColor" />
            </marker>
          </defs>
          <g className={styles.lines} markerEnd="url(#compat-before-arrow)">
            <path d="M10 25H623" />
            <path d="M98 114C133 114 125 88 157 88" />
            <path d="M98 139C129 139 132 203 157 203" />
            <path d="M226 203H312" />
            <path d="M379 203H492" />
            <path d="M97 328H157" />
            <path d="M222 328H531V247" strokeDasharray="5 5" />
          </g>
          <text x="555" y="47">
            TIME →
          </text>
          <Cube x={65} y={123} />
          <Label x={65} y={183} lines={["Historical", "Model (G2)"]} />
          <Surface x={190} y={88} />
          <Label x={190} y={149} lines={["Surface (v1)"]} />
          <Cube x={190} y={203} />
          <Label x={190} y={263} lines={["White Model", "(Geometry)"]} />
          <Cube x={347} y={203} moving />
          <Label x={347} y={263} lines={["Animation"]} />
          <Cube x={531} y={203} moving />
          <Label x={531} y={263} lines={["RigCache", "(Historical)"]} />
          <ModelSphere x={65} y={328} />
          <Label x={65} y={377} lines={["Latest", "Model (G3)"]} />
          <Surface x={190} y={328} sphere />
          <Label x={190} y={377} lines={["New Surface", "(v2)"]} />
          <path
            d="M369 318L389 338M389 318L369 338"
            stroke="currentColor"
            strokeWidth="2"
          />
          <text x="409" y="291" textAnchor="middle" className={styles.result}>
            <T zh="历史Rigcache完全失效" en="Historical RigCache invalidated" />
          </text>
          <Label
            x={407}
            y={365}
            lines={["Not compatible", "with historical RigCache"]}
          />
          <path
            d="M190 408V439H244"
            className={styles.lines}
            markerEnd="url(#compat-before-arrow)"
          />
          <text x="260" y="437" className={styles.result}>
            <T zh="为匹配最新资产，" en="To match the latest asset," />
          </text>
          <text x="260" y="460" className={styles.result}>
            <T zh="被迫重新发布 RigCache" en="RigCache must be republished." />
          </text>
        </svg>
        <figcaption>
          <T
            zh="强制将不兼容的新 Surface 用于历史 RigCache 时，原本可用的发布结果失效。"
            en="Forcing an incompatible new Surface onto historical RigCache invalidates a previously usable publish."
          />
        </figcaption>
      </figure>
      <figure>
        <h5>WEFT / PPL</h5>
        <svg
          viewBox="0 0 640 480"
          role="img"
          aria-label="WEFT / PPL: historical RigCache preserves its compatible Surface reference and remains usable while new work moves forward."
        >
          <defs>
            <marker
              id="compat-after-arrow"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M1 1L7 4L1 7" fill="none" stroke="currentColor" />
            </marker>
          </defs>
          <g className={styles.lines} markerEnd="url(#compat-after-arrow)">
            <path d="M10 25H623" />
            <path d="M98 114C133 114 125 88 157 88" />
            <path d="M98 139C129 139 132 203 157 203" />
            <path d="M226 203H312" />
            <path d="M379 203H500" />
          </g>
          <text x="555" y="47">
            TIME →
          </text>
          <Cube x={65} y={123} />
          <Label x={65} y={183} lines={["Historical", "Model (G2)"]} />
          <Surface x={190} y={88} />
          <Label x={190} y={149} lines={["Surface (v1)"]} />
          <g className={styles.mint}>
            <path
              d="M222 88H509Q539 88 539 118V156"
              className={styles.lines}
              markerEnd="url(#compat-after-arrow)"
            />
            <text x="344" y="76">
              Compatibility Reference
            </text>
          </g>
          <Cube x={190} y={203} />
          <Label x={190} y={263} lines={["White Model", "(Geometry)"]} />
          <Cube x={347} y={203} moving />
          <Label x={347} y={263} lines={["Animation"]} />
          <Cube x={539} y={203} moving mint />
          <Label
            x={539}
            y={263}
            lines={["RigCache", "(Historical Published)"]}
          />
          <text x="539" y="306" textAnchor="middle" className={styles.result}>
            <T zh="历史发布仍然可用" en="Historical publish remains usable" />
          </text>
          <ModelSphere x={65} y={328} />
          <Label x={65} y={377} lines={["Latest", "Model (G3)"]} />
          <Surface x={190} y={328} sphere />
          <Label x={190} y={377} lines={["New Surface", "(v2)"]} />
          <path
            d="M98 328H157"
            className={`${styles.lines} ${styles.mint}`}
            markerEnd="url(#compat-after-arrow)"
          />
          <path
            d="M229 328H283"
            className={`${styles.lines} ${styles.mint}`}
            markerEnd="url(#compat-after-arrow)"
          />
          <text x="299" y="339" className={styles.result}>
            <T zh="按镜头视觉需求，" en="For the shot’s visual needs," />
          </text>
          <text x="299" y="362" className={styles.result}>
            <T zh="自主发布 RigCache" en="publish RigCache on demand." />
          </text>
        </svg>
        <figcaption>
          <T
            zh="历史 RigCache 保留兼容 Surface 的引用，新工作继续向前。Mint 表示合法兼容关系，而非最新版本。"
            en="Historical RigCache keeps its compatible Surface reference while new work moves forward. Mint marks valid compatibility, not the latest version."
          />
        </figcaption>
      </figure>
      <p className={styles.note}>
        <T
          zh="概念示意 · 旋转仅用于表达动画与缓存，不代表真实播放记录。"
          en="Conceptual diagram · Rotation illustrates animation and cache, not recorded production playback."
        />
      </p>
    </div>
  );
}
