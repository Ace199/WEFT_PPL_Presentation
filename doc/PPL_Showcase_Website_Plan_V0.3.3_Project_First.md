# PPL 展示网站内容规划 V0.3.3 — Project-first / Capability-revealing

> **Designing a Cross-DCC Production System**  
> *A production system for coordinating people, software, versions and dependencies across Maya and Houdini.*

---

## 0. 本版目标

这一版不把 PPL 网站改成个人主页。

**PPL 仍然是网站主角。**

网站首先回答：

> PPL 是什么？  
> 为什么需要它？  
> 它改变了哪些生产模型？  
> 它如何在真实制作中运行？

但内容组织需要让非影视读者在理解项目的同时，自然读出作者具备的几类能力：

- 能从零搭建跨工具、跨角色、跨数据状态的复杂系统；
- 不只考虑技术实现，也考虑 Artist 如何理解、选择、修复和交付；
- 会重新审视既有流程的默认假设，而不是只给旧流程补脚本；
- 能把模糊的生产问题拆成 Context、Product、Version、Dependency、State、Validation、Execution 等可处理结构。

**这些能力不作为首页自我评价出现。**

它们应该成为读者看完整个 PPL Case Study 后自然形成的结论。

因此本版的基本原则是：

```text
Project first
    ↓
Design decisions
    ↓
Production consequences
    ↓
Real evidence
    ↓
Capability becomes visible
```

而不是：

```text
I am good at X
    ↓
PPL proves X
```

---

## 1. 信息披露原则

### 1.1 三层内容

整个网站严格采用三层信息深度：

| 层级 | 目标 | 默认读者 | 内容 |
| --- | --- | --- | --- |
| **Homepage** | 2–3 分钟理解 PPL 的价值与关键设计判断 | 不熟悉影视 Pipeline 的工程 / 招聘 / 产品读者 | 问题、模型、设计变化、两个案例、真实 Production Proof |
| **Flow** | 跟随一个真实生产故事 | 想继续理解系统的人 | 输入 → 状态变化 → 输出 → 下游消费 |
| **Evidence** | 验证实现、范围与边界 | Pipeline / USD / DCC / Software Engineer | `av/v`、record、URI、Config、Plugin、节点 metadata、源码与运行证据 |

首页不承担“完整解释 PPL”的任务。

首页只需要让读者理解：

```text
What problem exists?
↓
How was it modeled?
↓
What did the system change?
↓
How does it behave in production?
```

### 1.2 首页主动隐藏的细节

以下内容默认**不直接出现在首页正文**：

- `av#### / v####`
- Mod / Srf / Grm / RigCache 等部门 / 产品缩写
- `SY_V1%`
- `record.json / description.json`
- URI selector 组合
- Ftrack Entity / Custom Attribute
- Pyblish Controller 具体阶段名
- Houdini 节点类型与参数
- `.shn`
- Asset Resolver 缓存策略
- exact source path / folder hierarchy
- source symbol / line number
- Hair 当前 Grm `av` 接线问题
- CFX RigCache source UI 的已知接线问题
- Ftrack frame range callback 边界

这些内容不删除，而进入 Flow / Evidence。

原则：

> **如果一个技术细节不能改变非影视读者对系统设计的理解，它就不应该占据首页认知预算。**

---

## 2. 首页需要让读者最终记住什么

读完首页，不要求读者记住 AssetVersion、Resolver 或 RigCache。

希望读者能复述：

1. **PPL 不是一组 Maya / Houdini 小工具，而是一套完整 Production System。**
2. **它把任务、制作成果、版本、依赖、状态和交付规则统一成一套生产模型。**
3. **它不简单追求“最新”，而是让独立变化的成果仍能正确组合。**
4. **它允许局部变化、局部发布和局部更新，同时保留完整生产状态。**
5. **规则不是写在文档里，而是通过 Builder、Publish、QC 等真实工具执行。**
6. **系统已经进入真实项目制作，而不是概念 Demo。**

如果读者进一步产生下面的判断，则说明内容达到了第二层目标：

> 这个系统的作者擅长做系统建模。  
> 他不是只会写工具，而是在设计人、数据、软件怎样一起工作。  
> 他会改变不合理的底层假设。  
> 他能把复杂问题拆成清晰、可执行的结构。

这些结论**不直接写在首页**。

---

## 3. 已确认的项目事实

| 维度 | 可公开事实 |
| --- | --- |
| 核心开发周期 | 2026.04–2026.08，约 5 个月 |
| 团队 | 2 人 |
| 项目规模 | 1 个真实 Production Project |
| 当前状态 | 已在实际制作中运行 |
| 覆盖实体 | ASSET、SET、SEQ、SHOT |
| Host | Maya 2022、Houdini 21 / 22 |
| Infrastructure | Rez、USD / Asset Resolver、Ftrack、Dailies |
| 核心应用模型 | WorkManager、Builder、Loader、Publish |
| 当前边界 | 部分 CFX / Hair 相关路径仍持续完善 |
| 可公开 KPI | 暂无可公开的 Artist 数量、发布量、节省时间或稳定性 KPI |

推荐 Production Proof：

```text
2026.04–08 core build · 2-person team · active production
Maya · Houdini · USD · Rez
ASSET · SET · SEQ · SHOT
```

不要写：

- “完全稳定上线”
- “所有流程全部完成”
- 未验证使用人数
- 未验证效率提升百分比
- “国内第一 / 中国最好”

---

## 4. 作者角色与贡献边界

### Role

> **Lead Pipeline TD / System Designer**  
> Led the system architecture and core implementation of a context-driven Cross-DCC production framework.

中文：

> **主导 PPL 的系统架构与核心实现。**

### Contribution

> Designed and implemented the shared production model, version and dependency model, logical asset resolution, and core Maya / Houdini workflow, publishing and runtime integration.

> Built with a two-person team. A teammate extended production modules within the shared framework and led the core ASB capability.

中文：

> 负责共享 Production Model、版本与依赖模型、逻辑资产解析，以及 Maya / Houdini 核心工作流、发布和运行时集成。项目由两人协作完成；另一位成员在共同框架上扩展 Production Modules，并主导 ASB 核心能力。

### 来源说明

必须继续保留：

- Asset Version 思想受 More 4.0 启发，并在当前项目中重新建模为 Compatibility Generation；
- Resolver 思路来自 More 4.0，并研究 VFX-UsdAssetResolver 后形成当前逻辑引用与规则；
- Publish 基于 Pyblish 核心进行 Context / Profile / Plugin 化改造；
- ASB 核心能力由团队另一成员主导；
- 部分 Rig / Alembic 生产经验来自既有行业实践。

网站表达重点不是“所有东西都是从零首创”，而是：

> **理解成熟 Production System 的经验，在当前约束下重新建模、组合并落地成一套真实运行的系统。**

---

# 5. Homepage — 最终七段结构

---

## 00 — What I Built

### 标题

# Designing a Cross-DCC Production System

### 主文案

一部动画并不是在一个软件里完成的。

模型、材质 / 外观、动画、相机、特效等制作成果，会由不同的人持续修改，也会在 Maya、Houdini 等不同软件之间交接。

**PPL 是一套让这些制作成果在不同软件、不同制作环节之间能够被正确版本化、检查、组合和更新的 Production System。**

它覆盖从 Task Context、Work、Build / Load，到 Publish、Cross-DCC Consume 和 Review 的主要生产链路。

### Production Proof

```text
5-month core build
2-person team
active production

Maya / Houdini
ASSET / SET / SEQ / SHOT
```

### Role

> Lead Pipeline TD / System Designer  
> 主导系统架构与核心实现。

### 首屏视觉

不要先放系统架构大图。

优先：

1. Maya WorkManager / Builder
2. Maya Publish / QC
3. Houdini Shot Builder

让读者先看到：

> 这不是一个概念设计，而是一套已经被人使用的软件系统。

---

## 01 — Why This System Was Needed

### 标题

# 制作成果可以独立变化，但交接时必须正确组合

### 正文

在动画制作中，不同部分不会同时更新。

一个角色的模型可能变了，材质还没更新；动画可能仍然基于上一版角色；一个镜头里可能只修改了其中一个角色，而其他角色、Camera 和 Set 都没有变化。

这会产生三个基本问题：

### 01. Latest 不一定等于正确

两个“最新版本”可能来自不同的生产状态，不能因为版本号最大就直接组合。

### 02. Local Change 不应该强迫 Global Republish

只修改一个资源，不应该要求所有其他资源一起重新发布。

### 03. Rules 不能只存在于文档

命名、结构、依赖和交付要求必须真正进入 Builder、Publish 和 QC，而不是依赖 Artist 记忆。

### 一句话

> **The problem was not moving more files. It was keeping independently evolving production products consistent across people, versions and DCC boundaries.**

---

## 02 — How I Modeled the Problem

### 标题

# 把复杂生产流程拆成几个稳定的问题

现实生产看起来是：

```text
很多人
× 很多软件
× 很多文件
× 很多版本
× 很多依赖
```

PPL 不从具体按钮和路径开始建模，而是先回答几个稳定问题：

| 问题 | 系统概念 |
| --- | --- |
| 现在在做什么？ | **Context** |
| 正在交接的成果是什么？ | **Product** |
| 这是哪一次发布？ | **Version** |
| 它依赖哪些输入？ | **Dependency** |
| 当前完整状态是什么？ | **State** |
| 是否符合进入下一环节的规则？ | **Validation** |
| 应该在哪里找到它？ | **Resolution** |
| 如何进入具体 DCC 工作场景？ | **Composition** |

### 核心图

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

### 文案

PPL 的核心不是把 Maya 和 Houdini 接在一起。

真正需要统一的是：

> **人、数据和软件对“当前在做什么、正在使用什么、什么可以组合、什么可以交付”的理解。**

---

## 03 — Key Design Moves

这一段不要展示五个专业 Architecture Cards。

首页只展示 **四个系统级设计变化**。

技术名进入 Details。

---

### 01 — From Latest to Compatible

# 不只是找最新版，而是找能一起工作的版本

不同生产分支可以独立迭代。

PPL 在选版本之前先保留并判断依赖来源，使后续环节能够先确定兼容范围，再选择具体发布。

**Production consequence**

> 各部门可以独立变化，而系统不需要通过“全部锁死”来保证一致性。

**Details**

Compatibility Generation / AssetVersion / Logical Resolution → Deep Dive

---

### 02 — From Whole Package to Independent Products

# 从整包发布，改成可独立演进、按需装配的资产模块

> **From Monolithic Packages to Independently Evolving Asset Modules**

传统镜头发布往往把多个资产绑定在同一个整体版本中。PPL 将角色、Camera、Set 以及后续 CFX / Hair 等生产单元拆成独立模块：它们可以拥有自己的版本、依赖和状态，并根据当前 Shot Context 按需进入工作场景。

```text
            Shot Workspace

        ┌─────────────────────┐
        │     Camera Slot     │ ← Camera Module
        ├─────────────────────┤
        │       Set Slot      │ ← Set Module
        ├─────────────────────┤
        │   Character A Slot  │
        │   ├─ RigCache       │
        │   ├─ CFX            │
        │   └─ Hair           │
        ├─────────────────────┤
        │   Character B Slot  │
        │   ├─ RigCache       │
        │   └─ CFX            │
        └─────────────────────┘
```

它们可以分别拥有自己的版本。

**Production consequence**

> 一个资源发生变化，不需要让无关资源为了版本一致而一起重新发布。

**Details**

Resource-level Versioning / Product Identity → Deep Dive

---

### 03 — From Partial Change to Complete State

# 本次只改一部分，但系统仍然知道完整状态

一次发布可以只包含本次变化。

PPL 同时维护累计生产状态：

```text
Previous State
    +
Current Change
    ↓
Current Full State
```

没有参与本次发布的资源继续保留；明确删除的资源以删除状态记录。

**Production consequence**

> “本次改了什么”和“现在完整是什么”成为两个不同的问题。

**Details**

Publish Delta / Materialized Shot State / Multi-task Aggregation → Deep Dive

---

### 04 — From Written Rules to Executable Workflow

# 规则进入工具，而不是留在说明文档里

PPL 在两个位置执行 Production Rules：

```text
Builder
→ 尽量让工作从正确状态开始

Publish / QC
→ 检查交付结果是否满足规则
```

系统不会尝试替 Artist 做所有决定。

它负责准备 Context、候选和状态，让 Artist 对版本和资源更新保持明确选择。

**Production consequence**

> 自动化不是替用户隐藏问题，而是帮助用户更容易做出正确选择。

**Details**

Context-driven Builder / Configurable Publish / QC → Deep Dive

---

## 04 — Two Production Stories

首页只保留两个所有工程背景读者都能理解的故事。

---

### Case 1 — Update One Part Without Rebuilding Everything

# 今天只改 Character A

昨天：

```text
Character A    v2
Character B    v1
Camera         v3
Set            v2
```

今天 Artist 只修改 Character A。

PPL 可以只发布：

```text
Character A    v3
```

同时维护当前完整生产状态：

```text
Character A    v3
Character B    v1
Camera         v3
Set            v2
```

下游 Builder 再根据当前记录发现资源、选择各自版本，并比较当前 DCC Scene 中已经存在的受管理资源：

```text
NEW
UPDATE
LOADED
```

然后由使用者决定需要创建或更新什么。

### 这个 Case 要证明什么

不是：

> “我做了一个方便的 Houdini Tool。”

而是：

```text
Granular Product
→ Partial Change
→ Complete State
→ Independent Version Choice
→ Managed Workspace Update
```

---

### Case 2 — Latest Does Not Mean Compatible

# 最新版本，不一定是正确版本

假设：

```text
Model Generation 2
├── Animation
└── Surface v5

Model Generation 3
└── Surface v7   ← latest
```

Animation 仍然基于 Generation 2。

如果只采用 Surface 的全局最新版，就会选择 Generation 3 的 v7。

PPL 的规则是：

```text
先确定 Animation 的依赖范围
        ↓
再在同一兼容范围内选择 Surface Version
```

所以系统会寻找 Generation 2 对应的 Surface，而不是简单追求版本号最大。

> **The problem was not finding the latest file. It was finding the latest compatible file.**

工作阶段可以使用便于跟随更新的引用；正式 Publish 时再记录 / 固定当时实际采用的具体依赖版本。

### 这个 Case 要证明什么

系统处理的是：

```text
Identity
Dependency
Compatibility
Resolution
```

而不是单纯的文件路径管理。

---

## 05 — What Changed in Production

这一节不要再写“系统有这些 Feature”。

用：

> **Design Change → Production Consequence**

| Design Change | Production Consequence |
| --- | --- |
| Global latest → Compatibility-first | 独立迭代的部门仍能按依赖关系正确组合 |
| Whole-package version → Resource-level products | 角色、Camera、Set 等资源可以分别发布和选版 |
| Partial publish → Maintained full state | 本次只改一部分，完整镜头状态仍然连续 |
| Mutable working reference → Pinned published dependency | 工作阶段保持灵活；正式发布保留具体依赖依据 |
| Written convention → Builder + QC | Production Rules 在真实工作入口和交付边界执行 |
| One-off DCC scripts → Shared Production Model | Maya / Houdini 的具体操作不同，但遵循相同 Context、Product、Version、Dependency、State 语义 |

### Production Status

> Core workflows are already running in active production across Asset, Set, Seq and Shot work. Selected CFX paths continue to evolve.

不使用未经测量的效率 KPI。

---

## 06 — Limits & What Comes Next

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

下一步重点：

| V1 当前状态 | 下一步 |
| --- | --- |
| Context 和 Contract 已存在，但分布在多个模块 | 更统一的 Contract / Schema Governance |
| Publish 已执行多步副作用 | Journal / Retry / Resume |
| QC 已大量执行 Production Rules | 增强 Contract / Integration Regression Tests |
| 日志和状态分散在多个工具 | Unified Observability / Event History |
| 版本和共享状态基于当前制作规模工作 | 按真实规模增强 Shared-state Coordination |

### 收束

> **PPL was built for animation production, but many of its hardest problems were broader system problems: identity, dependency, compatibility, state, execution and human control.**

这句话用于帮助跨领域读者建立坐标。

不要继续写：

- Agent Runtime
- Autonomous Orchestration
- AI-native Pipeline
- K8s for Film
- Package Manager for USD

让读者自己完成领域迁移判断。

---

# 6. 首页内部能力映射（不上网页）

这一节只用于检查内容是否真正体现作者能力。

| 希望读者形成的判断 | 首页证据 | 不应该怎么写 |
| --- | --- | --- |
| **System Building** | PPL 覆盖 Task → Work → Build / Load → Publish → Resolve → Consume → Review | “我系统能力非常强” |
| **Complex Problem Decomposition** | Context / Product / Version / Dependency / State / Validation / Resolution / Composition | “我擅长复杂问题拆解” |
| **Architectural Reframing** | Latest → Compatible；Whole Package → Resource Product；Partial Change → Full State | “我有创新能力” |
| **Technical Product Thinking** | Builder 准备正确 Context / 状态；Artist 保留选择；QC 提供定位 / 修复 / 重跑 | “TD 就是产品经理” |
| **Engineering Judgment** | 明确 Hair / CFX / Builder / Recovery 当前边界；不包装未完成能力 | “系统设计非常成熟” |

验收标准：

> 如果删除所有关于“我”的形容词后，读者仍然能从 PPL 本身得出这些判断，说明表达成功。

---

# 7. Deep Dive 结构

首页隐藏掉的影视 / Pipeline 细节进入以下页面。

---

## 7A — Compatibility & Asset Resolution

### 首页只讲

> Latest ≠ Compatible.

### Deep Dive 再展开

```text
Authoritative Product
→ Compatibility Generation
→ Dependent Branch
→ Resolution Constraint
→ Physical Product
```

#### Geometry Domain

```text
Mod av
├─ Srf
├─ individual Mod dependencies inside Rig
├─ corresponding Ani / RigCache constraints
└─ CFX
```

Rig 没有一个覆盖所有输入的全局 `av`。

一个 Rig 可以引用多个不同 Mod generations：

```text
Mod A av0019 ─┐
Mod B av0017 ─┼→ Rig
Mod C av0021 ─┘
```

Rig `.ma` 中的 ABC Reference 来源路径保留每项 Mod dependency provenance。

#### Groom Domain

```text
Grm av
└─ Hair
   └─ v####
```

生产模型已确认 Hair 依赖 Grm generation；当前 Shot Builder 中 Hair discovery 如何取得 Grm `av` 仍需最终 Evidence。

### `av / v`

- `av` = Compatibility Generation
- `v` = Publish Iteration

Version Scope：

```text
none
av
av + v
```

`v only` 不合法。

Production Scope：

```text
none
step
step + task
```

`task only` 不合法。

两组约束可以独立或组合。

### Logical Asset Identity

概念：

```text
Asset Identity
+
Version Scope
+
Production Scope
        ↓
Logical URI
        ↓
USD Asset Resolver
        ↓
Physical Publish
```

真实实现示例：

```text
SY_V1%USD/ASSET/...&av=av####&step=Srf
```

### Architecture Invariant

> When an AssetVersion is explicitly constrained, missing compatible data must not be silently replaced by another generation.

若同代 Srf 缺失，不自动跨 `av` fallback。

消费端可能表现为白模 / Warning / unresolved state；具体错误呈现归属以 Evidence 为准。

### Working Alias → Pinned Published Dependency

Animation 工作阶段：

```text
Rig/main.ma
```

Publish Ani Source 时：

```text
main
→ resolve current concrete Rig version
→ published source points to v####
```

作用：

```text
Working convenience
≠
Published dependency traceability
```

---

## 7B — Incremental Shot State

### 首页只讲

> Update one part, preserve the full state.

### Product Identity

同一个 Source Asset 在 Shot 中的不同 namespace instance：

```text
BaiMa_01
BaiMa_02
```

是两个独立 RigCache Products。

当前 record merge 的核心 identity：

```text
family + instance name
```

### Partial Publish

传统：

```text
Ani/v0001/
└─ all rigcache products
```

PPL：

```text
Ani/Task/rigcache/
├─ Character_A/v####
├─ Character_B/v####
└─ ...
```

版本归属于独立 Production Product。

### Delta 与 Full State

```text
*_description.json
= this publish delta

*_record.json
= materialized cumulative shot state
```

Merge：

```text
Previous Record
+
Current Delta
↓
Current Record
```

未参与本次 Publish 的产品继续保留。

### Explicit Delete

删除不是“本次没发布”。

删除通过 tombstone 明确表达：

```text
deleted:
    rigcache:
        Product_X
```

重新发布同名 Product 时，恢复 active state 并清除 deletion marker。

### Multi-task State Aggregation

每个 Task Publish 同时维护：

```text
Task Delta
├─→ Task Record
└─→ Ani Master Record
```

Master Record 保留：

- `source_task`
- task-prefixed identity
- active products
- deleted state

它不是每次 Builder 启动时扫描所有 Task Record 再临时拼出来。

边界：

- Publish Side 已实现 multi-task aggregation；
- Maya Ani Builder 当前不依赖 Master Record 重建镜头；
- Houdini Shot Builder 实际消费的 record path 继续以最终 Evidence 为准。

---

## 7C — Modular Shot Workspace

### 首页只讲

> A complete production state becomes independently selectable resources in Houdini.

### Builder 主线

```text
Current Shot Context
↓
read valid Ani / Blk / Layout record
↓
build resource topology
↓
scan independent product versions
↓
match dependencies
↓
compare PPL-managed scene state
↓
create / update / skip selected resources
```

### Resource Tree

```text
CAM
SET
OTHER
RigCache
└─ parent asset instance
   └─ asset type
      └─ child asset
         ├─ RigCache
         ├─ Hair
         └─ Cfx
```

### Dependency-aware Modules

- CFX → Mod generation
- Hair → Grm generation

Current Evidence Boundary：

- CFX dependency path 已有较明确静态依据；
- Hair 有 discovery / version display；
- Hair assembly 尚未实现；
- Hair 的 Grm `av` source 仍需复核。

### Managed Resource State

PPL 写入部分 DCC metadata：

- managed marker
- resource name / identity
- source step
- version
- asset type
- project

Builder 计算：

```text
LOST
READY / NEW
READY / UPDATE
LOADED
```

这里不是完整 Graph Diff。

系统：

> 比较 selected production state 与 PPL-managed node metadata。

系统**不识别任意 Artist 手工修改**。

### Workspace Output

概念：

```text
/obj/<shot>__PLE
    resources
        ↓
      Merge
        ↓
       OUT
```

CAM / SET / OTHER / RigCache / CFX 有不同 host-specific assembly。

首页不展示节点级细节。

---

## 7D — Publish & Executable Validation

### 首页只讲

> Prevent invalid starting states; validate delivery boundaries.

### Framework

```text
Context
↓
Profile
↓
Ordered Plugins
↓
Collect
↓
QC / Validate
↓
Publish / Extract
↓
Integrate
```

不同 DCC / Step 不要求完全相同，但共享执行框架。

### Builder Enforcement

Builder 负责：

- 设置正确 Task Context；
- 提供预期上游；
- 创建规范工作结构；
- 减少 Artist 从错误状态开始。

### Publish QC

Publish QC 检查：

- naming
- hierarchy / structure
- dependency
- product rules
- scene-specific requirements

需要继续展示：

```text
detect
→ explain
→ locate / select
→ repair
→ rerun
```

QC 有 blocking error 和 warning。

不要写：

> 所有 QC 提示都会阻止 Publish。

也不要写：

> QC 通过意味着所有文件 / Ftrack side effects 一定完成。

---

## 7E — Runtime / Infrastructure

首页只需一张简化架构：

```text
Shared Production Model
        ↓
Maya / Houdini
        ↓
Rez Runtime
        ↓
USD / Resolver / Config
        ↓
Ftrack / Storage / Dailies
```

Deep Dive 再展开：

### Rez

- DCC / Python / Arnold / USD / OCIO / PPL environment composition；
- Maya / Houdini production runtime；
- Resolver registration；
- Houdini 21 / 22 当前可用。

### Dailies

Dailies 是：

> independent Review submission workflow

不是 Asset Publish 必经阶段。

Publish 与 Dailies 通过：

- Task Context
- Media
- Version
- Production State

产生关联。

---

# 8. 面向非影视 / Software / AI 读者的解释边界

不单独在首页写：

> “这些设计和 Agent Harness 很像。”

也不把 PPL 翻译成 AI 系统术语。

如果需要额外页面，可以只提供“Conceptual Parallels”：

| PPL | 通用软件系统中的近似问题 | 不等价说明 |
| --- | --- | --- |
| Working `main` → Published `v####` | mutable alias → pinned dependency | 不是完整递归 lockfile |
| Logical Identity + Resolver | late binding / dependency resolution | 解析的是生产文件产品 |
| Partial Delta + Full Record | incremental update + materialized state | 不是 Event Sourcing |
| Managed node state comparison | one-shot reconciliation | 不是持续 controller |
| Builder + Publish QC | prevention + policy / guardrail | QC ≠ integration tests |
| Explicit compatibility scope | fail-visible compatibility policy | 不是 model / tool fallback |

标题必须写：

> **Conceptual parallels, not architectural equivalence.**

---

# 9. 首页 Wireframe 的信息优先级

推荐页面纵向权重：

```text
01 Hero / Production Proof                   15%

02 Production Problem                       12%

03 How I Modeled the Problem                15%

04 Four Key Design Moves                    20%

05 Two Production Stories                   23%

06 What Changed                             10%

07 Limits / Next                             5%
```

真正的技术实现细节不靠滚动长度证明深度。

通过：

```text
Learn more
View flow
See evidence
```

进入下一层。

---

# 10. 首页截图选择

### Hero

优先真实 Production UI：

1. Maya WorkManager / Builder
2. Maya Publish / QC
3. Houdini Shot Builder

### Design Moves

不用放代码。

使用极简 Diagram：

```text
Latest → Compatible
Package → Product
Delta → Full State
Rules → Executable Workflow
```

### Case 1

最适合做轻动画：

```text
Yesterday

A v2
B v1
Cam v3

        ↓ Publish only A

Today

A v3
B v1
Cam v3
```

### Case 2

最适合做 dependency visual：

```text
Generation 2
Animation ───── Surface v5

Generation 3
                Surface v7 ← latest
```

高亮：

```text
Latest ≠ Compatible
```

### Evidence

真实 Screenshot 只需要证明：

> 这个抽象模型最后确实落到了可以操作的软件里。

不要让截图承担解释所有功能的任务。

---

# 11. Reader Test

Wireframe 完成后停止 Markdown 内部循环。

测试至少三类读者：

```text
A. 不懂影视 Pipeline 的软件工程师 / 技术招聘
B. Pipeline / DCC / USD 从业者
C. AI / Agent / Tooling 背景工程师
```

给 A / C 类 90 秒，只看 Homepage。

问：

1. **你觉得 PPL 解决的核心问题是什么？**
2. **你觉得这个系统最重要的两个设计变化是什么？**
3. **你觉得做这个系统的人擅长什么？**
4. **哪里开始看不懂？**

理想回答应该接近：

> 他做的不是几个 Maya/Houdini 工具，而是一套管理版本、依赖、状态和生产规则的系统。

> 他把“全局最新版 / 整包版本”这种传统模型改成了兼容关系和独立产品。

> 他看起来比较擅长系统建模，也考虑使用者怎样实际操作这套系统。

如果读者只能回答：

> “他做了一个很专业的影视 Pipeline。”

说明“能力的第二层信息”仍然不够明显。

如果读者被 `av / v / record / RigCache / Srf` 卡住，则说明技术细节泄漏到了错误层级。

---

# 12. 当前未决项与 Evidence 边界

以下事实不影响 Homepage Freeze，但进入 Evidence 前需要继续核验：

1. Hair discovery 当前实际从哪里取得 Grm `av`；
2. Houdini Shot Builder 最终使用的 Ani record 是否明确指向 Master Record；
3. Resolver 缓存 / refresh 的实际可见时机；
4. 显式 `av` 缺失时 Warning / 白模分别由哪层产生；
5. 多 Task 同时更新 Ani Master Record 的实际保护情况；
6. Publish 多 side effects 的失败恢复范围；
7. CFX source priority 已存在但 UI 选项重建尚未完整接线；
8. Ftrack frame range 异步返回目前未刷新当前窗口。

这些内容属于：

> **Evidence of implementation boundaries**

不应该变成首页“系统缺点清单”。

---

# 13. 最终冻结结论

这一版的定位：

> **PPL 是主角。作者能力是系统本身透露出的第二层信息。**

Homepage 不主动宣称：

- 我是优秀 System Builder；
- 我有创新能力；
- 我有 Product Thinking；
- 我擅长复杂问题拆解。

Homepage 通过四类内容让读者自己得出这些判断：

```text
System breadth
→ System Building

Production Model
→ Problem Decomposition

Changed assumptions
→ Architectural Reframing / Innovation

Builder + QC + Human choice
→ Technical Product Thinking
```

同时进一步隐藏 Film / DCC implementation details：

```text
Homepage
→ understand the system

Flow
→ understand the production story

Evidence
→ verify the exact implementation
```

下一步：

```text
V0.3.3 freeze
→ static wireframe
→ implement scan path
→ insert redacted real screenshots
→ homepage prototype
→ 90-second reader test
→ revise on the real page
```
