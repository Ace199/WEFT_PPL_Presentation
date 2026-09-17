# PPL 展示网站内容规划 V0.3.4 — 4-Block Information Architecture

> **当前适用范围修订 · 2026-09-16：** 本文保留系统内容论点、事实边界、案例与贡献归属；旧首页七节结构、四块权重和冻结流程不再直接约束当前首页。当前 V1 仅做概览首页，依据 [首页总结](WEFT_PPL_Homepage_Summary_V0.1.md)、[技术规范 V2.2](WEFT_PPL_Website_Technical_Implementation_Spec_V2.2.md) 和 [最终视觉图](../ref/final.png)。独立章节、Flow、Evidence 页面延期。新增的前端临时文本预览是展示网站的辅助功能，不是 WEFT / PPL 动画生产系统的能力：所有访客只能修改当前页面内存中的文案，刷新恢复；正式内容由维护者核对后修改代码、提交并部署，不接后台。临时输入不能自动成为已核验事实；正式落地仍须遵守本文的命名、证据与贡献边界。以下正文保留为历史内容依据。

> **Designing a Cross-DCC Production System**  
> *A production system for coordinating people, software, versions, dependencies and production state across Maya and Houdini.*

---

## 0. 本版定位

PPL 仍然是网站主角。

这个网站不是个人主页，也不直接写：

- “我很擅长系统搭建”
- “我有创新能力”
- “我擅长复杂问题拆解”
- “TD 就是产品经理”

这些能力应该由 PPL 的系统结构、设计判断和真实生产行为自然体现出来。

本版将原来的 7 个 Section 重新组织成 **4 个认知板块**：

```text
00  HERO
    PPL 是什么

01–02  SYSTEMATIC THINKING
       为什么问题复杂
       PPL 如何把复杂问题建模成系统

03–05  DESIGN & INNOVATION
       哪些传统假设被重新设计
       这些设计如何在生产中工作
       最终改变了什么

06  WHAT COMES NEXT
    当前边界与下一类工程问题
```

因此：

> **内容上仍然是 7 段；用户感知上只有 4 个大块。**

---

# BLOCK 0 — HERO

## 00 — What I Built

### 目标

这一屏只回答三个问题：

```text
What is it?
Is it real?
What was my role?
```

不解释 `av/v`、Resolver、record、RigCache 等任何影视 Pipeline 细节。

### 标题

# Designing a Cross-DCC Production System

副标题：

> **让不同人、不同软件产出的动画制作成果，能够正确交接和组合。**

### 主文案

一部动画并不是在一个软件里完成的。

模型、材质 / 外观、动画、相机、特效等制作成果，会由不同的人持续修改，也会在 Maya、Houdini 等不同软件之间不断交接。

**PPL 是一套让这些制作成果在不同软件、不同制作环节之间能够被正确版本化、检查、组合和更新的 Production System。**

它覆盖从 Task Context、Work、Build / Load，到 Publish、Cross-DCC Consume 和 Review 的主要生产链路。

### Production Proof

```text
2026.04–08 core build
2-person team
active production

Maya / Houdini
ASSET / SET / SEQ / SHOT
```

### Role

> **Lead Pipeline TD / System Designer**  
> 主导系统架构与核心实现。

项目由两人协作完成；另一位成员在共同框架上扩展 Production Modules，并主导 ASB 核心能力。

### 首页视觉

优先展示真实 Production UI：

1. Maya WorkManager / Builder
2. Maya Publish / QC
3. Houdini Shot Builder

目的不是解释功能细节，而是让人第一时间知道：

> **这不是概念 Demo，而是一套正在真实制作中运行的软件系统。**

---

# BLOCK 1 — SYSTEMATIC THINKING

这个板块由 01 和 02 组成。

核心不是“介绍功能”，而是展示：

```text
Real-world complexity
        ↓
Problem decomposition
        ↓
Shared production model
```

---

## 01 — The Production Problem

### 标题

# 制作成果可以独立变化，但交接时必须正确组合

### 正文

影视 / 动画制作并不是线性文件传递。

一个角色的模型可能已经更新，但材质仍然基于上一版；动画可能继续使用旧 Rig；一个 Shot 中可能只修改一个角色，而 Camera、Set 和其他角色都没有变化。

真正困难的是：

```text
People
× Software
× Versions
× Dependencies
× Production State
```

这会产生三个所有工程背景读者都能理解的问题。

### Problem 01 — Latest ≠ Correct

> **最新版本，不一定是正确版本。**

不同 Production Branch 可以独立迭代。

两个版本即使都是“最新”，也可能建立在不同的上游状态之上，因此不能简单组合。

### Problem 02 — Local Change ≠ Global Republish

> **只修改一个资源，不应该要求整个 Shot 一起重新发布。**

如果只修改 Character A，Character B、Camera、Set 不应该因为版本机制而被迫一起产生新的整包版本。

### Problem 03 — Rules ≠ Documentation

> **生产规则不能只存在于说明文档。**

命名、结构、依赖、版本和交付要求，需要真正进入 Builder、Publish 和 QC。

### 收束

> **The problem was not moving more files. It was keeping independently evolving production products consistent across people, versions and DCC boundaries.**

---

## 02 — The System Model

### 标题

# 把复杂生产问题拆成几个稳定的问题

现实生产看起来是：

```text
很多 Artist
×
很多软件
×
很多文件
×
很多版本
×
很多依赖
×
很多任务
```

PPL 不从按钮、文件路径或某一个 DCC 的 API 开始。

它先回答几个稳定问题：

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

### 核心模型

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

### 关键文案

> **PPL 的核心不是把 Maya 和 Houdini 接在一起。**

真正需要统一的是：

> **人、数据和软件对“当前在做什么、正在使用什么、什么可以组合、什么可以交付”的理解。**

### 这一板块隐含体现的能力

> **不上网页，仅作为内容验收依据。**

```text
System breadth
→ System Building

Messy production problem
→ Context / Product / Version / Dependency / State
→ Complex Problem Decomposition
```

如果非影视工程师读完 01–02 后只得到：

> “这是一个 Maya/Houdini Pipeline。”

则这一板块没有完成任务。

理想理解应该是：

> “作者先把复杂生产问题建模，再让不同工具围绕同一套模型执行。”

---

# BLOCK 2 — DESIGN & INNOVATION

这个板块由 03、04、05 组成。

核心链路：

```text
03  What did the system rethink?
        ↓
04  How does it behave in real production?
        ↓
05  What changed because of those decisions?
```

这里是整个网站最重要的主体。

---

## 03 — Key Design Moves

### 标题

# PPL 不只是增加工具，而是改变了几个底层生产假设

首页只展示四个系统级变化。

影视 / USD / DCC 实现细节进入 Deep Dive。

### Design Move 01 — From Latest to Compatible

# 不只是找最新版，而是找能一起工作的版本

传统选择逻辑很容易退化成：

```text
find latest
```

但 Production Branch 可以独立迭代。

PPL 在选具体版本之前，先保留并判断依赖来源：

```text
Compatibility Scope
        ↓
Version Selection
```

**Production Consequence**

> 各部门可以独立迭代，而不需要通过“所有东西一起升级”来保证一致性。

**Deep Dive**

```text
Compatibility Generation
AssetVersion / PublishVersion
Logical Asset Identity
USD Asset Resolver
```

---

### Design Move 02 — From Monolithic Packages to Composable Production Modules

# 从整包发布，改成可独立演进、按需装配的资产模块

传统 Shot 发布容易把多个资源绑定在一个整体版本中：

```text
Shot
└── One Big Animation Package
```

PPL 将 Shot 理解成一组可以独立演进的 Production Modules：

```text
Shot Workspace

[ Camera Module      ]
[ Set Module         ]
[ Character A Module ]
[ Character B Module ]
[ CFX Module         ]
```

每个 Module 可以拥有自己的：

```text
Identity
Version
Dependency
State
Update lifecycle
```

模块最终根据当前 Shot Context、Resource Topology 和 Dependency 被装配进工作场景。

**Production Consequence**

> 一个 Module 发生变化，不需要让无关 Module 为了整体版本号一起重新发布或更新。

#### 关于“Slot / 插槽”

首页视觉可以用 Slot 表达：

```text
Shot Workspace
├── Camera Slot
├── Set Slot
├── Character Slot
└── Simulation Slot
```

但正文主术语使用 **Module**。

原因：

> 当前 PPL 已有清晰模块化边界，但并不是一个“任意新模块注册后即可零改动插入”的通用 Plugin Kernel。

因此不把 Slot 写成已经存在的正式 Plugin API。

---

### Design Move 03 — From Partial Change to Complete State

# 本次只改变一部分，但系统仍然知道完整状态

本次 Publish 可以只包含变化：

```text
Current Change
```

系统同时维护累计状态：

```text
Previous State
    +
Current Change
    ↓
Current Full State
```

因此：

> **“这次改了什么”与“现在完整是什么”被分成两个不同问题。**

明确删除同样作为状态变化记录，而不是把“本次没发布”解释成删除。

**Production Consequence**

> 局部 Publish 不会让下游失去完整 Shot Context。

**Deep Dive**

```text
Publish Delta
Materialized Shot State
Deleted tombstones
Multi-task Aggregation
```

---

### Design Move 04 — From Written Rules to Executable Workflow

# 规则进入工具，而不是只留在 Pipeline 文档里

PPL 在两个主要位置执行 Production Rules：

```text
Builder
→ 尽量让工作从正确状态开始

Publish / QC
→ 检查正式交付是否满足规则
```

系统不会试图替 Artist 自动决定所有事情。

它负责提供：

```text
Context
Candidates
State
Validation
```

Artist 保留明确的 Version / Resource selection。

**Production Consequence**

> 自动化不是把问题藏起来，而是让用户更容易从正确状态开始，并在交付边界看见真正的问题。

**Deep Dive**

```text
Context-driven Builder
Configurable Publish
Production QC
Locate / Repair / Rerun
```

---

## 04 — Two Production Stories

03 是设计。

04 只负责证明这些设计在真实 Production 中怎么表现。

### Case 1 — Update One Module Without Rebuilding Everything

# 今天只修改 Character A

昨天 Shot 中：

```text
Character A Module    v2
Character B Module    v1
Camera Module         v3
Set Module            v2
```

今天只修改 Character A。

PPL 只需要发布：

```text
Character A Module    v3
```

累计 Production State 变成：

```text
Character A Module    v3
Character B Module    v1
Camera Module         v3
Set Module            v2
```

其他模块继续保留。

下游 Builder 根据当前记录发现 Modules，再分别扫描 / 选择可用版本，并比较 DCC Scene 中 PPL 已管理的资源：

```text
NEW
UPDATE
LOADED
```

最后由 Artist 决定需要创建或更新哪些模块。

### Case 1 的完整系统链

```text
Composable Module
        ↓
Partial Publish
        ↓
Maintained Full State
        ↓
Independent Version Discovery
        ↓
Managed Workspace Update
```

### 这个 Case 不声称

- 自动理解任意 Artist 手工修改；
- 自动持续收敛整个 Houdini Graph；
- 所有 Module 都已经统一 Plugin 化；
- Hair 已完整 Assembly。

---

### Case 2 — Latest Does Not Mean Compatible

# 最新版本，不一定是正确版本

假设：

```text
Model Generation 2
├── Animation
└── Surface v5

Model Generation 3
└── Surface v7    ← latest
```

Animation 仍然基于 Generation 2。

如果 Surface 简单选择全局 Latest：

```text
Surface v7
```

就可能产生不兼容组合。

PPL 的逻辑：

```text
Animation dependency
        ↓
Compatibility Scope
        ↓
Surface candidates
        ↓
Select Version
```

因此系统优先找：

```text
Generation 2 / Surface
```

而不是：

```text
global latest Surface
```

### 核心文案

> **The problem was not finding the latest file. It was finding the latest compatible file.**

工作阶段可以使用便于跟随变化的引用；正式 Publish 时，再固定当时实际使用的直接依赖版本，保留交付依据。

---

## 05 — What Changed in Production

### 标题

# 这些设计最终改变了什么

这里不再罗列 Feature。

使用：

> **Design Change → Production Consequence**

| Design Change | Production Consequence |
| --- | --- |
| **Global Latest → Compatibility-first** | 独立演进的 Production Branch 仍能按依赖关系正确组合 |
| **Monolithic Package → Composable Production Modules** | Character、Camera、Set、CFX 等 Module 可以分别演进、选版和更新 |
| **Partial Change → Maintained Full State** | 本次只改一个 Module，其他受管理 Production State 仍然连续 |
| **Mutable Working Reference → Pinned Published Dependency** | 工作阶段保持灵活；正式发布保留具体使用版本 |
| **Written Convention → Builder + QC** | Production Rules 在制作起点和正式交付边界实际执行 |
| **DCC-specific Tools → Shared Production Model** | Maya / Houdini 操作不同，但遵循相同 Context、Product、Version、Dependency、State 语义 |

### Production Proof

这一段配真实软件证据：

```text
Maya WorkManager
Maya Builder
Maya Publish / QC
Houdini Shot Builder
Houdini Asset / Solaris
Dailies
```

截图只证明：

> 抽象系统最终确实落到了 Production Tools。

不要让截图承担解释所有 Pipeline 功能的任务。

### Production Status

> Core workflows are already running in active production across Asset, Set, Seq and Shot work. Selected CFX paths continue to evolve.

目前不使用未经验证的：

- Artist 数量
- Publish 数量
- 节省小时数
- 稳定性 %
- ROI

---

# BLOCK 3 — WHAT COMES NEXT

## 06 — Limits & Engineering Direction

### 标题

# 下一步不是连接更多工具，而是让已有系统更容易观察、恢复和演进

V1 已经建立：

```text
Production Model
+
Executable Rules
+
Cross-DCC Execution
```

下一阶段不再以“增加更多 DCC 功能”为核心，而是增强现有系统的工程基础。

| Current V1 | Next Direction |
| --- | --- |
| Context / Contract 已存在，但定义分布在多个模块 | **Contract / Schema Governance** |
| Publish 涉及多个 Side Effects | **Journal / Retry / Resume** |
| Production QC 已大量执行规则 | **Contract / Integration Regression Tests** |
| Logs / Dependency State / Execution History 分散 | **Unified Observability / Event History** |
| Version / Shared State 按当前 Production Scale 工作 | **Scale-aware Shared-state Coordination** |

### 关于并发

当前组织模型：

> 一个 Task 通常由一位 Artist 负责。

因此：

> “同一 Task 多人同时抢版本”不是当前主要 Production Problem。

但不同 Task 可能同时更新 Ani Master State。

这属于：

> **未来规模变化后值得增强的 Shared-state Coordination 问题。**

不把理论并发问题包装成已发生 Production Incident。

### 关于规范

V1 并不是“只有约定，没有规范执行”。

已经存在：

```text
Builder constraints
Publish QC
Context
Config
record / metadata
```

下一阶段的问题不是第一次增加规则，而是：

> **把已经存在的 Production Rules 更统一地定义、观察、测试和演进。**

### 最终收束

> **PPL was built for animation production, but many of its hardest problems were broader system problems: identity, dependency, compatibility, state, execution and human control.**

这句话用于给跨领域读者一个坐标。

不继续写：

- Agent Runtime
- Autonomous Orchestration
- K8s for Film
- Package Manager for USD
- AI-native Pipeline

让读者自己完成能力迁移判断。

---

# 7. Homepage 与 Deep Dive 的边界

首页只讲：

```text
Why the system exists
How the problem was modeled
What assumptions changed
How the design behaves
What changed in production
What comes next
```

以下信息全部下沉。

## 7A — Compatibility & Resolution

首页：

> Latest ≠ Compatible.

Deep Dive：

```text
Compatibility Generation
AssetVersion / PublishVersion
Mod / Srf / Grm
Rig dependency provenance
Logical URI
Version Scope
Production Scope
USD Asset Resolver
Missing candidate behavior
main → pinned v####
```

## 7B — Incremental Shot State

首页：

> Local Change → Complete State.

Deep Dive：

```text
Resource-level Product Identity
family + instance name
description delta
record
deleted tombstone
Task Record
Ani Master Record
source_task
Multi-task Aggregation
```

## 7C — Modular Workspace Composition

首页：

> Monolithic Package → Composable Production Modules.

Deep Dive：

```text
Resource Tree
Independent Version Discovery
Dependency-aware Module
CFX → Mod domain
Hair → Grm domain
PPL-managed metadata
NEW / UPDATE / LOADED / LOST
Houdini Workspace Assembly
```

## 7D — Publish & Validation

首页：

> Written Rules → Executable Workflow.

Deep Dive：

```text
Context
Profile
Ordered Plugins
Collect
QC
Publish / Extract
Integrate
blocking / warning
locate / repair / rerun
```

## 7E — Runtime & Infrastructure

首页只出现：

```text
Maya / Houdini
↓
Shared Production Model
↓
Rez / USD / Resolver / Config
↓
Storage / Ftrack / Dailies
```

Deep Dive 再解释：

```text
Rez packages
Python versions
Arnold
OCIO
Resolver registration
Dailies Review
Ftrack integration
```

---

# 8. 首页内部能力映射

**不进入网页正文。**

用于检查 PPL 是否自然体现作者能力。

| 希望读者形成的判断 | PPL 中的证据 |
| --- | --- |
| **System Building** | 从 Task / Context 到 Publish / Resolve / Workspace / Review 的完整范围 |
| **Complex Problem Decomposition** | Context / Product / Version / Dependency / State / Validation / Resolution / Composition |
| **Architectural Reframing / Innovation** | Latest → Compatible；Package → Module；Partial Change → Full State |
| **Technical Product Thinking** | Builder constraints、Artist selection、QC locate / repair / rerun |
| **Engineering Judgment** | 清晰的 Current Boundary 与 V2 Direction，不夸大未完成能力 |

验收标准：

> **删除所有“我很擅长……”的句子后，读者仍然应该能从系统本身得到这些判断。**

---

# 9. 首页信息架构总览

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BLOCK 0 — HERO

00  WHAT I BUILT

    Cross-DCC Production System
    Production Proof
    Role

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BLOCK 1 — SYSTEMATIC THINKING

01  THE PROBLEM

    Latest ≠ Correct
    Local Change ≠ Global Republish
    Rules ≠ Documentation


02  THE SYSTEM MODEL

    Context
    Product
    Version
    Dependency
    State
    Validation
    Resolution
    Composition

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BLOCK 2 — DESIGN & INNOVATION

03  KEY DESIGN MOVES

    Latest
      → Compatible

    Monolithic Package
      → Composable Production Modules

    Partial Change
      → Complete State

    Written Rules
      → Executable Workflow


04  PRODUCTION STORIES

    Update One Module
    Latest ≠ Compatible


05  WHAT CHANGED

    Design Change
      → Production Consequence

    + Real Production Evidence

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BLOCK 3 — WHAT COMES NEXT

06  ENGINEERING DIRECTION

    Governance
    Recovery
    Observability
    Regression
    Scale-aware Coordination

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

# 10. Wireframe 页面权重

建议纵向信息权重：

```text
00 Hero                           15%

01–02 Systematic Thinking         25%

03–05 Design & Innovation         52%

06 Future / Limits                 8%
```

即：

> **03–05 是整个网站主体。**

因为这一部分最能同时解释 PPL 的技术价值和作者的设计判断。

---

# 11. Reader Test

Wireframe 完成后停止继续在 Markdown 中循环优化。

测试三类读者：

```text
A. 不懂影视 Pipeline 的 Software Engineer / Technical Recruiter
B. Pipeline / DCC / USD 从业者
C. AI / Agent / Tooling 背景工程师
```

给 A / C 类读者 90 秒看 Homepage。

问：

1. **这个系统解决什么问题？**
2. **你记住了哪两个设计变化？**
3. **你觉得做这个系统的人最擅长什么？**
4. **哪里开始需要行业背景才能理解？**

理想回答接近：

> 这是一个让动画生产中不同人、不同软件和不同版本保持一致的系统。

> 他把整包版本拆成模块，还把“找最新版”改成“找兼容版本”。

> 他应该比较擅长系统建模和复杂问题拆解，也考虑实际用户怎么操作。

如果回答只有：

> “他做了一套很专业的影视 Pipeline。”

说明系统能力和设计判断的第二层信息仍然不够明显。

如果读者被：

```text
av
RigCache
Srf
Grm
record
Resolver syntax
```

卡住，则说明技术细节泄漏到了首页。

---

# 12. 当前 Evidence 未决项

这些问题不阻碍 Homepage Freeze，但进入 Evidence 前继续核验：

1. Hair discovery 当前实际如何取得 Grm `av`；
2. Houdini Shot Builder 实际读取的 Ani Record 是否明确为 Master Record；
3. Resolver cache / refresh 的实际行为；
4. 显式 Compatibility Scope 缺失时 Warning / white model 的具体责任层；
5. 不同 Task 同时更新 Ani Master Record 的实际协调机制；
6. Publish 多 Side Effects 的失败恢复范围；
7. CFX source priority 与 UI dropdown 的当前接线状态；
8. Ftrack frame range async callback 的当前刷新边界。

这些都是：

> **Evidence / implementation boundary**

而不是首页“系统缺点列表”。

---

# 13. Freeze

这一版冻结：

```text
4 Major Blocks
+
7 Content Sections
```

认知顺序：

```text
PPL 是什么
    ↓
为什么这是系统问题
    ↓
PPL 如何建模这个问题
    ↓
哪些默认假设被重新设计
    ↓
这些设计在真实 Production 中如何运行
    ↓
它们最终改变了什么
    ↓
下一类工程问题是什么
```

最终定位：

> **PPL 是网站主角。**

读者第一层理解：

> 这是一套真实运行的 Cross-DCC Production System。

读者第二层自然判断：

> 这个系统背后有较强的系统建模、复杂问题拆解、模块化设计、Technical Product Thinking 和工程边界判断。

下一步：

```text
V0.3.4 content freeze
→ static wireframe
→ 4-block visual hierarchy
→ real production screenshots
→ homepage prototype
→ 90-second reader test
→ revise on the real page
```
