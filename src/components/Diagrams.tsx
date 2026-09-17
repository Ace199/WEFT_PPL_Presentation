function random(seed: number) {
  let n = seed;
  return () => {
    n = (n * 1664525 + 1013904223) >>> 0;
    return n / 4294967296;
  };
}
const cellDiameters = [0.8, 1.3, 2, 3, 4.4];
type Cloud = readonly [number, number, number, number, number, number];
type Point = { x: number; y: number };

// A cell's edges come from its neighbours, so the shapes fit like tissue.
function clipCell(polygon: Point[], nx: number, ny: number, limit: number) {
  const result: Point[] = [];
  polygon.forEach((a, i) => {
    const b = polygon[(i + 1) % polygon.length];
    const da = a.x * nx + a.y * ny - limit;
    const db = b.x * nx + b.y * ny - limit;
    if (da <= 0) result.push(a);
    if (da <= 0 !== db <= 0) {
      const t = da / (da - db);
      result.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
    }
  });
  return result;
}
function cellPath(corners: Point[]) {
  const point = (value: number) => String(Number(value.toFixed(1)));
  const blend = (a: Point, b: Point) => ({
    x: a.x * 0.78 + b.x * 0.22,
    y: a.y * 0.78 + b.y * 0.22,
  });
  const start = blend(corners[0], corners[corners.length - 1]);
  let path = `M${point(start.x)},${point(start.y)}`;
  corners.forEach((corner, i) => {
    const previous = corners[(i + corners.length - 1) % corners.length];
    const next = corners[(i + 1) % corners.length];
    const entry = blend(corner, previous),
      exit = blend(corner, next);
    if (i) path += `L${point(entry.x)},${point(entry.y)}`;
    path += `Q${point(corner.x)},${point(corner.y)} ${point(exit.x)},${point(exit.y)}`;
  });
  return path + "Z";
}
const tissueCache = new Map<string, string[]>();
function stipple(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  count: number,
  seed: number,
  cellScale = 1,
) {
  const key = [cx, cy, rx, ry, count, seed, cellScale].join(":");
  const cached = tissueCache.get(key);
  if (cached) return cached;
  const rand = random(seed + 313);
  const paths = cellDiameters.map(() => "");
  const pitch = Math.max(4.8, Math.sqrt((Math.PI * rx * ry) / (count * 0.866)));
  const sites: Point[] = [];
  // Warp a jittered scaffold instead of arranging independent shapes in rings.
  // Fixed seeds and cached paths keep hydration and view switching stable.
  const rows = Math.ceil((ry * 1.2) / (pitch * 0.866));
  const columns = Math.ceil((rx * 1.2) / pitch);
  for (let row = -rows; row <= rows; row++) {
    for (let col = -columns; col <= columns; col++) {
      const x = (col + (row % 2) * 0.5 + (rand() - 0.5) * 0.6) * pitch;
      const y = (row * 0.866 + (rand() - 0.5) * 0.6) * pitch;
      const radius = Math.hypot(x / rx, y / ry);
      if (radius > 1.16) continue;
      const angle =
        Math.atan2(y / ry, x / rx) + 0.65 * Math.exp(-radius * radius * 1.8);
      sites.push({
        x: Math.cos(angle) * radius * rx,
        y: Math.sin(angle) * radius * ry,
      });
    }
  }
  sites.forEach((site) => {
    const radius = Math.hypot(site.x / rx, site.y / ry);
    if (radius > 1) return;
    const extent = pitch * 2;
    let polygon: Point[] = [
      { x: -extent, y: -extent },
      { x: extent, y: -extent },
      { x: extent, y: extent },
      { x: -extent, y: extent },
    ];
    // Equal inset of shared Voronoi boundaries leaves narrow white seams.
    for (const neighbour of sites) {
      const dx = neighbour.x - site.x,
        dy = neighbour.y - site.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 0.001 || distance > pitch * 3.2) continue;
      polygon = clipCell(
        polygon,
        dx / distance,
        dy / distance,
        distance / 2 - 0.65,
      );
      if (polygon.length < 3) break;
    }
    if (polygon.length < 3) return;
    // A sparse cloud must not turn into oversized cells simply because its
    // scaffold has a wider pitch. Keep the same maximum scale across clouds.
    const scale =
      cellScale *
      Math.min(1, 5.6 / pitch) *
      (0.13 + 0.87 * Math.pow(1 - radius, 0.95));
    const bucket = Math.min(4, Math.floor((1 - radius) * 5));
    paths[bucket] += cellPath(
      polygon.map((p) => ({
        x: cx + site.x + p.x * scale,
        y: cy + site.y + p.y * scale,
      })),
    );
  });
  tissueCache.set(key, paths);
  return paths;
}
function DotCloud({
  clouds,
  phase,
  opacity = 1,
  cellScale = 1,
}: {
  clouds: Cloud[];
  phase?: string;
  opacity?: number;
  cellScale?: number;
}) {
  const layers = clouds.map((cloud) => stipple(...cloud, cellScale));
  return (
    <g
      data-phase={phase}
      opacity={opacity}
      fill="currentColor"
      stroke="none"
      data-cell-cloud
      data-cloud-x={clouds[0][0]}
      data-cloud-y={clouds[0][1]}
    >
      {cellDiameters.map((diameter, i) => (
        <path
          key={diameter}
          data-cell-size={diameter}
          opacity={[0.4, 0.6, 0.85, 0.95, 1][i]}
          d={layers.map((paths) => paths[i]).join("")}
        />
      ))}
    </g>
  );
}
function connectionCurve(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  bend: number,
) {
  const dx = x2 - x1,
    dy = y2 - y1;
  const length = Math.hypot(dx, dy) || 1;
  const nx = (-dy / length) * bend,
    ny = (dx / length) * bend;
  return `M${x1} ${y1}C${x1 + dx / 3 + nx} ${y1 + dy / 3 + ny} ${x1 + (dx * 2) / 3 + nx} ${y1 + (dy * 2) / 3 + ny} ${x2} ${y2}`;
}
export function ResolveDiagram() {
  const hubs = [
    [245, 250, 78, 70],
    [370, 190, 55, 65],
    [408, 302, 65, 90],
    [560, 240, 64, 65],
    [658, 118, 73, 76],
    [694, 368, 77, 86],
    [630, 438, 51, 55],
  ];
  return (
    <svg
      viewBox="-520 0 1320 560"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth=".5"
        opacity=".12"
        data-boot="lines"
      >
        {Array.from({ length: 10 }, (_, i) => (
          <path
            key={`new-cluster-${i}`}
            d={connectionCurve(
              65 + Math.sin(i) * 22,
              165 + Math.cos(i) * 26,
              245 + Math.sin(i) * 28,
              250 + Math.cos(i) * 30,
              -12 - i * 2,
            )}
          />
        ))}
        {hubs.flatMap((p, i) =>
          hubs
            .slice(i + 1)
            .map((q, j) => (
              <path
                key={`${i}-${j}`}
                d={connectionCurve(
                  p[0],
                  p[1],
                  q[0],
                  q[1],
                  (i % 2 ? -1 : 1) * (24 + j * 5),
                )}
              />
            )),
        )}
        {Array.from({ length: 28 }, (_, i) => (
          <path
            key={i}
            d={
              connectionCurve(
                220 + i * 2,
                210 + i * 2,
                657 + Math.sin(i) * 43,
                118 + Math.cos(i) * 60,
                -28 - i * 1.3,
              ) +
              connectionCurve(
                408 + Math.sin(i) * 38,
                302 + Math.cos(i) * 60,
                694 + Math.sin(i) * 43,
                368 + Math.cos(i) * 62,
                25 + i * 1.6,
              )
            }
          />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <path
            key={`lower-${i}`}
            d={connectionCurve(
              390 + i * 3,
              330 + i * 2,
              630 + Math.sin(i) * 32,
              438 + Math.cos(i) * 35,
              40 + i * 2,
            )}
          />
        ))}
      </g>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.65"
        data-boot="points"
      >
        <DotCloud clouds={[[65, 165, 48, 58, 320, 7]]} />
        {hubs.map((p, i) => (
          <DotCloud key={i} clouds={[[p[0], p[1], p[2], p[3], 460, 42 + i]]} />
        ))}
      </g>
      <g
        data-boot="resolved"
        fill="var(--mint)"
        stroke="var(--mint-ink)"
        strokeWidth="1.5"
      >
        <path
          d={
            connectionCurve(408, 302, 560, 240, -22) +
            connectionCurve(560, 240, 658, 118, -25) +
            connectionCurve(658, 118, 694, 368, 32) +
            connectionCurve(694, 368, 630, 438, -18) +
            connectionCurve(630, 438, 408, 302, -35) +
            connectionCurve(560, 240, 694, 368, 28)
          }
          fill="none"
          opacity=".6"
        />
        {hubs.slice(2).map((p, i) => (
          <g key={i}>
            <circle cx={p[0]} cy={p[1]} r="11" fill="var(--paper)" />
            <circle data-hero-hub cx={p[0]} cy={p[1]} r="6" />
          </g>
        ))}
      </g>
    </svg>
  );
}
export function SummaryDiagram() {
  return (
    <svg viewBox="0 0 720 220" aria-hidden="true">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <DotCloud phase="0" clouds={[[88, 100, 84, 87, 230, 5]]} />
        <DotCloud phase="1" clouds={[[315, 100, 79, 78, 350, 12]]} />
        <g data-phase="2">
          <g strokeWidth=".4" opacity=".25">
            {Array.from({ length: 20 }, (_, i) => (
              <path
                key={i}
                d={`M${530 + Math.sin(i) * 28} ${100 + Math.cos(i) * 32}L${654 + Math.sin(i) * 20} ${48 + Math.cos(i) * 28} M${530 + Math.sin(i) * 28} ${100 + Math.cos(i) * 32}L${654 + Math.sin(i) * 20} ${153 + Math.cos(i) * 28}`}
              />
            ))}
          </g>
          <DotCloud
            clouds={[
              [530, 100, 47, 53, 200, 4],
              [654, 48, 43, 44, 200, 7],
              [654, 153, 44, 45, 200, 9],
            ]}
          />
          <path
            d="M530 100L654 48L654 153Z"
            stroke="var(--mint-ink)"
            strokeWidth=".8"
          />
          {[48, 153].map((y) => (
            <circle
              key={y}
              cx="654"
              cy={y}
              r="6"
              fill="var(--mint)"
              stroke="var(--mint-ink)"
            />
          ))}
        </g>
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M185 100h35m-8-7 8 7-8 7M420 100h35m-8-7 8 7-8 7" />
      </g>
    </svg>
  );
}
export function GraphStructure() {
  return (
    <g
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      className="graph-structure"
    >
      <g strokeWidth=".65" opacity=".48">
        {[0, 45].map((dx) => (
          <g key={dx} transform={`translate(${dx} 0)`}>
            <path d="M135 245L225 188V409L135 466Z" />
            {Array.from({ length: 13 }, (_, i) => (
              <path
                key={i}
                d={`M${135 + i * 7.5} ${245 - i * 4.75}v221 M135 ${245 + i * 17}l90-57`}
                opacity=".5"
              />
            ))}
          </g>
        ))}
        {[0, 46].map((dx) => (
          <g key={dx} transform={`translate(${dx} 0)`}>
            <path d="M690 270L788 208V470L690 532Z" />
            {Array.from({ length: 15 }, (_, i) => (
              <path
                key={i}
                d={`M${690 + i * 7} ${270 - i * 4.4}v262 M690 ${270 + i * 18}l98-62`}
                opacity=".5"
              />
            ))}
          </g>
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <g key={i} transform={`translate(0 ${i * 46})`}>
            <path d="M488 175l40-21 42 18-42 21-40-18v36l40 22 42-20v-41 M528 193v40" />
            <path d="M488 175l82 34M570 172l-82 39" opacity=".35" />
          </g>
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <path
            key={i}
            d={`M380 330Q${500 + i * 5} ${150 + i * 20} ${735 + Math.sin(i) * 68} ${270 + i * 12}`}
            opacity=".5"
          />
        ))}
        <path
          d="M380 220V510M450 180V500M635 190V500M870 230V510"
          strokeDasharray="2 8"
        />
      </g>
      <g strokeWidth="1.35" strokeLinecap="round" opacity=".64">
        <DotCloud
          clouds={[
            [72, 335, 74, 93, 270, 9],
            [310, 335, 38, 56, 180, 10],
            [380, 245, 62, 69, 240, 11],
            [380, 425, 50, 58, 190, 12],
          ]}
        />
      </g>
      <g
        fontSize="13"
        stroke="none"
        fill="currentColor"
        opacity=".75"
        fontFamily="var(--mono)"
      >
        <text x="507" y="130">
          MODULE
        </text>
        <path d="M529 138v28" stroke="currentColor" />
        <text x="730" y="186">
          WORKSPACE
        </text>
      </g>
    </g>
  );
}
