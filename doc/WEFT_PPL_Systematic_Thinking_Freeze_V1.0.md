# WEFT / PPL — Systematic Thinking Freeze V1.0

> **Status:** FROZEN FOR IMPLEMENTATION  
> **Section:** `01 / SYSTEMATIC THINKING`  
> **Purpose:** 作为第二板块正式开发时的内容、结构、语义与交互基准。  
> **Important:** 本文档不是“图片修改建议”，而是代码实现时的 Source of Truth。

---

# 0. 页面定位

`Systematic Thinking` 是 WEFT / PPL 的第一个完整内容页。

它的任务不是介绍具体 Pipeline Feature，也不是展示 `av / v`、Resolver、RigCache、record 等实现细节。

这一页要完成的是：

> **先让非影视读者理解动画生产为什么天然是一个复杂协作系统，再展示 WEFT / PPL 如何把这种复杂性拆成一套共享、稳定、可执行的 Production Semantics。**

页面最终认知路径：

```text
ANIMATION PRODUCTION
        ↓
HANDOFF
        ↓
CONTINUOUS EVOLUTION
        ↓
THREE SYSTEM PROBLEMS
        ↓
SHARED PRODUCTION SEMANTICS
        ↓
EXECUTION
        ↓
DESIGN DECISIONS
```

---

# 1. 页面信息架构冻结

页面固定为以下五段：

```text
A. ANIMATION PRODUCTION SYSTEM
   Industry Context Hero

B. WHEN PIPELINE BECOMES A SYSTEM
   Production complexity framing

C. THREE CORE PRODUCTION PROBLEMS
   History / Granularity / Enforcement

D. SHARED PRODUCTION MODEL
   Reality → Shared Semantics → Execution

E. TRANSITION
   → Design & Innovation
```

对应推荐组件：

```text
SystematicThinkingPage
├── ProductionSystemHero
├── SystemProblemIntro
├── CoreProductionProblems
├── SharedProductionModel
└── DesignInnovationTransition
```

---

# 2. Global Visual Rules

沿用全站既定视觉系统：

```text
Technical Editorial Poster System
Production Manual in Motion
```

色彩语义冻结：

```text
IVORY / BLACK
= structure

GRAY
= inactive / secondary / context

MINT
= active / valid / selected / connected / current
```

本页不使用橙 / 红作为主要视觉语言。

橙 / 红保留给真实 Evidence 中的 Production State。

---

# 3. A — Animation Production System

## 3.1 Eyebrow

```text
ANIMATION PRODUCTION SYSTEM / FIG. 01
```

## 3.2 主标题

# 动画生产，不是一条线，而是一套协作系统。

## 3.3 副标题

> 不同的人、软件与制作环节，持续产生、修改、交接和组合制作成果。

英文次级信息：

> **Animation production is a network of people, tools, products and dependencies — not a single linear handoff.**

---

# 4. Hero Diagram 的生产语义

Hero Diagram 不是动画行业工序百科。

它只需要建立：

```text
PRE-PRODUCTION
        ↓
PRODUCTION
    ├── ASSET PRODUCTION
    └── SHOT PRODUCTION
        ↓
POST-PRODUCTION
```

同时让读者理解：

> Production 不是一条 Conveyor，而是有 Branch、Merge、Reuse 和 Iteration 的依赖网络。

---

# 5. Hero Diagram 数据结构

## 5.1 Pre-Production

推荐固定节点：

```text
IDEA
STORY
STORYBOARD
ANIMATIC
DESIGN
LAYOUT / SHOT PLANNING
```

主关系：

```text
IDEA
→ STORY
→ STORYBOARD
→ ANIMATIC
→ DESIGN

ANIMATIC
→ LAYOUT / SHOT PLANNING
```

这一层只负责建立行业背景。

---

## 5.2 Asset Production

固定节点：

```text
DESIGN
MODELING
SURFACING / LOOK
RIGGING
```

核心关系：

```text
DESIGN
→ MODELING

MODELING
├→ SURFACING / LOOK
└→ RIGGING
```

这里必须表现：

> 同一个上游 Product 可以进入不同 Production Branch，并独立演进。

---

## 5.3 Shot Production

固定节点：

```text
LAYOUT / CAMERA
RIG
ANIMATION
FX / CFX
SURFACE / LOOK
LIGHTING
RENDERING
```

核心关系：

```text
LAYOUT / CAMERA
→ ANIMATION

RIG
→ ANIMATION

ANIMATION
→ FX / CFX

ANIMATION
→ LIGHTING / RENDERING

FX / CFX
→ LIGHTING / RENDERING

SURFACE / LOOK
→ LIGHTING / RENDERING
```

可以存在少量 feedback / iteration：

```text
ANIMATION ↔ RIGGING
FX / CFX ↔ LIGHTING
```

Feedback 使用虚线。

---

## 5.4 Post-Production

固定节点：

```text
RENDERING
COMPOSITING
COLOR
FINAL OUTPUT
```

关系：

```text
RENDERING
→ COMPOSITING
→ COLOR
→ FINAL OUTPUT
```

---

# 6. Hero Diagram 中的 Product 层

Stage 下方允许出现典型 Production Product，但不做 Deep Dive：

| Stage | Typical Product |
| --- | --- |
| Layout | Shot Layout / Camera |
| Modeling | Geometry / Asset |
| Surfacing | Material / Look |
| Rigging | Rig |
| Animation | Motion / Animation Cache |
| FX / CFX | Simulation |
| Lighting | Shot Lighting |
| Rendering | Render Frames / Layers |

这里的目标只是让读者提前形成：

> **每个工序产生可被下一环节继续使用的 Production Product。**

---

# 7. Handoff Layer

Hero Diagram 底部固定出现：

# 每一次交接，都不只是传一个文件。

系统标签：

```text
PRODUCT
VERSION
DEPENDENCY
STATE
RULES
```

辅助说明：

> 一个 Production Product 在进入下一环节时，会携带自己的身份、版本、依赖关系与生产状态。

这一层负责完成：

```text
Stage
↓
Handoff
↓
System Semantics
```

的认知转换。

---

# 8. Hero Motion Contract

本 Hero 动效强度低于首页 Master Canvas。

推荐一次性 Sequence：

```text
01 Pre-production spine appears

02 Asset Production / Shot Production lanes separate

03 Modeling branches to Surface + Rig

04 Rig / Camera connect into Animation

05 Surface bypasses Animation and connects downstream

06 Animation / FX / Surface converge toward Lighting / Rendering

07 Post-production completes

08 Handoff metadata appears:
   Product / Version / Dependency / State / Rules
```

原则：

- 首次进入播放；
- 返回页面不重复完整演示；
- Motion 用于解释 Branch / Merge / Handoff；
- 不把“点沿流水线移动”作为主要动画；
- reduced-motion 下直接显示稳定最终图。

---

# 9. B — When Pipeline Becomes a System

## 9.1 Eyebrow

```text
WHEN A PIPELINE BECOMES A SYSTEM
```

## 9.2 主标题

# 真正复杂的，是让独立演进的成果始终正确协作。

此标题替换旧版：

```text
步骤并不是最难的，变化才是。
```

以及：

```text
让独立推进的生产始终保持一致。
```

原因：

- WEFT / PPL 并不要求所有 Product 同步到同一 Version；
- 历史 Product 与新 Product 可以合法处于不同 Dependency Generation；
- 系统真正要求的是“关系正确”，不是“版本一致”。

---

## 9.3 正文

> 模型、动画、材质、镜头资源和生产规则，都以不同节奏持续演进。
>
> Production System 需要保证：
>
> - 历史成果仍然有效；
> - 局部变化不会扩大影响范围；
> - 生产规则真正进入执行过程。

收束问题：

> **怎样让不同节奏的生产持续向前，而不破坏已经成立的成果、状态和规则？**

---

# 10. C — Three Core Production Problems

固定三项：

```text
01 / HISTORY
EVOLVE WITHOUT INVALIDATING

02 / GRANULARITY
LOCAL CHANGE ≠ GLOBAL REPUBLISH

03 / ENFORCEMENT
RULES NEED EXECUTION
```

---

# 11. Problem 01 — Evolve Without Invalidating

## 11.1 中文标题

# 上游持续演进，历史成果仍要保持有效。

## 11.2 英文完整定义

> **Upstream Evolution Should Not Invalidate Valid Downstream Work**

## 11.3 核心语义

动画工作阶段与历史发布阶段是两个不同需求：

```text
WORKING STATE
→ follow current / latest Rig

PUBLISHED STATE
→ preserve historical compatibility
```

关键句：

> **工作状态向前演进，发布状态保留历史依赖。**

英文次级文案：

> **Working state moves forward. Published state preserves compatibility.**

---

## 11.4 Problem 01 的准确 Production 意义

需要表达：

```text
Generation 02
→ Historical RigCache A
→ remains valid / renderable

Generation 03
→ New Work
→ uses current generation
```

允许：

```text
Historical Result A → G2
New Work B          → G3
```

同时合法存在。

不要表达成：

```text
“最新版本通常是错的”
```

也不要再使用：

```text
Latest ≠ Correct
```

作为 Problem 01 标题。

---

# 12. Problem 01 Diagram Contract

图应表达时间与依赖归属：

```text
TIME →

ASSET / RIG
G2 -------------------------- G3

PUBLISHED RESULT A
└──────── keeps G2 dependency

NEW WORK B
└──────────────────────── uses G3
```

视觉要求：

- G2 与 G3 都是合法状态；
- Historical Result 与 New Work 都允许 Mint；
- Mint 表示“当前合法关系”，不是“唯一最新版本”；
- 图中不需要出现 `av`；
- 具体 Compatibility Generation 技术实现进入 Design & Innovation。

---

# 13. Problem 02 — Local Change ≠ Global Republish

## 13.1 中文标题

# 局部变化，不应该要求整体重新发布。

## 13.2 核心问题

一个 Shot 中不同 Product 的变化节奏不同。

例：

```text
Character A   v2 → v3
Character B   v1
Camera        v3
Set           v2
```

只有 Character A 发生变化。

因此必须区分：

```text
CHANGE SCOPE
≠
SYSTEM / SHOT SCOPE
```

以及：

```text
What changed this time?
≠
What is the complete current state?
```

---

## 13.3 Diagram Contract

视觉上必须明确：

```text
CHANGED
A   v2 → v3   [Mint]

UNCHANGED
B   v1
Camera v3
Set v2
```

不要只把四个 Asset Icon 平铺。

需要让读者一眼看出：

> **只有 A 发生变化，其他 Product 仍保持原状态。**

本页不展开：

```text
Granular Product
Partial Publish
Materialized Full State
```

这些进入 Design & Innovation。

---

# 14. Problem 03 — Rules Need Execution

## 14.1 中文标题

# 生产规则，需要进入执行边界。

## 14.2 核心问题

如果规则只存在于说明文档：

```text
Naming should...
Hierarchy should...
Dependency should...
Remember to check...
```

最终仍依赖 Artist 记忆。

系统需要存在真实 Execution Points：

```text
RULES
├→ BUILDER
└→ PUBLISH / QC
```

Builder：

> 减少错误起点。

Publish / QC：

> 校验交付边界。

---

## 14.3 Diagram Contract

推荐：

```text
RULES
├────────→ BUILDER
│          correct starting state
│
└────────→ PUBLISH / QC
           delivery validation
```

不要使用没有语义的 generic gear 作为主要中间节点。

---

# 15. Three Problems 的统一语义

三个 Problem 分别对应：

```text
01 HISTORY
历史成果如何保持有效

02 GRANULARITY
变化影响范围如何被控制

03 ENFORCEMENT
规则如何进入执行
```

它们共同回答：

> **不同 Product、版本和规则以不同节奏演进时，怎样让 Production 始终保持正确协作？**

---

# 16. D — Shared Production Model

## 16.1 Eyebrow

```text
SHARED PRODUCTION MODEL
```

## 16.2 主标题

# 统一的不是软件，而是生产语义。

英文：

> **Different tools. Shared production semantics.**

辅助说明：

> Maya 与 Houdini 执行不同的具体操作，但它们需要对 Context、Product、Version、Dependency、State 和 Validation 有相同的理解。

---

# 17. Shared Production Model 结构冻结

不要实现旧版：

```text
Camera / Set / Asset
→ Production Model Box
→ Workspace
```

固定使用：

```text
PRODUCTION REALITY
        ↓
SHARED PRODUCTION SEMANTICS
        ↓
EXECUTION
        ↓
MAYA / HOUDINI
```

---

# 18. Layer 01 — Production Reality

只表达两个来源：

```text
PEOPLE / TASKS
PRODUCTION PRODUCTS
```

示例：

```text
People / Tasks
- Artist
- Task
- Step

Production Products
- Camera
- Set
- Asset
- Other
```

这里的 Camera / Set / Asset 只是示例，不是 Production Model 的主要输入定义。

---

# 19. Layer 02 — Shared Production Semantics

固定六项：

```text
CONTEXT
PRODUCT
VERSION
DEPENDENCY
STATE
VALIDATION
```

对应解释：

| Semantic | Question |
| --- | --- |
| Context | 现在在做什么？ |
| Product | 正在交接什么成果？ |
| Version | 采用哪一次发布？ |
| Dependency | 依赖哪些输入？ |
| State | 当前完整状态是什么？ |
| Validation | 是否满足交付规则？ |

---

# 20. Shared Semantics 的视觉原则

不要画成：

```text
6 个字段组成的数据 Schema
```

应该更像：

> **Semantic Field / Semantic Coordinate System**

推荐逻辑：

```text
             CONTEXT
                ●

PRODUCT ●───────┼───────● VERSION

DEPENDENCY ●────┼───────● STATE

                ●
            VALIDATION
```

或者六个语义环绕：

```text
Context          Product

      PRODUCTION
       SEMANTICS

Version          Dependency

State            Validation
```

实现可根据版式调整，但必须保持：

> 六个概念是共享语义维度，不是一个 processor 的输入字段。

---

# 21. Layer 03 — Execution

`Resolution / Composition` 不再与六个 Semantics 同级。

Execution 固定包含：

```text
BUILD / LOAD
PUBLISH
RESOLVE
COMPOSE
REVIEW
```

它们回答：

> **系统如何依据 Shared Semantics 执行。**

推荐关系：

```text
SHARED PRODUCTION MODEL
        │
        ├→ BUILD / LOAD
        ├→ PUBLISH
        ├→ RESOLVE
        ├→ COMPOSE
        └→ REVIEW
```

---

# 22. Cross-DCC Output

Execution 最终连接：

```text
MAYA
HOUDINI
```

核心含义：

> **同一套 Production Semantics，在不同 DCC 中驱动不同的 Host-specific Execution。**

不要表达成：

```text
Maya → Houdini
```

因为 WEFT / PPL 不是单向 DCC 转换器。

---

# 23. Shared Model Motion Contract

推荐三段 Reveal：

```text
01 REALITY

People / Tasks
Products / DCCs
appear as distributed elements
```

然后：

```text
02 SEMANTICS

Context
Product
Version
Dependency
State
Validation

organize into a shared semantic field
```

最后：

```text
03 EXECUTION

Build / Load
Publish
Resolve
Compose
Review

branch outward
→ Maya / Houdini
```

这段动画必须表达：

> **Reality → Meaning → Execution**

而不是：

> **Inputs → Processor → Output**

---

# 24. Shared Model 中明确禁止出现

以下内容不进入这一图：

```text
Governance
Recovery
Observability
Regression
```

它们属于：

```text
03 / WHAT COMES NEXT
```

也不出现：

```text
av
RigCache
Resolver URI
record.json
```

这些属于：

```text
02 / DESIGN & INNOVATION
Evidence
```

---

# 25. E — Transition to Design & Innovation

## Eyebrow

```text
FROM MODEL TO DESIGN DECISIONS
```

## 主标题

# 问题被重新建模，默认假设也需要重新审视。

## Teaser

只显示四个关键词：

```text
Compatibility
Modularity
State
Executable Rules
```

不要在本页完整展开：

```text
Global Latest → Compatibility-scoped
Monolithic Package → Modules
Partial Change → Full State
Written Rules → Executable Workflow
```

这些进入下一页。

CTA：

```text
02 / DESIGN & INNOVATION ↗
```

---

# 26. 页面最终内容顺序

```text
01
Animation Production System

02
Every handoff carries:
Product / Version / Dependency / State / Rules

03
真正复杂的，
是让独立演进的成果始终正确协作。

04
Three Core Production Problems

   HISTORY
   Evolve Without Invalidating

   GRANULARITY
   Local Change ≠ Global Republish

   ENFORCEMENT
   Rules Need Execution

05
Shared Production Model

   Production Reality
   ↓
   Shared Semantics
   ↓
   Execution
   ↓
   Maya / Houdini

06
From Model to Design Decisions
→ Design & Innovation
```

---

# 27. 本页不承担的内容

明确下沉：

```text
AssetVersion / av
PublishVersion / v
Mod / Srf / Grm
RigCache
SY_V1%
Resolver selector syntax
description.json
record.json
deleted tombstone
multi-task aggregation
Houdini metadata
Hair implementation boundary
CFX implementation boundary
Publish plugin internals
```

本页职责：

> **建立问题模型与 Shared Production Semantics。**

---

# 28. Implementation Content IDs

推荐代码中为各区域使用稳定 ID：

```text
systematic-hero
production-handoff
system-problem-intro
problem-history
problem-granularity
problem-enforcement
shared-production-model
design-transition
```

推荐语义状态：

```text
hero:
  overview
  asset-production
  shot-production
  handoff

problems:
  history
  granularity
  enforcement

shared-model:
  reality
  semantics
  execution
```

---

# 29. Responsive Contract

Desktop：

- Hero Diagram 可以完整展示 Branch / Merge；
- Shared Model 三列：
  `Reality / Semantics / Execution`。

Mobile：

- 不压缩成不可读的大图；
- Hero 按：
  `Pre → Asset → Shot → Post` 纵向分段；
- Shared Model 改为：
  `Reality ↓ Semantics ↓ Execution`；
- 所有核心语义必须存在文本，不依赖 Diagram 才能理解。

---

# 30. Reduced Motion Contract

Reduced Motion：

- Hero 直接显示最终 Production Dependency Diagram；
- 不播放 branch drawing；
- Three Problems 保持静态；
- Shared Model 直接显示三层最终结构；
- 不影响任何信息理解。

---

# 31. 内容验收标准

非影视 Software Engineer 阅读本页后，应能复述：

1. 动画生产不是简单线性工序，而是多个 Product 和 Dependency 的协作网络；
2. 上游继续演进时，历史下游成果仍可能合法有效；
3. 局部变化不应该扩大成全局重新发布；
4. Production Rules 应进入真实执行边界；
5. WEFT / PPL 统一的是 Context / Product / Version / Dependency / State / Validation 等 Production Semantics；
6. Maya / Houdini 是不同执行宿主，不是系统模型本身。

如果读者必须先理解：

```text
RigCache
av
Resolver
record.json
```

才能回答以上问题，则本页实现过度技术化。

---

# 32. Final Freeze

本页正式 Freeze 为：

```text
ANIMATION PRODUCTION SYSTEM
        ↓
HANDOFF SEMANTICS
        ↓
INDEPENDENT EVOLUTION / CORRECT COLLABORATION
        ↓
THREE CORE PROBLEMS
        ↓
SHARED PRODUCTION SEMANTICS
        ↓
EXECUTION
        ↓
MAYA / HOUDINI
        ↓
DESIGN & INNOVATION
```

最终核心句：

> **动画生产，不是一条线，而是一套协作系统。**

> **真正复杂的，是让独立演进的成果始终正确协作。**

> **统一的不是软件，而是生产语义。**

这三句话构成本页的叙事骨架。
