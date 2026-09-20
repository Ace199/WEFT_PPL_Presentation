import type { ReactNode } from "react";
import type { DecisionId } from "@/content/decisions";
import { sitePath } from "@/lib/paths";
import { DesignText as T } from "./DesignText";
import { ArtifactState } from "./ArtifactState";
import { PublishPreview } from "./PublishPreview";
import styles from "./DesignPage.module.css";

function Specimen({
  name,
  type,
  lines,
}: {
  name: string;
  type: string;
  lines: ReactNode[];
}) {
  return (
    <div className={styles.specimen}>
      <div className={styles.specimenTitle}>
        <span>{name}</span>
        <span>{type}</span>
      </div>
      <pre tabIndex={0} aria-label={name}>
        <code>
          {lines.map((line, i) => (
            <span className={styles.codeLine} key={i}>
              <span aria-hidden="true" className={styles.lineNumber}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                {line}
                {i < lines.length - 1 ? "\n" : ""}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

export function ProductionSpecimen({ id }: { id: DecisionId }) {
  let content: ReactNode;
  let note: { zh: string; en: string };
  if (id === "compatibility") {
    content = (
      <Specimen
        name="RigCache.usda"
        type="USDA"
        lines={[
          "#usda 1.0",
          "(",
          "    subLayers = [",
          "        @./Character__geo.usd@,",
          <>
            {"        @"}<span className={styles.redactedPrefix} role="img" aria-label="隐藏的路径前缀" />{"/ASSET/CHR/Character&"}
            <mark>av=av0003</mark>&amp;<mark>step=Srf</mark>@
          </>,
          "    ]",
          ")",
        ]}
      />
    );
    note = {
      zh: "简化 USDA 示例 · 已发布 RigCache 包含本地动画几何与带兼容范围的 Surface 逻辑依赖；资产继续演进后，历史 RigCache 仍可按原兼容范围解析和渲染。",
      en: "Simplified USDA · Published RigCache includes local animated geometry and a compatibility-scoped Surface dependency, preserving resolution and rendering within its original scope as the asset evolves.",
    };
  } else if (id === "modularity") {
    content = (
      <Specimen
        name="SHOT / Example"
        type="RESOURCE TREE"
        lines={[
          "Workspace",
          "├─ Camera       v003",
          "├─ Set          v002",
          "├─ Character_A",
          <>
            {"│  ├─ RigCache  "}
            <mark>v004</mark>
            {"   LOADED"}
          </>,
          "│  └─ CFX       v002   READY",
          "└─ Character_B",
          "   └─ RigCache  v007   LOADED",
        ]}
      />
    );
    note = {
      zh: "资源树与状态均为示意 · Houdini Shot Builder 以资源实例为单位发现、选版和更新 Production Modules，而不是把整个 Shot 当成不可拆分的版本包。",
      en: "Illustrative resources and states · Houdini Shot Builder discovers, selects versions and updates production modules by resource instance, rather than treating the shot as an indivisible versioned package.",
    };
  } else if (id === "state") {
    content = (
      <ArtifactState
        delta={
          <Specimen
            name="publish_delta.json"
            type="JSON"
            lines={[
              "{",
              '  "rigcache": {',
              <>
                {'    "Character_A": {"version": '}
                <mark>"v003"</mark>
                {"}"}
              </>,
              "  }",
              "}",
            ]}
          />
        }
        current={
          <Specimen
            name="shot_record.json"
            type="JSON"
            lines={[
              "{",
              '  "rigcache": {',
              <>
                {'    "Character_A": {"version": '}
                <mark>"v003"</mark>
                {"},"}
              </>,
              '    "Character_B": {"version": "v001"}',
              "  },",
              '  "camera": {"version": "v003"}',
              "}",
            ]}
          />
        }
      />
    );
    note = {
      zh: "简化记录 · description 描述本次变化，record 保存合并历史变化后的当前完整状态；本次没有发布的资源不会因此自动被删除。",
      en: "Simplified records · description describes this change; record retains the complete state after merging past changes. Resources omitted from this publish are not automatically deleted.",
    };
  } else {
    content = (
      <Specimen
        name="Publish / QC"
        type="ILLUSTRATIVE EXECUTION TRACE"
        lines={[
          "COLLECT      → gather products",
          "QC CONTEXT   → validate production context",
          "QC INSTANCE  → validate product requirements",
          "PUBLISH      → write production outputs",
          "INTEGRATE    → register / update production state",
        ]}
      />
    );
    note = {
      zh: "执行过程示意，非真实运行日志 · Builder 与 Publish / QC 分别约束制作起点和交付边界，让 Production Rules 进入实际执行过程。",
      en: "Illustrative execution sequence, not a runtime log · Builder and Publish / QC constrain the starting context and delivery boundary, bringing production rules into execution.",
    };
  }
  return (
    <figure className={styles.specimenFigure}>
      {id === "modularity" || id === "execution" ? (
        <div className={styles.modularityExample} data-modularity-example={id === "modularity" ? "" : undefined} data-execution-example={id === "execution" ? "" : undefined}>
          {content}
          <div className={styles.builderExample}>
            <div className={styles.specimenTitle}>
              <span>{id === "modularity" ? "HOUDINI / Shot Builder" : "PUBLISH / QC"}</span>
              <span><T zh="实际界面节选" en="ORIGINAL UI CROP" /></span>
            </div>
            {id === "modularity" ? <svg viewBox="0 128 1122 540" role="img" aria-label="Shot Builder — resource tree, version selection and assembly states">
              <image href={sitePath("/images/proof/shot-builder.png")} width="1122" height="879" />
            </svg> : <PublishPreview />}
          </div>
        </div>
      ) : content}
      <figcaption>
        <T {...note} />
      </figcaption>
    </figure>
  );
}
