import styles from "./Flowers.module.css";
import type { CSSProperties } from "react";

const blossoms = Array.from({ length: 19 }, (_, i) => {
  const angle = i * 2.39996;
  const radius = Math.sqrt(i / 18) * 29;
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius * .72, size: 6 + (i * 7 % 6), phase: -(i * .47), duration: 2.6 + (i % 5) * .31 };
});

export function Flowers() {
  return <g data-fx-flowers className={styles.flowers} fill="none" stroke="currentColor" strokeWidth=".7">
    {blossoms.map((flower, i) => <g key={i} transform={`translate(${flower.x.toFixed(2)} ${flower.y.toFixed(2)})`}>
      <g className={styles.bloom} style={{ "--bloom-delay": `${flower.phase}s`, "--bloom-duration": `${flower.duration}s` } as CSSProperties}>
        {Array.from({length: 6}, (_, petal) => <ellipse key={petal} cx="0" cy={-flower.size / 2} rx={flower.size * .23} ry={flower.size / 2} transform={`rotate(${petal * 60 + i * 13})`} />)}
        <circle r="1.2" />
      </g>
    </g>)}
  </g>;
}
