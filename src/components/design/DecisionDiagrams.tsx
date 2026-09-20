import type { DecisionId } from "@/content/decisions";
import styles from "./DesignPage.module.css";
import { TaskCompositionDiagram } from "./TaskCompositionDiagram";

function Cube({ x, dense = false }: { x: number; dense?: boolean }) {
  return (
    <g transform={`translate(${x} 108)`} data-node="">
      <path
        d="M0 -42 46 -16 46 39 0 66 -46 39 -46 -16Z M-46 -16 0 12 46 -16 M0 12V66 M0 -42V12"
        fill="none"
        stroke="currentColor"
      />
      {[...(dense ? Array(7) : Array(3))].map((_, i, rows) => {
        const t = (i + 1) / (rows.length + 1);
        return (
          <g
            key={i}
            opacity=".28"
            fill="none"
            stroke="currentColor"
            strokeWidth=".7"
          >
            <path
              d={`M${-46 + 46 * t} ${-16 - 26 * t}l46 28v55 M${46 * t} ${-42 + 26 * t}l-46 26v55 M-46 ${-16 + 55 * t}l46 28 46 -28`}
            />
          </g>
        );
      })}
    </g>
  );
}
function Surface({ x, dotted = false }: { x: number; dotted?: boolean }) {
  const point = (u: number, v: number) => {
    const wave = Math.sin(u * 5 + v * 2) * 13 + Math.cos(v * 5) * 8;
    return `${(u - v) * 63},${(u + v) * 25 - wave}`;
  };
  return (
    <g
      transform={`translate(${x} 285)`}
      data-node=""
      fill="none"
      stroke="currentColor"
      opacity=".58"
      strokeWidth=".65"
      strokeDasharray={dotted ? "1 3" : undefined}
    >
      {Array.from({ length: 19 }, (_, i) => i / 18).map((t) => (
        <g key={t}>
          <polyline
            points={Array.from({ length: 31 }, (_, i) => point(t, i / 30)).join(
              " ",
            )}
          />
          <polyline
            points={Array.from({ length: 31 }, (_, i) => point(i / 30, t)).join(
              " ",
            )}
          />
        </g>
      ))}
    </g>
  );
}
function Compatibility() {
  return (
    <svg
      viewBox="0 0 620 410"
      role="img"
      aria-label="G2 remains valid for published Shot A; new Shot B uses G3."
    >
      <g className={styles.diagramRule}>
        <path d="M90 30H596m-6 -4 6 4-6 4" />
        <text x="537" y="52">
          TIME →
        </text>
      </g>
      <g className={styles.diagramLabel}>
        <text x="10" y="129">
          ASSET /
        </text>
        <text x="10" y="152">
          RIG
        </text>
      </g>
      <path
        data-line=""
        d="M232 120H466"
        stroke="currentColor"
        opacity=".45"
        strokeDasharray="4 5"
      />
      <Cube x={185} />
      <Cube x={512} dense />
      <g className={styles.diagramLabel}>
        <text x="185" y="202" textAnchor="middle">
          G2
        </text>
        <text x="512" y="202" textAnchor="middle">
          G3
        </text>
      </g>
      <g data-relation="" className={styles.validRelation}>
        <path data-line="" d="M185 223V280M512 223V280" />
        <circle cx="185" cy="221" r="5" />
        <circle cx="512" cy="221" r="5" />
      </g>
      <Surface x={185} />
      <Surface x={512} dotted />
      <g className={styles.diagramLabel}>
        <text x="10" y="279">
          SHOT A /
        </text>
        <text x="10" y="302">
          Published
        </text>
        <text x="345" y="279">
          SHOT B /
        </text>
        <text x="345" y="302">
          New work
        </text>
        <text x="185" y="382" textAnchor="middle">
          Keeps G2 dependency
        </text>
        <text x="512" y="382" textAnchor="middle">
          Uses G3
        </text>
      </g>
    </svg>
  );
}
function Modularity() {
  const rows = [
    ["Camera", "v003"],
    ["Set", "v002"],
    ["Character A / RigCache", "v004"],
    ["Character A / CFX", "v002"],
    ["Character B / RigCache", "v007"],
  ];
  return (
    <svg
      viewBox="0 0 620 410"
      role="img"
      aria-label="Independent Camera, Set and character products retain their own versions and compose into a shot workspace."
    >
      <text x="24" y="32">
        PRODUCTION MODULES
      </text>
      <text x="421" y="32">
        SHOT WORKSPACE
      </text>
      {rows.map(([name, version], i) => (
        <g key={name} data-node="">
          <rect
            x="24"
            y={60 + i * 53}
            width="303"
            height="39"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeOpacity=".4"
          />
          <text x="36" y={86 + i * 53}>
            {name}
          </text>
          <text x="312" y={86 + i * 53} textAnchor="end">
            {version}
          </text>
          <path
            data-line=""
            d={`M327 ${80 + i * 53}H369V185H419`}
            fill="none"
            stroke="currentColor"
            strokeOpacity=".4"
          />
        </g>
      ))}
      <g data-node="">
        <rect
          x="419"
          y="135"
          width="175"
          height="100"
          rx="2"
          fill="none"
          stroke="var(--diagram-mint)"
        />
        <text x="507" y="177" textAnchor="middle">
          EXPLICIT
        </text>
        <text x="507" y="205" textAnchor="middle">
          COMPOSITION
        </text>
      </g>
      <text x="24" y="367">
        Identity · Version · Dependency · State
      </text>
    </svg>
  );
}
function StateDiagram() {
  const names = ["A", "B", "Camera"];
  return (
    <svg
      viewBox="0 0 620 410"
      role="img"
      aria-label="Previous state plus A v003 change is merged into the full state; B v001 and Camera v003 remain unchanged."
    >
      <text x="12" y="39">
        PREVIOUS STATE
      </text>
      <text x="226" y="39">
        CHANGE / DELTA
      </text>
      <text x="426" y="39">
        CURRENT FULL STATE
      </text>
      {[12, 426].map((x, block) => (
        <g key={x} data-node="">
          <rect
            x={x}
            y="64"
            width="181"
            height="210"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeOpacity=".4"
          />
          {names.map((name, i) => (
            <g key={name}>
              <rect
                x={x + 10}
                y={78 + i * 46}
                width="161"
                height="37"
                fill={block === 1 && i === 0 ? "var(--mint)" : "none"}
                rx="1"
              />
              <text x={x + 20} y={103 + i * 46}>
                {name}
              </text>
              <text x={x + 159} y={103 + i * 46} textAnchor="end">
                {[block === 1 ? "v003" : "v002", "v001", "v003"][i]}
              </text>
            </g>
          ))}
        </g>
      ))}
      <g data-node="">
        <rect
          x="226"
          y="84"
          width="166"
          height="44"
          rx="2"
          fill="var(--mint)"
        />
        <text x="240" y="112">
          A
        </text>
        <text x="377" y="112" textAnchor="end">
          v003
        </text>
      </g>
      <text x="205" y="112" textAnchor="middle">
        +
      </text>
      <g className={styles.diagramRule}>
        <path data-line="" d="M102 274V326H280 M310 128V302 M340 326H517V274" />
        <path d="m513 280 4-6 4 6" />
      </g>
      <g data-node="">
        <rect
          x="264"
          y="304"
          width="94"
          height="43"
          rx="2"
          fill="var(--paper)"
          stroke="currentColor"
        />
        <text x="311" y="332" textAnchor="middle">
          MERGE
        </text>
      </g>
      <text x="311" y="389" textAnchor="middle" className={styles.smallSvg}>
        Previous state + change = current full state
      </text>
    </svg>
  );
}
function Execution() {
  return (
    <svg
      viewBox="0 0 620 410"
      role="img"
      aria-label="Rules attach to Builder, Resolution and Publish QC. QC pass allows publish; failure reports and stops."
    >
      <g className={styles.diagramRule}>
        <path
          data-line=""
          d="M110 186H149V73H196 M149 186H196 M149 186V278H196 M432 278H470V258H501 M470 278V351H501"
        />
      </g>
      <g data-node="">
        <rect
          x="12"
          y="166"
          width="98"
          height="42"
          rx="2"
          fill="none"
          stroke="currentColor"
        />
        <text x="61" y="193" textAnchor="middle">
          RULES
        </text>
      </g>
      {[
        { y: 42, name: "BUILDER", note: "correct starting state" },
        { y: 149, name: "RESOLUTION", note: "dependency rule" },
        { y: 247, name: "PUBLISH / QC", note: "delivery validation" },
      ].map((row) => (
        <g key={row.name} data-node="">
          <rect
            x="196"
            y={row.y}
            width="236"
            height="72"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeOpacity=".5"
          />
          <text x="213" y={row.y + 28}>
            {row.name}
          </text>
          <text x="213" y={row.y + 53} className={styles.smallSvg}>
            {row.note}
          </text>
          <circle cx="414" cy={row.y + 24} r="4" className={styles.mintFill} />
        </g>
      ))}
      <g data-relation="" className={styles.validRelation}>
        <path data-line="" d="M432 278H470V258H501" />
      </g>
      <g data-node="">
        <text x="494" y="233" className={styles.smallSvg}>
          PASS
        </text>
        <rect
          x="496"
          y="243"
          width="112"
          height="37"
          rx="2"
          fill="var(--mint)"
        />
        <text x="552" y="268" textAnchor="middle">
          PUBLISH
        </text>
        <text x="494" y="330" className={styles.smallSvg}>
          FAIL
        </text>
        <text x="494" y="354">
          REPORT /
        </text>
        <text x="494" y="378">
          STOP
        </text>
      </g>
    </svg>
  );
}
export function DecisionDiagram({ id }: { id: DecisionId }) {
  return (
    <div className={styles.diagram} data-diagram="">
      {id === "compatibility" ? (
        <Compatibility />
      ) : id === "modularity" ? (
        <Modularity />
      ) : id === "state" ? (
        <StateDiagram />
      ) : id === "task-composition" ? (
        <TaskCompositionDiagram />
      ) : (
        <Execution />
      )}
    </div>
  );
}
