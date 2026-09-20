"use client";

import { useState, type ReactNode } from "react";
import styles from "./DesignPage.module.css";

/** Only the record selector is interactive; specimen content is server-rendered. */
export function ArtifactState({
  delta,
  current,
}: {
  delta: ReactNode;
  current: ReactNode;
}) {
  const [full, setFull] = useState(false);
  return (
    <div data-artifact-control="" className={styles.recordViewer}>
      <div
        className={styles.specimenSwitch}
        role="group"
        aria-label="Record view"
      >
        <button
          type="button"
          aria-pressed={!full}
          aria-controls="record-delta"
          aria-label="DELTA"
          onClick={() => setFull(false)}
        >
          publish_delta.json <span>DELTA</span>
        </button>
        <button
          type="button"
          aria-pressed={full}
          aria-controls="record-current"
          aria-label="CURRENT STATE"
          onClick={() => setFull(true)}
        >
          shot_record.json <span>CURRENT STATE</span>
        </button>
      </div>
      <div id="record-delta" hidden={full}>
        {delta}
      </div>
      <div id="record-current" hidden={!full}>
        {current}
      </div>
    </div>
  );
}
