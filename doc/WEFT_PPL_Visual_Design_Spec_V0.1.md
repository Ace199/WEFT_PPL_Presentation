# WEFT / PPL 视觉设计规范 V0.1

## 当前实施修订 · 2026-09-16

最终首页视觉以 [ref/final.png](../ref/final.png) 为准；V1 仅首页，旧四大块布局作为内容语法参考，不恢复七节长首页。技术栈与交互遵循 [技术规范 V2.2](WEFT_PPL_Website_Technical_Implementation_Spec_V2.2.md)，不采用下文历史性可选栈来扩大范围。

导航语义补充：Header 是独立页面导航，不得改成滚动定位或 Canvas 控制器。Canvas 的视角预览与 EXPLORE 跳页是两种不同操作；VIEW EVIDENCE 同样跳往独立页面。未完成目的地可使用明确的最小待开放页面，不伪装成完整章节。

新增前端临时内容预览的视觉约束：

- 普通浏览态保留目标图构图；“试编辑”入口低干扰、可发现且可键盘操作。
- 进入后显示有限文本字段的选择标记及轻量编辑面板，沿用暖白 / 炭黑 / 细线视觉，不做完整 CMS 工作台。
- 明确显示“临时预览，刷新后恢复”，提供恢复与复制修改清单；不得出现暗示线上保存成功的状态。
- 编辑面板不得遮住正在观察的主要文本；移动端保证输入与预览可用。输入期间降低干扰性动效，保留焦点和 reduced motion。
- 不提供视觉样式、图拓扑、布局、动画或图片编辑。目标图未绘制编辑态，以上约束为新增功能要求，不是从静态图推断出的现成功能。
- 颜色不是唯一状态提示。真实截图仍须脱敏且不伪造；截图占位与正式证据明确区分。

以上修订优先于下文保留的原始方案。

> **Technical Editorial Poster System**  
> *A Production Manual in Motion*

---

## 0. 文档目的

本规范用于统一 **WEFT / PPL** 展示网站的视觉、图解、动效与真实 Production UI 呈现方式。

网站不是：

- SaaS 营销页
- 影视软件官网
- 赛博 / AI 科技视觉
- 传统作品集截图墙

而是：

> **一份会动起来的 Production System Case Study。**

核心目标：

1. 让非影视技术读者快速理解系统；
2. 让系统结构通过视觉自然体现，而不是依赖长篇文字；
3. 让真实 Builder / Loader / Publish UI 成为“实现证据”，而不是主视觉负担；
4. 让 PPL 的系统建模、模块化、状态管理与 Production Thinking 自然可见；
5. 保持工程可信度，避免视觉包装超过真实实现。

---

# 1. Art Direction

## 1.1 核心定义

### Primary Direction

> **Technical Editorial Poster System**

关键词：

```text
Editorial
Technical
Diagrammatic
Modular
Scientific
Systemic
Measured
Production-grade
```

次级定义：

> **Production Manual in Motion**

页面应该像：

```text
技术出版物
×
系统架构图
×
科学图解
×
动态海报
×
真实 Production Evidence
```

而不是：

```text
Dashboard
×
Feature Cards
×
Gradient SaaS
×
Neon AI
```

---

## 1.2 视觉性格

目标气质：

- 冷静
- 精确
- 有秩序
- 有工程判断
- 有编辑感
- 有轻微手工图解质感
- 不炫技
- 不装“未来感”

可以有：

- 细钢笔线
- 断续线
- 手绘轻微偏差
- 点状 / stipple 阴影
- wireframe
- exploded layers
- annotation
- technical labels
- small index numbers

不要有：

- 大面积霓虹
- 紫蓝 AI gradient
- glow orb
- 无意义粒子
- 过度 3D 玻璃拟态
- “宇宙 / 神经网络”式泛科技背景
- 过多圆角 SaaS cards

---

# 2. Visual Hierarchy

## 2.1 页面信息层级

所有页面优先级统一：

```text
01  Key Claim
02  Diagram / Motion
03  Short Explanation
04  Production Evidence
05  Technical Detail
```

读者应该先理解：

> **What changed?**

然后再理解：

> **How was it implemented?**

---

## 2.2 信息层的视觉差异

### Level A — Narrative

用于：

- Hero
- Section title
- Design Move

表现：

- 大字号
- 高对比
- 极少文字
- 强留白

例：

```text
LATEST
        →
COMPATIBLE
```

### Level B — System Diagram

用于：

- Context
- Module
- Dependency
- State
- Composition

表现：

- 细线
- wireframe
- 小标签
- 连接关系
- 动画解释因果

### Level C — Evidence

用于：

- Builder
- Loader
- Publish
- Houdini / Maya 截图
- Prototype → Production

表现：

- Figure 编号
- crop
- annotation
- artifact framing

真实 UI 不承担主视觉任务。

---

# 3. Color System

## 3.1 基础配色

推荐整体接近：

```text
Ivory / Warm White
Charcoal / Near Black
Soft Neutral Gray
```

建议初始值：

| Token | 建议值 | 用途 |
| --- | --- | --- |
| `--paper` | `#F2EFE6` | 主背景 |
| `--paper-soft` | `#E8E4DA` | 次级背景 |
| `--ink` | `#111210` | 主文字 / 深色块 |
| `--ink-soft` | `#292B28` | 深色卡片 |
| `--line` | `#B8B4AA` | 细分隔线 |
| `--muted` | `#77776F` | 次级说明 |
| `--white` | `#F8F7F2` | 深色区文字 |

最终需在浏览器中校正。

---

## 3.2 状态色

全站只允许少量语义色。

| State | 建议色相 | 语义 |
| --- | --- | --- |
| Active / Loaded | Mint / Green | 已加载 / 已匹配 / 当前有效 |
| Ready / Update | Warm Yellow / Orange | 可执行 / 有变化 |
| Lost / Invalid | Red | 丢失 / 无效 / 冲突 |
| Neutral | Gray | 未选 / 静态 |

原则：

> **Color is semantic, not decorative.**

状态色只用于：

- state
- dependency highlight
- changed module
- selected path
- warning

不要用状态色填满大面积背景。

---

# 4. Typography

## 4.1 字体角色

只使用两种主要字体角色。

### Display / Narrative Sans

用于：

- Hero
- Section title
- Design Move
- Large statement

特征：

- 几何或 neo-grotesk
- 大字号仍干净
- 不需要强科技感
- 字重差异明显

可优先试：

- Inter Tight
- IBM Plex Sans
- Geist Sans
- 其他同类中性 grotesk

最终字体需根据网页实际排版与授权再定。

### Technical Mono / Utility

用于：

- `FIG. 03`
- `01 / 06`
- `STATE`
- `MODULE`
- `ACTIVE`
- code-like label
- small system metadata

可优先试：

- IBM Plex Mono
- Geist Mono
- JetBrains Mono

---

## 4.2 字号建议

Desktop 起始建议：

```text
Hero Title       96–160px
Section Title    64–96px
Major Statement  42–64px
Body             18–22px
Caption           12–14px
Technical Label   10–12px
```

移动端按比例缩减，不追求完整复刻桌面海报。

---

## 4.3 排版规则

优先：

- 大标题短句
- 断行主动设计
- 小标签与大标题形成反差
- 少量 uppercase 用于 technical label

避免：

- 全站 uppercase
- 每段都像代码
- 正文使用 monospace
- 为“技术感”降低可读性

---

# 5. Grid & Layout

## 5.1 总体网格

建议：

- 12-column grid
- 强 outer margin
- section 内允许 asymmetric composition
- 海报式大块排版
- 不要求所有内容严格卡片化

页面不是：

```text
Card
Card
Card
Card
```

而是：

```text
Title
Diagram
Annotation
Large Blank Space
Evidence
```

---

## 5.2 Section 视觉节奏

每个大 Block 允许不同布局，但共享同一 design grammar。

```text
BLOCK 0
Hero poster

BLOCK 1
System diagram / decomposition

BLOCK 2
Full-screen transformations / production stories

BLOCK 3
Quiet blueprint / future lines
```

---

# 6. Core Diagram Language

全站图解必须复用同一套“视觉语法”。

## 6.1 基础对象

### Module

表示：

- Character
- Camera
- Set
- CFX
- RigCache
- generic production unit

视觉上避免重 SaaS card 感。优先：

- 黑底技术图板
- 极细边线
- 小编号
- 单一抽象 diagram

### Slot

Slot 主要作为**视觉隐喻**。

用于表达：

> Workspace 中存在可被 Module 占据的位置。

不要把 Slot 描述成当前已存在的统一 Plugin API。

### Dependency

视觉：

- 1px 左右细线
- 可带箭头
- 允许 dashed
- selected dependency 可用 Mint 高亮

### State

统一词汇：

```text
READY
UPDATE
LOADED
LOST
```

状态变化必须在全站保持同一颜色语义。

### Version

不要让版本数字成为视觉噪音。

只在需要解释版本行为时使用：

```text
v002 → v003
```

---

## 6.2 标准图解类型

建议固定 5 类。

### A. Exploded Stack

适合：

- Current Shot State
- layered production state
- state preservation

### B. Module Library

适合：

- RigCache
- Surface
- Camera
- Set
- CFX
- Lighting

表现：

> independent production units

### C. Composition Rail

适合：

```text
Module
→ Slot
→ Workspace
```

用于表达 modular composition。

### D. Dependency Map

适合：

```text
Animation
→ compatibility scope
→ Surface
```

用于：

- Latest ≠ Compatible
- Resolution

### E. Delta / State Diagram

适合：

```text
Previous
+
Change
→
Current
```

用于 Partial Publish。

---

# 7. Illustration Language

## 7.1 微观风格

参考科学插画 / technical plate：

- 纤细墨线
- 轻微手绘偏差
- 局部断线
- dotted shade
- stipple
- halftone
- restrained cross-hatching

但主要结构仍必须清晰几何化。

手绘感只作为 texture，不影响工程图可读性。

---

## 7.2 图形抽象程度

避免真实复杂 CG 模型。

例如：

- Surface → deformed wire grid
- Camera → frustum
- Lighting → concentric / overlapping light fields
- CFX → particle / vector field
- Set → wireframe stage / planes

这样既有影视语义，又保持跨领域可读。

---

# 8. Motion System

## 8.1 总原则

> **Motion must explain architecture.**

不做无意义动画。

每个动画必须回答：

```text
What changed?
What caused it?
What is preserved?
What is connected?
```

---

## 8.2 推荐 Motion Grammar

### Line Draw
用于 dependency / flow / resolution path。

### Split / Decompose
用于：

```text
Monolithic Package
→
Modules
```

### Assemble / Snap-in
用于：

```text
Module
→
Workspace Slot
```

### State Transition
用于：

```text
READY
→ UPDATE
→ LOADED
```

### Delta Merge
用于：

```text
A v2
+
A v3 delta
→
A v3 / B unchanged
```

### Diagram → Production UI Morph
用于：

```text
abstract module
→
real Shot Builder row
```

这是全站最有价值的动效之一。

---

## 8.3 动画速度

默认：

- 不急
- 有机械 / 编辑感
- 不弹跳
- 不 overshoot
- ease 平稳

感受：

> deliberate / system-driven

而不是：

> playful / toy-like

---

## 8.4 Scroll 动画

推荐：

- sticky section
- progressive reveal
- scroll-scrub diagram
- SVG path animation
- module rearrangement

避免：

- 每段文字都飞进来
- 大量 scroll hijacking
- 过度 parallax
- 无意义横向滚动

---

## 8.5 Reduced Motion

必须支持：

```text
prefers-reduced-motion
```

Reduced 模式下：

- diagram 直接显示最终状态
- 去掉连续移动
- 保留 opacity / simple state change

---

# 9. Real Production UI Usage

## 9.1 定位

Qt UI 是：

> **Production Evidence**

不是视觉主角。

---

## 9.2 使用方法

推荐：

### Crop

只展示：

- state column
- version selector
- resource tree
- QC list
- asset browser

### Figure Label

例如：

```text
FIG. 07
SHOT BUILDER / PRODUCTION UI
Houdini / V1
```

### Annotation

用网站自己的细线、编号与文字标注：

```text
01 Resource Identity
02 Version
03 State
04 Assemble
```

### Prototype → Production

特别适合：

```text
Wireframe
→
Final Qt UI
```

用于证明：

> system model → interaction design → production implementation

---

## 9.3 不推荐

不要：

- 大面积原始截图直接铺满
- 用 Qt 色彩定义网站主视觉
- 为了漂亮重新伪造一套不存在的 Production UI

真实截图可以裁切、脱敏、重新编排，但不能误导为新的产品界面。

---

# 10. Four Major Blocks — Visual Treatment

## BLOCK 0 — HERO

### 核心视觉

```text
WEFT / PPL
A CROSS-DCC PRODUCTION SYSTEM
```

配：

- thin system paths
- fragmented production labels
- 轻量 module / line animation

Motion：

```text
scattered production elements
→
organized system
```

Hero 不展示复杂技术细节。

---

## BLOCK 1 — SYSTEMATIC THINKING

### 01 Problem

视觉：

```text
PEOPLE
SOFTWARE
VERSION
DEPENDENCY
STATE
```

以 editorial typography 形成复杂感。

### 02 Model

滚动后重新组织：

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

核心动画：

> Chaos → Model

---

## BLOCK 2 — DESIGN & INNOVATION

这是视觉主体。

### Move 01

```text
LATEST
→
COMPATIBLE
```

动画：

- wrong line
- disconnect
- compatible path reconnect

### Move 02

```text
MONOLITHIC PACKAGE
→
COMPOSABLE PRODUCTION MODULES
```

动画：

- single block splits
- modules separate
- modules enter workspace slots

### Move 03

```text
PARTIAL CHANGE
→
CURRENT FULL STATE
```

动画：

- delta highlight
- unchanged layers preserved
- current state rebuilt

### Move 04

```text
WRITTEN RULES
→
EXECUTABLE WORKFLOW
```

动画：

```text
rule
→ builder / QC
→ production state
```

最终 morph 到真实 Publish UI。

---

## BLOCK 3 — WHAT COMES NEXT

降低动画强度。

视觉像：

> unfinished technical blueprint

Current：

```text
Model
Execution
Validation
Composition
```

细线继续延伸到：

```text
Governance
Recovery
Observability
Regression
```

最后保持克制。

---

# 11. Evidence Page Style

Evidence 不需要和首页一样强动画。

建议：

```text
Production meaning
↓
System mechanism
↓
Real evidence
↓
Boundary
```

每个 Evidence Block：

```text
FIG. XX
Title

Diagram
+
Screenshot / code fragment
+
short explanation
+
Current Boundary
```

使用 technical publication layout。

---

# 12. Interaction Language

## Hover

Hover 用于：

- module highlight
- dependency reveal
- evidence annotation
- prototype / production comparison

不要用：

- 大幅位移
- 夸张 glow
- cursor-follow decoration

## Cursor

默认正常 cursor。

仅在：

- draggable comparison
- interactive diagram
- state toggle

使用自定义 interaction cue。

---

# 13. Texture

允许：

- very light paper grain
- halftone
- subtle dither
- thin dots

强度极低。

原则：

> texture should be discovered, not noticed first.

---

# 14. Border / Radius / Shadow

## Border

主要使用：

- 1px
- 0.5 opacity
- dashed technical border

## Radius

整体偏小：

```text
0–6px
```

避免典型 SaaS 16–24px 大圆角。

## Shadow

极少。

主体结构依靠：

- contrast
- spacing
- line

而不是 shadow。

---

# 15. Do / Don’t

## DO

- 大标题表达关键判断
- 一张图只讲一个系统问题
- 动画解释因果
- 真实 Production UI 做 Evidence
- 使用模块 / 状态 / dependency 的统一语法
- 技术细节逐级下沉
- 保留大量负空间
- 状态色语义统一

## DON’T

- 首页堆满影视术语
- 用 20 个 feature cards
- 把所有内容做成 dashboard
- 为科技感使用 neon / glow
- 模块化视觉暗示不存在的通用 Plugin API
- 动画只为了“酷”
- 把 Qt UI 重新伪造成不存在的新工具
- 大量代码做装饰
- 过量 dotted particles

---

# 16. Implementation Recommendation

建议技术栈：

```text
Astro / Next.js
+
GSAP ScrollTrigger
+
SVG
+
CSS
```

主力：

- DOM
- SVG
- GSAP

必要时：

- Rive：复杂 state machine / interactive micro-diagram
- Canvas / WebGL：Hero 或单个高价值效果

原则：

> 不为视觉效果引入不必要的 3D / WebGL complexity。

---

# 17. Design Tokens — Draft

```css
:root {
  --paper: #F2EFE6;
  --paper-soft: #E8E4DA;

  --ink: #111210;
  --ink-soft: #292B28;

  --line: #B8B4AA;
  --muted: #77776F;

  --state-loaded: #72C99A;
  --state-ready: #E0A44B;
  --state-lost: #C8645A;

  --radius-small: 4px;
  --line-thin: 1px;
}
```

这些 Token 是视觉方向起点，不是最终生产值。

---

# 18. 视觉验收标准

完成 Wireframe / Prototype 后，必须检查：

### 非影视技术读者

90 秒后：

- 能否说出系统解决什么？
- 能否理解 Module / State / Compatibility？
- 是否被影视缩写卡住？

### Pipeline 读者

- 是否仍然能进入 Evidence 验证真实机制？
- 是否觉得概念图过度包装真实能力？

### 视觉层

- 去掉所有动画后，结构是否仍成立？
- 去掉真实 UI 后，是否仍能理解系统？
- 加回真实 UI 后，是否明显证明系统确实落地？

如果三者都成立，视觉设计才算成功。

---

# 19. Final Art Direction Summary

## WEFT / PPL

### Visual Identity

> **Technical Editorial Poster System**

### Experience

> **Production Manual in Motion**

### Graphic Language

```text
Big Typography
Thin Technical Lines
Wireframe
Exploded Layers
Modules
Dependency Paths
State Colors
Stipple / Halftone Texture
Real Production Evidence
```

### Motion Language

```text
Decompose
Connect
Split
Assemble
Merge
Resolve
Update
```

### Core Principle

> **The website should not decorate the system.  
> The website should make the system visible.**
