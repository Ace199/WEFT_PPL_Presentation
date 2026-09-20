"use client";
import { useLanguage } from "./Language";
import { useEffect, useRef, useState, useId, createContext, useContext, type ReactNode } from "react";
import { nodes, edges, type View } from "@/data/graph";
import { box, cameraBody, cameraFrustum, setFrame, setSlats, floorGrid, assetDots, assetContours, updatedAssetDots, updatedAssetContours } from "@/lib/production-geometry";
import styles from "./ProductionScene.module.css";


type SceneInteraction = {
  focusedNode?: string;
  pinnedNode?: string;
  onInspect: (id?: string) => void;
  onSelect: (id: string) => void;
};
const SceneContext = createContext<SceneInteraction | null>(null);

// Separate interaction wrappers own emphasis; the existing GSAP timeline
// continues to own view transitions and geometry on their child groups.
function ScenePart({node, links = [node], label, bounds, enabled = true, children}: {
  node: string; links?: string[]; label?: string;
  bounds?: [number, number, number, number]; enabled?: boolean; children: ReactNode;
}) {
  const state = useContext(SceneContext)!;
  const {t} = useLanguage();
  const active = !!state.focusedNode && links.includes(state.focusedNode);
  const related = !!state.focusedNode && edges.some(edge =>
    (edge.source === state.focusedNode && links.includes(edge.target)) ||
    (edge.target === state.focusedNode && links.includes(edge.source)));
  const name = nodes.find(item => item.id === node)?.label ?? node;
  return <g className={styles.part} data-scene-node={node}
    data-link-state={!state.focusedNode ? "idle" : active ? "active" : related ? "related" : "muted"}
    data-enabled={enabled} role={enabled ? "button" : undefined}
    tabIndex={enabled ? 0 : undefined} aria-hidden={enabled ? undefined : true}
    aria-label={enabled ? `${t("图示")} / ${t("检查")} ${label ? t(label) + " / " : ""}${name}` : undefined}
    aria-pressed={enabled ? state.pinnedNode === node : undefined}
    onPointerEnter={e => {if(enabled && e.pointerType === "mouse") state.onInspect(node);}}
    onPointerLeave={e => {if(enabled && document.activeElement !== e.currentTarget) state.onInspect();}}
    onFocus={() => {if(enabled) state.onInspect(node);}}
    onBlur={() => {if(enabled) state.onInspect();}}
    onClick={e => {if(enabled) {e.stopPropagation(); state.onSelect(node);}}}
    onKeyDown={e => {if(enabled && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault(); e.stopPropagation(); state.onSelect(node);
    }}}>
    {bounds ? <rect className={styles.hitArea} x={bounds[0]} y={bounds[1]} width={bounds[2]} height={bounds[3]} rx="4"/> : null}
    {children}
  </g>;
}

function Camera() {
  return <g fill="none"><path d={cameraBody} strokeWidth="1.25"/><path d={cameraFrustum} opacity=".4" strokeWidth=".65"/></g>;
}
function SetModule() {
  return <g fill="none"><path d={setFrame} strokeWidth="1.1"/><path d={setSlats} opacity=".4" strokeWidth=".6"/></g>;
}
function AssetSurface({updated=false}:{updated?:boolean}) {
  return <g fill="none"><path d={updated?updatedAssetDots:assetDots} strokeWidth="1.15" vectorEffect="non-scaling-stroke" strokeLinecap="round"/><path d={updated?updatedAssetContours:assetContours} strokeWidth=".8" vectorEffect="non-scaling-stroke" opacity=".85"/></g>;
}

// Reuse the former third view's curved fan-out around the original stack.
// Solid mint links now describe existing execution points, not future plans.
function OperateBranches() {
  return <g data-operate-network>
    {(["builder", "loader", "publish", "review"] as const).map((id, i) => {
      const x = 500 + i * 110, y = i === 0 || i === 3 ? 91 : 62;
      const path = `M${641+i*16} 146C${641+i*16} 112 ${x} 133 ${x} ${y}`;
      return <ScenePart key={id} node={id} bounds={[x-48,y-45,96,67]}>
        <path data-operate-path d={path} pathLength="1" stroke="#a0e5cb" strokeWidth="1.15" fill="none"/>
        <circle data-operate-tip cx={x} cy={y} r="5" fill="#19211c" stroke="#a0e5cb" strokeWidth="1.2"/>
        <text data-operate-label x={x} y={y-17} textAnchor="middle" className={styles.toolLabel}>{id.toUpperCase()}</text>
      </ScenePart>;
    })}
    {(["houdini", "maya"] as const).map((id, i) => {
      const x = 570 + i * 190;
      return <ScenePart key={id} node={id} links={[id,"composition"]} bounds={[x-65,425,130,78]}>
        <path data-operate-path d={`M${653+i*24} 372C${653+i*24} 405 ${x} 405 ${x} 451`} pathLength="1" stroke="#a0e5cb" strokeWidth="1.15" fill="none"/>
        <circle data-operate-tip cx={x} cy="451" r="5" fill="#19211c" stroke="#a0e5cb" strokeWidth="1.2"/>
        <text data-operate-label x={x} y="482" textAnchor="middle" className={styles.hostLabel}>{id.toUpperCase()}</text>
      </ScenePart>;
    })}
  </g>;
}
export function ProductionScene({mode, quiet, focusedNode, pinnedNode, onInspect, onSelect, onClear}:
  SceneInteraction & {mode:View;quiet:boolean;onClear:()=>void}) {
  const {t} = useLanguage();
  const root=useRef<SVGSVGElement>(null);
  const assetId=useId();
  const [narrow,setNarrow]=useState(false);
  useEffect(()=>{
    const query=window.matchMedia("(max-width:600px)");
    const sync=()=>setNarrow(query.matches);
    sync(); query.addEventListener("change",sync);
    return ()=>query.removeEventListener("change",sync);
  },[]);
  useEffect(()=>{
    let cancelled=false;
    let ctx:gsap.Context|undefined;
    const element=root.current;
    if(!element) return;
    const host=element.closest<HTMLElement>("[data-mode]");
    if(host) host.dataset.settled="false";
    void import("gsap").then(({gsap})=>{
      if(cancelled) return;
      ctx=gsap.context(()=>{
        const t=gsap.timeline({onComplete:()=>{if(host) host.dataset.settled="true";}});
        const duration=quiet?0:.65;
        t.set("[data-result-dots]",{attr:{d:mode==="transform"&&quiet?updatedAssetDots:assetDots}},0)
          .set("[data-result-contours]",{attr:{d:mode==="transform"&&quiet?updatedAssetContours:assetContours}},0)
          .set("[data-character-result]",{attr:{stroke:mode==="transform"&&quiet?"#a0e5cb":"#e1e4da"}},0);
        t.to("[data-preserved]",{opacity:mode==="transform"?.38:1,duration},0);
        t.to("[data-organize]",{opacity:mode==="organize"?1:0,duration},0);
        if(mode === "operate" && !quiet) {
          t.fromTo("[data-operate-path]",{strokeDasharray:1,strokeDashoffset:1},
            {strokeDashoffset:0,duration:.8,stagger:.12,ease:"power2.inOut"},.15)
            .fromTo("[data-operate-tip]",{opacity:0,scale:.4,transformOrigin:"50% 50%"},
              {opacity:1,scale:1,duration:.3,stagger:.12,ease:"power2.out"},.65)
            .fromTo("[data-operate-label]",{opacity:0,y:7},
              {opacity:1,y:0,duration:.35,stagger:.12,ease:"power2.out"},.8);
        }
        t.set("[data-version-old]",{
          opacity:mode==="transform"?(quiet?.26:1):0,
          attr:{transform:mode==="transform"&&quiet?"translate(161 435) scale(.45)":"translate(257 435) scale(.85)"}
        },0).set("[data-character-source]",{x:0,opacity:mode==="transform"&&!quiet?0:1},0);
        if(mode==="transform"&&!quiet) {
          t.to("[data-version-old]",{opacity:.26,
            attr:{transform:"translate(161 435) scale(.45)"},duration:.85,ease:"power2.inOut"},.3)
            .fromTo("[data-character-source]",{opacity:0,x:-12},
              {opacity:1,x:0,duration:.65,ease:"power2.out"},.95);
          t.fromTo("[data-update-route]",{strokeDasharray:"650",strokeDashoffset:650},{strokeDashoffset:0,duration:.85,ease:"power2.inOut"},.15)
            .fromTo("[data-result-dots]",{attr:{d:assetDots}},
              {attr:{d:updatedAssetDots},duration:1.35,ease:"power2.inOut"},.85)
            .fromTo("[data-result-contours]",{attr:{d:assetContours}},
              {attr:{d:updatedAssetContours},duration:1.35,ease:"power2.inOut"},.85)
            .fromTo("[data-character-result]",{attr:{stroke:"#e1e4da"}},
              {attr:{stroke:"#a0e5cb"},duration:1.35,ease:"power2.inOut"},.85);
        }
      },element);
    });
    return ()=>{cancelled=true;ctx?.revert();};
  },[mode,quiet]);
  const update=mode==="transform";
  return <svg ref={root} className={styles.scene} viewBox={narrow?(mode==="operate"?"0 0 1400 2750":"0 0 1400 2500"):"0 0 1400 540"} role="group" aria-label={t("检查生产模型节点")} data-production-scene
    data-inspecting={!!focusedNode} data-quiet={quiet} data-operating={mode==="operate"}
    onClick={event => {if(!(event.target as Element).closest("[data-scene-node]")) onClear();}}>
    <SceneContext.Provider value={{focusedNode, pinnedNode, onInspect, onSelect}}>
    <defs><g id={assetId}><AssetSurface/></g><g id={`${assetId}-updated`}><AssetSurface updated/></g></defs>
    <g className={styles.sourcePanel}>
      <text x="28" y="30" className={styles.eyebrow}>PRODUCTION MODULES</text>
      <g data-preserved>
        <ScenePart node="product" label="相机" bounds={[18,52,340,122]}>
        <text x="28" y="100" className={styles.label}>{t("相机")}</text>
        <text x="28" y="123" className={styles.small}>{update?t("保持不变"):t("独立取景")}</text>
        <g transform="translate(217 130) scale(1.05)" stroke="currentColor"><Camera/></g>
        </ScenePart>
        <ScenePart node="product" label="场景" bounds={[18,181,350,161]}>
        <text x="28" y="270" className={styles.label}>{t("场景")}</text>
        <text x="28" y="293" className={styles.small}>{update?t("保持不变"):t("空间与环境")}</text>
        <g transform="translate(251 303) scale(.88)" stroke="currentColor"><SetModule/></g>
        </ScenePart>
      </g>
      <ScenePart node="product" links={["product","version"]} label="资产" bounds={[18,348,384,137]}>
      <text x="28" y="442" className={styles.label}>{t("资产")}</text>
      <text x="28" y="466" className={styles.small}>{update?t("仅更新这一项"):t("独立制作成果")}</text>
      <g data-version-old opacity={update?(quiet?.26:1):0} transform={update&&quiet?"translate(161 435) scale(.45)":"translate(257 435) scale(.85)"} stroke="#f2f1e8"><use href={`#${assetId}`}/><text x="-15" y="32" className={styles.small}>v1</text></g>
      <g transform={update?"translate(285 435) scale(.72)":"translate(257 435) scale(.85)"}>
        <g data-character-source opacity={update&&!quiet?0:1} stroke={update?"#a0e5cb":"currentColor"}><use href={`#${assetId}${update?"-updated":""}`}/></g>
      </g>
      </ScenePart>
      <ScenePart node="version" bounds={[249,484,102,34]}>
      <text x="277" y="502" className={styles.small} fill={update?"#a0e5cb":undefined}>{update?"v1 → v2":"Module"}</text>
      </ScenePart>
    </g>
    <g className={styles.routes} fill="none" stroke="#a0e5cb" strokeWidth="1.3">
      <ScenePart node="dependency" links={["product","dependency"]}>
      <g data-preserved>
        <path d="M350 110H438Q458 110 458 130V239Q458 261 480 261H610"/>
        <path d="M355 276H492Q515 276 515 289H610"/>
        <circle cx="350" cy="110" r="4" fill="#a0e5cb"/>
        <circle cx="355" cy="276" r="4" fill="#a0e5cb"/>
      </g>
      </ScenePart>
      <ScenePart node="resolution" links={["dependency","resolution","validation","version"]}>
      <path data-update-route d={`M${update?388:343} 432H437Q467 432 467 406V344Q467 316 495 316H610`}/>
      <circle cx={update?388:343} cy="432" r="4" fill="#a0e5cb"/>
      </ScenePart>
      <ScenePart node="composition" links={["resolution","composition","state"]}>
      <path d="M718 290H838m-10-6 10 6-10 6"/>
      </ScenePart>
    </g>
    <g className={styles.systemPanel}>
      <ScenePart node="context" bounds={[595,145,144,37]}>
      <text x="665" y="169" textAnchor="middle" className={styles.eyebrow}>SHARED MODEL</text>
      </ScenePart>
      <ScenePart node="product" links={["context","product","version","dependency","validation","resolution"]} bounds={[610,213,108,128]}>
      {[0,1,2].map(i=><g data-shared-stack key={i} transform={`translate(665 ${257+i*28})`} stroke={update&&i!==2?"#89978e":"#a0e5cb"} fill="none">
        <path d={box(-34,0,-24,68,13,48)} strokeWidth="1.05"/>
      </g>)}
      </ScenePart>
      <g data-organize opacity="0" className={styles.annotations}>
        <ScenePart node="product" label="身份" enabled={mode==="organize"} bounds={[559,194,67,42]}>
        <text x="570" y="219">{t("身份")}</text><path d="M601 224l24 20"/></ScenePart>
        <ScenePart node="version" label="版本" enabled={mode==="organize"} bounds={[727,194,79,42]}>
        <text x="737" y="219">{t("版本")}</text><path d="M733 224l-26 20"/></ScenePart>
        <ScenePart node="dependency" label="依赖" enabled={mode==="organize"} bounds={[559,332,77,42]}>
        <text x="570" y="355">{t("依赖")}</text><path d="M601 345l24-19"/></ScenePart>
        <ScenePart node="validation" label="校验" enabled={mode==="organize"} bounds={[727,332,87,42]}>
        <text x="737" y="355">{t("校验")}</text><path d="M733 345l-26-19"/></ScenePart>
      </g>
      {update?<ScenePart node="validation" links={["validation","resolution"]} label="兼容检查" bounds={[483,319,100,40]}><g className={styles.annotations}><text x="493" y="343" fill="#a0e5cb">{t("兼容检查")}</text><circle cx="575" cy="316" r="5" fill="#a0e5cb"/></g></ScenePart>:null}
      <ScenePart node="state" bounds={mode==="operate"?[630,341,70,57]:[542,376,247,79]}>
      <path d="M665 345v27" stroke="#718178"/>
      {mode!=="operate" ? <>
      <circle cx="665" cy="390" r="4" fill="#a0e5cb"/>
      <text x="665" y="415" textAnchor="middle" className={styles.label}>{update?t("局部更新 / 完整状态"):t("完整的当前状态")}</text>
      <text x="665" y="443" textAnchor="middle" className={styles.small}>STATE</text>
      </> : null}
      </ScenePart>
      {mode==="operate" ? <OperateBranches/> : null}
    </g>
    <g className={styles.workspacePanel}>
      <ScenePart node="composition" bounds={[953,6,297,40]}>
        <text x="1100" y="30" textAnchor="middle" className={styles.eyebrow}>COMPOSED WORKSPACE</text>
      </ScenePart>
      <g transform="translate(1105 388) scale(1.26)" stroke="currentColor" fill="none">
        <ScenePart node="context" links={["context","composition"]}>
          <path d={floorGrid} opacity=".15" strokeWidth=".55"/>
          <path d="M-220 0L0 104L228 0" opacity=".4" strokeWidth=".7"/>
          <path d="M-220 0V-174M228 0V-174" opacity=".2" strokeDasharray="3 5"/>
        </ScenePart>
        <g data-preserved>
          <ScenePart node="composition" links={["product","composition"]} label="场景">
            <g transform="translate(30 -40)"><SetModule/></g>
          </ScenePart>
          <ScenePart node="composition" links={["product","composition"]} label="相机">
            <g transform="translate(-131 -3) scale(.85)"><Camera/></g>
          </ScenePart>
        </g>
        <ScenePart node="composition" links={["product","version","state","composition"]} label="资产">
          <g transform="translate(30 24) scale(.95)">
            <g data-character-result stroke={update&&quiet?"#a0e5cb":"#e1e4da"}>
              <path data-result-dots d={update&&quiet?updatedAssetDots:assetDots}
                strokeWidth="1.45" strokeLinecap="round"/>
              <path data-result-contours d={update&&quiet?updatedAssetContours:assetContours}
                strokeWidth=".8" opacity=".7"/>
            </g>
          </g>
        </ScenePart>
      </g>
      <ScenePart node="composition" bounds={[907,459,389,40]}>
        <text x="1100" y="484" textAnchor="middle" className={styles.small}>{update?t("相机、场景保留 · 资产版本替换"):t("独立选择，组合为同一个镜头")}</text>
      </ScenePart>
    </g>
    <g className={styles.caption}>
      <path d="M28 524H120M365 524H430M486 524H550M783 524H833M883 524H953M1260 524H1370" stroke="#5b6d60"/>
      <text x="244" y="530" textAnchor="middle">{t("独立的制作成果")}</text>
      <text x="665" y="530" textAnchor="middle">{t(mode==="operate"?"执行共享模型":"系统组织")}</text>
      <text x="1100" y="530" textAnchor="middle">{t("协同的工作空间")}</text>
    </g>
    </SceneContext.Provider>
  </svg>;
}
