import { DesignText as T } from "./DesignText";
import styles from "./TaskCompositionDiagram.module.css";

const tasks = [
  { name: "Main Characters Task", items: ["Character A", "Character B", "Character C"] },
  { name: "Secondary Characters Task", items: ["Secondary 01", "Secondary 02", "Secondary 03", "… Secondary 07"] },
  { name: "Camera / Layout Task", items: ["Camera"] },
];

/** Illustrative work groups and contributions, not a measured production run. */
export function TaskCompositionDiagram() {
  return (
    <div className={styles.model} data-task-composition-diagram="">
      <p className={styles.label}>INDEPENDENT TASKS</p>
      <div className={styles.flow}>
        {tasks.map((task, i) => (
          <div className={styles.task} key={task.name} style={{gridRow: i + 1}} data-node="">
            <h6>{task.name}</h6>
            <ul>{task.items.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
        ))}
        <div className={styles.connector} aria-hidden="true">
          <svg viewBox="0 0 100 600" preserveAspectRatio="none" style={{height:"100%",width:"100%",maxHeight:"none"}} data-relation="">
            <g fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke">
              <path data-line="" d="M0 100H45V300H100" />
              <path data-line="" d="M0 300H100" />
              <path data-line="" d="M0 500H45V300H100" />
              <path d="m87 291 13 9-13 9" />
            </g>
          </svg>
        </div>
        <div className={styles.master} data-node="">
          <h6>ANI MASTER STATE</h6>
          <p>shared shot state</p>
          <small>task sources retained</small>
        </div>
      </div>
      <div className={styles.benefits}>
        <p className={styles.label}><T zh="收益 / 设计目标" en="BENEFITS / DESIGN INTENT" /></p>
        <ul>
          <li><T zh="单个任务范围更轻" en="Lighter working scope" /></li>
          <li><T zh="责任边界更清晰" en="Clearer task ownership" /></li>
          <li><T zh="共同镜头状态继续保留" en="Shared shot state preserved" /></li>
        </ul>
      </div>
    </div>
  );
}
