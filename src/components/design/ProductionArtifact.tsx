import type { DecisionId } from "@/content/decisions";
import { sitePath } from "@/lib/paths";
import { DesignText as T } from "./DesignText";
import styles from "./DesignPage.module.css";
import { ProductionSpecimen } from "./ProductionSpecimen";

export function ProductionArtifact({ id }: { id: DecisionId }) {
  if (id === "task-composition") return <ProductionSpecimen id={id} />;
  if (id === "modularity" || id === "execution")
    return (
      <figure className={styles.artifact}>
        {id === "modularity" ? (
          <svg
            viewBox="0 128 995 540"
            role="img"
            aria-label="Actual Houdini Shot Builder: resource tree, version selectors and original states."
          >
            <defs>
              <clipPath id="shot-builder-crop">
                <rect x="0" y="128" width="995" height="540" />
              </clipPath>
            </defs>
            <image
              clipPath="url(#shot-builder-crop)"
              href={sitePath("/images/proof/shot-builder.png")}
              width="1122"
              height="879"
            />
          </svg>
        ) : (
          <svg
            viewBox="195 467 360 425"
            role="img"
            aria-label="Actual Publish UI crop: Collect, QC Context, Pub Context and Publish controls."
          >
            <defs>
              <clipPath id="publish-qc-crop">
                <rect x="195" y="467" width="360" height="425" />
              </clipPath>
            </defs>
            <image
              clipPath="url(#publish-qc-crop)"
              href={sitePath("/images/proof/publish.png")}
              width="563"
              height="913"
            />
          </svg>
        )}
        <figcaption>
          <T
            zh={
              id === "modularity"
                ? "HOUDINI SHOT BUILDER / 实际界面节选"
                : "PUBLISH / QC / 实际界面节选"
            }
            en={
              id === "modularity"
                ? "HOUDINI SHOT BUILDER / ORIGINAL UI CROP"
                : "PUBLISH / QC / ORIGINAL UI CROP"
            }
          />
        </figcaption>
      </figure>
    );
  if (id === "compatibility")
    return (
      <figure className={`${styles.artifact} ${styles.documentArtifact}`}>
        <div className={styles.documentTitle}>RigCache USD</div>
        <ul>
          <li>local animated geometry</li>
          <li>logical Surface dependency</li>
          <li>compatibility constraint</li>
        </ul>
        <figcaption>
          <T zh="简化结构示意" en="SIMPLIFIED STRUCTURE" />
        </figcaption>
      </figure>
    );
  return (
    <figure className={`${styles.artifact} ${styles.recordArtifact}`}>
      <div>
        <span>PREVIOUS RECORD</span>
        <pre>{"A   v002\nB   v001\nCam v003"}</pre>
      </div>
      <div>
        <span>+ PUBLISH DELTA</span>
        <pre>
          <mark>{"A   v003"}</mark>
        </pre>
      </div>
      <div>
        <span>↓ CURRENT RECORD</span>
        <pre>
          <mark>{"A   v003"}</mark>
          {"\nB   v001\nCam v003"}
        </pre>
      </div>
      <figcaption>
        <T
          zh="简化数据示例 / 保留未改变的条目"
          en="SIMPLIFIED DATA / UNCHANGED ENTRIES RETAINED"
        />
      </figcaption>
    </figure>
  );
}
