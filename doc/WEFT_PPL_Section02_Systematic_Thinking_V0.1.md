# WEFT / PPL 第二板块：Systematic Thinking V0.1

> **01 / SYSTEMATIC THINKING**  
> *From Animation Production Reality to a Shared Production Model*

---

## 0. 板块定位

第二板块的目标不是介绍 WEFT / PPL 有哪些功能，也不是一上来解释 `av / v`、Resolver、RigCache、record 等 Pipeline 细节。

它首先要让一个**不熟悉影视 / 动画 Pipeline，但具备工程理解能力的读者**理解：

1. 动画生产本身就是一个多人、多软件、多阶段的协作系统；
2. 真正困难的不是“步骤多”，而是制作成果会持续变化、交接和组合；
3. 这些变化会带来版本、依赖、状态和规则问题；
4. WEFT / PPL 的系统思考，首先是把这些复杂现实拆成一组稳定的 Production Concepts。

整个板块的认知路径：

```text
动画生产是什么？
        ↓
为什么有大量交接？
        ↓
为什么交接不只是文件？
        ↓
为什么持续变化会让 Pipeline 变成 System Problem？
        ↓
三个核心 Production Problems
        ↓
WEFT / PPL 如何拆解并建模这些问题
        ↓
Shared Production Model
```

---

# 1. 页面结构

推荐分为 4 个连续部分：

```text
A. INDUSTRY CONTEXT HERO
   动画生产流水线总览

B. WHEN PIPELINE BECOMES A SYSTEM
   从“流程很多”过渡到“变化与协作复杂”

C. THREE CORE PRODUCTION PROBLEMS
   Latest ≠ Correct
   Local Change ≠ Global Republish
   Rules ≠ Documentation

D. SHARED PRODUCTION MODEL
   Context / Product / Version / Dependency / State / ...
```

最后自然过渡到下一板块：

```text
DESIGN & INNOVATION
```

---

# 2. A — Industry Context Hero

## Eyebrow

```text
ANIMATION PRODUCTION PIPELINE
```

## 主标题

# 动画生产，不是一条线，而是一套协作系统。

## 英文副标题

> **Animation production is not a linear handoff. It is a system of people, tools, products and dependencies.**

## 主说明

一部动画作品从创意到最终画面，需要经过前期设计、资产制作、镜头生产、特效、灯光、渲染与后期等多个环节。

不同团队使用不同的软件，持续产生新的模型、材质、Rig、动画、模拟、相机与渲染结果；这些制作成果会被下一环节继续使用、修改和组合。

因此，Production Pipeline 真正需要管理的并不只是“文件从哪里传到哪里”，而是：

```text
谁在做什么
+
使用什么输入
+
产生什么成果
+
依赖哪些版本
+
当前处于什么状态
+
什么时候可以交给下一环节
```

---

# 3. Hero 图像结构

这张图不是“动画工序科普图”，而是：

> **把动画生产重新理解为一个协作系统的技术图解。**

风格继续沿用 WEFT / PPL：

```text
Technical Editorial
+ Production Diagram
+ Ivory / Black / Mint
+ thin technical lines
+ light stipple / halftone
+ editorial annotations
```

不要做成卡通教材风。

## 3.1 图像总体结构

采用：

> **横向主结构 + 三阶段分区 + 系统注解层**

```text
┌─────────────────────────────────────────────────────────────────────┐
│ ANIMATION PRODUCTION PIPELINE                            FIG. 01    │
│                                                                     │
│ 动画生产，不是一条线，而是一套协作系统。                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ PRE-PRODUCTION                                                      │
│ [Idea] → [Story] → [Storyboard] → [Animatic] → [Design]            │
│                                                                     │
│ ────────────────────────────────────────────────────────────────     │
│                                                                     │
│ PRODUCTION                                                          │
│                                                                     │
│ [Layout] → [Modeling] ─┬→ [Surfacing] ────────────────┐             │
│                        └→ [Rigging] → [Animation]     │             │
│                                           │            │             │
│                                           ├→ [FX/CFX]  │             │
│                                           └────────────┼→ [Lighting] │
│                                                        └→ [Render]   │
│                                                                     │
│ ────────────────────────────────────────────────────────────────     │
│                                                                     │
│ POST-PRODUCTION                                                     │
│ [Comp] → [2D FX] → [Color] → [Final Output]                         │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│ EVERY HANDOFF CARRIES MORE THAN A FILE                              │
│ Product   Version   Dependency   State   Validation                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

# 4. 第一层：Pre-Production

## 推荐节点

```text
IDEA
→ STORY
→ STORYBOARD
→ ANIMATIC
→ DESIGN
```

小注：

> 故事、镜头设计与视觉目标逐步被确定。

视觉权重较轻，用来建立行业背景。

---

# 5. 第二层：Production

这是整个 Hero 图的视觉重点。

## 推荐主阶段

```text
LAYOUT
→ MODELING
→ SURFACING
→ RIGGING
→ ANIMATION
→ FX / CFX
→ LIGHTING
→ RENDERING
```

R&D 如需要展示，建议作为 supporting branch，而不是硬插入主线。

## 5.1 Stage 与 Production Product 双层表达

| Stage | Typical Production Product |
| --- | --- |
| Layout | Shot Layout / Camera Setup |
| Modeling | Geometry / Asset |
| Surfacing | Material / Look |
| Rigging | Rig |
| Animation | Motion / RigCache |
| FX / CFX | Simulation |
| Lighting | Shot Lighting |
| Rendering | Render Layers / Frames |

目的：

> 为后面解释 `Production Product` 提前建立直觉。

## 5.2 必须表现的关系

### 分叉

```text
Modeling
├→ Surfacing
└→ Rigging
```

表达不同分支可以独立演进。

### 汇合

```text
Rig
Surface
Camera
Animation
FX
   ↓
Lighting / Rendering
```

表达独立成果最终仍必须重新组合。

### 迭代 / 回流

少量虚线即可：

```text
Animation ↔ Rigging
Lighting ↔ FX
Design ↔ Production
```

提示真实 Production 不是一次性直线流程。

---

# 6. 第三层：Post-Production

## 推荐主线

```text
COMPOSITING
→ 2D FX / MOTION GRAPHICS
→ COLOR
→ FINAL OUTPUT
```

小注：

> 不同生产结果最终被整合、检查并交付。

`FINAL OUTPUT` 可以作为整张图的视觉终点。

---

# 7. 系统注解层：Every Handoff Carries More Than a File

这是 Hero 从“行业流程图”转向“系统思考”的关键桥梁。

## 主标题

# 每一次交接，都不是简单地传一个文件。

## 说明

一个制作成果往往带着自己的身份、版本、依赖和生产状态。

当它被另一个人、另一个软件或另一个工序继续使用时，这些关系必须保持正确。

## 英文短句

> **Every handoff carries context, version, dependency and state.**

## 推荐系统标签

```text
PRODUCT
VERSION
DEPENDENCY
STATE
VALIDATION
```

解释：

- **Product** — 正在交接的制作成果是什么
- **Version** — 当前采用的是哪一次发布
- **Dependency** — 它依赖哪些输入
- **State** — 当前完整状态是什么
- **Validation** — 什么时候可以进入下一环节

---

# 8. 薄荷绿使用规则

继续沿用首页语义：

```text
BLACK / IVORY
= structure

GRAY
= inactive / secondary

MINT
= active / valid / selected / connected / current
```

在本 Hero 图中，Mint 只用于：

1. 当前被强调的交接路径；
2. 关键 Branch / Merge 节点；
3. 当前 active Production Product；
4. Handoff 中正在解释的 Product / Version / Dependency / State；
5. 少量 connection marker。

不要把所有箭头和阶段都做成薄荷绿。

---

# 9. Hero 动效建议

第二页 Hero 的动效强度低于首页 Master Canvas。

## 进入 sequence

```text
PRE-PRODUCTION labels appear
↓
main production spine draws
↓
branch / merge lines appear
↓
post-production connects
↓
handoff system labels appear
```

主线可以有一次轻量 moving marker：

```text
Idea
→ Design
→ Modeling
→ Rigging
→ Animation
→ Lighting
→ Final
```

首次进入演示一次即可。

动画最后才出现：

```text
Product
Version
Dependency
State
Validation
```

让认知完成：

```text
Stages
↓
Handoffs
↓
System semantics
```

---

# 10. B — When Pipeline Becomes a System

Hero 结束后，不马上进入 WEFT / PPL 实现。

## Eyebrow

```text
WHEN A PIPELINE BECOMES A SYSTEM
```

## 主标题

# 步骤并不是最难的，变化才是。

## 正文

如果每个环节只执行一次，这只是一张流程图。

真实制作中：

```text
模型会改
动画会改
材质会改
FX 会改
镜头中的不同资源会以不同节奏变化
```

一旦这些变化跨越不同的人、软件和制作环节，问题就不再是：

> 下一步是什么？

而是：

> **怎样让独立变化的成果始终能够正确地协同工作？**

---

# 11. C — Three Core Production Problems

## Problem 01

# Latest ≠ Correct

> **最新版本，不一定是正确版本。**

不同 Production Branch 可以独立迭代。

两个“最新版本”可能建立在不同的上游状态之上，因此不能简单组合。

## Problem 02

# Local Change ≠ Global Republish

> **局部变化，不应该要求整个 Shot 一起重新发布。**

如果只修改 Character A，Character B、Camera、Set 不应该因为版本机制而被迫一起产生新版本。

## Problem 03

# Rules ≠ Documentation

> **生产规则不能只存在于说明文档。**

命名、结构、依赖、版本和交付要求，需要真正进入 Builder、Publish 和 QC。

## 收束句

> **The problem was not moving more files. It was keeping independently evolving production products consistent across people, versions and DCC boundaries.**

---

# 12. D — Shared Production Model

## 主标题

# 把复杂生产问题拆成几个稳定的问题。

现实生产看起来是：

```text
People
× Software
× Files
× Versions
× Dependencies
× Tasks
× State
```

WEFT / PPL 不从按钮、文件路径或某个 DCC API 开始建模。

它先回答几个更稳定的问题：

| Production Question | System Concept |
| --- | --- |
| 现在在做什么？ | **Context** |
| 正在交接的成果是什么？ | **Product** |
| 这是哪一次发布？ | **Version** |
| 它依赖哪些输入？ | **Dependency** |
| 当前完整状态是什么？ | **State** |
| 是否满足进入下一环节的规则？ | **Validation** |
| 应该在哪里找到它？ | **Resolution** |
| 如何进入具体 DCC 工作场景？ | **Composition** |

## Shared Production Model

```text
Task / Context
      ↓
Production Product
      ↓
Version + Dependency
      ↓
Validation + Publish
      ↓
State + Resolution
      ↓
DCC Workspace Composition
```

## 核心文案

> **WEFT / PPL 的核心不是把 Maya 和 Houdini 接在一起。**

真正需要统一的是：

> **人、数据和软件对“当前在做什么、正在使用什么、什么可以组合、什么可以交付”的理解。**

---

# 13. 进入 Design & Innovation 的过渡

第二板块到这里不继续讲：

```text
AssetVersion
Resolver URI
RigCache
Partial Publish JSON
Node Metadata
```

这些属于下一板块。

## Eyebrow

```text
FROM MODEL TO DESIGN DECISIONS
```

## 过渡标题

# 当问题被重新建模，原来的默认假设也需要重新审视。

## 短说明

WEFT / PPL 接下来的关键并不是增加更多工具，而是改变几个 Production Pipeline 中长期默认成立的假设：

```text
Latest
→ Compatible

Monolithic Package
→ Composable Modules

Partial Change
→ Complete State

Written Rules
→ Executable Workflow
```

CTA：

```text
02 / DESIGN & INNOVATION ↗
```

---

# 14. 第二板块完整认知路径

```text
ANIMATION PRODUCTION PIPELINE

多个阶段
多个工种
多个软件
大量制作成果
        ↓
HANDOFF

每次交接携带：
Product / Version / Dependency / State
        ↓
CHANGE

真实 Production 持续变化
        ↓
SYSTEM PROBLEMS

Latest ≠ Correct
Local Change ≠ Global Republish
Rules ≠ Documentation
        ↓
DECOMPOSE

Context
Product
Version
Dependency
State
Validation
Resolution
Composition
        ↓
SHARED PRODUCTION MODEL
        ↓
DESIGN DECISIONS
```

---

# 15. 页面视觉节奏建议

```text
HERO
大图 / Ivory / 宽松

↓

SYSTEM TURN
大标题 / 留白

↓

3 PROBLEMS
更强 Typography / 分段

↓

SHARED MODEL
Technical Diagram

↓

TRANSITION
轻量 CTA
```

第二页是第一个真正的内容页，可以比首页更长、更沉浸。

---

# 16. 当前明确不进入第二板块的技术细节

全部留到 Design / Evidence：

```text
AssetVersion
PublishVersion
av / v
Mod
Srf
Grm
RigCache
SY_V1%
Resolver selector syntax
description.json
record.json
deleted tombstone
Hair / CFX implementation boundary
Houdini metadata
Publish plugin internals
```

第二板块负责的是：

> **建立问题模型。**

不是：

> **证明具体实现。**

---

# 17. 第二板块最终定位

> **先让读者理解动画生产为什么天然是一个复杂协作系统，再展示 WEFT / PPL 如何把这种复杂性拆成一套稳定、可执行的 Production Model。**

---

## Freeze

当前第二板块冻结为：

```text
A. Animation Production Pipeline Hero

B. When Pipeline Becomes a System

C. Three Core Production Problems

D. Shared Production Model

→ Design & Innovation
```

下一步优先：

> **先实现 Hero 的 Production Pipeline Diagram，再进入后面的 System Problem 页面设计。**
