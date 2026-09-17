# WEFT / PPL 首页总结 V0.1

## 当前实施修订 · 2026-09-16

- V1 仅首页完整内容，但导航栏始终是独立页面导航，不是页内滚动，也不是 Master Canvas 切换器。项目概览到 `/`，系统思考到 `/systematic-thinking/`，设计与创新到 `/design-innovation/`，下一步到 `/next/`。未实现正文的目标可提供明确“内容尚未开放”及返回首页链接的最小页面，不视为完整章节交付。
- Master Canvas 的 hover/focus（移动端 tap）切换预览；单独的 EXPLORE 点击进入对应章节页面。VIEW EVIDENCE 指向 `/evidence/`，不可替换为滚动到首页 Proof Strip。只有 BACK TO TOP 等明确页内操作滚动。邮箱未提供，暂不显示 CONTACT。
- [ref/final.png](../ref/final.png) 是最终视觉目标；Production Proof 中的图片占位不能冒充真实证据。
- 增加“试编辑”入口：所有访客均可临时修改白名单标题、说明与图注，即时查看页面效果。默认浏览态保持目标图布局，编辑面板按需打开。
- 你与其他访客都不能在网页上保存正式内容；无登录、无后台。修改只存当前页面内存，不写浏览器存储，刷新恢复。关闭面板仍保留本页临时效果，提供恢复单字段、恢复全部与复制修改清单。
- 正式更新方式：复制修改清单 → 维护者 / Codex 核对并修改本地内容文件 → 检查、提交、构建、GitHub Pages 部署。复制不等于保存上线。
- 不支持修改布局、图拓扑、图片、链接目标或动画参数。具体字段、状态和验收以 [技术规范 V2.2](WEFT_PPL_Website_Technical_Implementation_Spec_V2.2.md) 为准。
- Hero 只表达 Boot / Resolve；完整 Fragmented → Structured → Coordinated 仅用于 System Summary，取代下文较早的重复动效描述。

以上修订优先于下文保留的原始方案。

> **Homepage = Overview / Entrance**  
> 首页不是完整 Case Study，而是 WEFT / PPL 的封面、系统摘要和章节入口。

---

## 1. 首页目标

首页只负责让读者在 30–60 秒内理解四件事：

1. **WEFT / PPL 是什么**
   - 一套跨 Maya / Houdini 的动画 Production System。
   - 让不同人、不同软件产出的制作成果能够正确交接、组合和更新。

2. **它解决什么级别的问题**
   - 不只是文件传输。
   - 核心是把版本、依赖、状态和生产规则组织成一套共享 Production Model。

3. **它已经真实落地**
   - 2 人团队。
   - 2026.04–08 核心开发。
   - 已在实际制作中运行。

4. **读者可以从哪三个角度继续深入**
   - 系统思考
   - 设计与创新
   - 下一步

---

# 2. 首页结构

```text
HEADER
↓
HERO
↓
SYSTEM SUMMARY
↓
INTERACTIVE MASTER CANVAS
↓
PRODUCTION PROOF
↓
FOOTER
```

首页不再重复三个章节正文。

---

# 3. HEADER

左侧：

```text
WEFT / PPL
```

中间导航：

```text
00 / 项目概览
01 / 系统思考
02 / 设计与创新
03 / 下一步
```

其中：

- `00 / 项目概览` 为当前 Active；
- 其他三项进入独立章节 / route。

右侧：

```text
PRODUCTION SYSTEM
STATUS: ACTIVE
2026
```

其中 `ACTIVE` 使用薄荷绿。

---

# 4. HERO

## 主标题

# WEFT / PPL

## 副标题

> **跨软件协作的动画生产系统**

## 主文案

> 让不同人、不同软件产出的制作成果，能够正确交接和组合。

## Production Proof

```text
Maya / Houdini
2-person team
Active Production
```

## Hero 视觉

右侧为一个抽象系统动态图。

它只表达：

```text
Fragmented
→ Structured
→ Coordinated
```

视觉逻辑：

- 黑点 / 灰点：分散或未激活的信息；
- 灰线：系统结构；
- 薄荷绿：当前成立的连接、有效关系、Active State。

Hero 不解释：

- Compatibility
- Partial Publish
- Module
- Resolver
- av / v
- record

这些进入后续章节。

---

# 5. SYSTEM SUMMARY

这一段只回答：

> **WEFT / PPL 到底在做什么？**

左侧动画：

```text
分散的成果
→ 有序的组织
→ 协同的生产
```

建议做成一个连续动画，而不是三个独立静态图。

右侧：

# 独立变化，也能协同工作。

一句说明：

> WEFT / PPL 将任务、制作成果、版本与依赖组织进共享的 Production Model，连接 Maya 与 Houdini 的工作流程。

这一段之后不再继续解释系统细节。

---

# 6. INTERACTIVE MASTER CANVAS

这是首页的核心交互区域。

## 标题

# ONE SYSTEM / THREE VIEWS

副标题：

> 同一个系统，三个观察角度。

整个黑色区域只使用：

> **一个统一 Master System Canvas**

而不是三个章节 + 三张 Preview 图。

三个章节卡片叠放在同一张图上，作为入口与控制器。

---

## 6.1 Master Canvas 默认态

默认态表达 WEFT / PPL 的总体结构。

可以包含：

```text
CONTEXT
PRODUCT
VERSION
DEPENDENCY
STATE
VALIDATION
MODULE
WORKSPACE
PUBLISH
```

但默认不要全部高亮。

建议：

- 少量主节点可见；
- 其他节点低透明度；
- 细线轻微运动；
- Canvas 保持“系统正在运行”的感觉。

首页不出现：

```text
Mod
Srf
Grm
RigCache
av
record.json
SY_V1%
```

这些属于 Deep Dive / Evidence。

---

## 6.2 三个章节入口

### 01 / SYSTEMATIC THINKING

> **复杂生产，如何成为系统？**

交互模式：

```text
ORGANIZE
```

Hover 后：

```text
People / Software / Files / Versions / Dependencies
→
Context / Product / Version / Dependency / State / Validation / Resolution / Composition
```

表达：

> **Complexity → Model**

薄荷绿高亮被组织出来的有效系统关系。

---

### 02 / DESIGN & INNOVATION

> **重新审视生产的默认假设。**

交互模式：

```text
TRANSFORM
```

Hover 后重点展示四个 Transformation：

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

这是三个模式里动画最强的一种。

薄荷绿表示：

- compatible path
- active module
- current valid state
- executable rule path

---

### 03 / WHAT COMES NEXT

> **让已有系统持续演进。**

交互模式：

```text
EXTEND
```

Hover 后：

当前系统使用实线：

```text
MODEL
MODULES
STATE
VALIDATION
EXECUTION
```

未来方向使用虚线：

```text
GOVERNANCE
RECOVERY
OBSERVABILITY
REGRESSION
```

语义规则：

```text
实线 = Current / Existing
虚线 = Future / Evolving
```

薄荷绿只高亮当前 V1 System。

---

## 6.3 View Mode Indicator

底部可以保留：

```text
VIEW MODE
01 ORGANIZE
02 TRANSFORM
03 EXTEND
```

但它不是第二套导航。

只用于显示当前交互模式。

---

# 7. 薄荷绿规则

首页正式锁定：

```text
BLACK / IVORY
= structure

GRAY
= inactive / background

MINT
= active / valid / selected / connected / current
```

建议占比：

```text
92–95% Black / Ivory / Gray
5–8% Mint
```

首页不使用橙红状态色。

橙 / 红留到 Evidence 页面中的真实 Production State。

---

# 8. PRODUCTION PROOF

Master Canvas 后只保留一个短 Proof Strip。

标题：

# BUILT FOR PRODUCTION

信息：

```text
HOSTS
Maya / Houdini

SYSTEM
USD / Rez

WORKFLOW
Builder / Loader / Publish / Review

STATUS
2026 / Active Production
```

右侧使用 2–3 个真实 UI 局部截图：

- Shot Builder
- Loader
- Publish / QC

真实 UI 只作为：

> **Production Evidence**

不要直接放完整 Qt Screenshot。

建议以 Editorial Figure 方式展示：

```text
FIG. 01
SHOT BUILDER / PRODUCTION UI

FIG. 02
PUBLISH / QC
```

CTA：

```text
VIEW EVIDENCE ↗
```

---

# 9. FOOTER

保持 Ivory / Warm White。

左侧：

```text
WEFT / PPL

SAME PIPELINE
MORE POSSIBILITIES
```

中间：

```text
PEOPLE
DATA
SOFTWARE
```

用三个相交圆表达三者被统一进同一 Production System。

右侧：

```text
VIEW EVIDENCE ↗
CONTACT ↗
```

如果需要进一步精简，Footer 可以只保留：

```text
CONTACT ↗
BACK TO TOP ↑
```

---

# 10. 首页视觉方向

## Visual Identity

> **Technical Editorial Poster System**

## Experience

> **Production Manual in Motion**

## 主色

```text
Ivory
Charcoal Black
Soft Gray
Mint Accent
```

## 图形语言

```text
Big Typography
Thin Technical Lines
Wireframe
Dotted Field
Stipple / Halftone
Modules
Dependency Paths
Annotation
Index Numbers
Crop Marks
```

## 动效语言

```text
Organize
Transform
Extend
Connect
Split
Merge
Resolve
Assemble
```

---

# 11. 首页不应该承担的内容

以下全部进入独立章节 / Deep Dive：

- AssetVersion / PublishVersion
- `av / v`
- Mod / Srf / Grm
- Rig dependency provenance
- Logical URI
- USD Asset Resolver
- description / record
- Multi-task aggregation
- deleted tombstone
- Hair / CFX dependency details
- Houdini node metadata
- QC plugin details
- current implementation boundary

首页只负责：

```text
Understand the system
→ choose a view
→ enter the chapter
```

---

# 12. 首页最终认知路径

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

首页最终定位：

> **WEFT / PPL 的封面、系统摘要与章节目录。**

不是：

> **完整 Case Study 的压缩版。**

---

# 13. 当前建议修改点

基于当前设计稿，只需要继续做以下几项：

1. 减少 Hero 与 System Summary 对 `Fragmented → Structured → Coordinated` 的重复；
2. Master Canvas 默认态减少约 20–30% 信息密度；
3. Hover 后再展开相应系统语义；
4. `ORGANIZE / TRANSFORM / EXTEND` 降级为 View Mode Indicator；
5. 让 `03 / Next` 明确挂接未来虚线分支；
6. Production Proof 替换为真实 Builder / Publish UI 的 Editorial Crop；
7. 继续严格执行：
   > **Mint = Active Meaning**

其他视觉方向暂不再调整。

---

## Freeze

当前首页可以冻结为：

```text
HEADER
HERO
SYSTEM SUMMARY
ONE SYSTEM / THREE VIEWS
PRODUCTION PROOF
FOOTER
```

下一步重点不再是补文字，而是：

> **把 Master Canvas 的三个交互模式真正做出来。**
