# WEFT / PPL 开发交接：用户偏好、已确认行为与问题记录

**最新交接入口：** [2026-09-20 开发交接](WEFT_PPL_Development_Handoff_2026-09-20.md)，汇总本轮最终卡片结构、交互、首页首帧修复、灰色前缀展示和 GitHub 发布边界。以下历史记录保留。

## 最新接续补充 · 2026-09-20 / Card 结构冻结

- 用户原文保存在 `WEFT_PPL_Chapter02_Card_Structure_Freeze_2026-09-20.md`。四卡改为 Decision → Before / WEFT / PPL → Project Example 的纵向三段；MODEL DIAGNOSIS 合并至 Before，System Shift 为标题区的一行，覆盖此前四象限布局。
- 保留固定卡片、正文内部滚动、固定卡头/底部、循环切换。新增 `src/content/decisionCards.ts` 提供 Before 结构、问题、设计结论和示例标题；`DesignPage.tsx` 共用三段模板。
- 图与示例对齐：模块为 Camera / Set / Character A RigCache / CFX / Character B RigCache；状态为 A v002→v003、B v001、Camera v003。JSON Camera 保持独立字段，未照抄为 rigcache 子项；文件名进入记录切换按钮。READY/LOADED 和五阶段执行序列来自本次用户示意，明确非真实资源状态或运行日志，不等于验证生产运行时。
- 构建成功，Deck/Viewer 8 项通过；原短窗口/移动测试因新增 Before 的 pre 导致选择器歧义，已定位到 Project Example 后单独重跑。完整展开截图 `artifacts/card-freeze-01.png` 至 `04.png` 用于内容评审，实际页面仍为固定高度内部滚动。
- 未提交、推送或部署；最终视觉待用户确认。

## 最新接续补充 · 2026-09-19 / Chapter 02 Decision Viewer

- 首页首帧修正（同日）：旧导出在 JS 未执行时显示完成态 SVG，已通过阻断脚本的浏览器测试复现。MotionFigure.module.css 在支持脚本且无减少动态偏好时定义等待态：Hero 初始化前不显示最终 SVG，Summary 后两阶段不可见；初始化完成后解除，Summary 使用显式 fromTo。已播放标记推迟到异步模块加载及初始化成功之后，避免取消初始化后跳过 intro。Facts 同样在 hydration 前准备打字首帧，停止后显式保留 complete。无 JS、减少动态和编辑模式保留静态内容。构建及 4 项首帧/首次进入/刷新/章节返回/静态回退/Summary 测试通过。旧 Hero 的 7 项录像测试收尾受 spawn EPERM 影响，不能标记整套通过；未部署。

- 最新用户修正：01 左边显示 04、04 右边显示 01，改为循环 Deck，覆盖此前“端点不循环”。侧边、PREV/NEXT、左右键和滑动统一循环，Home/End 仍直达首尾；首尾过渡方向跟随操作方向。

- 用户确认修复导航误触：共享 AutoHeader 桌面收起后仅底部 8px 窄条悬停 300ms 展开，移出取消，移除向下延伸 36px 的整行透明热区。移动端/粗指针使用右侧可见 44px 点击按钮；键盘焦点展开、Escape、编辑和 reduced-motion 保留。新增 header-reveal.spec.ts 验证真实坐标点击四个索引、短暂经过取消、停留展开、键盘与移动开关。该修正作用于共享导航。

- 最新排版调整：用户要求卡内图文更集中、缩小图表。概念图桌面高度改为 210–280px（随视口高度），主标题 28–36px、说明 17px；SYSTEM SHIFT 桌面横向排列，收紧上下区间距。主要论点和完整概念图在上部同一区域展示，下方诊断及 Artifact 保留内部滚动，不保证全部细节一屏显示。移动图最大高度 260px。构建及 5 项 Viewer 回归通过，中英文桌面截图已查看；未部署，视觉待用户确认。

- 随后用户指出四个索引吸顶时覆盖到卡片中间和底部。已取消索引独立 sticky，使索引与卡片一起随外层页面滚动；卡头/底部固定及内部滚动保持。不要恢复独立吸顶而再次横穿卡片。

- 最新用户截图纠正优先于下面历史记录：保留有边框的内部 Card，左右露出相邻卡片。Card 尺寸按视口固定，正文在内部上下滚动；卡头和 PREV / 指示器 / NEXT 不随正文滚动。不是把内容缩小后全部排进一张无边框技术纸。
- 删除“问题，往往出在模型”中间区；Hero 文案、四个索引、Synthesis、下一章与四个深入链接保留。索引和卡片组成桌面一屏；移动端正文纵向排列但仍在卡内滚动。非常矮的窗口保留 480px Viewer 最小高度，页面本身可滚动。
- 原生 overflow-y 滚动，overscroll-behavior-y: contain 防止滚到卡内边界后连带滚动页面；页面外侧仍可滚动离开 Viewer。切换决策后新卡滚回顶部，语言变化不重置决策。左右侧露出的卡边可点击切换；端点不循环。
- 卡内新增 ProductionSpecimen.tsx：简化 USDA（用户本轮授权的逻辑 URI，Mint 高亮 av / step）、资源树、JSON Delta / Current State、执行映射。ArtifactState.tsx 仅控制 JSON 视图，正文继续服务端生成；代码行支持独立横向查看，不应撑宽整个卡片。所有示例明确标注简化，不是生产记录原样导出或真实运行日志；不展示未经证实的 QC INSTANCE / PASS 状态。
- `/in-production/` 的原 ProductionArtifact.tsx 和真实截图未改；USDA 仅核对展示结构，未接入生产 Resolver 或 USD 解析运行时验证。
- 实现入口：DesignPage.tsx、DecisionDeck.tsx、DesignPage.module.css、ProductionSpecimen.tsx、ArtifactState.tsx。新增 tests/design-viewer.spec.ts 并更新原 Deck 回归。最新验证结果见根目录 design-qa.md 的 2026-09-19 补充。
- 本轮没有提交、推送或部署。最终视觉仍待用户确认；已运行的浏览器检查不等于实体手机或生产运行时验收。

更新：2026-09-18（首页蒲公英迭代、Design Decision Deck 与 Systematic Thinking 后续修正补全）。保留原文件名与历史记录；包含 Hero 蒲公英、Summary 提速、资产版本间距、公开文案，以及完整 02 章节的最新决定、实现入口和验证边界。来源为用户明确指示、当前代码及实际验证记录；其他任务的验证单独注明来源。本文用于接续本项目，不将观察推断为其他项目偏好。

**接续摘要：** 新会话先读第 **19–24 节**，再按需读历史章节。首页 Hero 已换为程序化蒲公英种子，最新要求是杆长再增加 30%、数量再减少 25%，伞冠不变；Summary 仍用原细胞形态，播放速度为原来的 1.5 倍。首页 Transform 视图旧白色 v1 左移已落实，新绿色 v2 和连接端点已右移。用户可见主标题改用 IN PRODUCTION / HOW IT WORKS IN PRODUCTION。Systematic Thinking 已实现；本轮修复了主页与章节之间整页重载造成的旧画面闪现，并补齐图表首帧隐藏、按模块顺序展开、术语、DCC 图标与滚动速度规则（详见第 24 节）。Design & Innovation 已改为四个并列决策、一次显示一张海报的 Deck，复用全站导航，底部四入口索引已删除，卡片内生产内容和 `/in-production/` 四锚点仍保留。章节最终视觉仍待用户确认。本次请求仅更新交接文档，不新增提交、推送或部署授权；旧发布记录不代表本轮已发布。

## 1. 新会话先读什么

1. 根目录 [AGENTS.md](../AGENTS.md)，再读本文和 [技术规范 V2.2](WEFT_PPL_Website_Technical_Implementation_Spec_V2.2.md)。
2. 检查当前 Git 状态和代码，再读 [IMPLEMENTATION.md](../IMPLEMENTATION.md) 中相关模块的记录。不要重建工程或覆盖已有成果。
3. 涉及视觉时打开 [最终参考图](../ref/final.png)，同时参考本文记录的用户后续明确修改；不要恢复已被用户取消的设计。
4. [README.md](../README.md) 提供启动和静态预览方法。`artifacts/` 包含不同时期截图，文件名相似不代表都属于当前实现；必要时重新截图。

权威顺序：用户最新明确指示 → AGENTS 中记录的决定 → V2.2 与相关来源。本文中的实现参数描述当前代码，并非未经用户允许就不可调整的永久规范。历史日志保留当时情况，不覆盖后续修订。

## 2. 合作习惯与偏好

### 用户明确表达的工作方式

- 直接实现，给出可评审的真实页面，不停在计划或能力说明。
- 在现有代码上小步调整，不重做已经认可的部分，保留已有文件和无关修改。
- 字体、布局和动画参数可以先自行判断；实质性的范围、事实内容冲突再询问。
- 重视实际浏览器效果，会用截图、箭头、圈选和简短反馈逐项修正。需要理解标记对应的具体元素。
- 视觉最终由用户确认。不能把自动化检查通过写成用户已经验收。
- 报告简洁：改了什么、实际验证了什么、还有什么未验证；不要堆日志或把占位内容当成完成。
- 早期实施曾与原主任务分工；接续时不要假定另一个任务仍在管理本项目。没有明确授权时，不向其他任务发送指令、创建额外任务或主动分派子代理。

### 从本次反复反馈归纳的项目偏好

- 更看重忠实还原、比例和自然质感，而非重新发明视觉方向。
- 喜欢能明显感知的呼吸、聚合和鼠标反馈；“克制”不等于几乎看不到。
- 喜欢有节奏的机械打字：逐字、有光标、速度不完全均匀、组间有停顿。
- 喜欢连续的距离反馈：越靠近鼠标，变化越明显，而非整块统一放大。
- 重视首屏完整性、板块在一屏内的组织、分隔线之间的关系；不喜欢文字被装饰遮挡。
- 希望常规视觉修改快速落地。可根据上下文做合理选择，但不要把推测原因当成已经证实的原因。

## 3. 当前不可误读的项目边界

- 名称统一为 **WEFT / PPL**。原 V1 为首页六区；Systematic Thinking 已实现。当前另一个开发任务已实现 Design & Innovation 与 `/in-production/`，来源与边界见第 21 节；What Comes Next 和旧 `/evidence/` 仍未开放。
- 导航是页面导航，不是首页锚点。保留真实路由；`/in-production/` 已有内容不等于旧 `/evidence/` 已实现或重定向，不要擅自合并二者。
- Master Canvas 的视角按钮切换预览，单独的 EXPLORE 才导航；四种模式使用同一张图。
- Next.js App Router 静态导出；React、TypeScript、CSS Modules、GSAP、SVG、Canvas 2D。正文继续由 Server Components 提供。
- 临时文本编辑对所有访客开放，仅内存覆盖，不接 CMS / 登录 / 后台，也不写浏览器存储或仓库。正式来源仍是 `src/content/home.ts`。
- 生产截图已由用户提供并接入：Shot Builder、Publish 的原型和最终实现。用户明确确认这些截图中的项目、镜头、资产名称可以公开，保留原图；这覆盖早期针对这些素材的脱敏要求，但不授权公开其他敏感资料。不编造 UI、数据、系统能力或贡献归属。联系邮箱未提供。
- 当前仓库为 [Ace199/WEFT_PPL_Presentation](https://github.com/Ace199/WEFT_PPL_Presentation)，工作分支 `main`。Git 推送不等于 GitHub Pages 上线；当前未配置或完成网站部署。

## 4. 已确认的最终视觉和交互

### Hero：首屏与蒲公英粒子（覆盖早期细胞图约定）

- **导航 + Hero 铺满首屏，下方 Summary 不应露头。** 用户最后澄清了这个目标；不要回到“整体负 margin 上移一个导航高度”的中间方案。
- Hero 高度按视口减实际导航高度计算，导航换行时用 ResizeObserver 更新；极矮窗口保留内容最小高度，允许滚动以避免遮字。
- 早期 Hero 使用不规则细胞；用户后来要求换成**蒲公英种子**。杆长、伞冠、整体大小及朝向存在独立差异，不是同一图形机械等比复制。只修改 Hero；Summary 保留原细胞。最新参数和迭代顺序见第 19 节，不恢复早期“外围不能有大细胞”的 Hero 约束。
- 已移除左侧标题下的大背景簇，在标题右侧补紧凑簇。现有八簇布局已多次调整，不随意重新撒点。
- 入场从整个 Hero 画布随机散落开始，先慢后快聚成簇，再进入连线 / Resolve。日常呼吸不依赖鼠标移动，各簇周期、相位和幅度不同。
- 鼠标周围圆形影响区中，细胞越近越大；接近整个簇时，细胞还向远离簇中心的方向舒展。有绿色节点的簇同时增强绿色饱和度与 Bloom，移开平滑恢复。
- 灰色底层连线和绿色节点连线都是曲线，灰色连接较密。保留当前灰色连接到新增簇的关系。
- 左侧全部文案（标题、副标题、说明、底部信息）按**单字**距离放大，不是整体标题缩放。
- 用户明确取消页面所有装饰“+”裁切标记，因其遮字。参考图虽有“+”，也不应恢复。
- Bloom 是用户明确授权的例外，不要依据早期“避免装饰发光”条款擅自删除。最新要求把范围加倍，代码两层模糊半径为 **8px / 24px**，透明度仍随接近程度变化。

### 导航

- Hero 阶段展开。Summary 的顶线接触导航底线后，导航按继续滚动的距离逐渐上移，直到只剩白边；向上滚动反向展开。
- 不是“完全离开 Hero 后等 800ms 自动收起”。800ms 仅保留给手动展开后移开鼠标等收尾逻辑。
- 白边当前桌面 8px、窄屏 10px。鼠标移入、触屏点击、键盘进入仍可展开。
- 右侧三条状态文字向上交替轮播，用户要求**去掉暂停按钮**，悬停和点击也不暂停。不可见或文档隐藏时可暂停无用绘制；编辑 / reduced motion 保持静态信息。
- 必须验证刷新后的第一次滚动，以及鼠标先经过导航再离开的路径，不能只验证已经滚动过的页面。

### Summary、Master Canvas 和页脚

- Hero 和 Summary 职责不同：完整 Fragmented → Structured → Coordinated 只在 Summary 表达。
- Summary 进入后延迟播放，阶段间有明确停顿，完成后保持。第二簇起始 opacity 必须为 **0**，不是 0.15 的淡影。
- “同一个系统，三个观察角度”默认桌面布局应在一屏内看全，包括标题、图形、视角控件和折叠说明入口，并预留导航空间。
- 移动端保持可读的纵向结构；展开模型文字说明允许向下增加高度，不把展开内容也强行塞入一屏。
- 三条指引斜线已统一长度、线宽及斜向，和文字块留间隔；它们是装饰指引，不是新系统关系。
- Hero 底部三项标签机械打字，标签之间停得更久；Production 四行事实也打字，但比 Hero 快。
- 页脚 PEOPLE / DATA / SOFTWARE 三圆至少一半进入视口后，等待 **1.5 秒**再播放。初次等待不被鼠标提前打断；之后鼠标重新移入即重播，键盘 Enter / Space、触屏点击也可重播。
- 所有自动动画在 reduced motion 下仍应保持完整可理解的内容。临时编辑时减少干扰，卸载时清理动画、监听和待执行帧。

## 5. 参数与代码入口

以下为当前实现取值，调整时先检查代码，避免把历史记录当现值。

| 模块 | 当前参数 / 行为 | 主要文件 |
| --- | --- | --- |
| Hero 蒲公英、曲线、簇布局 | 固定随机种子；独立杆长 / 伞冠；八簇布局不变，最新参数见第 19 节 | `src/components/Diagrams.tsx` |
| Hero 连续反馈 | 鼠标半径约 84px，局部细胞最多约 2.2 倍；簇舒展约 48%；Bloom 8 / 24px | `src/components/hero-boot.ts` |
| 单字放大 | 半径约 84px，中心最多约 1.22 倍 | `HeroTextMotion.tsx`、`GlyphText.tsx` |
| Hero / Production 打字 | Hero 字间 65–170ms、项间 1150ms；Production 字间 28–75ms、行间 600ms | `HeroFactsMotion.tsx` 与 CSS |
| Summary | 原时间线初始 / 间隔各 1 秒，过渡 0.5 / 0.65 / 0.85 秒；整体 `timeScale(1.5)`，实际总时长约 3.33 秒 | `MotionFigure.tsx` |
| 页脚三圆 | 初次等 1.5 秒；两侧圆偏移 ±16，过渡 0.65 秒；重播复用时间线 | `footer-motion.ts`、`MotionFigure.tsx` |
| 首屏尺寸 | 实际导航高度 + 视口剩余高度 | `src/app/page.module.css`、`AutoHeader.tsx` |
| 导航收起与轮播 | 边界跟随、手动展开、连续状态轮播 | `AutoHeader.tsx` 与 CSS |
| Master Canvas | 独立 composition 定位区；details 在其后正常排版 | `MasterCanvas.tsx` 与 CSS |
| 本地文案 / 试编辑 | 稳定字段 ID、纯文本、只复制真实差异 | `src/content/home.ts`、`src/components/editor/` |

## 6. 开发中出现的问题和应吸取的教训

| 问题或误读 | 原因 / 修正 | 下次检查 |
| --- | --- | --- |
| 导航被做成首页锚点 | 把“只有首页完整内容”误当作“所有导航只能页内滚动”；改成实际路由和明确未开放页 | 导航点击应改变 URL，不能切换 Canvas 冒充导航 |
| 细胞效果不像参考图 | 从等大圆点到任意随机大小，再到过分规则排列，都没有抓住自然组织的间距与径向大小关系 | 看参考细部及实际截图，不只检查“大小不相同” |
| 鼠标文字放大理解成整段放大 | 用户要所有左侧文字按距离逐字变化 | 不变更排版宽度；保留真实正文和无障碍整句 |
| 模型说明展开后重叠、03 移位 | 绝对定位元素参照了包含可变 details 的整区高度 | 独立 composition 坐标系，说明在正常流中；四模式开合均测 |
| 桌面画布超过一屏 | 固定最小高度叠加随宽度增长的图形高度；1440×800 曾实测 1136px | 同时检查宽度和高度，不能只测 1440×1000 |
| Hero “上移”误解 | 初步按负 margin 移动，后来用户明确目标是首屏填满 | 以最终澄清为准；不要仅消除上方空白却露出下一区 |
| 刷新后导航不随边界收起 | Hero 内 hover 设置 revealed=true，离开时 retire 因 inHero 提前返回，未释放状态 | 新增“刷新→经过导航→移开→首次滚动”回归；常驻和手动展开分离 |
| 键盘操作导航意外把页面滚回 Hero | 全局 scroll-padding-top 对 sticky 控件聚焦产生额外滚动 | 保留导航控件的 scroll-margin 抵消；检查真实 Tab 与 scrollY |
| Playwright 触屏点击白边误导结果 | locator.tap 会自动滚动目标，实际先回到 Hero | 测可见白边用真实视口坐标触控，不能误判为产品错误 |
| Summary 第二簇预先有淡影 | GSAP from 的 opacity 为 0.15 | 等待期检查 computed opacity 为 0，再看播放和最终态 |
| Summary 动画延迟测量不稳定 | 断言默认退避可能很晚才观察到阶段结束；字体加载也改变触发位置 | 先等待字体，用密集轮询或页面内时间采样，不能为迎合测试随意改动画 |
| 快速切换时读取到新状态、旧几何 | React 更新和 GSAP 应用不是同一观察时刻 | 等待实际几何稳定并检查命中对齐，不只看 data-mode |
| 提交前两项测试在保存截图时失败 | 文件写入报 UNKNOWN，未确定环境原因；未修改产品代码，定向重跑均通过 | 区分产品断言与截图 / 录制工具错误；记录重跑，不谎称首次全绿 |

排查顺序：先复现用户完整操作路径 → 分别检查状态、几何与动画归属 → 做最小修正 → 在真实静态导出上验证。不要用不断增加延时掩盖状态问题。

## 7. 验证与运行注意事项

- 本次实际工作目录为 `D:\SYCP_PPL\work_report`。历史章节开发曾位于 `C:\Users\63201\Documents\prj\WEFT_PPL_Presentation`；接续时以工具提供的实际 cwd 为准，不把历史绝对路径当成当前路径。
- `npm run dev` 使用 3000；`npm run build` 导出到 `out/`；`npm run preview` 在 4173 读取导出结果。**改源码后刷新 4173 不会自动更新，必须先重建。**
- Playwright 使用本机 Edge、单 worker，直接测静态服务器。带录像的检查可能需要工具的沙箱审批；审批失败不能记作测试通过。
- 功能检查覆盖小屏、键盘、触屏、reduced motion、快速切换、编辑隔离、纯文本安全和清理；新增问题优先加入真实复现路径。
- 性能数据是本机实验室结果，不是真实用户数据；记录视口、浏览器、限速和录像条件。查看 `artifacts/performance.json` 的当前内容，不沿用旧数字宣传。
- 完整验证结果随本次提交前检查记录更新在 IMPLEMENTATION；历史记录里的“未推送”指当时状态，不能据此判断当前分支未同步。
- 早期交接曾记录：51 项全量首次 49 项通过、2 项截图写入失败；两项定向重跑通过。该结果早于本轮新增功能，不可当成当前全量测试通过。最新定向验证见第 12 节；未验证实际线上部署。

## 8. 尚未完成 / 不能声称完成

- 真实截图已经接入；正式内容验收、最终截图呈现和动画的用户整体验收仍未完成。
- 用户最终整体视觉确认、真实 30–60 秒读者理解测试。
- 实体手机、其他浏览器及低性能设备的实际体验验证。
- GitHub Pages 的真实站点配置、部署、实际子路径的线上刷新和资源检查。此前本地模拟子路径不等于线上验证。
- 联系邮箱及有真实目的地的联系入口。

推送前核对当前改动和目标仓库，不强推，不删除用户文件。首次 Git 代码检查点是 `0a1eb5e`；本次后续代码、测试、截图和本文一起形成新的交接检查点。实际提交号与远程同步以 Git 核对结果为准。

## 9. 本轮明确的用户决定与当前进度

### 首页信息密度与合作方式

- 用户明确：首页只是大致介绍 PPL，想了解更多应进入各自板块，因此不要把首页做得很复杂；先实现一版，再按实际效果修改。
- 本节历史范围已被后续开发覆盖：Systematic Thinking 已实现；Design & Innovation 和 In Production 的当前进度见第 21 节。What Comes Next 与旧 Evidence 路由仍是占位页。规划文档本身不自动授权扩大范围。
- 用户通常逐项反馈，最新纠正优先于前一句。例如导航语言开关最终在右侧；旧版资产最终要求向左移动，而不是先前口误的向右。
- 不把概念示意当成生产证据。系统图可以程序化绘制；生产 UI 使用用户真实截图，不用 AI 重绘。

### Summary 与 Master Canvas

- Summary 第一幅是离散成果、第二幅是两个簇，第三幅底层灰色关系线应为曲线。
- 三视图方向来自 `ref/mid_1.png`、`mid_2.png`、`mid_3.png`，只是示意，不照搬错误标签和相机视锥。
- 已加入程序化相机、场景和折叠点阵曲面，采用共享投影；用户后来明确否定角色形态，要求恢复布料式曲面，但文字叫“资产”，不叫“布料”或“角色”。
- 01 为独立模块 → 共享组织 → 工作空间；02 强调只更新资产、保留相机和场景；03 保留现有结构，虚线表达未来方向，并有切换过渡。各视图复用同一场景。
- 02 右侧要求从白色 v1 原形态变成新的绿色形态，已加入形态与颜色过渡。绿色新资产应鲜亮，不能一直是暗淡线条。
- 02 左侧要求先显示大的白色 v1，在当前主位置开始；之后移到左侧原来 v1 的位置，变小变淡但保留，不是淡出消失；新绿色资产出现。**当前已落实左移；绿色 v2 也已右移拉开间距，见第 20 节。**
- 模型标签与下方 CONTEXT / PRODUCT / VERSION / DEPENDENCY / STATE / VALIDATION / RESOLUTION / COMPOSITION 已补双向联动：悬停/聚焦检查，点击固定选择，关联对象与路径强调，说明随选择变化。不要退回仅按钮变色的孤立交互。

### 双语导航

- 导航右侧增加 `中 / En`，切换页面语言；“中”使用与整体中文一致的字体。
- 导航左右留 padding，状态轮播区域往右侧靠，与右端语言开关一起排布；用户所说“滚动条”对应截图中的 STATUS 轮播区域，不是浏览器滚动条。
- 已加入语言 Provider 和翻译字典，`document.documentElement.lang` 随之变化。后续用户明确要求全局偏好：仅将 `zh` / `en` 存入 localStorage 的 `weft-ppl.language`，跨页和刷新恢复，并响应跨标签页 storage 事件。存储不可用时仍支持当前页切换。中文为服务端初始值，找不到英译回退原文；临时文字修改仍只在内存。

## 10. Production Proof：素材、裁剪与最终交互约定

### 素材及授权

| 工具 | 用户原型 | 用户最终实现 | public 对应文件 |
| --- | --- | --- | --- |
| Shot Builder | `ref/shot_builder_orig.png`，1166×779 | `ref/shotbuilder_final.png`，1122×879 | `public/images/proof/shot-builder-prototype.png`、`shot-builder.png` |
| Publish | `ref/publish_ori.png`，451×676 | `ref/publish_final.png`，563×913 | `public/images/proof/publish-prototype.png`、`publish.png` |

- public 文件保留原始图像内容；裁剪是显示层处理，不覆盖原图。项目、镜头、资产名称已获用户明确公开授权。
- 首页仍为简洁的两张真实工具截图和短说明；可见入口文案已改为 IN PRODUCTION / HOW IT WORKS IN PRODUCTION，首页原 `/evidence/` 目的地仍是未开放页。不要把文案替换误记成目的地已完成。

### 大图查看器

1. 点击首页截图，打开大图，**先显示原型**。
2. 点击大图，反向溶解成字符，字符铺满整个图片显示区域；短暂停留后再溶解成最终实现。不是整个浏览器页面都变成字符。
3. 再点击最终图，回到原型；每次重新打开均从原型开始。
4. 不显示图外标题、状态文案、重看按钮等多余说明，也不要右上角 X。保留屏幕阅读器标签与状态；加载失败可以显示重试提示。
5. 点外部遮罩或按 Escape 关闭；关闭恢复页面滚动并返回原缩略图焦点。键盘 Tab / Shift+Tab 留在弹窗内。
6. 边缘用细密点状外框，当前 padding 10px、点阵周期 3px。不是厚重卡片或巨大背景留白。
7. reduced motion / 正在编辑时直接到最终图；取消、关闭或卸载应清理 RAF，异步图片解码不能在关闭后继续播放。

### 裁剪规则（后来的用户纠正覆盖早期居中裁切方案）

- 裁掉顶部白色标题栏，不通过居中放大裁掉上下重要内容。
- 每组原型和最终图的显示框相同，切换不能跳尺寸；以最终图去掉顶部后的比例为准。
- 原型按比例完整放入该框，不够的区域**补白**，不拉伸也不继续裁掉工具内容。
- 当前顶裁像素：Shot Builder 最终 33px、原型 14px；Publish 最终 32px、原型 41px。参数针对当前四张素材，不是通用截图识别算法；换素材必须重新测量。
- DOM 静态图与 Canvas 过渡中间帧使用相同裁剪/适配规则，避免动画开始或结束跳动。

### 字符动画最新参数

- **只使用 `*#+` 三个字符。** 不恢复字母、数字、括号等旧字符集。
- 格子 8×12 CSS px，字体 11px monospace，DPR 上限 2。
- 前段填满 650ms（原为 850ms，用户要求稍快），纯字符保持 300ms，后段溶解 950ms，总计 1900ms。
- 字符在原位独立随机变化，各格相位和更新节奏不同；用户不想要看上去整体往上滚动的效果。
- 溶解洞减少并放大，使用低频平滑噪声形成连续大块区域，不是密集孤立小像素洞。当前噪声以 14×9 字符格为尺度。
- `data-phase` 为 encode / code / decode；全字符保持阶段是有意保留的，不应直接交叉淡化两图。

## 11. 新增或主要修改的代码入口

| 事项 | 文件 |
| --- | --- |
| 共享生产示意与 01/02/03 动画、点击检查 | `src/components/ProductionScene.tsx`、`ProductionScene.module.css` |
| 程序化资产与投影 | `src/lib/production-geometry.ts` |
| 三视角、模型联动、固定选择 | `src/components/MasterCanvas.tsx`、`MasterCanvas.module.css`、`src/lib/canvas-state.ts` |
| 双语 Provider、开关、翻译 | `src/components/Language.tsx`、`Language.module.css`、`src/content/translations.ts` |
| 导航位置与双语接入 | `src/components/AutoHeader.tsx`、`src/app/layout.tsx` |
| 大图弹窗、裁剪、字符转换 | `src/components/ProofImage.tsx`、`ProofImage.module.css` |
| 首页 Proof 接入与样式 | `src/app/page.tsx`、`page.module.css` |
| 截图路径、尺寸、alt、短说明 | `src/content/home.ts` |
| 新功能回归 | `tests/production-scene.spec.ts`、`scene-linking.spec.ts`、`language.spec.ts`、`proof.spec.ts`、`proof-dialog.spec.ts` |

`page.tsx` 仍是 Server Component，通过客户端小组件加入交互；不要为语言或图片动画把整页改成 Client Component。当前工作树包含大量修改和未跟踪源代码、素材、测试、截图，均应保留。未跟踪文件不等于可删除临时文件。

## 12. 本轮问题、验证结果与环境限制

### 问题与经验

- 旧字符变化公式造成相邻格序列相关，视觉上像文字往上走；现改为每格独立种子、相位和更新周期。要看真实运动而不是仅检查是否用了 random。
- 早期逐格阈值产生太多碎洞；改成低频平滑噪声控制遮罩，让连片区域生长和消退，字符本身仍可密集。
- 初版大图有标题、按钮、X 和大块图外留白，用户逐步要求移除；不要为“完整弹窗结构”加回来。
- 居中 cover 裁剪与用户要去顶部白边不一致；改为顶部定量裁切、最终图定比例、原型白色补边，并对齐 Canvas 与 DOM。
- 原生 dialog 在自动化中曾出现 Tab 焦点离开问题；现有显式首尾焦点循环，不要删掉后只相信原生行为。
- 300ms 全字符阶段可能被测试默认退避轮询错过；`proof-dialog.spec.ts` 使用 20ms 轮询读取 phase。这是测试采样问题，不应为了测试擅自延长用户动画。
- 当前环境带录像的部分测试曾因缺少 FFmpeg 无法启动；不能据此判产品失败，也不能声称整套测试已通过。

### 已实际完成的定向验证（记录此前执行，不是本次文档更新重新跑）

- 最新三字符与提速修改之后：`npm run build` 通过；`npx playwright test tests/proof-dialog.spec.ts` **2 项通过**。
- 前一轮裁剪修改：构建及 Proof 相关 **5 项测试通过**（3 项响应式缩略图 + 2 项弹窗）。
- 覆盖两组图原型先开、全字符阶段、最终图、前后框尺寸一致、重置、动画中 Esc、重开、焦点返回、遮罩关闭、滚动恢复。
- 移动端 390×844 reduced motion、Tab 焦点限制、中英弹窗名称检查；针对 dialog 的 axe WCAG2A/AA 检查通过。这不等于全站无障碍审计。
- `artifacts/proof-symbol-transition.png` 是全字符阶段截图；`artifacts/proof-dialog-mobile.png` 是移动端最终图。截图按测试时间理解，不保证包含以后修改。
- 本轮没有重新完成全站测试、真实性能测试或线上部署验证。视觉最终仍由用户确认。

### 当前工具环境注意

- 4173 是静态导出预览，改代码后需 `npm run build` 再刷新；刷新本身不编译源码。
- 本轮普通沙箱命令曾报 `helper_unknown_error: setup refresh had errors`，通过明确范围的审批执行继续完成工作；这是环境限制，不是项目代码错误。新会话先尝试正常工具，不默认所有环境仍失败。
- 普通 apply_patch 工具同样曾受沙箱影响；当时通过本机 Codex 可执行文件的 `--codex-run-as-apply-patch` 执行补丁。继续使用补丁机制修改源码，不用 shell 字符串重写整文件；具体二进制路径随版本变化，应现场确认。
- `view_image` 同样可能受环境影响；此前采用只读读取 PNG 字节后内联查看，未改动原图。

## 13. 给下个会话的待办与不可误报事项

1. **历史待办已关闭：02 左侧 v1 向左移动。** 当前动画终点、quiet/reduced 静态位置及 JSX 均使用 `translate(161 435) scale(.45)`。不要按旧记录重复修复；后续新绿色 v2 右移参数见第 20 节。
2. Proof 的历史请求已完成；后续用户授权的 Systematic Thinking 实施见第 15–18 节。不要据此自动重做首页或开发其他章节。
3. 中英、三视图联动、导航排布、03 过渡等已实现，但本次交接只核对关键代码，不代表这些模块全部重新测试或最终视觉验收。
4. 保留第 8 节限制：用户整体确认、真实读者测试、实体设备、联系方式、真实 GitHub Pages 配置/部署仍待完成。
5. 此处与第 18 节均为历史发布授权。最新请求只更新本文；本轮脏工作树尚未提交，不继承旧授权自动推送。

## 14. 交接之后的 GitHub 发布授权与检查

- 用户随后明确要求“帮我发布到 github 上”，授权本轮提交和正常推送；这覆盖上文当时“未提交、不自动推送”的状态，但不授权强推或删除文件。
- 发布前执行 `git fetch origin`，当时 HEAD 与 origin/main 无领先或落后提交。当前项目文件、素材、测试与交接文档纳入发布，保留已有改动。
- 发布前重新执行 `npm run build`，通过；执行 `npx playwright test tests/proof.spec.ts tests/proof-dialog.spec.ts`，**5 项全部通过**。
- 检查未发现仓库内 GitHub Pages workflow，本次以提交源码到 GitHub 为范围，不宣称网站已上线。实际提交号和推送结果以 Git 记录及本轮最终回复为准。

## 15. 2026-09-18：完整 Systematic Thinking 章节

### 范围、来源与结构

- 用户要求先阅读 `WEFT_PPL_Section02_Systematic_Thinking_V0.2.md` 和本文，再设计动效文档并实现 `ref/final2.png`。已新增 `WEFT_PPL_Section02_Motion_Design_V0.1.md`。后续逐项反馈优先于静态参考图。
- 路由仍由 `src/app/[section]/page.tsx` 分发，Systematic Thinking 使用完整 `SystematicPage`，其余目的地保留未开放页。概念图不构成运行时证据。
- 页面依次为：共享导航 → 动画生产网络 → 深色生产协作问题带 → 三个核心问题 → 深色共享生产语义 → 下一章入口。
- “真正复杂的，是让独立演进的成果始终正确协作。”区域改为深色底，浅色标题 / 正文。
- 问题顺序最终是 **01 / ENFORCEMENT、02 / GRANULARITY、03 / HISTORY**，连同正文和图整体移动，中英文一致。不要恢复中间版本的 HISTORY 第二位。
- 首图标题已移除 `FIG. 01`，保留 `ANIMATION PRODUCTION SYSTEM` 和概念示意说明。
- 首页和章节复用 `SiteHeader.tsx`。`AutoHeader` 支持不同边界 ID：主页 Summary，章节 `systematic-change`；保留首页原有导航收起规则。
- 章节中文及英文均接入 `ChapterText` / `ChapterElement` 和独立翻译字典；切换语言不重启图表入场动画。

### 首张生产图的最终图形约定

| 节点 | 当前表现 |
| --- | --- |
| 创意 | 灯泡入场时一次 0.85 秒淡绿闪光、光线外扩及短促左右轻晃；鼠标每次移入重新播放，不放大 |
| 建模 | 白色静态小人 |
| 材质 / 外观 | 绿衣、灰鞋、白色头部及四肢的静态小人 |
| 绑定 | 骨架；头部与全部关节圆圈用不透明米白 `#fffefa` 填充，保留深色轮廓 |
| 动画 | 朝右的白色小人原地走路；同侧手臂与腿反向摆动，屈膝抬脚及轻微上下起伏；步态周期 1.2 秒 |
| FX / CFX | 19 朵线条小花，错峰不断绽放、放大、淡出 |
| 灯光 | 太阳形状，保留原图标 80% 尺寸；不要恢复灯泡或球体 |
| 渲染 | 框内绿白灰小人原地走路，背后有线条小花；镜头行及后期行两处渲染统一使用 |

首页 Master Canvas 仍使用点阵折叠曲面“资产”，不要把本章节的小人替换到首页。

### 展开顺序与悬停

- 首图从节点 → 连线 → 下一节点依次展开；分叉同级节点可同时显示，汇合节点等待输入连线。前期 → 资产 → 镜头 → 后期，不再整组图标同时淡入后才出现箭头。
- 模块至少 15% 进入视口后等待 0.5 秒。首图共 31 步，步间隔 0.3 秒，节点淡入 0.22 秒，连线绘制 0.28 秒，尖端到达时再显示，总时长约 9.72 秒。其他图保持各自原节奏。
- 动画小人、花朵、渲染在各自节点 `data-entered` 时启动，不等待整图 `data-motion=complete`。离屏及页面隐藏时暂停，回来继续；入场只播一次，完成后保持。
- **保留 2 倍悬停放大的仅有：建模、材质 / 外观、绑定、布局 / 相机、动画、FX / CFX、两处渲染，共 8 个图标。** 放大围绕原节点中心，文字与箭头不动，移开恢复。
- 第一行所有图标，以及资产设计、灯光、合成、调色、最终交付均不放大。创意只有闪光 / 轻晃重播。
- hover 缩放只在支持悬停的精细指针设备启用；灯泡触屏不触发 hover 重播。reduced motion 下图完整静态展示，不播放闪光、步态、花朵或入场；悬停缩放去掉过渡。

## 16. 本轮代码入口与排查经验

| 功能 | 文件 |
| --- | --- |
| 章节内容 / 布局 / 顺序 | `src/components/systematic/SystematicPage.tsx`、`SystematicPage.module.css` |
| 流程与问题 SVG、节点选择性放大 | `Illustrations.tsx`、`Illustrations.module.css` |
| 可见性、半秒延迟、逐节点入场 | `Reveal.tsx` |
| 白色 / 彩色小人与朝右步态 | `Character.tsx`、`Character.module.css` |
| 线条花朵与绽放 | `Flowers.tsx`、`Flowers.module.css` |
| 灯泡悬停重播 | `IdeaBulb.tsx`，仅此交互为小型 Client Component |
| 章节双语 | `ChapterText.tsx`、`src/content/systematic-translations.ts` |
| 全局语言及共享导航 | `src/components/Language.tsx`、`SiteHeader.tsx`、`AutoHeader.tsx`、`src/app/page.module.css` |
| 路由与入口说明 | `src/app/[section]/page.tsx`、`src/content/destinations.ts` |

表内未写目录的文件均位于 `src/components/systematic/`。

- SVG `<title>` 中嵌客户端翻译子节点曾导致服务端输出 `[object Object]` 和 hydration 418；现由 `ChapterText as="title"` 直接提供标题，不恢复旧结构。
- 人物最初采用正面整体摆动，用户认为像同手同脚；现改侧身分段步态，避免把左右旋转误当成朝右走路。
- 循环曾依赖整图 complete，导致早出现的节点迟迟不动；现按节点 entered 放行，模块可见性仍统一控制暂停。
- 首图顺序变长后，旧 10 秒断言存在超时；相关测试等待完成已改为 15 秒，不为测试压缩用户动效。
- 4173 服务有过停止导致 connection refused，重新启动静态预览即可；不能把服务未运行当作页面代码失败。
- 某些早期测试出现录像 / 截图环境错误，记录真实执行范围。历史截图可能早于顺序、灯泡或填充调整，不能全部当作最终态。

## 17. 2026-09-18 验证与剩余限制

- 每轮实质代码调整均执行静态构建，最后一次绑定填充修改后构建通过。
- 历史定向验证：章节布局 / 双语 / 导航 / 入场延迟 / 无 JavaScript 可读性；语言跨页、刷新、存储不可用；人物与花朵播放、离屏暂停、reduced motion；31 步依赖顺序及节点即现即动。
- 悬停全部图标版本曾实际核对 19 个图标的 2 倍缩放、固定锚点和恢复；随后依用户要求缩减为 8 个，不把此前 19 项结果等同于最终版本全部重测。
- 灯泡实际浏览器检查：连续两次移入均重启闪光、光线、轻晃三段 CSS 动画，reduced motion 保持静态。最后的绑定圆圈填充通过构建，未单独做像素对比。
- 发布前本轮回归结果见第 18 节；不是全站全量测试、真实用户性能测试或用户最终视觉验收。
- 此处当时未处理的首页 Transform 左侧 v1 左移，现已落实；以第 20 节和当前代码为准，不再列为未完成。
- 仍待用户整体验收、真实读者理解测试、实体手机 / 低性能设备验证、联系邮箱以及 GitHub Pages 真实上线配置。

## 18. 本次 GitHub 发布记录

- 用户明确要求完善本交接文件并发布到 GitHub，授权本轮提交和正常推送；禁止强推或覆盖无关工作。
- 目标仓库 `Ace199/WEFT_PPL_Presentation`，分支 `main`。fetch 地址使用现有代理，push 地址为 GitHub 官方 HTTPS；不改远程配置。
- 发布前已成功获取远程状态。项目仍没有 `.github/workflows` 的 Pages 部署配置，`next.config.ts` 保留通过 `NEXT_PUBLIC_BASE_PATH` 指定子路径的静态导出方式。本次发布指源码推送，不宣称网站上线。
- 提交纳入本轮章节源码、共享导航 / 语言、回归测试、动效文档、AGENTS 决策和本交接文件；构建缓存、依赖与测试临时输出不提交。
- 发布前 `git fetch origin` 成功，HEAD 与 origin/main 为 0 领先 / 0 落后。最后一次静态构建通过；本轮运行章节、人物、序列、语言跨页、首页语言及导航共 **15 项测试，全部通过**（约 1.7 分钟）。新生成的章节中英及三种宽度截图纳入提交；测试意外覆盖的旧首页截图恢复原文件。`git diff --check` 通过。实际提交号及推送结果以 Git 记录和本轮最终回复为准。

## 19. 首页 Hero：蒲公英形态与最新偏好

### 参考与范围

- 用户提供的主参考为 `C:/Users/luoxufeng/.codex/generated_images/01a0a80b-657c-74c2-a886-8ea40edac98e/exec-8b4eb94b-6c02-443b-84fc-26d32f66d4ee.png`，以及手绘蒲公英图片 `C:/Users/LUOXUF~1/AppData/Local/Temp/codex-clipboard-0acf9a7d-5e83-4845-829d-33cf9fdede7e.png`。这些是环境路径，临时文件可能失效；不是仓库内生产素材。
- 本轮只换 Hero 的种子形态，不改标题、八簇中心、灰色曲线、绿色节点和连接关系。保留散落 → 聚合 → Resolve、呼吸、鼠标逐粒子放大、簇舒展、Bloom、离屏暂停和 reduced motion。Summary 不改成蒲公英。
- 保留程序化 SVG / Canvas，不把整个图换成 PNG，以维持逐粒子反馈。概念视觉不是生产系统运行时证据，也不能说已逐像素还原参考图。

### 用户逐轮反馈（后一句优先）

1. 初版种子太细、太均匀，整体明显不像参考。用户明确要求杆子长短不一、种子大小不一。
2. 将杆长与伞冠宽度独立随机化，增加伞冠深色连接点；中心更密、外缘更疏，朝向与整体大小有差异。
3. 用户要求伞冠和长度再大一些，实施为两者均增加约 50%。
4. 用户明确要求降低密度、伞冠和杆长再放大约 30%；当轮数量减少约 25%，两者放大 30%。
5. **最新要求：只将杆长再增加 30%、数量再减少 25%；伞冠保持第 4 步大小。** 已实现，不能再次把“杆长”理解成整颗种子一起放大。

密度减少指每簇种子数量减少；长杆会增加线条交叠，因此视觉墨量不一定严格下降 25%。保留用户后续按截图调节的空间，不把这些比例写成不可变设计规范。

### 当前实现参数与入口

`src/components/Diagrams.tsx` 的 `dandelionCloud` / `DandelionCloud` 供 Hero `ResolveDiagram` 使用：

| 参数 | 当前值（未乘单颗整体缩放） |
| --- | --- |
| 数量 | `round(rx * ry / 16 * .75)`；相较最初加密版本 `/12` 约减少 43.75%，不是减少 50% |
| 杆长 | `6.3375 + pow(rand(), .7) * 25.35`，约 6.3375–31.6875 |
| 伞冠 | `4.29 + rand() * 6.63`，约 4.29–10.92；单根绒丝另乘 0.8–1.2 |
| 径向位置 | `pow(rand(), 1.3)`，中心密集，外缘疏松 |
| 单颗大小 | `(.48 + radius * .32) * (.65 + rand() * .95)` |
| 朝向 | 向外辐射为主，叠加独立随机扰动；杆有少量弯曲 |
| 伞冠绒丝 | 9 根；五层 opacity 为 `.65 / .74 / .82 / .9 / .96` |

- 固定随机种子确保服务端输出稳定，不每帧重新随机生成形状。
- 每颗种子保持一个 `M...Z` 闭合轮廓；`hero-boot.ts` 按 `/M[^M]+/g` 切分粒子。不要随意为同颗种子增加多个 `M`，否则会被拆成独立粒子。
- 每簇仍输出五个 `data-cell-size` 层；当前 Canvas 的 `Math.floor(layerIndex / 5)` 依赖这个约定。`data-cell-cloud` 名称保留是内部兼容，不代表图形仍是细胞。
- Canvas 由坐标 / 控制点包围盒中心放置轮廓，不再对所有坐标求平均，以免长杆使居中偏向伞冠。每粒子 `extent = max(width, height) + 2`，图集 tile 按最大 extent × 3 自动计算；32 列，栅格倍率 3。不要恢复旧固定 40 / 48 / 84 tile，长杆可能被裁掉。
- 图集仍以最大轮廓决定统一 tile；继续大幅增加尺寸可能提高内存占用。当前没有图集内存和低端设备帧率实测，不承诺 60fps。

## 20. 同期首页其他已落地调整

### Summary 1.5 倍速

- 用户要求三阶段动画加速到 1.5 倍；`MotionFigure.tsx` 只对 Summary 加 `.timeScale(1.5)`，没有全局加速 Hero、页脚或 Master Canvas。
- 原时间线含等待共 5 秒，实际约 3.33 秒；原 1 秒等待实际约 0.667 秒。保持先离散、再两个簇、最后协同关系，完成后保持。
- 当轮构建和 `tests/summary-motion.spec.ts` 1 项通过；这是此前实际执行记录，本次文档更新没有重跑。

### 02 资产版本间距

- 白色 v1 从 `translate(257 435) scale(.85)` 开始，移到左侧 `translate(161 435) scale(.45)`，变小变淡但保留；普通动画、quiet/reduced 与 JSX 分支已一致。
- 绿色 v2 从之前 x=240 移到 **x=285**，当前 `translate(285 435) scale(.72)`；该模式绿色连接路径起点与圆点同步从 x=343 改为 **x=388**。非更新模式仍为 x=343。
- 用户目的：v1 / v2 不要叠在一起；保持新版本鲜亮。不要重新把旧版本移向右边或做消失淡出。
- 当轮构建和生产场景 3 项测试通过；不是本次文档更新重新全量测试。

### 对外文案统一

- 用户不希望 Evidence / Proof / Verification 作为第一眼看到的主标题，统一用 **IN PRODUCTION** 或 **HOW IT WORKS IN PRODUCTION**，传达“这个设计在真实系统里如何工作”。
- 已替换首页生产区标题、CTA、页脚入口及旧目标页公开标题 / 说明，并更新双语字典及相关测试。旧目标页中文为“真实生产中的实践”。
- 内部仍可称 Evidence Layer；`ProofImage`、内容字段 ID、测试文件名及旧 `/evidence/` 路由不需要机械重命名。真实系统里的校验概念仍可使用 Validation，不是禁用所有技术术语。
- 当轮构建和 Proof / 导航相关定向检查通过；其中 Proof 相关记录为 4 项通过。实际路由是否有完整内容与标题是否更名是两件事。

## 21. 并行开发的当前代码状态（非本轮重新验收）

- 本次核对已有 `src/components/design/`、`src/content/decisions.ts`、`tests/design-deck.spec.ts`，动态路由实际分发 `DesignPage` 与 `InProductionPage`。不再把 Design & Innovation 写成占位页。
- 详细交接见 [Design Decision Deck implementation](WEFT_PPL_Design_Deck_Implementation_2026-09-18.md)。该任务记录用户授权完整 02 章节和单页 `/in-production/`，四个锚点为 compatibility / modularity / state / execution；本次仅读取来源与代码确认，不替其他任务补造授权过程。
- 02 当前结构：Hero → 四个文字索引 → 简短模型判断 → 一个激活的决策海报 → Synthesis → 下一章 → 页脚。用户已移除底部整个 In Production 索引，不恢复。四项是并列决策，不是顺序流程。
- 无自动播放或 hover 切卡；索引、指示器、Prev/Next、方向键、Home/End 与横向触控共用同一选择。约 660ms GSAP 过渡，可中断；语言切换不重置选择，reduced motion 立即切换。
- **验证来源区别：** 该任务记录最终静态构建及 Edge 4 项通过（17.3 秒）；本次交接更新未重新执行该套测试。根目录 `design-qa.md` 当前属于此章节，不再是 Hero 报告，不要覆盖成首页 QA。
- 共享 `SiteHeader` 已关闭自动 Next Link prefetch，原因是静态导出缺失 segment 文件请求；不要未复现就恢复。导航外观仍共用既有设计。
- What Comes Next `/next/` 和旧 `/evidence/` 仍是最小未开放页。`/in-production/` 已实现，但尚未将首页旧入口全部迁移过去；未收到合并路由的明确指示，不在交接更新中擅改。

## 22. 本轮验证、环境问题与下次接续

### 实际验证

- 最后一次“杆长 +30%、数量 −25%、伞冠不变”后：`npm run build` 通过；`npx playwright test tests/hero-dandelion.spec.ts` **1 项通过，18.7 秒**。这是包含多个断言的一个测试，不写成多个独立测试。
- 覆盖：Hero 八簇、Summary 无蒲公英、聚合完成、呼吸、鼠标局部放大、绿色节点 Bloom、移开恢复、离屏暂停、reduced motion 静态回退、390px 无横向溢出、无 pageerror。
- 截图：`artifacts/hero-dandelion-desktop.png`（1888×910）、`hero-dandelion-hover.png`、`hero-dandelion-static.png`、`hero-dandelion-mobile.png`（390×844）。每轮测试会覆盖同名文件，须按生成时间使用。
- 最终桌面局部截图已实际检查长杆、伞冠和连接关系，未观察到图集裁切。没有将所有版本截图永久归档；不宣称与生成参考完全一致或用户已最终验收。
- 本次仅修改交接文档，不重新运行全站测试；上述为刚完成的实现轮验证。仍未测真实用户性能、低端设备内存、实体手机或线上部署。

### 本轮遇到的问题

- 初版仅小幅随机缩放，视觉仍显得细小一致；需要杆长、伞冠和整体尺度各自变化。用户接连要求加大、减密度，以最新数值为准，不恢复中间版本。
- 长杆不能继续沿用固定小图集格子，也不能简单对轮廓全部坐标求平均居中；现采用包围盒与动态 tile。未来换形状仍需验证最大轮廓而不是只看平均种子。
- 首次移动端断言紧接 `setViewportSize` 读取宽度而失败；等待式断言通过响应式排版后稳定。没有为迎合测试修改产品布局；若真实设备持续溢出，应另行复现而非无限延时。
- 本轮内置浏览器、普通终端、apply_patch / view_image 曾受沙箱初始化故障影响。用户明确同意改用项目现有 Playwright / 本机 Edge 检查。后续先尝试当前正常工具；审批范围应明确，不把本次故障视为永久环境规则。
- 带录像的旧测试可能因缺 FFmpeg 启动失败；新 Hero 专项测试不强制录像。不能将未运行的旧套件算通过。
- 大 PNG 通过工具读取可能被截断而无法查看，缩小为内存中的 JPEG 后可用于检查；未覆盖用户原始图片。浏览器截图仍保留 PNG。
- 与另一开发任务共享脏工作树。曾发现 `design-qa.md` 已被其更新为 Design & Innovation，停止套用首页补丁；不能覆盖其他任务报告，或把共享截图 / 文档更新误当作自己的结果。

### 当前 Git 与接续建议

- 本次只读核对：HEAD 为 `5f966a6`（Systematic Thinking 交接提交），origin 的 fetch / push 均为 `https://github.com/Ace199/WEFT_PPL_Presentation.git`。第 18 节代理地址描述属于历史环境。
- 当前有大量未提交修改和未跟踪章节源码、素材、截图、测试、文档。没有执行 fetch / commit / push；不能声称已与远程同步，也不能沿用旧授权自动发布。
- **当前用户请求是更新本文。** 本次不修改产品行为、不提交、不推送、不部署。后续若要求发布，先重新核对差异、目标仓库和静态路径；勿强推、勿删除或覆盖其他任务成果。
- 下一会话先读本节与 AGENTS，再检查当前代码 / Git；需要继续调花时仅改 Hero，核对伞冠是否也在本次需求中，避免误连带缩放。4173 读 `out/`，改源码后必须重建再刷新。
- 未完成事项仍包括：用户整体视觉确认、真实读者理解测试、实体设备和性能验证、联系方式，以及实际 GitHub Pages 配置 / 上线检查。源码已存在或本地构建通过都不等于这些已完成。

## 23. Design Decision Deck：本任务完整交接补充

### 用户最新决定与准确范围

- 用户口头称为「chapter03」，实际页面编号是 **02 / DESIGN & INNOVATION**，路由为 `/design-innovation/`；不要据此改成 03 或改动下一章编号。
- 视觉主参考为仓库内 [ref/final3.png](../ref/final3.png)（860×1828），不是首页的 `final.png` 或 Systematic Thinking 的 `final2.png`。保留 Ivory / Black / Mint、Technical Editorial Poster System、细线图解、Technical Label 和小圆角。
- 用户明确要求「nav 需要和其他 nav 保持一致」：复用 `SiteHeader`，保留同一套章节链接、状态区、语言开关和滚动行为，不另做参考图里的简化导航。章节收起边界为 `design-model`，深入页为 `production-details`。
- 最新截图圈定删除的是 **Synthesis 后整个 IN PRODUCTION 四入口索引区**。已删除；Synthesis 后直接进入 Next Chapter。不要恢复此区，也不要把该请求扩大为删除每张卡内的 IN PRODUCTION 内容、CTA 或独立深入页。
- 最终结构为 Hero → 四个纯文字 Decision Index →「问题，往往出在模型。」及一句说明 → DESIGN DECISIONS / 04（一个 Active Card）→ 黑色 Synthesis → Next Chapter → Footer。没有四张 mini diagram、公共症状表或纵向四篇决策长文。
- 顶部索引、底部指示器、Prev / Next、左右键、Home / End 和横向滑动控制同一选择；首尾不循环。没有自动轮播、hover 切卡或切卡后自动滚页。

### 四项决策的内容底线

| 决策 | 必须保留的模型含义 | 卡内生产表达 / 对应锚点 |
| --- | --- | --- |
| 01 / COMPATIBILITY | 工作继续向前，已发布成果保留兼容历史；Shot A 保留 G2，Shot B 新工作使用 G3，两条都可有效。Mint 不代表只有最新正确 | RigCache USD：本地动画几何 + 逻辑 Surface 依赖 + 兼容约束；`#compatibility` |
| 02 / MODULARITY | 独立模块通过显式组合进入 Workspace，仍保留 Identity / Version / Dependency / State，不重新变成不可拆分的大版本包 | 真实 Shot Builder 资源树、Version、State 节选；`#modularity` |
| 03 / STATE | Previous State + Change / Delta → Merge → Current Full State；主图只高亮变化的 Groom，不以 Validation 作为核心中间步骤 | A / B / Cam 的 Previous Record + Publish Delta → Current Record 简化示例；`#state` |
| 04 / EXECUTION | Rules 分别进入 Builder、Resolution、Publish / QC 执行点，交付检查分 Pass / Fail，不退回普通线性 Pipeline 图 | 真实 Publish / QC 节选；`#execution` |

- 每张卡有自己的主判断、Summary、System Shift、概念图、Surface Symptom / Underlying Cause、生产内容及具体 CTA。公开标题不用 Evidence / Proof / Verification；内部技术命名可以保留。
- 四个 CTA 分别为「查看兼容关系如何落地」「查看模块如何进入工作场景」「查看局部发布如何维护完整状态」「查看规则如何进入执行流程」，全部进入 **一个** `/in-production/` 页面及对应锚点，不创建四个详情页。链接和素材均经 `sitePath` 处理。
- `/in-production/` 已有双语正文、四个真实锚点、较大的生产素材与实现边界说明，但不是独立生产运行时审计。旧 `/evidence/` 仍是占位，不自动重定向或迁移首页入口。
- 概念图和简化记录不是生产原始数据；卡内不展示完整 SY_V1 URI。Task Record、Ani Master Record、显式删除等只在深入页解释。
- Shot Builder 的 Hair 资源出现不等于完整 Hair Assembly 已完成。Publish 原图没有所要求的 QC Instance 标签，保留实际 Collect / QC Context / Pub Context 等内容，不补造 UI 或暗示所有检查通过。

### 代码入口与动画所有权

| 事项 | 文件 |
| --- | --- |
| 四卡双语内容、诊断与具体 CTA | `src/content/decisions.ts` |
| Server Component 页面、卡片正文、Synthesis、下一章及页脚 | `src/components/design/DesignPage.tsx` |
| 活动卡、各入口同步、键盘 / 触控、GSAP 清理 | `src/components/design/DecisionDeck.tsx` |
| 四张概念 SVG 与动效节点 | `src/components/design/DecisionDiagrams.tsx` |
| 真实截图显示层裁剪、RigCache 与 Record 简化结构 | `src/components/design/ProductionArtifact.tsx` |
| 深入页四个锚点及当前边界 | `src/components/design/InProductionPage.tsx` |
| 双语叶子组件 / 响应式与海报样式 | `src/components/design/DesignText.tsx`、`DesignPage.module.css` |
| 路由分发 / 目的地注册 / 共享导航 | `src/app/[section]/page.tsx`、`src/content/destinations.ts`、`src/components/SiteHeader.tsx` |
| 定向回归 / 视觉验收记录 | `tests/design-deck.spec.ts`、`design-qa.md` |

- 正文由服务端渲染，Deck 仅为有界客户端控制器；不要把整页改为 Client Component。语言变化不重置当前选择或重播切换；活动卡本身不持久化。
- 一个 GSAP context 管理切换：旧 Mint 关系变暗、图形横向轻缩至 97%、内容横移约 6%；新内容交叉淡入、线条绘制、节点出现、Mint 关系显现。总时长约 660ms，无 bounce、glow 或大幅滑动；中断 / 卸载用 `context.revert()` 清理。
- 首次显示不强制入场，reduced motion 直接替换；非活动面板设 `inert` 和 `aria-hidden`，隐藏内容不进入键盘操作或屏幕阅读器阅读。
- Desktop 海报约占内容宽度 95%，允许下一张窄边提示；960px 及以下改纵向排版，索引为 2×2。面板共用占位高度防止切卡时控件跳动，短卡可能有有意保留的空白。

### 已遇问题、修复与不可倒退项

- 平板双栏曾导致 State 标题孤行，已将纵向断点调整至 960px。不要只看桌面图后恢复窄屏双栏。
- 曾因卡片 flex 高度调整造成 CTA 伸出面板，现恢复 article 正常流，并加入四卡平板 CTA 边界断言；不要直接重新添加整卡 flex column / 下半区 flex:1。
- SVG 只有 viewBox 时曾因留白适配漏出裁剪区外内容。真实截图现有明确 `clipPath`；保留原图内容和状态色，不覆盖源素材。
- 手机图解小字、Synthesis 圆点未对齐和小字对比度已修正；axe 检查只覆盖指定正文与四卡状态，不是全站无障碍认证。
- 共享导航自动预取曾请求不存在的静态 segment 文件 `__next.$d$section.__PAGE__.txt`。当前三个 Next Link 表达式均设 `prefetch={false}`，实际导航仍可用；恢复预取前先复现并验证导出文件匹配，不以视觉修改为由回滚。
- 全页截图前先回到顶部、移除焦点并等待 header 的 Hero 状态；否则 sticky 导航可能出现在截图中段，不能把捕获状态错误当成版式缺陷。

### 实际验证、素材记录和下一步

- 本节记录本任务此前实现轮结果，**本次文档更新没有重跑构建或浏览器测试**。最终 `npm run build` 通过；实现中 `npm run typecheck` 通过。
- 最终命令 `npx playwright test tests/design-deck.spec.ts --output=artifacts/design-test-results --reporter=list`：**4 项通过，17.3 秒**。独立输出目录用于避免并行任务覆盖测试产物。
- 覆盖 1440×1000 桌面、768×1024 平板、390×844 移动视口；索引 / Next / 指示器 / 方向键、快速切换后的稳定状态、hover 不切卡、隐藏面板 inert、模拟触控横滑与纵向移动、reduced motion、溢出与 CTA 边界、四个链接锚点、英语及刷新保留、共享导航实际跳转。导航场景未发现 pageerror、console error 或 HTTP 400 及以上响应。
- 四张活动卡在 `#design-main` 范围的 axe WCAG 2 A/AA 检查通过。Home / End、首端 Prev 禁用等已有实现不代表每个分支都有独立自动断言；深入页没有另做全页 axe 审计。
- 桌面实现与 `ref/final3.png` 曾按同宽并排比对；另外检查过平板 State / Modularity / Execution 与两张真实 UI 裁剪。截图为 `artifacts/design-deck-desktop.png`、`design-deck-english.png`、`design-deck-tablet-1.png` 至 `4.png`、`design-deck-mobile-1.png` 至 `4.png`。它们记录当时导出结果，后续改动应重新生成。
- 内置浏览器当时受沙箱初始化故障阻挡；用户已明确允许使用项目现有 Playwright / Edge 自动验收。该授权不是已经检查实体触屏、其他浏览器、生产运行时或线上部署的证据。
- 继续实现前核对当前工作树，按用户反馈调整指定区域；不要重复恢复底部索引或重做共享导航。预览 `/design-innovation/` 和 `/in-production/` 使用 4173 静态导出，源码变化后先 build 再刷新，不能假定此前服务仍在运行。
- 保留 [章节实现简表](WEFT_PPL_Design_Deck_Implementation_2026-09-18.md) 与 [视觉 QA](../design-qa.md)；本次只更新本文，不覆盖首页或其他章节报告、不改产品代码、不提交 / 推送 / 部署。最终用户视觉确认、真实读者测试、性能、实体设备及生产运行时边界仍未完成。

## 24. 2026-09-18：Systematic Thinking 后续修正

### 跨页切换旧画面闪现：根因与修复

- 用户观察到从主页经共享导航进入 `/systematic-thinking/`，以及返回主页时，会先短暂出现像是“缓存 / 预加载”的旧页面；返回主页时右上角状态区也会一闪而过旧的纵向布局。
- 根因不是保留了旧页面缓存：共享导航此前使用普通 `<a>`，每次切换都会整页重新加载。在新页面 CSS 和客户端 GSAP 建立前，HTML 的默认首帧会被浏览器短暂绘制；首图完整 SVG 与状态区的未初始化样式因而可见。不要再用遮罩延迟来掩盖这个问题。
- `SiteHeader.tsx` 已改用 Next `Link` 进行站内页面导航；保留静态导出兼容的 `prefetch={false}` 约定。`MasterCanvas` 也按模式重挂载，避免旧 GSAP 内联状态在视图变化后残留。
- Systematic 的每个 `Reveal` 初始写入 `data-motion="pending"`，对应 CSS 在 GSAP 接管前隐藏所有 `data-step`；随后由 GSAP 控制逐步出现。`<noscript>` 与 reduced motion 显式恢复完整静态内容，不能为了防闪而牺牲无 JavaScript 可读性。
- 此为代码级根因和修复记录；仍应由用户在真实浏览器中复查主页 ↔ Page2 的首次、连续和快速导航，不能把构建通过说成视觉问题已验收。

### 内容、图标和展开顺序

- 01 / ENFORCEMENT 的交接链严格为：BUILDER 图标 / 文案 → 第一条横线 → 齿轮 → 第二条横线 → PUBLISH · QC 图标 / 文案。不要恢复为所有元素一起出现。
- 三个问题模块的整体顺序固定为 **01 / ENFORCEMENT → 02 / GRANULARITY → 03 / HISTORY**：前一个图完成，才解锁下一个；单个图仍至少 15% 进入视口后才可开始。不要把这一规则误解为页面加载即强制播放所有图。
- 首张生产网络仍保持其内部的“节点 → 连线 → 下一个节点”依赖顺序；“分镜”公开标签已改为 **“分镜&剪辑”**，英文为 **“Storyboard & Editorial”**。
- Shared Production Semantics 的 `VERSION / 哪次发布` 已改为 **“发布版本”**，英文为 **“Published version”**。
- Systematic Page 的 DCC 标识不再是 MAYA / HOUDINI 文字按钮：Maya 使用用户提供的 Maya 图标，Houdini 使用已裁去白边的用户提供版本，文件为 `public/images/logos/maya.png` 与 `public/images/logos/houdini.png`。保持 `alt` 文本和固定尺寸；不使用带白边的旧 Houdini 素材。

### Page2 滚动关联速度（只影响图表入场）

- 该规则只作用于 `Reveal.tsx` 所有权下的 GSAP 图表入场；人物行走循环、花朵循环及其他独立 CSS 循环**不受影响**，不要把滚动速度变量接回这些动画。
- 静止时和缓慢向下滚动时，图表时间线均为基础 **1.5×**。当前慢速上限为约 **1200px/s**；在这个范围内不能因轻微滚轮操作继续加速。
- 超过该速度后，在约 **4800px/s** 时线性升至该图的最高倍率。首张 `01 / SYSTEMATIC THINKING` 生产网络最高 **10×**；其他图最高 **5×**。滚动停止约 160ms 后平滑回到 1.5×。这些是当前调试参数，不是未经后续确认不可改动的永久规范。
- `01 / ENFORCEMENT` 右侧图标链的本身排程为其他图表步骤的 **2×**（`speed={2}`）；它仍会叠加上述滚动倍率。用户未要求把它变成独立循环或脱离可见性门槛。

### 本轮验证与接续边界

- 完成本节记录的最后一次滚动速度参数修改后，`npm run build` 通过（编译、类型检查和静态页面导出成功）。本轮没有重新执行完整跨页浏览器回归、视觉截图比对或实体设备检查。
- 当前工作树可能同时含有其他任务的未提交内容与测试截图。更新交接文档不授权提交、推送、部署或清理这些文件；后续先检查 Git 状态，再按用户新反馈只改指定区域。
