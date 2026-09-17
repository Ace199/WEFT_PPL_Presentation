import styles from "./Character.module.css";

function WalkingLeg({ far = false }: { far?: boolean }) {
  return <g transform="translate(0 8)" opacity={far ? .65 : 1}>
    <g className={`${styles.walkLeg} ${far ? styles.far : ""}`}>
      <path d="M-3 0Q0-3 3 0L3 11Q0 14-3 11Z" fill="var(--limb)"/>
      <g transform="translate(0 12)"><g className={`${styles.knee} ${far ? styles.far : ""}`}>
        <path d="M-3-1H3L2 11H-3Z" fill="var(--limb)"/>
        <path d="M-3 9H3L8 12Q9 15 6 15H-3Z" fill="var(--boot)"/>
      </g></g>
    </g>
  </g>;
}

function WalkingArm({ far = false }: { far?: boolean }) {
  return <g transform="translate(0 -11)" opacity={far ? .65 : 1}>
    <g className={`${styles.walkArm} ${far ? styles.far : ""}`}>
      <path d="M-2 0Q0-3 3 0L3 10 7 18Q8 21 5 22L2 20-2 11Z" fill="var(--limb)"/>
    </g>
  </g>;
}

/** The same illustrative model across modeling, surfacing, animation and render. */
export function Character({ colored = false, moving = false }: { colored?: boolean; moving?: boolean }) {
  return <g className={`${styles.figure} ${colored ? styles.colored : ""} ${moving ? styles.moving : ""}`} data-character={colored ? "colored" : "white"} data-walking={moving} stroke="#53605e" strokeWidth=".85" strokeLinejoin="round">
    <ellipse cx="0" cy="34" rx="18" ry="3" fill="#24392d" fillOpacity=".08" stroke="none" />
    <g className={styles.body}>
      {moving ? <>
        <WalkingArm far/>
        <WalkingLeg far/>
        <WalkingLeg/>
        <path d="M-5-14Q0-17 5-13L6 0 4 10H-5L-7 0Z" fill="var(--suit)"/>
        <path d="M3-10 4 1 2 7" fill="none" opacity=".2"/>
        <WalkingArm/>
        <path d="M-2-20H3V-14H-2Z" fill="var(--limb)"/>
        <path d="M-6-26Q-6-35 1-35Q8-35 7-27L10-24 7-23V-20Q3-17-2-20Z" fill="#fffefa"/>
        <path d="M0-27Q-3-28-2-24" fill="none" opacity=".4"/>
      </> : <>
      <g transform="translate(-6 9)"><g className={styles.legA}><path d="M-4 0H4L3 19Q3 23-1 23H-4Z" fill="var(--limb)"/><path d="M-4 18H3L6 25Q3 28-5 26Z" fill="var(--boot)"/></g></g>
      <g transform="translate(6 9)"><g className={styles.legB}><path d="M-4 0H4L4 23H1Q-3 23-3 19Z" fill="var(--limb)"/><path d="M-3 18H4L5 26Q-3 28-6 25Z" fill="var(--boot)"/></g></g>
      <path d="M-9-14Q0-18 9-14L11 1 7 12H-7L-11 1Z" fill="var(--suit)"/>
      <path d="M5-12 8 0 5 9" fill="none" stroke="#344b3e" opacity=".2"/>
      <g transform="translate(-11 -11)"><g className={styles.armA}><path d="M-3 0Q0-4 3 0L2 13 0 23Q-4 25-5 21L-5 12Z" fill="var(--limb)"/></g></g>
      <g transform="translate(11 -11)"><g className={styles.armB}><path d="M-3 0Q0-4 3 0L5 12 5 21Q4 25 0 23L-2 13Z" fill="var(--limb)"/></g></g>
      <path d="M-3-19H3V-14H-3Z" fill="var(--limb)"/>
      <ellipse cy="-26" rx="7.5" ry="9" fill="#fffefa"/>
      <path d="M4-31Q9-24 3-19" stroke="#9ea9a2" opacity=".45" fill="none"/>
      </>}
    </g>
  </g>;
}
