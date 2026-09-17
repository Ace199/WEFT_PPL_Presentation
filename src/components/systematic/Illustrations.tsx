import { ChapterText as T, ChapterElement } from "./ChapterText";
import type { ReactNode } from "react";
import { Character } from "./Character";
import { Flowers } from "./Flowers";
import styles from "./Illustrations.module.css";
import { IdeaBulb } from "./IdeaBulb";

export function Icon({
  kind,
  x = 0,
  y = 0,
  scale = 1,
  hoverable = false,
}: {
  kind: string;
  x?: number;
  y?: number;
  scale?: number;
  hoverable?: boolean;
}) {
  let shape: ReactNode;
  switch (kind) {
    case "sun":
      shape = <><circle r="16" />{Array.from({ length: 12 }, (_, i) => <path key={i} d="M0-24V-33" transform={`rotate(${i * 30})`} />)}</>;
      break;
    case "model-person":
      shape = <Character />;
      break;
    case "look-person":
      shape = <Character colored />;
      break;
    case "animated-person":
      shape = <Character moving />;
      break;
    case "render-person":
      shape = <><rect x="-36" y="-28" width="72" height="58" fill="#e4e9e3" /><g data-render-flowers transform="translate(0 -2) scale(.68)" opacity=".7" style={{color: "#50756a"}}><Flowers /></g><path d="M-32 22H32" opacity=".2"/><g transform="translate(0 -1) scale(.73)"><Character colored moving /></g></>;
      break;
    case "cloth":
      shape = (
        <>
          {Array.from({ length: 23 }, (_, row) => (
            <polyline
              key={row}
              opacity={0.22 + row / 55}
              points={Array.from({ length: 33 }, (_, col) => {
                const u = col / 32,
                  v = row / 22;
                return `${(u - 0.5) * 90 + (v - 0.5) * 26},${(v - 0.5) * 32 - Math.sin(u * Math.PI * 3 + v * 2) * 12 * Math.sin(u * Math.PI)}`;
              }).join(" ")}
            />
          ))}
        </>
      );
      break;
    case "cube":
      shape = (
        <>
          <path
            d="M0-24 23-12 23 15 0 28-23 15-23-12Z M-23-12 0 0 23-12 M0 0V28 M-15-16 8-4V23 M-7-20 16-8V19"
            fill="currentColor"
            fillOpacity=".04"
          />
          <path opacity=".25" d="M0-24V3L-23 15M0 3 23 15" />
        </>
      );
      break;
    case "camera":
      shape = (
        <>
          <path
            d="m-26-17 28-12 17 8v38L-9 29-26 19Z M-26-17-9-8 19-21 M-9-8V29 M-2-5 12-11V15L-2 21Z M19-7 31-12V10L19 5"
            fill="currentColor"
            fillOpacity=".035"
          />
        </>
      );
      break;
    case "rig":
      shape = (
        <>
          <circle cy="-25" r="5" fill="#fffefa" />
          <path d="M0-20V4M0-13-15 0-22 12 M0-13 15 0 22 12 M0 4-10 19-13 32 M0 4 10 19 13 32" />
          {[
            [-15, 0],
            [15, 0],
            [0, 4],
            [-10, 19],
            [10, 19],
            [-13, 32],
            [13, 32],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="2.4" fill="#fffefa" />
          ))}
        </>
      );
      break;
    case "sphere":
      shape = (
        <>
          <circle r="25" />
          {[8, 16, 22].map((r) => (
            <ellipse key={r} rx={r} ry="25" opacity=".3" />
          ))}
          {[-16, -8, 0, 8, 16].map((cy) => (
            <ellipse
              key={cy}
              cy={cy}
              rx={Math.sqrt(625 - cy * cy)}
              ry="4"
              opacity=".3"
            />
          ))}
        </>
      );
      break;
    case "light":
      shape = (
        <>
          <circle r="23" />
          <ellipse rx="32" ry="9" />
          <ellipse rx="10" ry="31" />
          <path d="M-35 0H35M0-35V35" opacity=".4" />
        </>
      );
      break;
    case "frame":
      shape = (
        <>
          <rect x="-36" y="-23" width="72" height="46" />
          <rect x="-32" y="-19" width="64" height="38" opacity=".4" />
          <g transform="scale(.65)">
            <Icon kind="cloth" />
          </g>
        </>
      );
      break;
    case "document":
      shape = (
        <>
          <path d="M-14-25H8L17-16V25H-14Z M8-25V-16H17 M-8-11H10M-8-4H10M-8 3H10M-8 10H10M-8 17H5" />
        </>
      );
      break;
    case "bulb":
      shape = <IdeaBulb />;
      break;
    case "story":
      shape = (
        <>
          {[-30, 0, 30].map((cx) => (
            <rect key={cx} x={cx - 12} y="-15" width="24" height="30" />
          ))}
        </>
      );
      break;
    case "color":
      shape = (
        <>
          <circle
            cy="-10"
            r="18"
            fill="#51b9a6"
            fillOpacity=".5"
            stroke="none"
          />
          <circle
            cx="-13"
            cy="10"
            r="18"
            fill="currentColor"
            fillOpacity=".25"
            stroke="none"
          />
          <circle
            cx="13"
            cy="10"
            r="18"
            fill="currentColor"
            fillOpacity=".4"
            stroke="none"
          />
        </>
      );
      break;
    case "person":
      shape = (
        <>
          <circle cy="-16" r="10" />
          <path d="M-19 22C-19-8 19-8 19 22Z" />
        </>
      );
      break;
    case "check":
      shape = (
        <>
          <circle r="24" />
          <path d="m-11 0 8 9 15-18" />
        </>
      );
      break;
    case "publish":
      shape = (
        <>
          <path d="M0 15V-23M-10-12 0-23 10-12M-20 4V23H20V4" />
        </>
      );
      break;
    case "compose":
      shape = (
        <>
          <path d="m0-24 25 13L0 2-25-13ZM-25 0 0 14 25 0M-25 13 0 27 25 13" />
        </>
      );
      break;
    case "play":
      shape = (
        <>
          <rect x="-31" y="-22" width="62" height="44" />
          <path d="m-5-10 15 10-15 10Z" />
        </>
      );
      break;
    case "gear":
      shape = (
        <>
          <path
            d="m-8-24 16 0 2 8 7 4 8-2 5 14-7 5-1 8 5 6-11 10-7-5-8 1-5 7-13-6 2-8-4-7-8-2 1-15 8-2Z"
            transform="scale(.8)"
          />
          <circle r="9" />
        </>
      );
      break;
    case "fx":
      shape = <Flowers />;
      break;
    default:
      shape = (
        <>
          <circle cy="-20" r="7" />
          <circle cx="-20" cy="19" r="7" />
          <circle cx="20" cy="19" r="7" />
          <path d="M-3-13-17 12M3-13 17 12" />
        </>
      );
  }
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
      strokeLinecap="round"
      className={hoverable ? styles.hoverTarget : undefined}
      data-hover-icon={hoverable ? kind : undefined}
    >
      {hoverable ? <>
        <rect x={kind === "cloth" ? -60 : -44} y="-40" width={kind === "cloth" ? 120 : 88} height="80" fill="transparent" stroke="none" />
        <g className={styles.hoverVisual}>{shape}</g>
      </> : shape}
    </g>
  );
}
function Arrow({ d, mint = false }: { d: string; mint?: boolean }) {
  return (
    <>
      {d
        .split(/(?=M)/)
        .filter(Boolean)
        .map((segment, i) => (
          <path
            key={i}
            data-draw
            d={segment}
            fill="none"
            stroke={mint ? "var(--diagram-mint)" : "currentColor"}
            strokeWidth="1.3"
            markerEnd={mint ? "url(#network-mint)" : "url(#network-arrow)"}
          />
        ))}
    </>
  );
}
function Node({
  x,
  y,
  kind,
  label,
  scale = 1,
}: {
  x: number;
  y: number;
  kind: string;
  label: string;
  scale?: number;
}) {
  return (
    <g>
      <Icon x={x} y={y} kind={kind} scale={scale} hoverable={[
        "model-person", "look-person", "rig", "camera", "animated-person", "fx", "render-person",
      ].includes(kind)} />
      <text x={x} y={y + 49} textAnchor="middle">
        <T text={label} />
      </text>
    </g>
  );
}
export function Network() {
  return (
    <svg
      viewBox="0 0 1080 620"
      data-flow="sequential"
      role="img"
      aria-labelledby="network-title network-desc"
    >
      <T as="title" id="network-title" text="动画生产的分支与依赖网络" />
      <desc id="network-desc">
        <T
          text={
            "资产生产分为材质和绑定；绑定进入动画，材质跨接灯光。镜头中的相机、动画及特效在下游组合，渲染再进入后期。概念示意。"
          }
        />
      </desc>
      <defs>
        {["arrow", "mint"].map((id) => (
          <marker
            key={id}
            id={`network-${id}`}
            viewBox="0 0 6 6"
            refX="5"
            refY="3"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path
              d="m0 0 6 3-6 3"
              fill={id === "mint" ? "var(--diagram-mint)" : "currentColor"}
            />
          </marker>
        ))}
      </defs>
      <g opacity=".35" stroke="currentColor">
        <path
          d="M0 145H1080M0 340H1080M0 505H1080M168 20V123M168 530V608"
          fill="none"
        />
        <path d="M0 340H1080" strokeDasharray="2 3" />
      </g>
      <g data-step="0">
        <text y="39">PRE-PRODUCTION<tspan x="0" dy="24"><T text="/ 前期" /></tspan></text>
        <Node x={224} y={60} kind="bulb" label="创意" />
      </g>
      <g data-step="1"><Arrow d="M265 60H330" /></g>
      <g data-step="2"><Node x={380} y={60} kind="document" label="故事" /></g>
      <g data-step="3"><Arrow d="M425 60H493" /></g>
      <g data-step="4"><Node x={555} y={60} kind="story" label="分镜" /></g>
      <g data-step="5"><Arrow d="M616 60H694" /></g>
      <g data-step="6"><Node x={760} y={60} kind="cloth" label="动态预演" /></g>
      <g data-step="7"><Arrow d="M817 60H865Q880 60 880 45V32Q880 20 894 20H959M880 60V96Q880 108 895 108H959" /></g>
      <g data-step="8">
        <Icon x={992} y={20} kind="document" scale={0.55} />
        <text x="1020" y="26"><T text="设计" /></text>
        <Icon x={992} y={106} kind="cube" scale={0.55} />
        <text x="1020" y="112"><T text="布局" /></text>
      </g>
      <g data-step="9">
        <text y="180"><T text="PRODUCTION / 生产制作" /></text>
        <text y="237">ASSET PRODUCTION<tspan x="0" dy="25"><T text="资产生产" /></tspan></text>
        <Node x={225} y={247} kind="sphere" label="设计" />
      </g>
      <g data-step="10"><Arrow d="M274 247H329" /></g>
      <g data-step="11"><Node x={380} y={247} kind="model-person" label="建模" /></g>
      <g data-step="12"><Arrow d="M422 247H458Q470 247 470 233V220Q470 206 486 206H497M470 247V281Q470 293 485 293H505" /></g>
      <g data-step="13">
        <Node x={540} y={206} kind="look-person" label="材质 / 外观" />
        <Node x={540} y={291} kind="rig" label="绑定" />
      </g>
      <g data-step="14">
        <text y="390">SHOT PRODUCTION<tspan x="0" dy="25"><T text="镜头生产" /></tspan></text>
        <Node x={231} y={398} kind="camera" label="布局 / 相机" />
      </g>
      <g data-step="15">
        <Arrow d="M540 329V359" />
        <Arrow mint d="M282 398H492M282 410H323Q340 410 340 426V442Q340 454 355 454H491" />
      </g>
      <g data-step="16"><Node x={540} y={398} kind="animated-person" label="动画" /></g>
      <g data-step="17"><Arrow d="M580 398H652" /></g>
      <g data-step="18"><Node x={705} y={398} kind="fx" label="FX / CFX" /></g>
      <g data-step="19">
        <Arrow d="M753 398H817" />
        <Arrow mint d="M599 206H852Q865 206 865 221V358" />
      </g>
      <g data-step="20"><Node x={865} y={398} kind="sun" label="灯光" scale={0.8} /></g>
      <g data-step="21"><Arrow d="M912 398H955" /></g>
      <g data-step="22"><Node x={1001} y={398} kind="render-person" label="渲染" /></g>
      <g data-step="23">
        <path d="M865 460Q865 478 845 478H547Q525 478 525 460" fill="none" stroke="currentColor" strokeDasharray="4 4" opacity=".5" />
        <text x="698" y="492" textAnchor="middle" fontSize="13"><T text="反馈与迭代" /></text>
      </g>
      <g data-step="24">
        <text y="550">POST-PRODUCTION<tspan x="0" dy="24"><T text="/ 后期" /></tspan></text>
        <Node x={260} y={552} kind="render-person" label="渲染" />
      </g>
      <g data-step="25"><Arrow d="M318 552H416" /></g>
      <g data-step="26"><Node x={471} y={552} kind="resolve" label="合成" /></g>
      <g data-step="27"><Arrow d="M525 552H650" /></g>
      <g data-step="28"><Node x={717} y={552} kind="color" label="调色" /></g>
      <g data-step="29"><Arrow d="M782 552H928" /></g>
      <g data-step="30"><Node x={990} y={552} kind="play" label="最终交付" /></g>
    </svg>
  );
}
export function History() {
  return (
    <ChapterElement
      as="svg"
      viewBox="0 0 650 258"
      role="img"
      label="历史成果保留 G2 依赖，新工作使用 G3；两者同时有效。概念示意。"
    >
      <text x="590" y="18">
        TIME →
      </text>
      <g stroke="currentColor" opacity=".2">
        <path d="M0 38H650M0 134H650M0 211H650" />
      </g>
      <g data-step="0">
        <text x="0" y="83">
          ASSET / RIG
          <tspan x="0" dy="23">
            <T text={"资产 / 绑定"} />
          </tspan>
        </text>
        <path d="M154 91H605" stroke="currentColor" opacity=".45" />
        <Icon x={350} y={80} kind="cube" scale={0.8} />
        <text x="350" y="126" textAnchor="middle">
          G2
        </text>
        <text x="0" y="170">
          SHOT A
          <tspan x="0" dy="23">
            <T text={"已发布成果"} />
          </tspan>
        </text>
        <Icon x={184} y={175} kind="frame" scale={0.9} />
      </g>
      <g data-step="1" fill="var(--diagram-mint)" stroke="var(--diagram-mint)">
        <path data-draw d="M230 175H329Q350 175 350 154V139" fill="none" />
        <text x="366" y="166" stroke="none">
          <T text={"保留 G2 依赖"} />
        </text>
        <circle cx="350" cy="139" r="3" />
      </g>
      <g data-step="2">
        <g style={{ color: "var(--diagram-mint)" }}>
          <Icon x={568} y={80} kind="cube" scale={0.8} />
        </g>
        <text x="568" y="126" textAnchor="middle">
          G3
        </text>
        <text x="0" y="237">
          SHOT B
          <tspan x="0" dy="20">
            <T text={"新工作"} />
          </tspan>
        </text>
        <Icon x={184} y={233} kind="frame" scale={0.9} />
      </g>
      <g data-step="3" fill="var(--diagram-mint)" stroke="var(--diagram-mint)">
        <path data-draw d="M230 233H548Q568 233 568 212V139" fill="none" />
        <text x="580" y="215" stroke="none">
          <T text={"使用 G3"} />
        </text>
        <circle cx="568" cy="139" r="3" />
      </g>
    </ChapterElement>
  );
}
export function Granularity() {
  return (
    <ChapterElement
      as="svg"
      viewBox="0 0 650 205"
      role="img"
      label="只更新 A 从 v2 到 v3，B、Camera 和 Set 保持原版本；本次变化不等于完整状态。概念示意。"
    >
      <g data-step="0">
        <text x="83" y="100">
          <T text={"UNCHANGED / 保持不变"} />
        </text>
        {["B          ●   v1", "Camera   ●   v3", "Set        ●   v2"].map(
          (t, i) => (
            <text key={t} x="100" y={130 + i * 27}>
              {t}
            </text>
          ),
        )}
        <path
          d="M60 12Q30 12 30 30V82Q30 98 17 98Q30 98 30 114V177Q30 193 60 193M485 95Q500 95 500 109V143Q500 152 510 152Q500 152 500 163V182Q500 193 485 193"
          fill="none"
          stroke="currentColor"
        />
        <text x="528" y="145">
          <T text={"变化范围 ≠"} />
          <tspan x="528" dy="24">
            <T text={"整体范围"} />
          </tspan>
        </text>
      </g>
      <g data-step="1">
        <rect
          x="67"
          y="5"
          width="433"
          height="63"
          rx="6"
          fill="none"
          stroke="var(--diagram-mint)"
        />
        <text x="84" y="27">
          <T text={"CHANGED / 本次变化"} />
        </text>
        <text x="100" y="53">
          A
        </text>
        <text x="207" y="53">
          v2
        </text>
      </g>
      <g data-step="2" stroke="var(--diagram-mint)" fill="var(--diagram-mint)">
        <path data-draw d="M268 49H432" />
        <circle cx="268" cy="49" r="6" fill="var(--paper)" />
        <circle cx="432" cy="49" r="6" />
        <text x="458" y="55" stroke="none">
          v3
        </text>
      </g>
    </ChapterElement>
  );
}
export function Enforcement() {
  return (
    <ChapterElement
      as="svg"
      viewBox="0 0 650 120"
      role="img"
      label="Builder 建立正确起点，Publish 和 QC 在交付边界执行校验。概念示意。"
    >
      <g data-step="0">
        <Icon x={107} y={40} kind="document" />
        <text x="107" y="86" textAnchor="middle">
          BUILDER
          <tspan x="107" dy="21">
            <T text={"正确起点"} />
          </tspan>
        </text>
      </g>
      <g data-step="1">
        <path
          data-draw
          d="M162 40H245M372 40H481"
          fill="none"
          stroke="currentColor"
        />
        <Icon x={312} y={40} kind="gear" />
      </g>
      <g data-step="2">
        <Icon x={546} y={40} kind="check" />
        <text x="546" y="86" textAnchor="middle">
          PUBLISH · QC
          <tspan x="546" dy="21">
            <T text={"交付校验"} />
          </tspan>
        </text>
      </g>
    </ChapterElement>
  );
}
