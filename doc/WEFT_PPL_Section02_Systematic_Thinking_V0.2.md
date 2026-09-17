# WEFT / PPL 第二板块：Systematic Thinking V0.2

> **01 / SYSTEMATIC THINKING**  
> *From Animation Production Reality to a Shared Production Model*

---

# 0. 本轮修订结论

本轮基于上一版页面稿，做两项关键修正：

1. **Problem 01 不再使用 `Latest ≠ Correct` 作为核心命题。**  
   这个表达容易让人误解为“动画生产不应该使用最新版”。真实 Production 语义是：
   - Animation 工作阶段通常应该使用当前最新的 Rig；
   - 但一个已经发布并成立的历史 RigCache，不应该因为 Mod / Surface 后续继续演进，就被迫全部重新生成；
   - 历史 RigCache 应继续按照它发布时所属的 Compatibility Generation 找到正确的下游组合并保持可渲染。

   因此核心问题改为：

   > **Upstream Evolution Should Not Invalidate Valid Downstream Work**  
   > **上游持续演进，不应该自动让已经成立的下游成果失效。**

2. **Shared Production Model 的视觉图重新设计。**  
   上一版使用“Camera / Set / Asset → Production Model → Workspace”的中心汇聚图，过度像一个数据合并器，而且把 `治理方向 / 恢复 / 可观察性 / 回归验证` 放在 Production Model 上方，混入了 V2 Future Direction。  
   新版应明确区分：
   - Production Reality
   - Shared Production Semantics
   - Execution Mechanisms

   让读者理解 WEFT / PPL 统一的是**生产语义**，不是把所有东西简单塞进一个 Workspace。

---

# 1. 第二板块的任务

这一页不是介绍 WEFT / PPL 的 Feature。

它要完成一条认知链：

```text
动画制作为什么复杂？
        ↓
真实生产为什么不是线性流水线？
        ↓
每次交接为什么不只是“传一个文件”？
        ↓
为什么持续变化会产生系统问题？
        ↓
WEFT / PPL 如何把复杂现实拆成稳定语义？
        ↓
这些语义如何进入 Builder / Publish / Resolver / Workspace？
```

最终让非影视技术读者理解：

> **WEFT / PPL 的核心不是连接 Maya 和 Houdini，而是让人、数据和软件共享同一套 Production Semantics。**

---

# 2. 页面结构

本页冻结为四个连续章节：

```text
A. ANIMATION PRODUCTION SYSTEM
   行业上下文 / 动画生产图

B. WHEN PIPELINE BECOMES A SYSTEM
   从流程复杂转向变化复杂

C. THREE CORE PRODUCTION PROBLEMS
   历史兼容 / 局部变化 / 可执行规则

D. SHARED PRODUCTION MODEL
   稳定语义 + 执行机制
```

然后进入：

```text
02 / DESIGN & INNOVATION
```

---

# 3. A — Animation Production System Hero

## Eyebrow

```text
ANIMATION PRODUCTION SYSTEM / FIG. 01
```

## 主标题

# 动画生产，不是一条线，而是一套协作系统。

## 副标题

> 不同的人、软件与制作环节，持续产生、修改、交接和组合制作成果。

英文次级信息：

> **Animation production is a network of people, tools, products and dependencies — not a single linear handoff.**

---

# 4. Hero 图：不要画成单线 Conveyor

上一版整体方向已经成立：

- Editorial / Technical Diagram 风格成立；
- Ivory + Black + Mint 成立；
- Asset / Camera / Surface / Animation 等抽象图形成立；
- Branch / feedback 的意识已经出现。

但 Production 图仍然有一个问题：

> **看起来还是“从左到右做完一遍”的流水线。**

真实动画 Production 更适合画成：

```text
PRE-PRODUCTION

Idea
→ Story
→ Storyboard
→ Animatic
        ├──────────────→ Layout / Shot Planning
        └→ Design
             │
             ▼

ASSET PRODUCTION

Design
→ Modeling
   ├→ Surfacing / Look
   └→ Rigging
        │
        ▼

SHOT PRODUCTION

Layout / Camera
     +
Rig / Asset
     ↓
Animation
     ↓
FX / CFX
     ↓
Lighting
     ↓
Rendering

Surfacing / Look ───────────────→ Lighting / Rendering

POST-PRODUCTION

Rendering
→ Compositing
→ Color
→ Final Output
```

重点：

> **Asset Production 与 Shot Production 应该被视觉上区分。**

这样非影视读者才能理解：

- Modeling / Surfacing / Rig 是“资产生产”；
- Animation / FX / Lighting 更接近“镜头生产”；
- 两者不是简单串行，而是在后面发生组合。

---

# 5. Hero 图的视觉结构建议

## 5.1 三个大阶段仍保留

```text
PRE-PRODUCTION
PRODUCTION
POST-PRODUCTION
```

但 `PRODUCTION` 内部再分成两个 lane：

```text
ASSET PRODUCTION
SHOT PRODUCTION
```

视觉上不要再让所有节点都处于同一条水平线上。

---

## 5.2 Asset Production

推荐最简结构：

```text
                 ┌→ SURFACING / LOOK
DESIGN → MODELING
                 └→ RIGGING
```

典型 Product：

```text
Geometry
Material / Look
Rig
```

Mint 可用于当前被强调的 branch。

---

## 5.3 Shot Production

推荐：

```text
LAYOUT / CAMERA
       │
       ├─────────────┐
       ▼             │
ANIMATION ← RIG      │
       │             │
       ▼             │
FX / CFX             │
       │             │
       └──────┐      │
              ▼      ▼
           LIGHTING / RENDERING
              ▲
              │
          SURFACE / LOOK
```

这里第一次明确表现：

> **Shot 是多个独立 Production Products 的重新组合。**

这正好为后面的 Dependency / Compatibility 铺垫。

---

## 5.4 Post-Production

保持简洁：

```text
RENDER
→ COMPOSITING
→ COLOR
→ FINAL OUTPUT
```

不要继续增加过多专业部门。

---

# 6. Handoff Layer

Hero 最下面保留：

# 每一次交接，都不只是传一个文件。

但是建议把右侧词汇调整为：

```text
PRODUCT
VERSION
DEPENDENCY
STATE
RULES
```

而不是首页就使用偏实现语义的 `VALIDATION`。

原因：

- `Rules` 对非影视读者更容易理解；
- 后面进入 Shared Model 后，再把 Rules 具体化成 Validation / QC。

小字：

> 一个 Production Product 在进入下一环节时，会携带自己的身份、版本、依赖关系与生产状态。

---

# 7. Hero 的 Motion Sequence

动画重点不是“点沿着流水线跑”。

而是从：

```text
STAGES
```

逐渐显露：

```text
BRANCHES
```

再显露：

```text
DEPENDENCIES
```

最后变成：

```text
SYSTEM
```

推荐 Sequence：

```text
01 Pre-production spine appears

02 Asset / Shot lanes separate

03 Modeling branches to Surface + Rig

04 Rig connects into Animation

05 Surface bypasses Animation and connects downstream

06 Camera / Layout joins Shot

07 Animation / FX / Surface converge toward Lighting / Render

08 Handoff metadata appears:
   Product / Version / Dependency / State / Rules
```

最终不是让人记住所有工序，而是让人得到：

> **Production 是一个 dependency network。**

---

# 8. B — When Pipeline Becomes a System

## Eyebrow

```text
WHEN A PIPELINE BECOMES A SYSTEM
```

## 主标题

# 步骤并不是最难的，变化才是。

这句保留，上一版是正确的。

## 正文修订

> 如果每个环节只执行一次，这只是一张流程图。
>
> 真实制作中，资产与镜头会持续迭代：模型会变化，Rig 会更新，材质会继续完善，Animation 和 FX 也会产生多个已发布结果。
>
> 更重要的是，这些变化并不会同时发生。
>
> **Production System 真正需要解决的，是不同成果以不同节奏演进时，如何继续保持已有工作的有效性和正确组合。**

## 收束问题

> **怎样让 Production 持续向前演进，同时不轻易破坏已经成立的历史成果？**

---

# 9. 上一版时间线图的修改建议

上一版右侧使用：

```text
Camera  v001 → v002 → v003
Set     v001 → v004 → v005
Asset   v001 → v002 → v003 → v004
```

这个视觉只能表达：

> 不同对象版本更新节奏不同。

方向没有错，但它还没有解释“为什么这是系统问题”。

建议改为：

```text
                    TIME →

ASSET / RIG
    G2 ────────────────● G3

ANIMATION SHOT A
           ● RigCache A
           └────────────── keeps G2 dependency

ANIMATION SHOT B
                       ● RigCache B
                       └──────────── uses G3
```

薄荷绿高亮：

```text
RigCache A → Generation 2
RigCache B → Generation 3
```

这样一张图直接表达：

> **不同历史 Production Products 可以合法地属于不同 Dependency Generation。**

---

# 10. C — Three Core Production Problems

本轮重写第一项。

---

## Problem 01 — Evolve Without Invalidating

### 中文标题

# 上游持续演进，历史成果仍要保持有效。

### 英文技术标题

> **Upstream Evolution Should Not Invalidate Valid Downstream Work**

也可以在视觉上缩成：

```text
EVOLVE
WITHOUT
INVALIDATING
```

### 正文

Animation 的工作阶段通常会使用当前最新的 Rig。

但一旦一个 RigCache 已经完成发布，它就代表一次已经成立的历史 Production Result。

后续 Mod、Surface 或 Rig 继续演进时：

> **旧 RigCache 不应该因此自动失效，也不应该仅为了跟随资产最新版而被迫重新生成。**

对于大量非特写镜头，一个很小的模型修改可能根本不会影响最终画面。

如果每次资产更新都导致所有历史 Animation Cache 报废，会制造没有必要的重复生产成本。

系统需要保留：

```text
Published RigCache
        ↓
its compatibility generation
        ↓
matching historical dependencies
        ↓
still renderable
```

### 核心语义

> **Working latest and published compatibility are two different requirements.**

中文：

> **工作阶段需要跟随最新；已发布成果需要保留历史兼容。**

---

## Problem 01 图像建议

不要再画：

```text
v001
├→ v002 最新
└→ v003 正确
```

这个图会让人误解：

> “为什么不选最新？”

改成时间 + 两代依赖：

```text
TIME →

GENERATION 02
Mod G2 ─ Rig ─ Animation ─ RigCache A
  │                         │
  └──── Surface G2 ◀────────┘
                         ✓ still renderable


GENERATION 03
Mod G3 ─ Rig Main ─ New Animation
  │
  └──── Surface G3
```

视觉重点：

- `Rig Main / New Work` 使用 G3：薄荷绿；
- `Historical RigCache A` 仍连接 G2：同样合法；
- 两条路径同时成立。

这张图比 `Latest ≠ Correct` 准确得多。

---

## Problem 02 — Local Change ≠ Global Republish

### 中文标题

# 局部变化，不应该要求整体重新发布。

### 正文

一个 Shot 中的 Character、Camera、Set、FX 等资源不会以相同节奏变化。

如果只修改 Character A：

```text
A v2 → A v3
B v1
Camera v3
Set v2
```

不应该为了产生一个新的 Shot Version，强迫所有资源重新发布。

真正需要区分的是：

```text
What changed this time?
≠
What is the complete current state?
```

这为后面的：

```text
Granular Product
Partial Publish
Materialized Full State
```

建立问题基础。

第二页只讲问题，不展开实现。

---

## Problem 03 — Rules ≠ Documentation

### 中文标题

# 生产规则，需要进入执行边界。

### 正文

Production Rules 如果只存在于文档：

```text
命名应该这样
目录应该这样
依赖应该这样
发布前记得检查
```

最终仍然依赖 Artist 的记忆。

系统需要在实际工作过程中承担部分规则执行：

```text
Builder
→ 减少错误起点

Publish / QC
→ 校验交付边界
```

这一页只讲：

> **Rules need execution points.**

具体 Configurable Publish / QC 进入 Design & Innovation。

---

# 11. Three Problems 的视觉文案建议

上一版：

```text
Latest ≠ Correct
Local Change ≠ Global Republish
Rules ≠ Documentation
```

新版：

```text
01
EVOLVE WITHOUT INVALIDATING
上游持续演进，历史成果仍要保持有效。

02
LOCAL CHANGE ≠ GLOBAL REPUBLISH
局部变化，不应该要求整体重新发布。

03
RULES NEED EXECUTION
生产规则，需要进入执行边界。
```

这三个问题现在更统一：

```text
HISTORY
GRANULARITY
ENFORCEMENT
```

也可以作为极小的 Technical Label。

---

# 12. D — Shared Production Model：上一版图的问题

上一版黑色图视觉本身很好：

- 风格统一；
- Camera / Set / Asset illustration 很漂亮；
- Production Model 中央体有识别度；
- Mint 连接线有效；
- Workspace 输出有立体感。

但**语义模型不够准确**。

主要有四个问题。

---

## 12.1 问题一：看起来像 Input → Processor → Workspace

当前图容易被读成：

```text
Camera
Set
Asset
   ↓
Production Model
   ↓
Workspace
```

这会让人以为：

> Production Model 是一个把多个资产“处理成 Workspace”的节点。

实际上 WEFT / PPL 的 Production Model 是：

> **一套贯穿 Builder、Publish、Resolver、DCC Consumer 的共享语义。**

不是某个 processor。

---

## 12.2 问题二：Camera / Set / Asset 太具体

它们是很好的 Production Product 示例，

但把它们作为 Production Model 的主要输入，会让模型被误解成：

> Shot Assembly Model。

Systematic Thinking 页需要更抽象一层。

---

## 12.3 问题三：Future Direction 被混进 Core Model

当前中央上方出现：

```text
治理方向
恢复
可观察性
回归验证
```

这些属于：

```text
03 / WHAT COMES NEXT
```

不应该出现在 Shared Production Model 图中。

必须删除。

---

## 12.4 问题四：八个概念目前只是底部词表

当前：

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

被放在图底部解释。

但它们其实应该成为**整张图的主体**。

---

# 13. Shared Production Model 新图设计

新版不再采用：

```text
Asset Inputs
→ Production Model Box
→ Workspace
```

改成：

# **Production Reality → Shared Semantics → Execution**

---

## 13.1 推荐总体结构

```text
PRODUCTION REALITY

People / Task
Scenes / Assets
Versions
DCCs
        │
        ▼

┌───────────────────────────────────┐
│       SHARED PRODUCTION MODEL     │
│                                   │
│  CONTEXT        PRODUCT           │
│                                   │
│  VERSION        DEPENDENCY        │
│                                   │
│  STATE          VALIDATION        │
└───────────────────────────────────┘

        │
        ▼

EXECUTION

BUILD / LOAD
PUBLISH
RESOLVE
COMPOSE
REVIEW
```

这里把：

```text
Resolution
Composition
```

从核心 Domain Semantics 中稍微下沉为 Execution Mechanisms。

这是比上一版更清楚的分类。

---

# 14. 为什么要把 Resolution / Composition 下沉

八个词并不是完全相同层级。

更准确地分：

## Shared Production Semantics

```text
Context
Product
Version
Dependency
State
Validation
```

它们回答：

> 系统共同理解什么？

---

## Execution Mechanisms

```text
Build / Load
Publish
Resolve
Compose
Review
```

它们回答：

> 系统如何根据这些语义执行？

这样读者更容易理解：

```text
Meaning
→
Execution
```

而不是把 8 个词全部当成同级抽象概念。

---

# 15. 新图可以做成双层桥接结构

更完整的版本：

```text
PEOPLE / WORKFLOW                         DATA / PRODUCTS

Task                                      Scene
  ↓                                         ↓
Work                                     Product
  ↓                                         ↓
QC                                      Version
  ↓                                         ↓
Review                                 Dependency
  │                                         │
  └───────────────┐       ┌─────────────────┘
                  ▼       ▼

              SHARED PRODUCTION MODEL

              Context
              Product Identity
              Version
              Dependency
              State
              Validation

                       │
                       ▼

               EXECUTION LAYER

        Build / Load / Publish / Resolve
           Compose / Review / State

                       │
          ┌────────────┴────────────┐
          ▼                         ▼

         MAYA                    HOUDINI
```

这是我目前更推荐的 Shared Production Model 图。

---

# 16. 新图的视觉建议

## 左侧

不是 Camera / Set / Asset 三张大图。

改成两个抽象入口：

```text
PEOPLE / TASKS
```

和：

```text
PRODUCTION PRODUCTS
```

可以继续使用：

- Camera
- Set
- Asset

作为 Product 示例，但缩小，作为第二层图形。

---

## 中央

一个非常明确的：

```text
SHARED PRODUCTION MODEL
```

不是堆叠盒子作为 processor。

可以画成：

- 6 层 semantic planes；
- 或一个 open framework；
- 或相互连接的六个 labeled nodes。

Mint 只高亮当前 active semantic relation。

---

## 右侧

不要只画 Workspace。

改成：

```text
EXECUTION
```

向多个出口展开：

```text
BUILD
LOAD
PUBLISH
RESOLVE
COMPOSE
REVIEW
```

然后最右端：

```text
MAYA
HOUDINI
```

这样才真正解释：

> **同一套 Production Model 驱动不同 DCC 行为。**

---

# 17. Shared Production Model 的主文案

上一版：

> 统一的不是软件，而是对生产的理解。

这句非常好，建议保留。

可以升级成：

# 统一的不是软件，而是生产语义。

然后下面：

> Maya 与 Houdini 执行不同的具体操作，但它们需要对 Context、Product、Version、Dependency、State 和 Validation 有相同的理解。

英文小字：

> **Different tools. Shared production semantics.**

这比当前：

> 人、数据与软件，共享同一套生产语义。

更直接。

后一句可以继续作为辅助文案保留。

---

# 18. Shared Model 动效

建议按三段揭示：

```text
01 REALITY

People / Tasks
Products / Versions / DCCs
```

先以分散状态出现。

```text
02 SEMANTICS

Context
Product
Version
Dependency
State
Validation
```

聚合成中央框架。

```text
03 EXECUTION

Build
Load
Publish
Resolve
Compose
Review
```

从中央向外展开，最后连接：

```text
Maya
Houdini
```

这个 Motion 本身就在说明：

> **WEFT / PPL 不是“把 Maya 接上 Houdini”，而是先建立共享语义，再驱动跨 DCC Execution。**

---

# 19. 进入 Design & Innovation

Shared Model 后进入：

```text
FROM MODEL TO DESIGN DECISIONS
```

保留上一版标题：

# 问题被重新建模，默认假设也需要重新审视。

但不要在这里完整列四个 Design Decisions。

只做一个 teaser：

```text
Compatibility
Modularity
State
Executable Rules
```

右下 CTA：

```text
02 / DESIGN & INNOVATION ↗
```

真正的：

```text
Global Latest → Compatibility-scoped
Monolithic Package → Modules
Partial Change → Full State
Written Rules → Executable Workflow
```

去下一页展开。

---

# 20. 第二板块最终认知链

```text
ANIMATION PRODUCTION

不是一条线
而是 dependency network
        ↓

HANDOFF

Product
Version
Dependency
State
Rules
        ↓

CONTINUOUS CHANGE

不同成果以不同节奏持续演进
        ↓

SYSTEM PROBLEMS

01 Evolve Without Invalidating
02 Local Change ≠ Global Republish
03 Rules Need Execution
        ↓

DECOMPOSE

Shared Production Semantics

Context
Product
Version
Dependency
State
Validation
        ↓

EXECUTION

Build / Load
Publish
Resolve
Compose
Review
        ↓

CROSS-DCC

Maya
Houdini
        ↓

DESIGN DECISIONS
```

---

# 21. 当前页面稿建议总结

## 建议保留

- 整体 Ivory → Dark → Ivory 的明暗节奏；
- 大字号中文标题；
- Technical Editorial 排版；
- Mint 强调色；
- Production Pipeline 的抽象 wireframe illustration；
- `步骤并不是最难的，变化才是。`
- `统一的不是软件，而是对生产的理解。`
- 最后的 Design & Innovation CTA。

## 建议修改

1. Production Pipeline 改成 **Asset Production + Shot Production 两层**，减少“单线流水线”的误导；
2. Hero 图明确 Branch / Merge / Dependency；
3. Problem 01 删除 `Latest ≠ Correct`；
4. Problem 01 改为 **Evolve Without Invalidating**；
5. Problem 01 图从“最新版 vs 正确版”改成“历史 RigCache 与新旧 Generation 同时合法存在”；
6. `Rules ≠ Documentation` 改成更正向的 **Rules Need Execution**；
7. Shared Production Model 重画；
8. 删除 Shared Model 图中的 `治理 / 恢复 / 可观察性 / 回归验证`；
9. Shared Model 从“Camera/Set/Asset → Model → Workspace”改为：
   `Production Reality → Shared Semantics → Execution → Maya/Houdini`；
10. 把 Resolution / Composition 从 Core Semantics 下沉到 Execution Layer；
11. Design 页过渡只做 teaser，不在本页提前展开全部 Decision。

---

# 22. 明确不进入本页的细节

继续下沉：

```text
AssetVersion / av
PublishVersion / v
SY_V1%
Mod / Srf / Grm
RigCache path
description.json
record.json
tombstone
Resolver selector syntax
Houdini metadata
Hair implementation boundary
CFX implementation boundary
```

这些留给：

```text
02 / DESIGN & INNOVATION
Evidence
```

---

# 23. Freeze

第二板块 V0.2 冻结结构：

```text
A. ANIMATION PRODUCTION SYSTEM
   Industry Context Hero

B. WHEN PIPELINE BECOMES A SYSTEM
   Steps are not the hardest part — change is.

C. THREE SYSTEM PROBLEMS
   01 Evolve Without Invalidating
   02 Local Change ≠ Global Republish
   03 Rules Need Execution

D. SHARED PRODUCTION MODEL
   Production Reality
   → Shared Semantics
   → Execution
   → Cross-DCC

E. TRANSITION
   → Design & Innovation
```

核心判断：

> **第二板块不是解释 WEFT / PPL 的具体技术，而是证明为什么动画生产值得被建模成一个 Production System，以及 WEFT / PPL 用什么稳定语义来理解它。**
