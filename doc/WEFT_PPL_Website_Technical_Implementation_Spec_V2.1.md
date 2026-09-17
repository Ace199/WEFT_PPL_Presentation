# WEFT / PPL Website Technical Implementation Specification V2.1

> **历史基线，已由 [V2.2 当前实施规范](WEFT_PPL_Website_Technical_Implementation_Spec_V2.2.md) 修订。** 本文下方的 Master Specification、Freeze、V1 Definition of Done 等表述仅代表旧版决策，不再拥有当前优先级。当前 V1 仅首页、无后台，新增所有访客均可使用的前端临时文本预览；修改只驻留页面内存，刷新恢复，复制清单后由维护者改代码并重新部署。Sanity / Owner Auth / Studio / Draft / Webhook / 自定义编辑面板禁令以及多页面范围按 V2.2 的逐项取代说明处理；不得据本旧版重新引入后台或取消已授权的临时编辑功能。

> **Status:** Ready for Full Implementation  
> **Date:** 2026-09-16  
> **Scope:** Public website + Homepage Motion System + Master Canvas + Sanity Studio + Draft Preview + Publish  
> **Primary stack:** Next.js + React + TypeScript + Sanity + GSAP + SVG + Canvas 2D  
> **Visual direction:** Technical Editorial Poster System  
> **Experience direction:** Production Manual in Motion  
> **Primary narrative:** Resolve → Organize → Transform → Extend → Enter

---

# 0. 文档定位

本文档是 WEFT / PPL 网站进入正式实现阶段后的 **Master Specification**。

V2.1 在 V2.0 基础上完成以下收口：

1. 明确 Next.js **Server / Client Component Boundary**；
2. 冻结 V1 Owner Authentication：**Sanity Auth only**；
3. 缩减 V1 Owner Editing Scope，取消自研半套 CMS 编辑器；
4. 冻结 Draft / Published / Cache / Revalidation 策略；
5. 将 Chapter CMS Schema 改为 **Constrained Schema**，避免演化成 Page Builder；
6. 将 Master Canvas State 改为更严格的合法状态模型；
7. 给 Graph Node 增加 Semantic Role / Tags；
8. 给 Evidence Annotation 增加 normalized coordinates；
9. 增加 Web Performance Budget；
10. 增加 Mint / 状态语义的 Accessibility Contract；
11. 明确项目 Spec 拆分策略，便于 Codex 分阶段实现。

本文档是架构与实现的总来源。

后续阶段性文档必须以本文件为 Source of Truth。

---

# 1. 产品定义

WEFT / PPL 不是“静态 Portfolio + 动画”。

它是一套：

> **Content Contract + State Model + Rendering Boundary + Interaction Semantics + Debug Surface**

共同组成的前端系统。

核心体验原则：

> **静态时像 Technical Editorial Poster。**  
> **交互时像 Production Tool。**

Motion 的作用不是装饰。

所有主要动画都必须表达至少一种系统语义：

```text
Resolve
Organize
Connect
Validate
Transform
Extend
Compose
Enter
```

---

# 2. 首页职责

首页只负责让访问者在 30–60 秒内理解：

```text
WHAT IS WEFT / PPL?
        ↓
WHAT DOES IT ORGANIZE?
        ↓
ONE SYSTEM / THREE VIEWS
        ↓
ENTER A CHAPTER
        ↓
VERIFY REAL PRODUCTION EVIDENCE
```

首页冻结结构：

```text
HEADER
↓
HERO
↓
SYSTEM SUMMARY
↓
ONE SYSTEM / THREE VIEWS
↓
PRODUCTION PROOF
↓
FOOTER
```

首页不是完整 Case Study 的压缩版。

---

# 3. 首页不承担的内容

以下属于 Chapter / Evidence：

```text
AssetVersion / PublishVersion
av / v
Mod / Srf / Grm
Rig dependency provenance
Logical URI
USD Asset Resolver
description / record
multi-task aggregation
deleted tombstone
Hair / CFX dependency details
Houdini metadata
QC implementation
current implementation boundary
```

首页只负责：

```text
Understand
↓
Choose a View
↓
Enter Chapter
```

---

# 4. 技术栈冻结

## 4.1 Framework

```text
Next.js
```

职责：

- App Router；
- Server Component；
- Routing；
- Metadata / SEO；
- Sanity 数据获取；
- Draft Preview Boundary；
- Cache / Revalidation；
- Client Island 装配；
- Production deployment。

---

## 4.2 UI

```text
React
```

职责：

- Component composition；
- interactive client island；
- Master Canvas state；
- Chapter Controller；
- Preview control；
- responsive interaction；
- reduced motion 分支。

React 不负责逐帧粒子动画。

---

## 4.3 Language

```text
TypeScript
```

必须类型化：

```text
CMS data
Graph data
ViewPreset
MasterCanvasState
Motion tokens
Evidence annotation
Route transition state
Preview source
```

---

## 4.4 CMS

```text
Sanity
```

职责：

```text
Content
Draft
Preview
Publish
Media
SEO
Studio editing
Visual Editing bridge
```

Sanity 不负责：

```text
Graph topology
Motion system
Layout algorithm
Design tokens
Page builder
```

---

## 4.5 Motion

```text
GSAP
ScrollTrigger
```

职责：

```text
coordinated timeline
DOM/SVG transition
section entrance
Hero boot
System Summary
Master Canvas transition
route transition
```

---

## 4.6 Graphics

```text
SVG
Canvas 2D
```

SVG：

```text
semantic nodes
edges
labels
technical geometry
crop marks
hit areas
```

Canvas：

```text
dotted field
particles
ambient noise
glyph dissolve
dense decorative fields
```

V1 不使用 Three.js。

V1 不以 WebGL 为起点。

---

## 4.7 Styling

推荐：

```text
CSS Modules
```

或：

```text
SCSS Modules
```

V1 不引入 Tailwind。

---

# 5. 明确不引入

V1 不引入：

```text
Redux
Zustand
XState
Framer Motion
React Spring
Three.js
PixiJS
通用 Page Builder
自研 CMS Editor
自研 Auth System
```

如果 Prototype 证明存在必要，再升级。

原则：

> 不为不存在的问题提前增加抽象。

---

# 6. 总体系统架构

```text
                         WEFT / PPL
                              │
             ┌────────────────┴────────────────┐
             │                                 │
          CONTENT                          EXPERIENCE
             │                                 │
          SANITY                           NEXT.JS
             │                                 │
       ┌─────┴─────┐                   ┌───────┴────────┐
       │           │                   │                │
   Published      Draft              Server           Client
       │           │                Components        Islands
       └─────┬─────┘                   │                │
             │                         │         React / GSAP
             │                         │         SVG / Canvas
             └─────────────────────────┴────────────────┘
```

核心分层：

```text
DATA
≠
STATE
≠
VISUAL TARGET
≠
ANIMATION
≠
RENDER
```

---

# 7. Next.js Server / Client Boundary

V2.1 正式冻结：

> **Content-first, motion-island architecture**

不能把整个首页写成：

```tsx
"use client";
```

---

## 7.1 Server Components

默认 Server：

```text
app/layout.tsx
app/page.tsx
chapter page.tsx
evidence page.tsx
metadata
Sanity queries
Published content
Draft content query orchestration
Production Proof data
Footer content
Navigation data
```

Server 负责：

```text
fetch
cache
SEO
content composition
serialized props
```

---

## 7.2 Client Islands

只有需要浏览器状态 / GSAP / Canvas / Pointer 的模块使用：

```tsx
"use client";
```

包括：

```text
HeroMotion
SystemSummaryMotion
MasterCanvas
ChapterControls
GraphHitLayer
RouteTransition
PreviewControls
VisualEditingBridge
DebugOverlay
```

---

## 7.3 数据流

```text
Server Component
↓
Sanity Query
↓
Typed Content
↓
Serialized Props
↓
Client Island
↓
Motion / Interaction
```

Client Island 不直接决定 CMS perspective。

---

# 8. Public 与 Owner 模式

V1 不构建完整自定义 Owner App。

只区分：

```text
PUBLIC
SANITY-AUTHENTICATED PREVIEW
```

---

## 8.1 Public

允许：

```text
View
Scroll
Hover
Focus
Master Canvas interaction
Navigate
Read Published Content
```

禁止：

```text
Write
Draft
Publish
CMS mutation
```

UI interaction 不持久化。

---

## 8.2 Owner / Editor

V1 Owner 能力：

```text
Sanity Studio
Draft
Preview
Visual Editing / Click-to-edit Bridge
Publish
```

不实现：

```text
custom inline text editor
custom right-side editing panel
custom save workflow
custom website account/session system
custom server-side write API
```

这些如果以后需要，进入 V1.1。

---

# 9. V1 Authentication Decision

正式冻结：

```text
Sanity Auth
= editing identity source of truth
```

Public：

```text
Anonymous
Read Published Only
```

Studio / Presentation / Visual Editing：

```text
Sanity Authenticated
```

V1：

```text
Custom Website Owner Session
= NOT IMPLEMENTED

Custom Write API
= NOT IMPLEMENTED
```

因此第一版不需要：

```text
OWNER_ID
SANITY_API_WRITE_TOKEN
```

用于自定义网站写入。

---

# 10. Security Contract

绝对禁止：

```text
NEXT_PUBLIC_SANITY_WRITE_TOKEN
public write token
anonymous mutation
client-trusted role
client-trusted owner id
hidden button = authorization
```

V1 所有写入：

```text
Sanity Studio
or
Sanity Presentation / Visual Editing
```

并由 Sanity Auth 控制。

---

# 11. V1 Owner Editing Scope

V1 的 Owner Editing 定义为：

```text
WEBSITE
↓
Preview / Inspect / Click-to-edit Bridge
↓
SANITY STUDIO
↓
Edit
↓
Draft
↓
Preview
↓
Publish
```

网站本身不重新实现字段编辑器。

原则：

> **网站负责 Preview / Inspect / Open in Studio。**  
> **Sanity 负责真正 Editing。**

---

# 12. Studio

URL：

```text
/studio
```

推荐结构：

```text
WEFT / PPL

SITE
├── Homepage
├── Systematic Thinking
├── Design & Innovation
├── What Comes Next
└── Evidence

GLOBAL
├── Navigation
├── Footer
├── Site Settings
└── SEO

MEDIA
├── Production UI
├── Diagrams
├── Screenshots
└── Images
```

Studio 是权威编辑入口。

---

# 13. Visual Editing / Click-to-edit

V1 可以提供：

```text
Preview
+
Visual Editing overlay
+
Click content
+
Open corresponding Studio field
```

目标不是：

```text
在网站内做完整 CMS
```

而是降低：

```text
Page element
→ CMS field
```

之间的定位成本。

---

# 14. Draft / Published Contract

正式冻结：

Public：

```text
Published perspective only
```

Preview：

```text
Draft perspective
+
Published fallback
```

组件本身不决定 content source。

---

# 15. Cache / Revalidation Contract

V1 采用：

```text
Published Public
= cached

Draft Preview
= uncached / live preview

Publish Event
= tagged invalidation
```

---

## 15.1 Public

Sanity Published Query：

```text
cacheable
tagged
```

例如：

```text
sanity:homepage
sanity:chapter:systematic-thinking
sanity:evidence
```

---

## 15.2 Draft Preview

Preview：

```text
no public cache
```

优先使用 Sanity 官方 Preview / Live 能力。

---

## 15.3 Publish

正式路径：

```text
Sanity Publish
↓
Webhook
↓
Next.js Route Handler
↓
validate webhook secret
↓
revalidateTag(...)
↓
Public content refresh
```

不要同时混用：

```text
random no-store
ISR
revalidatePath everywhere
live query everywhere
```

Cache policy 必须统一。

---

# 16. CMS 与 Code Boundary

规则：

> **CMS 管内容。**  
> **Code 管系统。**

---

## 16.1 CMS Editable

Sanity：

```text
Hero copy
System Summary copy
Chapter copy
Evidence image
Evidence caption
Evidence annotation labels
Navigation labels
Footer content
SEO
Site status copy
```

---

## 16.2 Code-owned

代码：

```text
Graph topology
Node IDs
Semantic Role
ViewPreset
Layout
Motion tokens
Animation behavior
Particle algorithm
Route dissolve algorithm
Typography tokens
Color tokens
Interaction rules
```

---

# 17. CMS Schema Strategy

V2.1 正式禁止 generic page builder。

不使用：

```ts
sections: SectionBlock[];
```

这种无限扩张结构。

使用：

> **Constrained Content Schema**

---

# 18. Homepage Schema

```ts
interface HomePage {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    proof: string[];
  };

  systemSummary: {
    title: string;
    description: string;
  };

  masterCanvas: {
    title: string;
    subtitle: string;
  };

  productionProof: {
    title: string;
    description?: string;
    evidence: EvidenceReference[];
  };
}
```

Homepage layout 不允许 Editor 任意增删 block 类型。

---

# 19. Chapter Schema

三个 Chapter 使用固定结构。

例如：

```ts
interface SystematicThinkingPage {
  index: "01";
  title: string;
  subtitle: string;
  introduction: PortableText;

  problem: ProblemSection;
  model: SystemModelSection;
  decisions: DecisionSection[];
  evidence: EvidenceReference[];

  seo?: SEO;
}
```

```ts
interface DesignInnovationPage {
  index: "02";
  title: string;
  subtitle: string;
  introduction: PortableText;

  transformations: TransformationSection[];
  productionCases: ProductionCaseSection[];
  evidence: EvidenceReference[];

  seo?: SEO;
}
```

```ts
interface FuturePage {
  index: "03";
  title: string;
  subtitle: string;
  introduction: PortableText;

  currentSystem: CurrentSystemSection;
  futureDirections: FutureDirectionSection[];
  boundaries: BoundarySection;

  seo?: SEO;
}
```

---

# 20. Constrained Section Types

如果需要复用类型，只允许有限 union：

```ts
type ChapterSection =
  | ProblemSection
  | DecisionSection
  | ProductionStorySection
  | EvidenceSection
  | TransformationSection
  | BoundarySection;
```

不做：

```text
HeroBlock
GenericGridBlock
GenericCTA
ArbitraryLayoutBlock
```

---

# 21. Evidence Schema

```ts
interface EvidenceItem {
  figureNumber: string;
  title: string;
  image: SanityImage;
  alt: string;
  caption?: string;
  annotations?: Annotation[];
}
```

---

# 22. Annotation Coordinate Contract

Annotation 使用 normalized coordinate：

```ts
interface Annotation {
  id: string;
  label: string;

  anchor: {
    x: number; // 0.0 - 1.0
    y: number; // 0.0 - 1.0
  };

  align?: "left" | "right" | "top" | "bottom";
}
```

禁止：

```text
x: 742px
y: 318px
```

原因：

```text
responsive resize
image crop
container resize
```

都会破坏绝对像素坐标。

---

# 23. Master Canvas Data Ownership

Graph 不进入 CMS。

目录：

```text
src/data/master-canvas/
├── nodes.ts
├── edges.ts
└── presets.ts
```

---

# 24. Graph Semantic Role

V2.1 增加 Semantic Role。

```ts
type GraphRole =
  | "context"
  | "product"
  | "version"
  | "dependency"
  | "state"
  | "validation"
  | "module"
  | "workspace"
  | "publish";
```

---

# 25. GraphNode

```ts
interface GraphNode {
  id: string;
  label: string;

  role: GraphRole;

  tags: Array<
    | "overview"
    | "organize"
    | "transform"
    | "extend"
  >;

  position: {
    overview: Vec2;
    organize?: Vec2;
    transform?: Vec2;
    extend?: Vec2;
  };
}
```

Visual code 应优先依据：

```text
role
tags
preset
```

而不是大量：

```ts
if (node.id === "product") ...
```

---

# 26. GraphEdge

```ts
interface GraphEdge {
  id: string;

  source: string;
  target: string;

  relation:
    | "contains"
    | "depends"
    | "validates"
    | "resolves"
    | "publishes"
    | "composes";
}
```

---

# 27. ViewPreset

```ts
interface ViewPreset {
  visibleNodes: string[];
  activeNodes: string[];
  dimmedNodes: string[];

  visibleEdges: string[];
  activeEdges: string[];
  dimmedEdges: string[];
}
```

核心：

```text
Graph Topology
≠
View Presentation
```

---

# 28. Master Canvas State

V2.1 使用 discriminated union，减少 impossible state。

```ts
type TransformScene =
  | "preview"
  | "latest-compatible"
  | "monolith-modules"
  | "partial-full-state"
  | "rules-workflow";
```

```ts
type MasterCanvasState =
  | {
      mode: "overview";
      focusedNode?: string;
    }
  | {
      mode: "organize";
      focusedNode?: string;
    }
  | {
      mode: "transform";
      scene: TransformScene;
      focusedNode?: string;
    }
  | {
      mode: "extend";
      focusedNode?: string;
    };
```

---

# 29. State Invariants

必须满足：

```text
scene
only exists when mode === "transform"
```

```text
focusedNode
must reference an existing visible node
```

如果未来引入 transition meta：

```text
transition target
must be explicit
```

不要允许逻辑上无意义的 state。

---

# 30. Reducer

推荐：

```text
useReducer
```

不需要 XState。

事件：

```ts
type CanvasEvent =
  | { type: "ENTER_VIEW"; view: "overview" | "organize" | "transform" | "extend" }
  | { type: "LEAVE_CONTROLLER" }
  | { type: "FOCUS_NODE"; nodeId: string }
  | { type: "BLUR_NODE" }
  | { type: "SET_TRANSFORM_SCENE"; scene: TransformScene }
  | { type: "RESET" };
```

流：

```text
EVENT
↓
REDUCER
↓
VALID STATE
↓
VIEW PRESET
↓
VISUAL TARGET
↓
ANIMATION
```

---

# 31. Animation Ownership

原则：

> **一个视觉属性只能有一个 Animation Owner。**

---

## 31.1 CSS

负责：

```text
simple hover
button underline
basic focus
minor binary opacity
```

---

## 31.2 GSAP

负责：

```text
coordinated timeline
DOM transition
SVG transition
Hero boot
System Summary
Master Canvas view transition
Section reveal
Route transition
```

---

## 31.3 RAF

负责：

```text
Canvas particles
dotted field
continuous noise
smoothed pointer
ambient animation
```

---

## 31.4 React

只负责：

```text
state
data
component lifecycle
render branching
```

禁止：

```text
mousemove
→ setState
→ rerender per frame
```

---

# 32. Master Canvas Render Layers

```text
MasterCanvas
│
├── CanvasBackground
│   ├── dotted field
│   ├── particles
│   └── noise
│
├── SVGVisualGraph
│   ├── edge
│   ├── node
│   ├── label
│   └── technical geometry
│
├── InteractionLayer
│   └── invisible hit area
│
└── HTMLAnnotations
    ├── controller
    ├── CTA
    ├── view mode
    └── annotation
```

---

# 33. Pointer Event Contract

Canvas：

```css
pointer-events: none;
```

SVG Visual：

```css
pointer-events: none;
```

Interaction Layer：

```css
pointer-events: auto;
```

Visual Node 与 Hit Area 分离。

例如：

```text
visual radius: 4px
hit radius: 14–20px
```

避免 Hover 抖动。

---

# 34. Motion System

Motion 分四级：

| Level | Name | 作用 | 强度 |
|---|---|---|---:|
| L0 | Ambient | 系统正在运行 | 极弱 |
| L1 | Reveal | 页面结构建立 | 弱 |
| L2 | Interaction | 用户主动探索 | 中 |
| L3 | Transition | 上下文变化 | 强 |

核心：

> **L0 永远不能抢 L2。**

---

# 35. Motion Semantics

```text
Continuous
= system running

Triggered
= state change

Directional
= dependency / flow

Pulse
= validation / active

Resolve
= valid relation discovered

Organize
= complexity becomes model

Transform
= assumption changes

Extend
= system grows

Dissolve
= context changes
```

---

# 36. Motion Tokens

```ts
export const motion = {
  duration: {
    instant: 0.12,
    fast: 0.22,
    normal: 0.42,
    slow: 0.75,
    scene: 1.1,
    intro: 1.8,
  },

  ease: {
    enter: "power3.out",
    exit: "power2.in",
    transform: "power2.inOut",
  },

  stagger: {
    tight: 0.025,
    normal: 0.05,
    loose: 0.08,
  },
};
```

Prototype 可调数值。

但不得绕过统一 token 随意创建大量局部 timing。

---

# 37. 首页 Motion Narrative

```text
ENTER

WEFT / PPL
System resolves.

↓

SCROLL

Fragmented
→ Structured
→ Coordinated

↓

SCROLL

ONE SYSTEM / THREE VIEWS
System Canvas boots.

↓

INTERACT

01 Organize
02 Transform
03 Extend

↓

EXPLORE

Technical Glyph Dissolve

↓

CHAPTER
```

最终：

> **Resolve → Organize → Transform → Extend → Enter**

---

# 38. HERO

Hero 只表达：

```text
System Boot / Resolve
```

不重复完整：

```text
Fragmented → Structured → Coordinated
```

---

## 38.1 Sequence

```text
DISCOVER
↓
GROUP
↓
CONNECT
↓
RESOLVE
```

目标：

```text
1.6–2.2s
```

Mint 只用于：

```text
active
valid
selected
connected
current
```

---

# 39. Hero Pointer

Hero 只做：

> **Inspection Field**

效果：

```text
local noise reduced
local structure clearer
nearest core node enhanced
```

Hero 不做完整 dependency tracing。

完整 Dependency Inspection 只在 Master Canvas。

---

# 40. Pointer Smoothing

```text
Raw Pointer
↓
Smoothed Pointer
↓
Inspection Field
```

概念：

```js
current.x += (target.x - current.x) * 0.12;
current.y += (target.y - current.y) * 0.12;
```

实际系数由 Prototype 决定。

---

# 41. SYSTEM SUMMARY

唯一完整表达：

```text
Fragmented
→ Structured
→ Coordinated
```

不使用 Scroll Scrub。

使用：

```text
section enter
↓
trigger timeline
↓
1.5–2.0s
↓
hold final state
```

生命周期：

```text
first enter
= play

subsequent enter
= final state
```

---

# 42. MASTER CANVAS

首页最重要的 Interactive System。

原则：

> **One System / Three Views**

实现：

```text
same graph
+
different layout
+
different visibility
+
different emphasis
```

---

# 43. Overview

第一次进入：

```text
STRUCTURE DISCOVERY
```

过程：

```text
edge
→ node
→ relation
→ system
```

目标：

```text
800–1100ms
```

完成后 90% 视觉保持静止。

---

# 44. ORGANIZE

语义：

```text
Complexity
↓
Model
```

原始：

```text
People
Software
Files
Versions
Dependencies
```

组织为：

```text
Context
Product
Version
Dependency
State
Validation
Resolution
Composition
```

Mint 只表示：

```text
successful organized relation
```

---

# 45. TRANSFORM

首页：

```text
Transformation Preview only
```

目标：

```text
900–1200ms
```

可短暂组合：

```text
latest disconnects
module splits
state validates
rule becomes path
```

不在首页把四个完整案例全部播放完。

---

# 46. Full Transform Cases

完整交互进入 Chapter 02：

```text
LATEST
→ COMPATIBLE

MONOLITHIC PACKAGE
→ COMPOSABLE MODULES

PARTIAL CHANGE
→ FULL STATE

WRITTEN RULES
→ EXECUTABLE WORKFLOW
```

---

# 47. Latest → Compatible

推荐重点演示：

```text
v01
v02
v03
v04
```

latest：

```text
v04
```

dependency check：

```text
v04 invalid
```

resolve：

```text
disconnect v04
↓
resolve
↓
v03
↓
Mint
```

动画直接表达：

```text
latest ≠ compatible
```

---

# 48. EXTEND

Current：

```text
MODEL
MODULES
STATE
VALIDATION
EXECUTION
```

Solid line：

```text
Existing
```

Future：

```text
GOVERNANCE
RECOVERY
OBSERVABILITY
REGRESSION
```

Dashed line：

```text
Future
```

未来分支从现有结构向 viewport 外延伸。

---

# 49. Controller

Desktop：

```text
Hover / Focus
↓
Preview

EXPLORE
↓
Navigate
```

禁止：

```text
Hover → Navigate
```

---

# 50. Leave Delay

```text
300–450ms
```

防止标题和 Canvas 之间移动导致反复跳变。

---

# 51. Node Inspection

Master Canvas 提供：

```text
focus node
↓
related edge strengthen
↓
unrelated edge dim
↓
connected node accent
```

非相关 edge：

```text
20–30% opacity
```

语义：

> What is this connected to?

---

# 52. Interruption Contract

Master Canvas 必须支持：

```text
Any State
→ Any State
```

禁止：

```text
A animation must finish
before B starts
```

新目标到来：

```text
kill / overwrite current tween
↓
read current visual state
↓
interpolate to new target
↓
settle
```

测试：

```text
Overview
→ Organize
→ Transform
→ Extend
→ Organize
→ Leave
```

最终必须稳定收敛。

---

# 53. Reveal Language

不大量使用：

```css
opacity: 0;
transform: translateY(30px);
```

统一：

```text
rule draw
↓
index appear
↓
headline clip reveal
↓
body reveal
```

建议：

```text
line        180ms
index       220ms
headline    420ms
body        320ms
```

位移：

```text
8–14px
```

---

# 54. Crop Mark

仅用于：

```text
Hero
Master Canvas
Production Figure
```

进入：

```text
6–10px inward
↓
stop
```

语义：

```text
frame acquired
```

---

# 55. Production Proof

这是 Evidence。

节奏显著安静。

Sequence：

```text
frame
↓
UI crop
↓
caption
```

Hover：

```text
scale 1.008–1.012
```

主要动效放在：

```text
annotation line
annotation label
```

禁止：

```text
3D tilt
large zoom
glow
mouse reflection
```

---

# 56. Header

```text
sticky
```

Hero：

```text
transparent / ivory
```

离开 Hero：

```text
Ivory 92–96%
+
1px hairline
```

不做 heavy glassmorphism。

---

# 57. Mint Accessibility Contract

视觉语义：

```text
Mint
= active / valid / selected / connected / current
```

但 Mint 不能成为唯一信息载体。

必须组合：

```text
label
+
shape / line emphasis
+
Mint accent
```

例如：

```text
ACTIVE
+ Mint marker
```

不能只靠颜色区分 Active / Inactive。

Mint 更适合：

```text
marker
border
line
small fill
accent
```

Ivory 背景上的正文与小字号标签必须优先保证对比度。

---

# 58. Footer

```text
PEOPLE
DATA
SOFTWARE
```

进入：

```text
Separate
↓
Overlap
↓
System
```

移动：

```text
12–18px
```

时间：

```text
650–800ms
```

只播放一次。

---

# 59. Route Transition

名称：

> **Technical Glyph Dissolve**

Glyph：

```text
·
+
/
|
0
1
<>
[]
```

少量：

```text
CTX
V
D
S
```

---

# 60. Route Sequence

```text
Current
↓
Glyph grows
↓
Full cover
↓
Route change
↓
Reveal holes
↓
Next
```

目标：

```text
950–1250ms
```

---

# 61. Navigation Lifecycle

```text
CLICK EXPLORE
↓
lock navigation
↓
prefetch route
↓
cover
↓
100% cover
↓
router push
↓
wait target ready
↓
reveal
↓
unlock
```

重复点击：

```text
ignored while locked
```

Slow route：

```text
minimumHold
maximumWait
fallback
```

Browser Back / Forward：

V1 可使用：

```text
short crossfade
```

如果统一 dissolve 成本过高。

稳定性优先于效果统一。

---

# 62. Mobile

Mobile 不模拟 Hover。

规则：

```text
Card
= Controller

CTA
= Navigation
```

Tap Card：

```text
select view
```

展开：

```text
title
subtitle
EXPLORE ↗
```

---

# 63. Mobile 取消

取消：

```text
pointer inspection
node hover inspection
desktop particle density
complex hover timeline
```

保留：

```text
tap preview
preset transition
CTA navigation
```

---

# 64. Reduced Motion

检测：

```css
prefers-reduced-motion: reduce
```

Hero：

```text
direct final state
```

Summary：

```text
static final / minimal transition
```

Master Canvas：

```text
color / opacity only
```

Route：

```text
120–180ms crossfade
```

Ambient：

```text
off
```

---

# 65. Accessibility

必须：

```text
real buttons / links
keyboard focus
focus equivalent to hover
aria-hidden for decorative canvas
semantic content outside decorative canvas
visible focus ring
reduced motion
```

所有核心系统含义必须可以不依赖动画理解。

---

# 66. Canvas Performance

Canvas DPR：

```js
Math.min(devicePixelRatio, 1.5)
```

Particle 使用 density：

```js
count = Math.min(
  maxParticles,
  width * height * density
);
```

不写死固定数量。

---

# 67. RAF Lifecycle

```text
IntersectionObserver
↓
visible
→ resume

not visible
→ pause
```

页面隐藏：

```text
document.visibilityState === "hidden"
→ pause
```

---

# 68. Pointer Query

禁止：

```text
all point × all point
every frame
```

需要邻域时使用：

```text
spatial bucket
grid lookup
precomputed graph relation
limited nearest node
```

---

# 69. Web Performance Budget

V2.1 增加网站级性能预算。

目标：

```text
LCP
< 2.5s

CLS
< 0.1

INP
< 200ms
```

这些是目标而非“上线绝对保证值”。

Prototype 后根据真实设备调整。

---

# 70. JavaScript Budget

原则：

```text
Content-first
Motion lazy
```

Master Canvas 必须独立 Client Island。

尽可能让：

```text
GSAP
Canvas
Master Canvas code
```

不阻塞首屏基础内容呈现。

可以通过：

```text
dynamic import
code splitting
intersection-triggered initialization
```

控制。

---

# 71. Image Budget

Production Screenshot：

```text
responsive
optimized
correct dimensions
lazy when below fold
```

Hero 首屏资源避免过大。

禁止把完整高分辨率 Qt 截图直接作为无优化资源加载。

---

# 72. Debug Mode

Development 环境按：

```text
D
```

打开：

```text
MOTION DEBUG
```

显示：

```text
FPS
VIEW
TRANSFORM SCENE
FOCUSED NODE
POINTER
SMOOTHED POINTER
DPR
PARTICLE COUNT
RAF
ROUTE TRANSITION
CONTENT SOURCE
PREVIEW MODE
```

---

# 73. Graph Debug

可显示：

```text
node id
role
tags
hit area
target position
current position
edge id
view preset
```

---

# 74. Content Debug

Preview 模式明确显示：

```text
SOURCE: DRAFT
```

Public：

```text
SOURCE: PUBLISHED
```

防止编辑者误判。

---

# 75. 推荐项目目录

```text
weft-ppl/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   │
│   ├── systematic-thinking/
│   │   └── page.tsx
│   │
│   ├── design-innovation/
│   │   └── page.tsx
│   │
│   ├── next/
│   │   └── page.tsx
│   │
│   ├── evidence/
│   │   └── page.tsx
│   │
│   ├── api/
│   │   └── revalidate/
│   │       └── route.ts
│   │
│   └── studio/
│       └── [[...tool]]/
│           └── page.tsx
│
├── components/
│   ├── header/
│   ├── hero/
│   ├── system-summary/
│   ├── production-proof/
│   ├── footer/
│   │
│   ├── master-canvas/
│   │   ├── MasterCanvas.tsx
│   │   ├── CanvasBackground.tsx
│   │   ├── SVGSystemGraph.tsx
│   │   ├── GraphHitLayer.tsx
│   │   ├── ChapterControls.tsx
│   │   ├── ViewModeIndicator.tsx
│   │   └── DebugOverlay.tsx
│   │
│   ├── preview/
│   │   ├── PreviewToolbar.tsx
│   │   └── VisualEditingBridge.tsx
│   │
│   └── transitions/
│       └── GlyphRouteTransition.tsx
│
├── data/
│   └── master-canvas/
│       ├── nodes.ts
│       ├── edges.ts
│       └── presets.ts
│
├── lib/
│   ├── sanity/
│   │   ├── client.ts
│   │   ├── queries.ts
│   │   ├── preview.ts
│   │   ├── tags.ts
│   │   └── image.ts
│   │
│   ├── motion/
│   │   ├── tokens.ts
│   │   ├── gsap.ts
│   │   └── reducedMotion.ts
│   │
│   └── debug/
│       └── debugFlags.ts
│
├── sanity/
│   ├── schemaTypes/
│   │   ├── siteSettings.ts
│   │   ├── homePage.ts
│   │   ├── systematicThinkingPage.ts
│   │   ├── designInnovationPage.ts
│   │   ├── futurePage.ts
│   │   ├── evidenceItem.ts
│   │   ├── navigation.ts
│   │   └── footer.ts
│   │
│   └── structure.ts
│
├── styles/
│   ├── tokens.css
│   ├── globals.css
│   ├── typography.css
│   └── motion.css
│
└── public/
```

---

# 76. Environment Variables

Public config：

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
```

Server secret：

```env
SANITY_REVALIDATE_SECRET=
```

V1 不需要：

```env
OWNER_ID=
SANITY_API_WRITE_TOKEN=
```

除非后续新增自定义 server-side write。

---

# 77. Published Query Contract

Server：

```text
Sanity Published
↓
typed query
↓
cache tags
↓
Server Component
```

Client Island 只接 props。

---

# 78. Preview Query Contract

```text
Sanity authenticated preview
↓
draft perspective
↓
Preview route / Presentation
↓
Server data
↓
Client Island
```

不要让普通 Client Component 自己在浏览器切换 Published / Draft。

---

# 79. Content / Motion Decoupling

正确：

```tsx
<Hero content={heroData} />
```

错误：

```text
HeroMotion
→ directly query Sanity
```

正确：

```tsx
<ProductionProof items={items} />
```

优点：

```text
CMS replaceable
motion independently testable
mock data easy
fewer query dependencies
```

---

# 80. Edit / Preview 与 Motion

V1 Visual Editing 时：

```text
Ambient          reduced
Route Dissolve   disabled
Hero Inspection  reduced / disabled
Master hover     limited
Visual Editing   enabled
```

编辑优先：

```text
stable geometry
predictable click target
```

Preview 恢复完整 Motion。

---

# 81. Media Strategy

Evidence Asset 存：

```text
image
alt
figure number
title
caption
normalized annotations
```

Production UI Screenshot 不硬编码进 JSX。

---

# 82. SEO

CMS Editable：

```text
page title
meta description
OG image
```

Code-owned：

```text
route
page type
canonical structure
```

---

# 83. Master Canvas Prototype V0.1

第一阶段只做 Master Canvas。

必须包括：

```text
01 Graph Model
02 Semantic Role
03 ViewPreset
04 Overview
05 Organize
06 Transform Preview
07 Extend
08 Node Inspection
09 Hover / Focus / Leave
10 Interruption
11 Resize
12 Reduced Motion
13 Debug Overlay
14 Performance measurement
```

不做：

```text
Sanity
Homepage full assembly
Route dissolve
Evidence CMS
```

---

# 84. Prototype Acceptance

## State

必须：

```text
Overview
↔ Organize
↔ Transform
↔ Extend
```

任意快速切换。

---

## Interruption

快速：

```text
01 → 02 → 03 → 01
```

不能：

```text
stuck state
ghost line
wrong opacity
orphan tween
```

---

## Resize

必须：

```text
Canvas correct
SVG correct
Hit area aligned
Node target valid
```

---

## Keyboard

Chapter Controller：

```text
Tab
Focus
Enter
```

行为与 Hover / Click 等价。

---

## Performance

普通 Desktop：

```text
target 60fps
```

不能持续明显卡顿。

---

# 85. Implementation Phase 1 — Foundation

建立：

```text
Next.js
TypeScript
CSS Modules
GSAP
base tokens
```

先定义：

```text
Server / Client boundary
```

不要先把整个首页写成 Client Component。

---

# 86. Phase 2 — Master Canvas Data

完成：

```text
GraphRole
GraphNode
GraphEdge
ViewPreset
MasterCanvasState
Reducer
```

---

# 87. Phase 3 — Static Render

先做：

```text
SVG graph
HTML controller
Hit Layer
```

不先加粒子。

验证：

```text
layout
responsive
semantics
focus
```

---

# 88. Phase 4 — Transition

实现：

```text
Overview
Organize
Transform Preview
Extend
```

重点：

```text
Any State → Any State
```

---

# 89. Phase 5 — Pointer / Ambient

加入：

```text
Canvas 2D
particle density
pointer smoothing
RAF lifecycle
```

先保证性能，再增加复杂度。

---

# 90. Phase 6 — Sanity Foundation

建立：

```text
Sanity Project
Studio
Home schema
3 Chapter schemas
Evidence
Navigation
Footer
Site Settings
```

不做 Custom Editor。

---

# 91. Phase 7 — Preview / Publish

完成：

```text
Sanity Auth
Draft Preview
Visual Editing Bridge
Publish
Webhook
revalidateTag
```

验证 Draft Isolation。

---

# 92. Phase 8 — Homepage Assembly

组合：

```text
Header
Hero
System Summary
Master Canvas
Production Proof
Footer
```

Server content + Client motion island。

---

# 93. Phase 9 — Motion Integration

完成：

```text
Hero Resolve
Summary timeline
Master entrance
Reveal system
Crop mark
Footer
```

检查：

```text
L0 does not compete with L2
```

---

# 94. Phase 10 — Chapter Pages

实现：

```text
01 Systematic Thinking
02 Design & Innovation
03 What Comes Next
```

使用 constrained schema。

Chapter 02 完整实现：

```text
Latest → Compatible
Monolithic → Modules
Partial → Full State
Rules → Executable
```

---

# 95. Phase 11 — Route Transition

最后实现：

```text
Technical Glyph Dissolve
```

前提：

```text
routes stable
loading stable
prefetch stable
```

---

# 96. Phase 12 — Accessibility / Mobile / Performance

完成：

```text
mobile tap model
keyboard
focus
reduced motion
Mint accessibility
LCP
INP
CLS
bundle split
image optimization
```

---

# 97. Draft Isolation Acceptance

必须验证：

```text
Owner edits Hero
↓
Save Draft
↓
Preview sees new copy
↓
Anonymous still sees old copy
↓
Publish
↓
Webhook
↓
revalidateTag
↓
Anonymous sees new copy
```

---

# 98. Authentication Acceptance

Anonymous：

```text
Public site ✓
Published data ✓
Studio requires auth ✓
Write ✕
```

Sanity Authenticated Owner：

```text
Studio ✓
Draft ✓
Preview ✓
Publish ✓
```

---

# 99. Cache Acceptance

Published：

```text
cached
tagged
```

Draft：

```text
not served to anonymous
```

Publish：

```text
webhook invalidates correct tag
```

不能出现：

```text
publish success
but public page permanently stale
```

---

# 100. Motion Acceptance

Hero：

```text
Resolve understandable
Mint restrained
```

Summary：

```text
Fragmented → Structured → Coordinated readable
```

Master：

```text
One Graph / Three Views clear
fast switch stable
```

Evidence：

```text
quieter than Master
```

---

# 101. Accessibility Acceptance

必须：

```text
Mint is not sole information carrier
keyboard controller works
real CTA elements
focus visible
reduced motion works
decorative Canvas ignored by AT
```

---

# 102. Web Performance Acceptance

目标：

```text
LCP < 2.5s
CLS < 0.1
INP < 200ms
```

如果 Master Canvas 导致 Initial JS 明显增加：

```text
lazy / dynamic split
```

优先处理。

---

# 103. 不应该发生的架构错误

禁止：

```text
entire homepage "use client"
React controls every particle frame
Graph logic embedded in GSAP timelines
Sanity query scattered in motion components
generic page builder schema
custom owner auth in V1
public write token
custom editor panel in V1
```

---

# 104. 不应该发生的视觉错误

禁止：

```text
everything moving
Mint everywhere
all sections use large entrance animation
Hero and Master duplicate same interaction
Production Proof behaves like showcase carousel
```

---

# 105. Freeze Decisions

以下正式冻结：

```text
Framework
= Next.js

UI
= React

Language
= TypeScript

CMS
= Sanity

Auth
= Sanity Auth

V1 Editing
= Studio + Draft Preview + Visual Editing Bridge + Publish

Custom Website Auth
= No

Custom Write API
= No

Custom Inline Editor
= No

Server / Client
= Content-first Motion Islands

Published
= Cached

Draft
= Preview-only / uncached

Publish
= Sanity Webhook → revalidateTag

CMS Schema
= Constrained

Graph
= Code-owned

Master Canvas State
= Discriminated Union

Motion
= GSAP + ScrollTrigger

Continuous Graphics
= Canvas 2D + RAF

Styling
= CSS Modules / SCSS Modules

Homepage Narrative
= Resolve → Organize → Transform → Extend → Enter
```

---

# 106. Prototype 后再 Freeze

以下参数等待 Prototype：

```text
particle density
pointer radius
pointer smoothing coefficient
final motion timing
Glyph cell size
Glyph dissolve noise algorithm
mobile Canvas density
Transform Preview montage
```

这些是视觉实现参数，不是架构决策。

---

# 107. V1 Definition of Done

V1 完成必须同时满足：

## Website

```text
Homepage
01 Systematic Thinking
02 Design & Innovation
03 What Comes Next
Evidence
```

---

## Experience

```text
Resolve
→ Organize
→ Transform
→ Extend
→ Enter
```

成立。

---

## Content

```text
Sanity Studio
Draft
Preview
Publish
Revalidation
```

成立。

---

## Security

```text
Public Read Only
Sanity Auth Write
No Public Write Token
```

成立。

---

## Engineering

```text
Server / Client boundary clear
stable state transitions
mobile
keyboard
reduced motion
performance budget
debug surface
```

成立。

---

# 108. Spec Split Strategy

本文件保留为：

```text
WEFT_PPL_Website_Technical_Implementation_Spec_V2.1.md
```

作为 Master Specification。

为了 Codex 实施，建议项目中建立：

```text
/spec

00_ARCHITECTURE_DECISIONS.md
01_MASTER_CANVAS.md
02_MOTION_SYSTEM.md
03_CONTENT_SANITY.md
04_OWNER_PREVIEW.md
05_ROUTE_TRANSITION.md
06_ACCESSIBILITY_PERFORMANCE.md
07_IMPLEMENTATION_PLAN.md
```

每份顶部写：

```text
Source of truth:
WEFT_PPL_Website_Technical_Implementation_Spec_V2.1.md
```

Codex 每个阶段只加载相关 Spec。

---

# 109. Spec 依赖关系

```text
00 ARCHITECTURE
      │
      ├── 01 MASTER CANVAS
      ├── 02 MOTION
      ├── 03 SANITY
      ├── 04 OWNER PREVIEW
      ├── 05 ROUTE
      ├── 06 ACCESSIBILITY / PERFORMANCE
      └── 07 IMPLEMENTATION
```

如果阶段 Spec 与 Master Spec 冲突：

```text
Master Spec wins
```

---

# 110. Immediate Implementation Order

现在开始时：

```text
01 create Next.js project
02 establish Server / Client boundary
03 add TypeScript types
04 add CSS tokens
05 add GSAP
06 implement static Master Canvas
07 implement GraphRole / GraphNode / GraphEdge
08 implement ViewPreset
09 implement discriminated union state
10 implement reducer
11 implement Overview
12 implement Organize
13 implement Transform Preview
14 implement Extend
15 implement Hit Layer
16 implement Node Inspection
17 implement Leave Delay
18 implement interruption
19 implement Debug Overlay
20 implement Resize
21 implement Reduced Motion
22 add Canvas ambient
23 measure performance
```

通过 Prototype 后：

```text
24 setup Sanity
25 constrained schemas
26 Studio
27 Draft Preview
28 Visual Editing Bridge
29 Publish
30 webhook / revalidateTag
31 assemble Homepage
32 build Chapters
33 route transition
34 mobile / accessibility / performance pass
```

---

# 111. 最终架构总结

```text
                     CONTENT
                        │
                      Sanity
                        │
           Published / Draft / Studio
                        │
                      Next.js
                ┌───────┴────────┐
                │                │
             SERVER           CLIENT
                │                │
            Content          Motion Island
                │                │
                │          React / GSAP
                │           SVG / Canvas
                │                │
                └───────UI───────┘
```

Public：

```text
Anonymous
↓
Published
↓
Cached Read
↓
Interactive Experience
↓
No Write
```

Owner：

```text
Sanity Auth
↓
Studio / Preview
↓
Draft
↓
Publish
↓
Webhook
↓
Revalidate
↓
Public
```

Master Canvas：

```text
ONE GRAPH

Overview
Organize
Transform
Extend
```

---

# 112. 最终原则

> **Content can change without rebuilding the experience.**

> **The experience can evolve without turning the CMS into a page builder.**

> **The public website remains read-only.**

> **Sanity is the source of editing identity in V1.**

> **Master Canvas is the primary custom interaction investment.**

> **Editing UX must not consume the engineering budget that belongs to the Case Study experience.**

> **Data ≠ State ≠ Visual Target ≠ Animation ≠ Render.**

---

# 113. Implementation Status

完成 V2.1 后，项目状态正式从：

```text
Implementation Baseline — Master Canvas Ready
```

提升为：

# **Ready for Full Implementation**

第一开发目标保持不变：

# **MASTER CANVAS INTERACTION PROTOTYPE V0.1**

先把最有价值、也是最难的交互系统做成立。

Sanity、Preview、Publish 在 Master Canvas 架构稳定后接入。

Route Transition 最后实现。
