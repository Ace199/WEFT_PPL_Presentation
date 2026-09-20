好的，那我直接把 **4 张 Card 的内容结构冻结版**给你。之后 Codex 做页面时，Card 的信息层级就按这一套，不再回到四象限并列。

# Chapter 02 — Design Decision Cards Freeze

统一阅读逻辑：

```text
01 / DECISION
这个设计判断是什么
        ↓
02 / BEFORE → WEFT / PPL
原来的模型有什么问题，我改成什么
        ↓
03 / PROJECT EXAMPLE
在当前 PPL 项目里，它实际上怎么存在
```

其中原来的：

```text
MODEL DIAGNOSIS
Surface Symptom
Underlying Cause
```

不再作为独立区域。

它们直接被吸收到 `BEFORE` 中。

`SYSTEM SHIFT` 仍然保留，但压缩成主标题下方的一行，不再单独占一个象限。

---

# CARD 01 / COMPATIBILITY

## 01 — Decision

### 标题

# 从追随最新，到保留兼容历史。

### Summary

> 工作继续向前，已经成立的历史成果仍然有效。

### System Shift

```text
Global Latest
→ Compatibility-scoped Resolution
```

这里不要表达成：

```text
Latest ≠ Correct
```

真正的意思是：

```text
Working State
→ follows current production

Published State
→ preserves historical compatibility
```

---

## 02 — Before → WEFT / PPL

### BEFORE

传统思路容易把：

```text
Current Asset Latest
```

当成所有下游历史结果唯一应该使用的状态。

例如：

```text
TIME →

Asset
G2 ─────────→ G3

Historical Shot A
               └→ forced to follow G3
```

结果：

> 上游发生一个小修改，历史已经发布并可正常渲染的 Animation / RigCache 也可能被迫失效。

这才是 Problem。

---

### WEFT / PPL

改成：

```text
TIME →

Asset
G2 ─────────→ G3

Shot A / Published
└── keeps G2 dependency

Shot B / New Work
└────────────── uses G3
```

两条路径同时合法：

```text
Historical work
→ keeps compatible history

New work
→ continues forward
```

Mint 表示：

> 当前合法的 Compatibility Relation。

不是：

> 最新版本。

---

## 03 — Project Example

标题：

```text
PROJECT EXAMPLE
RigCache USD / Compatibility Reference
```

建议直接做成 Production Artifact Viewer。

```usda
#usda 1.0
(
    subLayers = [
        @./Character__geo.usd@,
        @SY_V1%USD/ASSET/CHR/Character&av=av0003&step=Srf@
    ]
)
```

高亮：

```text
av=av0003
step=Srf
```

下面只解释一句：

> 已发布 RigCache 同时包含本地动画几何与带兼容范围的 Surface 逻辑依赖；资产继续演进后，该历史 RigCache 仍可按原兼容范围被解析和渲染。

CTA：

> **查看兼容关系如何在生产中工作 ↗**

---

# CARD 02 / MODULARITY

## 01 — Decision

### 标题

# 从整体发布，到可组合的生产模块。

### Summary

> 变化发生在哪个模块，版本边界就落在哪个模块。不同 Production Module 可以分别演进、选版和更新。

### System Shift

```text
Monolithic Package
→ Composable Production Modules
```

---

## 02 — Before → WEFT / PPL

### BEFORE

传统的 Shot Animation Package 更接近：

```text
Ani v001

├ Camera
├ Character A
├ Character B
├ Set
└ ...
```

`v001` 属于整个 Ani Package。

于是：

```text
Character A changes
        ↓
whole package gets another version
```

局部资源自己的演进历史被整体包版本吞掉。

---

### WEFT / PPL

把版本 Ownership 下沉到独立 Production Product：

```text
SHOT WORKSPACE

Camera       v003
Set          v002

Character A
├ RigCache   v004
└ CFX        v002

Character B
└ RigCache   v007
```

每个 Module 保留自己的：

```text
Identity
Version
Dependency
State
```

然后通过显式 Composition 进入 Workspace。

所以核心不是：

> “把一个大包拆成很多文件。”

而是：

> **改变 Version Ownership 和 Composition Model。**

---

## 03 — Project Example

标题：

```text
PROJECT EXAMPLE
Shot Builder / Resource Tree
```

可以做成结构化 Viewer，而不是代码编辑器：

```text
SHOT / Example

Workspace
├── Camera                  v003
├── Set                     v002
│
├── Character_A
│   ├── RigCache            v004   LOADED
│   └── CFX                 v002   READY
│
└── Character_B
    └── RigCache            v007   LOADED
```

Mint 可以只高亮当前选中的一个 Module / Version。

下面一句：

> Houdini Shot Builder 以资源实例为单位发现、选版和更新 Production Modules，而不是把整个 Shot 当成一个不可拆分的版本包。

这里不要把 Hair 当作“已完成 Assembly”的主要示例。

CTA：

> **查看模块如何进入工作场景 ↗**

---

# CARD 03 / STATE

## 01 — Decision

### 标题

# 变化是事件，状态是完整快照。

### Summary

> 系统记录这一次发生了什么，同时维护当前完整的 Production State。

### System Shift

```text
Partial Change
→ Materialized Full State
```

---

## 02 — Before → WEFT / PPL

### BEFORE

如果一次 Publish 只记录：

```text
A v003
```

它只能告诉下游：

> 这次 A 变了。

但无法单独回答：

> 现在整个 Shot 是什么状态？

也就是说：

```text
Change
≠
State
```

如果把二者混在一起，下游就需要自己猜测、回溯或重建历史。

---

### WEFT / PPL

明确分成两个概念：

```text
PREVIOUS STATE

A      v002
B      v001
Camera v003

        +

CHANGE / DELTA

A      v003

        ↓
       MERGE
        ↓

CURRENT FULL STATE

A      v003
B      v001
Camera v003
```

所以：

```text
What changed this time?
≠
What exists now?
```

这是这张 Card 最重要的一句话。

---

## 03 — Project Example

这里最适合做有 Tab 的 JSON Viewer。

顶部：

```text
publish_delta.json     shot_record.json
```

### Tab 01 — DELTA

```json
{
  "rigcache": {
    "Character_A": {
      "version": "v003"
    }
  }
}
```

### Tab 02 — CURRENT STATE

```json
{
  "rigcache": {
    "Character_A": {
      "version": "v003"
    },
    "Character_B": {
      "version": "v001"
    },
    "Camera": {
      "version": "v003"
    }
  }
}
```

下面一句：

> `description` 描述本次变化，`record` 保存合并历史变化后的当前完整状态；本次没有发布的资源不会因此自动被删除。

这张 Card 内暂时不要继续展开：

```text
Task record
Ani master record
deleted tombstone
```

这些去 `/in-production#state`。

CTA：

> **查看局部发布如何维护完整状态 ↗**

---

# CARD 04 / EXECUTION

## 01 — Decision

### 标题

# 让关键规则，进入执行边界。

### Summary

> 影响 Production Correctness 的规则，不应该只停留在说明文档或 Artist 的记忆里。

### System Shift

```text
Written Rules
→ Executable Workflow
```

---

## 02 — Before → WEFT / PPL

### BEFORE

传统规则可能存在于：

```text
Pipeline Guide

- 命名应该这样
- 目录应该这样
- 依赖应该这样
- 发布之前记得检查
```

但真正执行时仍然依赖：

```text
Artist remembers correctly
```

这意味着：

> Documentation 描述了规则，但并没有执行规则。

---

### WEFT / PPL

把规则附着到真正的 Execution Points：

```text
PRODUCTION RULES

├── Context / Starting State
│       ↓
│     BUILDER
│
├── Dependency Rules
│       ↓
│     RESOLUTION
│
└── Delivery Rules
        ↓
      PUBLISH / QC
        │
        ├── PASS → PUBLISH
        └── FAIL → REPORT / STOP
```

核心关系：

```text
Builder
= reduce invalid starting states

Publish / QC
= validate delivery boundary
```

---

## 03 — Project Example

标题：

```text
PROJECT EXAMPLE
Publish / QC Execution
```

Viewer 可以采用 execution trace，而不是普通伪代码：

```text
01  COLLECT
    └─ gather products

02  QC CONTEXT
    └─ validate production context

03  QC INSTANCE
    └─ validate product requirements

04  PUBLISH
    └─ write production outputs

05  INTEGRATE
    └─ register / update production state
```

可以让当前执行步骤用 Mint 高亮。

如果要更接近真实 Pyblish-Pro：

```text
COLLECT      ●
QC CONTEXT   ●
QC INSTANCE  ●
PUB INSTANCE ○
PUB CONTEXT  ○
```

不要写成：

```text
PASS
PASS
PASS
```

除非这是一个真实运行结果。

一句解释：

> WEFT / PPL 的 Builder 与 Publish / QC 分别约束制作起点和交付边界，让 Production Rules 进入实际执行过程。

CTA：

> **查看规则如何进入执行流程 ↗**

---

# 四张 Card 最终统一模板

Codex 实现时，不要每张自己设计一套布局。

统一：

```text
┌────────────────────────────────────────────────────┐
│ 01 / CATEGORY                          FIG. 02.01  │
│                                                    │
│ [PART 01 / DECISION]                               │
│                                                    │
│ Main Title                                         │
│ Summary                                            │
│ System Shift                                       │
│                                                    │
├────────────────────────────────────────────────────┤
│ [PART 02 / BEFORE → WEFT / PPL]                    │
│                                                    │
│ BEFORE                  WEFT / PPL                 │
│ old model               new model                  │
│ problem        →        improved diagram           │
│                                                    │
├────────────────────────────────────────────────────┤
│ [PART 03 / PROJECT EXAMPLE]                        │
│                                                    │
│ USDA / Tree / JSON / Execution Trace Viewer        │
│                                                    │
│ one-line explanation                   CTA ↗       │
├────────────────────────────────────────────────────┤
│ ← PREV            ●01 ○02 ○03 ○04        NEXT →  │
└────────────────────────────────────────────────────┘
```

最重要的是：

> **从此不要再用“四象限同时竞争注意力”的结构。**

Card 的阅读方向应该非常明确：

```text
WHAT I DECIDED
        ↓
WHAT CHANGED FROM BEFORE
        ↓
HOW IT EXISTS IN THE PROJECT
```

这套结构我认为可以直接 Freeze。
