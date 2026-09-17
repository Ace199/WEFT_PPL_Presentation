"use client";

import { useReducer } from "react";
import styles from "./Illustrations.module.css";

export function IdeaBulb() {
  const [replay, restart] = useReducer((value: number) => value + 1, 0);
  return <g data-idea-bulb onPointerEnter={(event) => {
    if (event.pointerType !== "touch") restart();
  }}>
    <rect x="-38" y="-43" width="76" height="70" fill="transparent" stroke="none" />
    <g key={replay} className={styles.ideaShake} pointerEvents="none">
      <path className={styles.bulb} d="M-8 13C-8 3-16 1-16-9a16 16 0 0 1 32 0C16 1 8 3 8 13Z" />
      <path d="M-8 18H8M-5 23H5" />
      <g className={styles.rays}>
        <path d="M0-33V-39M-25-25-30-30M25-25 30-30M-25-8H-34M25-8H34" />
      </g>
    </g>
  </g>;
}
