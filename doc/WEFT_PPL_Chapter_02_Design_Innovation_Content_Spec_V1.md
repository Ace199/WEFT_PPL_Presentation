# WEFT / PPL — Chapter 02: Design & Innovation

> **Document Type:** Chapter Content & Experience Specification  
> **Chapter:** 02 / DESIGN & INNOVATION  
> **Core Verb:** TRANSFORM  
> **Primary Question:** What production assumptions did WEFT / PPL change, and why?  
> **Status:** Content Design V1  
> **Relationship to Master Spec:** This document expands Chapter 02 content and experience only. Architecture and implementation decisions remain governed by `WEFT_PPL_Website_Technical_Implementation_Spec_V2.1.md`.

---

# 0. Chapter 定位

Chapter 02 不负责罗列功能，也不按 Loader / Builder / Publisher / Resolver 等工具逐项介绍。

它负责回答一个更重要的问题：

> **WEFT / PPL 在真实 Production 中，重新定义了哪些默认假设？**

这一章的核心不是“我做了什么功能”，而是：

```text
OLD ASSUMPTION
↓
PRODUCTION FAILURE
↓
NEW MODEL
↓
SYSTEM TRANSFORMATION
↓
PRODUCTION CONSEQUENCE
↓
EVIDENCE
```

因此 Chapter 02 的叙事关键词固定为：

> **TRANSFORM**

它承接首页 Master Canvas 的 `02 TRANSFORM`，但首页只展示 Transformation Preview；本章负责解释 Transformation 背后的设计判断、系统模型和 Production Evidence。

---

# 1. Chapter 核心主张

WEFT / PPL 的“创新”不是表面 UI，也不是为了做一套新的 Pipeline 工具集合。

真正发生变化的是系统对以下概念的建模方式：

```text
Version
Module
State
Rule
```

Chapter 02 通过四个 Transformation 展示这些变化：

```text
01  LATEST              → COMPATIBLE
02  MONOLITHIC PACKAGE  → COMPOSABLE MODULES
03  PARTIAL CHANGE      → FULL STATE
04  WRITTEN RULES       → EXECUTABLE WORKFLOW
```

四个案例共同表达：

> **Production 不应该只记录结果，而应该显式表达关系、约束、状态与执行逻辑。**

---

# 2. 页面整体叙事

页面建议采用以下结构：

```text
CHAPTER INTRO
↓
WHY TRANSFORMATION MATTERS
↓
01 LATEST → COMPATIBLE
↓
02 MONOLITHIC PACKAGE → COMPOSABLE MODULES
↓
03 PARTIAL CHANGE → FULL STATE
↓
04 WRITTEN RULES → EXECUTABLE WORKFLOW
↓
CROSS-CASE SYNTHESIS
↓
PRODUCTION EVIDENCE
↓
CHAPTER CONCLUSION
↓
NEXT CHAPTER
```

不是四个互不相关的案例，而是从“局部选择”逐渐走向“完整系统执行”的递进关系：

```text
Version Selection
↓
Package Composition
↓
State Integrity
↓
Workflow Execution
```

也可以理解成：

```text
选什么
↓
怎么组合
↓
怎么确认完整
↓
怎么执行规则
```

---

# 3. Chapter Hero

## 3.1 Eyebrow

```text
02 / DESIGN & INNOVATION
```

## 3.2 Primary Heading

推荐：

> **Transforming Production Assumptions**

备选：

> **Rethinking the Defaults of Production Systems**

不建议使用：

```text
Innovation
Our Features
Better Pipeline
Next-generation Workflow
```

原因：太泛，不能说明这一章真正的内容。

## 3.3 Intro Copy

建议正文：

> Production systems often inherit assumptions that feel reasonable until scale, dependency, and change expose their limits. WEFT / PPL treats those assumptions as design problems: version selection becomes compatibility resolution, packages become composable modules, partial updates become validated state, and written rules become executable workflows.

中文内部理解：

> 很多 Production 规则在小规模时没有问题，但当资产、版本、依赖、任务和 DCC 数量不断增加后，原本“默认正确”的假设会开始失效。WEFT / PPL 不把这些问题视为单独 bug，而是重新定义系统模型。

## 3.4 Hero Visual

Hero 不需要复杂大动画。

建议使用四组极简 transformation glyph：

```text
LATEST        → COMPATIBLE
PACKAGE       → MODULES
CHANGE        → STATE
RULE          → WORKFLOW
```

初始全部为 Charcoal / Grey。

进入页面时：

```text
left term
↓
rule line grows
↓
right term resolves
↓
small Mint marker
```

Mint 只落在右侧“新的系统模型”，表示 resolved / valid。

---

# 4. Why Transformation Matters

这一段负责解释：为什么这不是“功能优化”，而是设计层面的 Transformation。

## 4.1 Section Heading

> **The Problem Is Often the Model**

## 4.2 Content

建议用一个两栏结构：

### LEFT — Surface Symptoms

```text
Wrong version loaded
Broken downstream dependency
Large packages rebuilt unnecessarily
Partial publish leaves ambiguous state
Rules live in documentation but not execution
Different DCCs interpret the same task differently
```

### RIGHT — System Cause

```text
Version treated as ordering
Package treated as atomic
Change treated as state
Documentation treated as enforcement
Context treated as implicit
```

核心句：

> **Many pipeline failures are not isolated implementation errors. They are symptoms of an incomplete system model.**

这一段结束后进入四个 Transformation。

---

# 5. Transformation 01 — Latest → Compatible

## 5.1 Section Identity

```text
01
VERSION RESOLUTION
LATEST
→
COMPATIBLE
```

## 5.2 核心问题

传统 Pipeline 很容易写出：

```text
latest = max(version)
```

但 Production 中：

> **Latest does not necessarily mean valid for the current context.**

“最新”描述的是排序；“兼容”描述的是关系。

这是两个不同的问题。

## 5.3 页面叙事

### A. Default Assumption

> The newest available version is the version that should be loaded.

视觉：

```text
v01  v02  v03  v04
                 ↑
               LATEST
```

### B. Production Failure

引入当前 Context / Dependency：

```text
CURRENT CONTEXT
Rig v07
Groom v12
Shot / Task State
```

Dependency Check 后：

```text
v04  ✕ incompatible
v03  ✓ compatible
```

### C. Transformation

动画：

```text
v04 selected
↓
relationship becomes invalid
↓
edge disconnects
↓
resolver searches valid candidates
↓
v03 selected
↓
Mint resolve marker
```

### D. System Decision

> **Version selection is modeled as resolution, not ranking.**

可以显示一个简化公式：

```text
resolve(context, constraints, candidates)
→ valid version
```

而不是：

```text
max(version)
```

### E. Production Consequence

```text
More predictable loads
Explicit dependency reasoning
Fewer silent breakages
Cross-DCC consistency
Debuggable resolution path
```

## 5.4 Interactive Behavior

Desktop：

用户 hover `v04`：

```text
v04 highlighted
related dependency edges appear
one constraint becomes invalid
```

用户 hover `v03`：

```text
v03 highlighted
all required edges valid
RESOLVED marker appears
```

不要做成小游戏。

目的只是让用户直观理解：

> **latest ≠ compatible**

## 5.5 Evidence Slot

建议 Evidence：

- Loader / version selection UI；
- Resolver result；
- 版本依赖信息；
- 实际 Published Version / AssetVersion 结构；
- 某个真实 compatibility 选择案例。

Evidence caption 模板：

> **FIG. 02.01 — Context-aware version resolution**  
> A production loader resolves a compatible published state from task context and dependency constraints instead of selecting a version solely by numeric order.

---

# 6. Transformation 02 — Monolithic Package → Composable Modules

## 6.1 Section Identity

```text
02
COMPOSITION
MONOLITHIC PACKAGE
→
COMPOSABLE MODULES
```

## 6.2 核心问题

传统资产发布容易逐渐形成“大包”：

```text
ASSET PACKAGE
├─ Model
├─ Surface
├─ Rig
├─ Groom
├─ Cache
└─ Metadata
```

任何局部变化都可能让整个 Package 看起来需要重新生成或重新传递。

问题不是 Package 本身，而是：

> **系统把相互独立的 Production concern 当成了一个不可拆的版本单元。**

## 6.3 页面叙事

### A. Default Assumption

> A production asset is delivered as one complete package.

视觉：一个大的黑色矩形块：

```text
[ ASSET PACKAGE v18 ]
```

### B. Production Failure

当只有 Groom 更新：

```text
MODEL   unchanged
SURFACE unchanged
RIG     unchanged
GROOM   changed
```

但 Monolith 仍表现为：

```text
PACKAGE v18 → PACKAGE v19
```

导致：

```text
unnecessary coupling
coarse versioning
larger rebuild surface
harder provenance
```

### C. Transformation

大块分裂成独立模块：

```text
MODEL    v12
SURFACE  v08
RIG      v21
GROOM    v04
```

然后通过 Composition 建立：

```text
PRODUCT STATE
├─ Model v12
├─ Surface v08
├─ Rig v21
└─ Groom v04
```

### D. System Decision

> **Version independently. Compose explicitly.**

也可以显示：

```text
Monolithic Version
→
Module Versions + Composition
```

### E. Production Consequence

```text
Smaller change surface
Independent iteration
Clear provenance
Reusable components
More precise dependency updates
Better USD composition alignment
```

## 6.4 Interactive Behavior

这一段视觉重点是“拆”和“重组”。

Sequence：

```text
single block
↓
internal seams appear
↓
modules separate 8–14px
↓
individual version labels appear
↓
composition lines reconnect
↓
PRODUCT STATE appears
```

不要做爆炸式粒子效果。

它应该像技术结构图被“解析出来”。

## 6.5 Evidence Slot

建议 Evidence：

- 实际 Mod / Srf / Rig / Grm 发布结构；
- USD sublayer / payload / composition；
- Builder / Publish 中模块化结构；
- 多任务聚合；
- 一个模块变化但其他模块保持版本的真实案例。

Evidence caption 模板：

> **FIG. 02.02 — Independently versioned production modules**  
> Asset state is composed from independently published modules, allowing local change without forcing unrelated production data into the same version boundary.

---

# 7. Transformation 03 — Partial Change → Full State

## 7.1 Section Identity

```text
03
STATE INTEGRITY
PARTIAL CHANGE
→
FULL STATE
```

## 7.2 核心问题

Production 中一次操作经常只修改局部：

```text
Groom changed
Rig unchanged
Model unchanged
Surface unchanged
```

但下游真正消费的不是“变化本身”，而是：

> **一个在当前时刻可被理解、验证和重建的完整 Product State。**

Partial Change 和 Full State 不能混为一谈。

## 7.3 页面叙事

### A. Default Assumption

> If only one task changes, only that task needs to be represented.

视觉：

```text
MODEL   ?
SURFACE ?
RIG     ?
GROOM   v05 ← changed
```

### B. Production Failure

系统知道：

```text
what changed
```

但不知道：

```text
what is now valid as a whole
```

这会产生：

```text
ambiguous current state
implicit fallback
hidden dependency assumptions
hard-to-reproduce downstream loads
```

### C. Transformation

局部 Change 进入 Validation：

```text
PARTIAL CHANGE
      ↓
DEPENDENCY LOOKUP
      ↓
STATE ASSEMBLY
      ↓
VALIDATION
      ↓
FULL STATE
```

最终形成：

```text
MODEL    v12
SURFACE  v08
RIG      v21
GROOM    v05

STATE: VALID
```

### D. System Decision

> **A change is an event. A state is a resolved, validated snapshot.**

这是本案例最重要的一句话。

### E. Production Consequence

```text
Reproducible downstream consumption
Explicit fallback
State-level validation
Clear current product definition
Safer handoff between tasks and DCCs
```

## 7.4 Interactive Behavior

初始：只有 Groom 是实心，其余模块为 outline / unresolved。

执行：

```text
Groom change enters
↓
related dependencies illuminate
↓
required versions resolve one by one
↓
validation line sweeps through state
↓
FULL STATE becomes solid
↓
VALID marker appears
```

Mint 只在最后 Validation 成功后出现。

这样可以强化：

```text
Changed
≠
Valid State
```

## 7.5 Evidence Slot

建议 Evidence：

- PublishVersion / Product state；
- dependency provenance；
- deleted tombstone / explicit absence；
- multi-task aggregation；
- QC / validation result；
- 一个局部发布后重建完整状态的真实实例。

Evidence caption 模板：

> **FIG. 02.03 — Full state reconstructed from partial production change**  
> A local publish is resolved against existing compatible dependencies to produce a complete, reproducible product state for downstream consumption.

---

# 8. Transformation 04 — Written Rules → Executable Workflow

## 8.1 Section Identity

```text
04
EXECUTION
WRITTEN RULES
→
EXECUTABLE WORKFLOW
```

## 8.2 核心问题

很多 Pipeline 最初都依赖规则文档：

```text
Artists should...
TDs need to...
Before publishing, check...
Always load...
Do not use...
```

但“知道规则”不等于“系统执行规则”。

当规则只存在于文档和经验中：

```text
Human memory becomes runtime
```

这正是需要被改变的地方。

## 8.3 页面叙事

### A. Default Assumption

> Clear documentation is enough to keep production behavior consistent.

视觉先显示一块 Editorial text：

```text
01 Check task context
02 Find latest publish
03 Verify dependency
04 Build work scene
05 Validate output
06 Publish
```

### B. Production Failure

相同规则在不同人 / DCC / 工具中可能变成：

```text
interpretation A
interpretation B
interpretation C
```

导致：

```text
manual omission
inconsistent execution
hidden exceptions
tribal knowledge
hard onboarding
```

### C. Transformation

文字逐渐转换成节点：

```text
CONTEXT
↓
RESOLVE
↓
BUILD
↓
VALIDATE
↓
PUBLISH
```

然后增加条件和状态：

```text
VALID?
├─ YES → PUBLISH
└─ NO  → REPORT / STOP
```

### D. System Decision

> **Rules that matter to production should become executable constraints, state transitions, or tools.**

这里可以明确：

并不是所有文档都应该变成代码。

Transformation 的标准是：

```text
If a rule affects correctness,
repeatability,
or state transition,
it should be executable where practical.
```

### E. Production Consequence

```text
Less interpretation drift
More deterministic behavior
Easier onboarding
Better validation
Consistent cross-DCC execution
Rules become observable and debuggable
```

## 8.4 Interactive Behavior

这是四个案例里最适合做“文字 → 系统图”的一个。

Sequence：

```text
written checklist
↓
key verbs highlighted
↓
verbs detach from prose
↓
become nodes
↓
connections establish
↓
conditional branch appears
↓
workflow executes
```

视觉上要像“文档被编译成系统”，而不是普通流程图 fade in。

## 8.5 Evidence Slot

建议 Evidence：

- Work Manager；
- Builder；
- Publish workflow；
- Ftrack task context；
- validation panel；
- Houdini / Maya 中自动执行相同规则的真实 UI；
- 从 task context 到 publish 的真实执行链。

Evidence caption 模板：

> **FIG. 02.04 — Production rule expressed as executable workflow**  
> Repeated production decisions are moved from human memory into explicit tool behavior, validation, and state transitions across DCC applications.

---

# 9. 四个 Transformation 之间的连接

四个案例展示完后，不立刻进入下一章。

增加一个综合段落：

## Heading

> **One Transformation Leads to Another**

四个 Transformation 不是孤立改进：

```text
COMPATIBLE
requires
DEPENDENCY MODEL

COMPOSABLE MODULES
require
EXPLICIT COMPOSITION

FULL STATE
requires
RESOLUTION + VALIDATION

EXECUTABLE WORKFLOW
operationalizes
ALL OF THE ABOVE
```

最终汇聚：

```text
VERSION
MODULE
STATE
RULE
   ↓
EXPLICIT SYSTEM MODEL
```

核心文案：

> **Once version, composition, state, and rules become explicit, the pipeline stops behaving like a collection of scripts and starts behaving like a production system.**

这是 Chapter 02 的核心结论之一。

---

# 10. Production Evidence Section

这一章必须保留真实 Production 证据。

因为前面的 Transformation 很容易被理解成“概念设计”，这里需要证明它真的进入 Production。

## Heading

> **Implemented in Production**

## Layout

不使用普通作品集 Gallery。

建议：

```text
FIGURE
large screenshot / UI crop

│ annotation 01
│ annotation 02
│ annotation 03

FIG. 02.xx
caption
system consequence
```

每张 Evidence 都必须回答一个问题：

```text
Which transformation does this prove?
```

Evidence 建议按四种 Transformation 分组，而不是按 DCC 分组。

错误：

```text
Maya
Houdini
Ftrack
USD
```

正确：

```text
Compatibility Evidence
Composition Evidence
State Evidence
Execution Evidence
```

同一个 Evidence 可以出现 Maya + Houdini + Ftrack，只要它们证明的是同一个系统原则。

---

# 11. Chapter 02 页面视觉语法

本章应该比 Homepage Master Canvas 更安静、更“解释型”。

## 11.1 基础视觉

保持网站统一：

```text
Ivory
Charcoal / Black
Mint Accent
Thin Rules
Technical Labels
Editorial Typography
Grid
Nodes / Dependencies
```

## 11.2 每个 Transformation 固定结构

建议每个案例都遵守统一节奏：

```text
INDEX
↓
OLD MODEL
↓
FAILURE
↓
TRANSFORMATION
↓
NEW MODEL
↓
PRODUCTION CONSEQUENCE
↓
EVIDENCE
```

这样四个案例虽然内容不同，但用户能快速建立阅读模式。

## 11.3 Mint 使用规则

Mint 只用于：

```text
resolved
valid
selected
connected
current
```

例如：

```text
v04 invalid   = Charcoal / crossed / dim
v03 resolved  = Mint marker
```

不要把整个右侧 New Model 大面积填成绿色。

---

# 12. Scroll 与 Motion Rhythm

Chapter 02 不建议做 Scroll Scrub-driven storytelling。

每个 Transformation 使用：

```text
section enters viewport
↓
short controlled sequence plays
↓
settle into readable final state
↓
user continues reading
```

建议单个主动画：

```text
700–1300ms
```

复杂案例最多约：

```text
1500ms
```

动画结束后保持稳定。

避免：

```text
scroll position = animation frame
```

因为这一章首先是 Case Study，需要允许用户停下来读。

---

# 13. Chapter Navigation / Progress

Desktop 可在侧边保留极轻的 index：

```text
02 / DESIGN & INNOVATION

01 COMPATIBLE
02 MODULES
03 STATE
04 WORKFLOW
```

当前段落：

```text
01 COMPATIBLE  ●
```

其他：

```text
02 MODULES     ○
03 STATE       ○
04 WORKFLOW    ○
```

Mint 只标 current。

Mobile 不固定侧栏，改成 section eyebrow。

---

# 14. Copy Tone

整个 Chapter 02 文案需要避免以下语气：

```text
Revolutionary
Groundbreaking
Next-generation
Best-in-class
Powerful
Seamless
```

推荐语气：

```text
Specific
Technical
Reflective
Evidence-backed
System-oriented
```

重点不是说：

> “WEFT / PPL is innovative.”

而是让用户自己通过四个 Transformation 看见：

```text
旧模型是什么
为什么失效
新模型是什么
如何被实现
结果如何
```

---

# 15. Recommended Chapter Copy Skeleton

页面可以按下面的文字骨架直接进入内容生产：

```text
02 / DESIGN & INNOVATION

TRANSFORMING PRODUCTION ASSUMPTIONS

Production systems often inherit assumptions that work—until scale,
dependency and change expose their limits.

WEFT / PPL treats those assumptions as design problems.

Version selection becomes compatibility resolution.
Packages become composable modules.
Partial changes become validated states.
Written rules become executable workflows.
```

然后：

```text
01 / VERSION RESOLUTION
LATEST → COMPATIBLE

The newest version is not necessarily the correct version.

Latest describes order.
Compatible describes relationship.
```

接着：

```text
02 / COMPOSITION
MONOLITHIC PACKAGE → COMPOSABLE MODULES

A production asset does not need to share one version boundary.

Version independently.
Compose explicitly.
```

接着：

```text
03 / STATE INTEGRITY
PARTIAL CHANGE → FULL STATE

A change is an event.
A state is a resolved, validated snapshot.
```

接着：

```text
04 / EXECUTION
WRITTEN RULES → EXECUTABLE WORKFLOW

Documentation explains a rule.
A production system must decide where that rule should execute.
```

最后：

```text
VERSION
MODULE
STATE
RULE

↓

EXPLICIT SYSTEM MODEL

Once these relationships become explicit,
the pipeline stops behaving like a collection of scripts
and starts behaving like a production system.
```

---

# 16. 与 Chapter 01 / 03 的边界

## Chapter 01 — Systematic Thinking

回答：

> **How is production complexity modeled?**

重点：

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

Chapter 01 是“建立系统模型”。

---

## Chapter 02 — Design & Innovation

回答：

> **What assumptions changed because of that model?**

重点：

```text
Latest → Compatible
Monolith → Modules
Partial → Full State
Rules → Workflow
```

Chapter 02 是“模型如何改变设计决策”。

---

## Chapter 03 — What Comes Next

回答：

> **What becomes possible once the system model exists?**

重点：

```text
Governance
Recovery
Observability
Regression
Agent / Automation Extensions
```

Chapter 03 是“系统如何继续扩展”。

---

# 17. Chapter 02 Definition of Done

用户看完这一章后，应该能准确理解以下五件事：

```text
1. WEFT / PPL 不把 Latest 当成 Compatible。

2. WEFT / PPL 不把整个资产强制绑定在一个 Monolithic Version 上。

3. WEFT / PPL 区分 Partial Change 与 Full Product State。

4. WEFT / PPL 尽量把影响正确性的 Production Rule 变成可执行行为。

5. 这些并不是四个孤立 Feature，而是同一个 Explicit System Model 的结果。
```

如果用户最后只记住：

```text
Loader
Publisher
USD
Ftrack
Houdini
```

说明本章失败。

如果用户最后记住：

```text
Compatibility
Composition
State
Execution
```

并理解它们为什么重要，则本章成立。

---

# 18. 最终页面结构

```text
┌───────────────────────────────────────────────┐
│ 02 / DESIGN & INNOVATION                      │
│                                               │
│ TRANSFORMING PRODUCTION ASSUMPTIONS           │
│ Intro                                         │
└───────────────────────────────────────────────┘

                    ↓

THE PROBLEM IS OFTEN THE MODEL
Surface Symptoms ↔ System Cause

                    ↓

01 / VERSION RESOLUTION
LATEST → COMPATIBLE
[interactive compatibility resolver]
[production consequence]
[evidence]

                    ↓

02 / COMPOSITION
MONOLITHIC PACKAGE → COMPOSABLE MODULES
[package splits / recomposes]
[production consequence]
[evidence]

                    ↓

03 / STATE INTEGRITY
PARTIAL CHANGE → FULL STATE
[state assembly / validation]
[production consequence]
[evidence]

                    ↓

04 / EXECUTION
WRITTEN RULES → EXECUTABLE WORKFLOW
[documentation compiles into workflow]
[production consequence]
[evidence]

                    ↓

ONE TRANSFORMATION LEADS TO ANOTHER

VERSION
MODULE
STATE
RULE
   ↓
EXPLICIT SYSTEM MODEL

                    ↓

IMPLEMENTED IN PRODUCTION
[Evidence Figures]

                    ↓

NEXT
03 / WHAT COMES NEXT
```

---

# 19. Final Principle

> **Design & Innovation is not a showcase of new features.**
>
> **It is an explanation of how a better production model changes the decisions the system is able to make.**

