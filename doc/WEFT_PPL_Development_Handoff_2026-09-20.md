# WEFT / PPL 开发交接 · 2026-09-20

## 本次交接与 GitHub 同步 · 最终接续入口

本节优先于下方同日历史过程记录。下方“未提交 / 未推送”描述的是各轮开发完成时的状态，不应据此判断本次上传结果；本次以此节后续追加的发布回执为准。

### 当前必须保留的状态

- 四个公开页面：Overview、Systematic Thinking、Design & Innovation、Contact。中文导航为 `00 / 项目概览`、`01 / 系统思考`、`02 / 设计&创新`、`03 / 联系`。不恢复 What Comes Next 或独立 In Production / Evidence 路由；深入内容仅保留源码。
- 首页保留 ONE SYSTEM / THREE VIEWS：ORGANIZE / TRANSFORM / OPERATE。第三项是 IN PRACTICE，不是 Contact；VIEW PRODUCTION 跳首页 `#production`。Operate 使用原层叠 SHARED MODEL、四条上分支 Builder / Loader / Publish / Review、下方左 Houdini / 右 Maya，保留原曲线分支动效，不恢复未来治理节点。
- 02 保留五张循环卡片。最新决定是删除索引与卡片之间的整行 Viewer 标签和分类标题，以及卡内旧分类卡头和 FIG 编号；不是将标题移位。Part 01 正文标题保留，正文内部滚动，底部导航固定，桌面加高 40px 和自然高度 Hero 不变。03 不恢复 Before，04 不恢复 Part 03，末尾仅进入 Contact。
- 首页、01、02 使用桌面原生 proximity 吸附；Contact 不吸附。卡内滚动不向外传递。触屏、窄屏、Reduced Motion、无 JS、编辑和打开弹层等例外详见下一节。吸附桌面的页内锚点直接跳转，避免 Chromium smooth + snap 回吸；不锁滚轮、不自动切卡。
- 01 保持与 02 一致的 Ivory 背景及 Hero 标题体系；03 文字色与 02 一致。Contact 保持克制，只公开已确认邮箱 `ace199704@icloud.com`，没有虚构社交链接或联系表单。
- 同期首页 Production Facts 的两列排版、Rez / Ftrack / Pyblish 原位黑底单行提示，以及 01 共享模型的图标与标签调整一并保留。语言切换后 Facts 显示新语言完整文案，不使用旧 glyph 引用重新播放。

### 接手与验收

- 先读本文件，再读根目录 AGENTS.md；下方历史四卡、TWO PERSPECTIVES、标题移位及未上线状态均需结合最新覆盖记录判断。不要修改 September 17 历史交接来追认新决定。
- 本地预览为 `http://127.0.0.1:4173/`，读取 `out/` 静态导出，修改源码后先 `npm run build`。本次重新构建已通过，导出首页及三个章节；不代表部署或生产运行时验证。
- 本次推送前重新运行 navigation、operate、design-title、design-deck、home-scroll-snap、production-hints，共 **28 项通过（1.2m）**，输出为本地 `artifacts/handoff-push-final-results/`。覆盖最新标题删除、五卡交互、章节与 Contact、Operate、吸附及单行工具提示；不把旧测试数量累计为本次结果，不宣称全仓或真实生产运行时通过。
- 本次仅更新交接并按用户要求正常提交 / 推送源码、测试与选定最终截图。临时 traces、results、中间截图及 `.hallmark/` 本地资料不纳入提交；不删除它们。未配置或发布 GitHub Pages，不强推、不覆盖远端分歧。
- 待确认仍包括真实鼠标 / 触控板吸附手感、最终视觉认可、实体设备与多浏览器覆盖。此处没有新增性能指标或生产能力声明。


## 最新卡片简化：删除标题行与 FIG

- 用户先要求将卡内分类标题移到 Viewer 标签旁，再要求左右互换，最后明确 **整行删除**。最终不显示 `DESIGN DECISION VIEWER / 05` 或单独的当前分类标题，也不保留原卡内分类卡头和 `FIG. 02.xx`。前两版仅为中间试调，不应恢复。
- 五个 Decision Index 直接衔接卡片。卡内 Part 01 的中文主标题、Summary、System Shift 与其他内容保留；侧边、指示器及循环切换保留。删掉空网格行，将空间让给正文，不改总 Viewer 高度或吸附范围。
- 入口：`DesignPage.tsx` 删除内部卡头；`DecisionDeck.tsx` 删除外部标题行并改用双语 aria-label；`DesignPage.module.css` 的 deck/card 网格均为单个可伸缩正文轨道（底部导航仍由 poster 固定）。`tests/design-title.spec.ts` 覆盖五卡及 320 / 390 / 768 / 1440 / 1764px。
- 最终构建通过，标题删除专项＋Deck 共 **5 项通过（18.0s）**，结果 `artifacts/design-no-heading-results/`。中间标题上移版本的 11 项（含吸附）不是最终版本重新运行的全套结果。已查看桌面 `artifacts/design-no-heading-1433.png` 与手机 `artifacts/design-no-heading-390.png`，并按 image-to-code 做标注图同屏比较；不改变原有图解、字体或颜色。
- 本地已更新，未提交、推送或部署。

## 最新试用：00 / 01 / 02 轻度吸附滚动

- 用户先确认试用吸附滚动，随后明确将 01、02 也加入；03 Contact 保持自然滚动。使用浏览器原生 `scroll-snap-type: y proximity`，不是强制翻屏或滚轮拦截，不设置等待时间、不改变卡片选择、不新增整屏空白。
- 首页停靠 Hero、Summary、Master Canvas、IN PRODUCTION；01 停靠主要章节，包括长 Hero、变化说明、核心问题、共享模型与结尾；02 停靠自然高度 Hero、索引＋Viewer 整体、Synthesis。长板块仍可在内部范围自然滚动，页尾遵循实际最大滚动距离，不强行对齐到屏幕顶部。
- 仅桌面宽度 >1000px、fine / hover 指针、未开启 Reduced Motion 且导航已初始化时启用。停靠顶部预留导航收起的 8px 窄条；首个 Hero 额外计入实际导航高度。触屏、窄屏、无 JavaScript、减少动态效果保持原本自然滚动。打开图片 dialog、编辑或展开首页模型说明时暂时取消吸附。
- 02 卡片正文现有 `overscroll-behavior-y: contain` 不改：鼠标位于卡内时滚正文，卡内到边界仍不把滚动传给页面；需要移到卡外滚动进入 Synthesis。不自动切卡、不把索引独立吸顶，不改此前增加 40px 的 Viewer 高度。
- 入口：`src/app/globals.css` 的媒体条件与选择器；首页 `src/app/page.tsx`、01 `SystematicPage.tsx`、02 `DesignPage.tsx` 添加 `data-section-scroll-snap`，没有新增客户端滚动控制器或依赖。Header 动画、Summary 入场和 Master Canvas 动画所有权不变。
- 实际发现并处理 Chromium 原生吸附与 CSS smooth 锚点跳转冲突：点 VIEW PRODUCTION 时 URL 已变化，但画面可能重新吸回 Master Canvas。启用吸附的桌面模式改为 `scroll-behavior: auto`，页内链接直接到目标；滚轮吸附仍由浏览器原生处理。非吸附模式保留此前滚动设置。不是通过锁滚轮、延迟解锁或持续 scrollTo 修正。
- 专项测试 `tests/home-scroll-snap.spec.ts` 覆盖实际滚轮接近停靠点、双向离开、回顶部 / 页尾、Production 锚点、图片弹层和模型说明、章节路由隔离、触屏 / Reduced Motion / 无 JS、01 长开场与 02 卡内外滚动。初轮修正了测试对 Chromium 将 `y proximity` 序列化为 `y` 的假设、页尾滚动极限及图片按钮名称定位；不将这些测试断言问题记为生产实现缺陷。
- 当前为本地试用，尚未提交、推送或部署；实际鼠标 / 触控板手感仍需用户体验确认。构建与最终专项结果在本节追加，不将此前测试累计成新版本全仓通过。
- 最终 `npm run build` 通过；吸附专项 6 项＋navigation 4 项合计 **10 项通过（20.7s）**，结果 `artifacts/section-scroll-snap-final/`。已实际验证 01 可阅读长 Hero 再停靠下一节、02 卡内滚动不带动外层且不切卡、卡外继续滚到尾部、Production 锚点正确到达、弹层与 disclosure 暂停吸附。测试为本机 Edge / 模拟输入，未测实体触控板或多浏览器，不宣称整站全部历史测试通过。

## 最新接续：首页 IN PRODUCTION 信息排版与工具提示

本节记录首页生产信息区的最新用户确认，覆盖历史 HOSTS / FORMAT、Dailies Review、Publish Base 和多行悬停提示方案。下方章节、Contact、Operate 与历史发布记录保留，不表示本轮重新验证了全部页面。

### 当前文案与排版

| 左侧分类 | 右侧内容 |
| --- | --- |
| DCC Software | Maya 2022 / Houdini 21–22 |
| SYSTEM | Rez / Ftrack / Pyblish |
| WORKFLOW | Builder / Loader / Publish / Dailies |
| Production Format | USD / Alembic |
| STATUS | Active / 2026 |
| PROJECT | 动画电影《赵子龙》 |

- 用户要求“两边对齐”：分类列左对齐、内容列右对齐，不是段落字间距拉伸。三个 SYSTEM 工具入口保持同一行；右端与其他信息内容对齐。
- HOSTS → `DCC Software`；FORMAT → `Production Format`；Build → `Builder`；Load → `Loader`；Dailes Review → Dailies Review → 最终 `Dailies`。STATUS 与 PROJECT 分为两行，不再合写 Active In 项目名。
- 项目名称使用网站中文字体 `var(--body)`，字号为内容字号的 `.86em`、字重 400，不再继承英文技术字体的中文回退样式。英文项目文案为 `Animated film Zhao Zilong`，仍沿用英文技术字体。
- 分类字号 `.9em`；左右列间距 12px，左列随断点使用 118 / 100 / 108px。普通长内容在窄屏允许自然换行，SYSTEM 三入口及其提示另有单行约束。
- 保留说明“实际工具界面”，不恢复首页的 CFX / Hair 演进限定句；贡献归属中的 ASB 已改为“场景组装”，不改变两人团队归属。

### 工具入口与用户交互偏好

| 工具 | 原位黑底提示 | 新标签页目标 |
| --- | --- | --- |
| Rez | 版本管理 | https://rez.readthedocs.io/en/stable/# |
| Ftrack | 制片管理 | https://www.ftrack.com/cn/ |
| Pyblish | Pub Base | https://pyblish.com/ |

- 用户明确要求：黑底直接覆盖工具名称所在位置，不在上方另开气泡；文字向上滚入，离开恢复原名称。保留工具间间距，不让三项换到第二行。
- 最终三个提示都使用更小字号，**优先缩小到一行，而不是把中文拆成两行、增高黑色块或裁掉文字**。`Pub Base` 不再写 `Publish Base`。
- 实现：每项 `container-type: inline-size`，按标签长度计算 `--hint-units`（中文字符 1、其余 .55），提示字号为 `min(12px, (100cqi - 8px) / --hint-units)`。这是保守的宽度适配，不是逐字像素测量。窄屏尤其英文长提示可能明显小于 12px；不要仅恢复固定字号而重新引入换行。
- 中文提示用 `var(--body)`、400 字重；英文提示用 `var(--mono)`、500 字重。统一 1.4 行高、3px 4px 内边距、`white-space: nowrap`。SYSTEM 间距默认 8px，≤480px 为 4px，整体最大宽度 360px、靠右。
- 动效仍为标签 260ms 上移进入、显隐 160ms；Reduced Motion 关闭局部动画。键盘 focus 显示、Escape 收起、blur / 指针离开恢复名称。链接保留 `target="_blank"` 与 `rel="noopener noreferrer"`。
- 不改变原有生产信息打字的进入视口触发、语言切换或截图查看器行为；试编辑启动按钮继续隐藏。

### 代码入口、验证与开发问题

- 文案：`src/content/home.ts`；英文翻译：`src/content/translations.ts`；首页接入：`src/app/page.tsx`；左右列布局：`src/app/page.module.css`。
- 工具链接、提示与项目中文字体：`src/components/ProductionFactValue.tsx` / `.module.css`。使用现有 `GlyphText`，保留逐字动画和可访问完整文本；不要将整页改为 Client Component。
- 回归：`tests/production-hints.spec.ts`、`tests/proof.spec.ts`。最终 `npm run build` 通过（含 TypeScript 与静态导出）；两套专项 **13 项通过，25.4s**，结果 `artifacts/production-compact-hints-test-results/`。
- 随后增加 `scrollWidth` 断言，避免把裁字误判为“单行适配”，专项 **6 项通过，13.8s**，结果 `artifacts/production-hint-fit-test-results/`。覆盖 320 / 390 / 768 / 1024 / 1280 / 1440px、中英文、三个提示单行完整显示及不增高行；不要把两次测试数量相加称为 19 个独立用例。
- 已验证提示黑白颜色、字体、原位覆盖、键盘 / Escape、Reduced Motion、新标签页地址和 opener 隔离。外站测试通过拦截响应验证导航行为，不代表验证了三个外站的实时可用性。截图：`artifacts/production-term-hints-desktop.png`、`artifacts/production-term-hints-mobile.png`。
- 已处理的问题：原固定字号使“制片管理”变成两行，已按容器宽度缩小；测试直接读取 `dt` 曾同时读到可访问文本和逐字绘制文本，造成内容重复断言失败，改为定位 `[data-glyph-text]`，未删除可访问文本。
- 本地 4173 预览读取静态导出，源代码修改后需要重新 build 才能验证新效果。曾遇到既有截图路径写入 UNKNOWN，proof 截图改用 `test.info().outputPath(...)` 并使用独立测试输出目录，避免并行任务冲突。
- 当前没有可用 GitNexus 连接或项目索引，本轮使用源码引用检查、构建和 Playwright / 本机 Edge 验证，不声明图谱影响分析已完成。普通沙箱执行曾报 helper setup 错误，改用经审批的局部命令；这不是网站运行错误。
- 工作区有其他任务的未提交修改，均保留。以上是本地实现与验证记录，**本轮没有提交、推送 GitHub 或部署 Pages**；历史上传回执不能视作本轮已发布。本次交接文档更新不重新运行产品测试，也不改变上述测试覆盖边界。

## 最新微调：导航名称与 Contact 字色

- 用户再次确认中文导航为 **02 / 设计&创新**，覆盖下面历史“设计与创新”记录；共享导航及英文翻译映射已更新，URL 不变。
- 03 Contact 字色以 02 为准：主文字 #17232c、Technical Label #5c666b、介绍副句 #4f5a61。保留现有字号、版式、Ivory 背景和链接 Mint 交互。
- 代码入口：`src/content/destinations.ts`（共享导航中文名称）、`src/content/translations.ts`（英文映射保持 Design & Innovation）、`src/components/contact/ContactPage.module.css`（Contact 局部文字色值）。不修改全站默认颜色，不改变 Chapter 02 或其他章节文案。
- 已同步导航文字断言：`tests/navigation.spec.ts`、`tests/home-first-frame.spec.ts`、`tests/home.spec.ts`、`tests/design-deck.spec.ts`。这表示定位文案已更新，不表示四套测试全部重跑。
- 本次微调完成后 `npm run build` 通过（含类型检查与静态导出）；导航专项 `four public chapters navigate and refresh, without roadmap or deep-page links` **1 项通过（5.1s，含测试启动）**，结果目录 `artifacts/nav-contact-color-results/`。验证章节链接、刷新、当前导航标识及无已撤下页面入口。
- 本机 Edge 对重新构建的 `http://127.0.0.1:4173/` 预览读取计算样式：02 与 03 的 Hero 主标题均为 `rgb(23, 35, 44)`，章节标识均为 `rgb(92, 102, 107)`，介绍副句均为 `rgb(79, 90, 97)`。这次是浏览器色值核对，不是重新完成整站截图或多设备验收。最初诊断脚本误选了非 Hero 的 header，修正为从 h1 定位后核对通过，未因此修改产品结构。
- `git diff --check` 通过，仅有既有 LF / CRLF 提示。未重跑全仓测试，不将前文其他轮次测试合并为本轮结果。
- 本次微调及本次交接更新均未提交、推送 GitHub 或部署；保留其他任务新增的首页生产信息与工具提示记录。本次仅补充文档，不再次运行产品测试。

本文件是本轮交接入口。历史设计与实现记录保留于 [2026-09-17 交接](WEFT_PPL_Development_Handoff_2026-09-17.md)，Card 的早期结构基线见 [冻结原文](WEFT_PPL_Chapter02_Card_Structure_Freeze_2026-09-20.md)。以下最新用户决定优先于历史四卡冻结记录；明确区分网站展示、概念示例与生产运行时。

## 最新接续：03 / IN PRACTICE — OPERATE

- **后续截图校正优先：**用户要求恢复旧第三视角的层叠 SHARED MODEL 与曲线分支，不使用初稿矩形中心图。上方仅 BUILDER / LOADER / PUBLISH / REVIEW；下方左 HOUDINI、右 MAYA。独立 Resolver 节点、USD / SHOT STATE 文本块及 ACTIVE PRODUCTION 额外标识全部撤下；Resolution 仍是原共享模型语义。红色框和箭头是用户标注，不进入网站。
- 沿用旧第三视角动画节奏：曲线 .8s / stagger .12 / 起点 .15s；端点 .3s / stagger .12 / 起点 .65s；文字 .35s / stagger .12 / 起点 .8s。六条现有关系使用 Mint 实线，不保留代表未来计划的虚线。保留原左右模块、资产与工作空间；不把 Transform 的资产替换动画复制进 Operate。
- 最新首页第二入口文案恢复为“重新审视默认假设，由此形成新的设计判断。”，英文复用现有对应翻译。Chapter 02 Hero 不变。
- Contact 后续精简：标题下面增加 `Production systems, human–tool workflows, agent systems and creative technology.`；About 拆为用户提供的两段，第二段以“这个项目持续围绕一个问题展开”起头。第三项兴趣为 `Agent Systems & Tool Orchestration`，仍共四项。联系区不再重复 `03 / CONTACT`，改用 `GET IN TOUCH`，加小号 EMAIL 标签与大号已确认邮箱。没有新增或猜测 GitHub / LinkedIn 个人链接，没有图解、表单或动画。
- 窄屏给不同视角预留同样的最大图形高度和检查标签区高度，避免切换后入口位移，让静止鼠标误触 Transform；这项实际回归已修复并覆盖鼠标 / 触控测试。桌面三入口与各自 CTA 并排，保留图形空间。以下初稿记录中关于矩形图、额外节点和 650ms 动画的描述已由上述校正覆盖。

- 用户明确将首页恢复为 **ONE SYSTEM / THREE VIEWS**：01 Systematic Thinking / ORGANIZE；02 Design & Innovation / TRANSFORM；03 IN PRACTICE / OPERATE。第三个观察角度不是 Contact，也不是未来架构。本节覆盖下文临时 TWO PERSPECTIVES 方案，其他网站结构冻结不变。
- 第三个引导文案为“设计如何进入真实制作？”，说明为“Builder、Loader、Publish 与跨 DCC 工作流如何执行同一套 Production Model。”；02 首页引导同步采用“重新审视生产的默认假设。”。提供英文翻译与新的临时编辑字段 `views.operate.*`，编辑内容仍不持久化。
- Operate 沿用左侧独立模块与右侧 COMPOSED WORKSPACE，同一个资产几何不换成另一套插画；中央显示 SHARED MODEL 与 BUILDER / LOADER / PUBLISH / RESOLVER / REVIEW，连接 USD / SHOT STATE 与 MAYA / HOUDINI。Mint 表示执行关系及当前组合，灰色保留背景结构。Review 是审阅入口，不被画成生成镜头状态的步骤。
- 这是系统级执行关系示意，不是实时监控、不表示所有工具在每个 DCC 中走同一条完整序列、不新增生产能力验证。底部明确注明“执行关系示意 · 非实时运行状态”；状态文字 ACTIVE PRODUCTION 依据已有项目事实，不是动态探针。
- 第三个 CTA 为 `VIEW PRODUCTION ↘`，真实链接 `#production`，滚到首页原有生产界面区；普通锚点不经过 `sitePath`，不受 GitHub 子路径前缀影响，关闭 JavaScript 仍可使用。01 / 02 的 EXPLORE 保留真实章节跳转。Header 的 03 / 联系及四个公开路由不变，不恢复独立深入页或底部四入口。
- 入口为 `src/content/home.ts`、`src/components/MasterCanvas.tsx` / `.module.css`、`ProductionScene.tsx` / `.module.css`、`src/data/graph.ts`、`src/lib/canvas-state.ts` / `visual-targets.ts`。Operate 是独立类型状态，不借用旧 Extend；工具节点仅在 Operate 可见。模式切换清理检查状态，箭头 / Home / End 循环包含 Operate；双向检查与 Pin 保留。GSAP 单次约 650ms 路径显现，无循环或自动切换，Reduced Motion 直接呈现。
- 移动端只放大 Operate 中央节点，并增加该视角的 SVG 纵向空间，原有 Organize / Transform 几何不改。三个入口采用一致排版，窄屏保留独立 CTA。
- 初轮回归遇到既有截图文件写入 UNKNOWN 错误，切换到本轮独立截图路径；另有 Edge 截图滚动后的 1px 基线取整差，尺寸断言保留 1px 容差。自动截图前将指针移出组件并隐藏共享浮层，避免截图滚动触发非目标视角 hover。专项截图为 `artifacts/master-operate-{width}-{zh|en}.png`。
- 当前改动尚未提交或推送；不代表 GitHub 或 Pages 已更新。最终构建与回归结果见下方追加记录。

- 最终验收追加：最新文案后的 `npm run build` 通过；Operate / navigation / Master viewport **12 项通过（30.4s）**，见 `artifacts/operate-contact-copy-final-results/`。原模型恢复及 Contact 文案阶段 22 项通过（1.2m），包括 Transform 资产变形、双向检查和文字说明；恢复并排 CTA 后又有 15 项通过（33.1s）。不将不同轮次累加成一次全仓通过声明。
- 设计对照按 image-to-code / design-qa 完成：1672 × 776 参考与同尺寸当前组件整图合并比较，并比较中央局部。记录在根目录 `design-qa.md` 当前章节，结果 passed；完整截图 `artifacts/master-operate-reference-1672.png`，局部 `artifacts/master-operate-panel.png`。用户明确复用原有程序化 SVG，因此不生成替代图片。截图不代表真实生产运行时验证。仍未提交、推送或部署。

## 前次接续：网站结构收束与 Contact（在上次上传之后）

- 最新用户方向：不再用 Governance / Recovery / Observability / Regression 等作为承诺的下一阶段。删除 What Comes Next，顶层改为 00 项目概览 / 01 系统思考 / 02 设计与创新 / 03 联系；中文“设计与创新”覆盖之前的“设计&创新”。
- 当前公开静态路由只有 `/`、`/systematic-thinking/`、`/design-innovation/`、`/contact/`。`/next/`、`/in-production/`、`/evidence/` 不再导出。InProductionPage 与已有深入内容源码保留以便以后接文档，不代表当前公开入口。
- 用户先提出三个观察模式后，最终又撤回当前深入页；本轮按最小一致结构采用 ONE SYSTEM / TWO PERSPECTIVES：Organize / Transform。Contact 不作为图形模式。Extend 的节点、关系、动画和键盘入口移除，共享场景、资产变化和双向检查保留。
- Chapter 02 保持五卡、04 无 Part 03、03 无 Before、黑色 Synthesis；删除其他卡内深入 CTA，Project Example / Production Artifact 仍在。末尾仅保留 `03 / CONTACT ↗`，不增加重复的生产落地介绍，不恢复底部索引。
- Contact 标题为“如果你也在构建复杂系统，我们可以聊聊。”；包含 ABOUT THIS WORK、WHAT I’M INTERESTED IN、CONTACT。四个关注方向只是作者兴趣，不是 WEFT / PPL 已实现 Agent 系统的声明。邮箱由用户本轮提供：`ace199704@icloud.com`；仅设 mailto，不发送邮件、不增加表单、不虚构 LinkedIn 或个人主页。
- Contact 用 hallmark 约束新页面的排版、细线和真实联系方式，保留现有共享导航、字体、Ivory / Black / Mint，不引入新主题、图库或动态背景。入口为 `src/components/contact/ContactPage.tsx` / `.module.css`；路由在 `src/content/destinations.ts`、`src/app/[section]/page.tsx`。
- 本轮构建已通过，导出页面清单已检查。Contact 中英文 320 / 375 / 414 / 768 / 1440px 无横向溢出，375 / 1440px axe 检查通过，邮箱目标、焦点和跨页语言偏好已验证。截图 `artifacts/contact-{width}-{lang}.png`；两视角图 `artifacts/master-two-perspectives.png`。
- 首轮旧测试仍寻找已移除的 CTA，以及将 HTML 中文 lang 误写为 zh，已改为实际尾注与 zh-CN。移动导航曾再次出现收起 bottom=98 的既有偶发，原样复测通过，未更改 AutoHeader 实现；不宣称根因已解决。最终回归结果在完成后追加。
- 工作期间发现其他任务同时修改 `Diagrams.tsx` 与 Systematic 页面 / 翻译，均保留，不归为本轮结构改动。本轮尚未提交或推送；下面发布回执仅属于之前的五卡版本。
- 最终验收：基于本轮重新构建的静态导出，Contact / navigation、Deck、Viewer、Task Composition、Proof、header reveal、scene linking、Master viewport、model disclosure、Production Scene、首页首帧、章节标题和隐藏编辑入口共 **41 项全部通过（约 1.7 分钟）**。包含三条撤下路由返回 404、五卡无深入链接、320–1440px 双语 Contact 和 1024–1920px Canvas 尺寸。未运行全仓 editor / language / performance 历史套件（部分仍依赖已隐藏的试编辑入口），不宣称完整性能或实体设备验收。一次测试替换误将 pre 定位改为 figcaptionre，已修正，最终套件未保留该错误。

## 上次上传摘要 · 2026-09-20（历史）

- **上传回执：五卡及同期改动已成功推送 GitHub main。** 实现提交 [1f75bf9](https://github.com/Ace199/WEFT_PPL_Presentation/commit/1f75bf9befbeee0ba8818cf1d879bcfe008bc896)（feat: expand decision viewer and unify chapter styling）。正常 git push 返回 84ea225..1f75bf9，随后 GitHub API 独立核对远程 main 为 1f75bf9befbeee0ba8818cf1d879bcfe008bc896。本条回执另作纯文档提交。未部署 GitHub Pages。
- 用户已要求更新交接文档并上传 GitHub；本次允许正常源码提交和推送，不包含 Pages 部署或强推。
- 最终为五卡：Compatibility / Modularity / State / Task Composition / Execution。04 仅保留 Part 01、Part 02；03 不恢复 Before；05 保留 Publish 缩略图放大。五卡循环与内部滚动保持。
- 章节 02 Hero 已恢复自然高度，不再占满首屏；桌面 Viewer 在原高度上增加 40px。索引副标题缩小，04 只写 Independent Subtasks。导航为“设计&创新”。
- 01 Hero 标题字体、字号及章节标识以 02 为准；01 页面改用与 02 相同的纯 Ivory #f5f5ee，移除白色径向渐变，深色区块不变。
- 同期改动一并纳入上传：首页隐藏试编辑启动入口（编辑能力仍保留，临时内容不持久化）；Production Facts 在至少 50% 可见后以 2 倍速度打字，Hero 打字速度不变；首页生产信息更新。01 共享模型增加 USD / Alembic 生产格式图标并调整人、产品及 DCC 软件标签。此处为当前源码接续记录，不新增生产能力声明。
- 最终 npm run build 通过（含类型检查及静态导出）。本次 Playwright / Edge 专项 **29 项全部通过，约 1.3 分钟**：五卡 Deck / Viewer、Task Composition、Hero 自然高度、章节标题与背景一致、Compatibility 动画、导航热区、首页首帧、Publish viewer、Production Facts 打字及试编辑入口隐藏。
- 这不是全仓测试通过声明。旧 navigation 测试仍包含章节占位页假设，旧 verify-export 脚本同样过时，本次未作为验收执行；未测实体设备、生产运行时或 Core Web Vitals，未部署 Pages。
- 上传前两次终端 fetch 因连接重置失败；通过 GitHub 连接器读取远程 main 为 84ea2259d4744c6ee7bfe463740e25ed06af0158，与本地提交起点一致。最终推送结果另以本文件发布回执及远程 SHA 核对为准。
- 上传源码、测试、公开格式图标和选定当前截图；临时 trace / results 目录及已撤回的 task-composition-example 中间截图仅留本地。截图是网站展示验收，不是生产运行时记录。

## 当前完成范围

- 首页、Systematic Thinking、Design & Innovation、Contact 已实现并公开导出。
- In Production 深入内容保留源码但不导出；What Comes Next 与旧 Evidence 占位页均已撤下。
- Next.js 静态导出，React / TypeScript / CSS Modules / GSAP / SVG / Canvas；无后台或 CMS。语言偏好允许 localStorage，临时编辑只保存在内存。

## 本轮最终设计决定

- 最新背景统一：01 页面移除白色径向渐变叠层，改为与 02 相同的 `var(--paper)`（#f5f5ee）纯 Ivory 背景；原深色区块不变。

- 最新章节标题统一：以 02 为准，01 Hero 主标题改为相同中英字体、750 字重、1.12 行高、中文 0.015em 字距和响应式字号；顶部章节标识统一为 14px Technical Label。保留两章文案、结构及内部标题样式。

### 最新接续：新增 04 / Task Composition（覆盖下文四卡数量）

- 最新尺寸微调：桌面（>960px）Viewer 在原 `100svh - nav-height` 基础上加高 40px，额外高度供卡片内部正文使用；窄屏维持原高度。卡头、底部控件和索引行为不变。展开导航时可稍滚动外层页面查看完整底栏，不再要求桌面 Viewer 严格等于视口减导航高度。

- 最新撤回：用户通过回复批注要求 Hero「回到原来的样子」。已撤销章节 Hero 占满首屏的 min-height 和额外 36px 底部留白，恢复内容自然高度与原有顶部间距。下方的首屏留白记录仅为历史；五卡、精简索引副标题、04 Part 03 移除和首页 Hero 均不变。

- 最新删减：用户要求 04 的 Part 03 先去掉。卡内不再渲染 Project Example、目录 / record 示例及该区 CTA，只保留 Part 01 和 Part 02；其他四卡不变。`/in-production/#task-composition` 中示例和 Publish / Builder 边界仍保留，暂不删除数据或深入页。

- 最新 04 叙事覆盖下文早期 Task_A / Task_B 示例：主标题为「一个镜头的动画工作，不必挤在同一个任务里。」；System Shift 为 `Single Shot Ani Task → Split Tasks + Shared Shot State`。Before 明确三个主要角色＋七个次要角色集中在一个 Ani Task，配短文「场景更重，交互更慢，任务边界也更难管理」。不再用抽象 one task state 作为中间结论。
- After 使用 Main Characters Task、Secondary Characters Task、Camera / Layout Task，以 Mint 线汇入 ANI MASTER STATE，保留 shared shot state / task sources retained。三项收益为单个任务范围更轻、责任边界更清晰、共同镜头状态继续保留，标为设计目标，不冒充性能测量。
- 此次职责叙事修改后：构建通过；Task Composition、Deck 与 Viewer 共 11 项通过（24.3 秒），涵盖中英文边界、目录、三种职责、五卡循环、平板正文 axe、320–1440px 溢出及内部滚动。已检查桌面十角色对比与移动端纵向 Mint 关系图；移动截图 `artifacts/task-responsibility-mobile-state.png`。未运行生产性能测试、提交或部署。
- 目录示例改为 Main_Characters / Secondary_Characters / Camera / Ani 各自 record，更新示例使用 Main_Characters Publish。任务分组和 SH010 仍为简化示例，Maya Builder 未完整消费 Master Record 的边界不变。图解使用 `TaskCompositionDiagram.tsx` 与独立 CSS Module，窄屏纵向连接，卡片仍内部滚动；其他四卡与 Hero 留白不改。

- 历史 Hero 要求（已撤回，不得恢复）：章节开场与共享导航合计占满首屏，原文案靠上，下面仅留白。曾使用 `min-height: calc(100svh - var(--nav-height, 80px))`；当前已恢复自然高度。
- Hero 留白版本构建通过，`design-hero.spec.ts` 与 `design-viewer.spec.ts` 共 6 项通过（15.0 秒）。首屏覆盖 1440 / 768 / 390px、中英两种语言，实测 Hero 底部落在视口边缘、卡片区不露出；桌面截图已检查。截图为 `artifacts/design-hero-{width}-{lang}.png`。

- 顺序现为 01 Compatibility、02 Modularity、03 State、04 Task Composition、05 Execution。固定卡片、内部滚动、循环导航及 State 无 Before 保持。End 依据实际卡片数量选择末卡，首尾侧边、箭头与滑动按五卡循环。
- 新卡说明独立任务责任与共同 Shot State：每个 Task Delta 更新自己的 Task Record，同时增量汇入 Ani Master Record，不重新扫描全部任务重建汇总。主图为概念示意；目录和更新关系采用用户给出的 Task_A / Task_B / SH010 / 版本示例，明确不是原始记录。
- 新增 `/in-production/#task-composition`，仍是一个深入页。说明 Publish 端已维护 Task Record + Ani Master Record，但 Maya Ani Builder 尚未通过 Master Record 重建完整多任务镜头；没有承诺并发安全或自动冲突处理，也未独立验证生产运行时。
- Synthesis 增加 TASK「如何独立协作并汇总」，保持汇入 EXPLICIT PRODUCTION MODEL。没有恢复底部 In Production 索引。
- 用户截图反馈：索引英文副标题缩小至 12–15px，收紧留白，将空间让给卡片；04 副标题最终仅为 **Independent Subtasks**，去掉 `/ Shared Shot State`，正文共同状态语义保留。
- 入口：`decisions.ts` / `decisionCards.ts`、`TaskCompositionDiagram.tsx`、`ProductionSpecimen.tsx`、`InProductionPage.tsx`；深入文案按 DecisionId 映射，不依赖数组位置。窄屏五个卡片指示器保持在卡片固定底部。
- 最终构建通过。五卡 Deck / Viewer、Compatibility、导航热区及 Task Composition 专项共 14 项：首次 13 通过，移动导航关闭后的几何断言收到 bottom=98（期望 ≤12）；该项独立复测通过（4.0 秒），未改导航实现。不能写成首次全绿或已查明偶发原因。
- 新卡专项覆盖五个索引、目录与更新贡献、第五锚点、Maya Builder 未闭环的中英文边界、320 / 390 / 768 / 1440px 的无横向溢出和 CTA 可达性。原有卡片及循环回归覆盖五项；平板正文 axe 检查通过。桌面主图与移动示例截图已检查，素材见 `artifacts/task-composition-*.png`、`task-composition-example-*.png`；这些是浏览器展示，不是运行时记录。仍未测实体设备、实际生产运行时或线上部署。
- 上述开发阶段尚未提交、推送或部署；用户随后已授权本次提交和正常推送，见文首上传摘要。保留并行任务的首页和 Systematic Thinking 改动；不把历史四卡测试直接当作五卡验收。

### 历史接续：四卡修订与截图放大（Execution 现编号 05）

以下为同日后续用户决定，覆盖下面早期“全部 Before 对比”的描述。

- **01 Compatibility**：保留细网格立方体，可见面为白色或薄荷绿填充，深色轮廓及浅色网格一致；动画和历史缓存同步旋转。模型和材质球使用同一套密集经纬线球体，材质只增加薄荷绿填充。右下只保留 Latest Model → New Surface。新增左侧“为匹配最新资产，被迫重新发布 RigCache”、右侧“按镜头视觉需求，自主发布 RigCache”。失效结论限于图注说明的不兼容替换情境，不是任何更新必然失效。
- **02 Modularity / 第三部分**：左侧示意资源树，右侧真实 Shot Builder 截图节选，保留原始版本及状态，不把示例数据说成截图中的数据。窄屏上下排列。
- **03 State**：取消 Before 对比。因模块可以独立发布，单次发布描述局部变化，系统将变化合并到已有状态，维护完整镜头状态。第二段改为 `MODULAR PUBLISH → FULL STATE` 单幅图，标题区为 `STATE MODEL`；保留 Delta / Current State JSON 切换。历史冻结原文不改写。
- **04 Execution / 第三部分**：左侧五阶段执行示意，右侧 Publish 原始界面缩略图，约 190px 宽，去掉顶部窗口栏。点击直接放大实际截图，不播放首页的原型转实现动画。支持关闭按钮、Escape、背景点击及关闭后焦点返回，打开时锁定外层页面滚动。移动端上下排列。查看器为独立小型 Client Component，卡片正文仍由服务端生成。
- 导航中文曾改为“设计/创新”；用户同日最新截图纠正为 **“设计&创新”**，英文仍为 Design & Innovation，URL 不变。

新增入口：`CompatibilityComparison.tsx/.module.css`（对比图与旋转），`PublishPreview.tsx/.module.css`（截图缩略图及原生 dialog）。左右示例布局在 `ProductionSpecimen.tsx` 与 `DesignPage.module.css`；03 条件布局在 `DesignPage.tsx`，解释文案在 `decisionCards.ts`、`decisions.ts`。导航名称在 `destinations.ts` 与 `translations.ts`。

最终截图：`artifacts/compatibility-comparison-updated.png`、`modularity-example-split.png`、`execution-preview.png`。旧 `execution-example-split.png` 和 `card-freeze-01..04.png` 不代表最新全部视觉。

本轮最新构建通过。浏览器专项验证：03 不再含 Before、承接说明可见、JSON 切换正常；04 放大、Escape、关闭按钮、背景点击、焦点返回及 390px 视口容纳检查通过。桌面 1440px、移动 390px 左右/上下布局均已检查。此前 22 项测试是前一版本记录，本次回归结果另见下方发布记录；不宣称全部历史测试都在最新版本重跑。

随后用户要求保留参考图的细网格立方体，材质只把内部白色改成绿色：Compatibility 的立方体改为投影可见面、深色外轮廓和浅色五等分网格，不再透视显示背面边线；Surface v1 使用同款立方体薄荷绿填充，历史缓存的 Mint 也改为面填充，旋转带动面和网格同步。New Surface 小球保留。构建及旋转/暂停/reduced-motion 专项测试通过，截图已重新检查；未部署。

最新截图修正：Compatibility 的 Part 02 使用 `CompatibilityComparison.tsx` / `.module.css` 重画 Before 与 WEFT / PPL 流程。Surface v1 为薄荷绿方块，New Surface v2 为薄荷绿圆；White Model 为立方体，Animation 与历史 RigCache 同步绕竖轴旋转，右侧历史缓存为 Mint。左侧“不兼容 Surface 强制替换”情境标注“历史Rigcache完全失效”，右侧标注“历史发布仍然可用”。用户已确认删除右下 New Surface 之后的整条链。保留卡内其他两段、滚动和循环导航。旋转离屏、隐藏标签、非活动卡、编辑或 reduced-motion 时停止。构建及最初 10 项相关测试通过；检查截图后修正 SVG 在首尾切换/reduced-motion 后继承隐藏的问题，追加可见性断言并单独复测通过。图示不是生产缓存真实播放。此项在 GitHub 发布阻塞记录之后新增，尚未提交/推送。

1. 四张卡统一按 **Decision → Before / WEFT / PPL → Project Example** 纵向阅读。取消四象限与独立 MODEL DIAGNOSIS；问题归入 Before，System Shift 为标题区一行。
2. 卡片随视口固定尺寸，正文内部滚动，卡头及底部切换控件固定；四个索引与卡片一起随外层页面移动，不独立吸顶。小屏在卡内纵向排版。
3. 卡片循环：01 左边为 04，04 右边为 01；侧边、PREV/NEXT、方向键与滑动一致。Home/End 直达首尾。
4. 导航收起后，桌面仅在 8px 窄条悬停 300ms 展开，移出取消；移动/粗指针使用可见 44px 按钮。保留键盘、Escape、编辑与减少动态效果行为。
5. 首页动画在 JS 初始化前不显示完成态图形，初始化成功后从开场播放。首次打开、刷新和从章节返回均已专项验证；无 JS / 减少动态保留静态图。正文不被全页加载遮罩挡住。
6. Compatibility 的 USDA 示例中，`SY_V1%USD` 已替换为纯灰矩形，页面 DOM 不再包含该前缀文字；后续路径与 av / step 高亮保留。这是展示遮盖，不是对历史文档或 Git 历史的脱敏清理。

## 内容边界

- 模块图与资源示例对应 Camera、Set、Character A RigCache / CFX、Character B RigCache，不用 Hair 表示已完成 Assembly。
- 状态图为 A v002→v003，B v001 和 Camera v003 保留。示例 JSON 的 Camera 仍在独立字段，不放入 rigcache。
- USDA、JSON、资源树与五阶段执行序列明确为简化示意。READY / LOADED 并非真实当前状态；执行序列没有伪造检查通过结果。
- 本轮未运行生产 Resolver、USD 解析器或真实 Publish；公开截图授权仍按历史确认执行。

## 主要代码入口

| 文件 | 责任 |
| --- | --- |
| `src/components/design/DesignPage.tsx` | Card 模板：03 无 Before，04 不渲染第三段 |
| `src/content/decisionCards.ts` | Before、问题、设计结论、示例标题 |
| `src/content/decisions.ts` | 五卡主文案、索引、深入链接文案 |
| `src/components/design/DecisionDeck.tsx` | 循环、切换方向、键盘、触摸、内部滚动重置 |
| `src/components/design/DecisionDiagrams.tsx` | 五卡概念图入口，模块与状态示例同步 |
| `src/components/design/TaskCompositionDiagram.tsx` / `.module.css` | 按职责拆分任务、Mint 汇入 Ani Master State 的响应式图解 |
| `src/components/design/ProductionSpecimen.tsx` / `ArtifactState.tsx` | 示例和 JSON 双视图、灰色前缀块 |
| `src/components/design/DesignPage.module.css` | 卡片尺寸、三段版式、内部滚动、示例样式 |
| `src/components/AutoHeader.tsx` / `.module.css` | 导航窄条悬停和移动点击开关 |
| `src/components/MotionFigure.tsx` / `.module.css` | 图形首帧与异步动画初始化 |
| `src/components/HeroFactsMotion.tsx` / `.module.css` | 打字信息首帧与停止后的完整显示 |

## 验证与发布

### 历史发布回执：四卡版本 70dca1a

- **此前四卡版本已成功推送 GitHub `main`。** 实现提交 `70dca1a`（`feat: refine decision cards and add Publish image preview`），`git push origin main` 返回成功，远程由 `0fb8dff` 更新为 `70dca1a`；回执提交为 `84ea225`。这不是本次五卡版本的上传结果；下方失败记录均为历史。未部署 GitHub Pages。

- 再次 `git fetch origin` 成功，远程 `main` 已是 `0fb8dff`，与本地提交一致（领先/落后均为 0）。下面“未推送成功”仅记录早前尝试，不再代表远程缺少那两笔提交；无法从本次检查判断中间由何人完成同步。
- 当前新增内容为四卡修订、Publish 放大查看和导航中文更名，交接及 AGENTS 已同步。GitHub 发布仍指源码推送，不包含 Pages 配置或网站部署。
- Deck / Viewer / Compatibility 首轮 10 项中 9 项通过，1 项因导航更名后测试仍引用旧名称失败；已同步更新测试文本。构建、静态导出及本轮交互手动脚本检查通过。
- 更名断言修正后，Deck 4 项和首页首帧 3 项重跑全部通过。加上首轮已通过的 Viewer 5 项和 Compatibility 1 项，本次覆盖 13 个不同用例；首页其他历史测试未全部重跑。

### 前一版本验证与历史发布记录

- 最新产品改动后 `npm run build` 已通过，包含 TypeScript 与静态导出。
- 发布前 Deck/Viewer 9 项、导航 2 项、首页首帧及 Summary 4 项、Hero 7 项，共 **22 项全部通过（约 1.7 分钟）**。
- 旧 Hero 录像测试曾因沙箱启动录像进程 `spawn EPERM` 失败；本轮允许本地录像进程后 7 项全部通过，先前环境阻塞已解除。
- 不运行旧 `scripts/verify-export.mjs` 作为当前验收：它仍期待所有章节均为占位，且使用旧 VIEW EVIDENCE 文案，需另行更新。
- 用户本次明确授权提交、正常推送 GitHub。目标为 `Ace199/WEFT_PPL_Presentation` 的 `main`；发布前 fetch 后本地/远程均无领先落后。禁止强推。
- 仓库没有 Pages workflow，按既往发布约定，本次发布是源码推送，不代表网站上线。实际推送结果以提交号和远程核对为准。
- 不上传本轮临时 trace、失败日志和中间截图目录；本地保留以供排查。

## 后续工作

- **历史阻塞（其后已上传，不代表当前状态）：** 提交 `2789f1931398080897caaa7751be9822188eca8d` 曾两次 push 无法连接 github.com:443；GitHub 连接器创建 blob 曾返回 `403 Resource not accessible by integration`。随后该提交及后续四卡版本均已进入远程，见上方历史成功回执。正常推送须检查远程，不强推。
- 用户最终视觉验收、实体手机、多浏览器冷启动、真实读者反馈尚未完成。
- 性能目标不是保证；旧性能文件仅为当时实验数据，本轮没有重新完整测量 Core Web Vitals。
- 如果后续要求网站上线，需要确认 Pages 设置、根域名/仓库子路径，构建时设置 base path 并验证线上资源和直达刷新。
- 新会话先检查 Git 状态与本文，再按任务读取历史交接。不要恢复四象限、独立吸顶索引、非循环端点或整行透明导航热区。

## 最新接续：Systematic Thinking 共享模型图标与标题微调

- `/systematic-thinking/` 的深色 **PRODUCTION REALITY** 共享模型已将“制作成果”和“生产格式”拆为两行。第一行仅保留镜头、场景、资产的概念图标及“镜头 / 场景 / 资产 / 其他”；第二行独立显示 `PRODUCTION FORMATS / 生产格式`、USD、Alembic 与 `.usd / .abc`。不要再把五个图标压进同一行。
- USD 使用用户提供的透明原图 `public/images/formats/usd.png`。Alembic 来自用户提供的黑色标志，已生成并保存为透明 PNG `public/images/formats/alembic-transparent.png`；深色背景上通过反白显示。已检查该文件包含透明通道，不恢复白色矩形背景。
- PEOPLE / TASKS 的两个人物图标缩至 `scale={0.72}`，图组宽度约 190px，并将首个现实分组上移（顶部间距 20px）；这是用户对截图比例的明确校正，不要恢复原来的大图标与下沉空白。
- 制作成果的相机、场景和资产图标再缩小约 20%（相机 / 场景 `0.56`，资产 `0.72`）；保留顺序与原有间距。
- Maya 与 Houdini 图标上方已增加 `DCC SOFTWARE / 生产软件`。中文翻译键为“生产软件”，英语为 “Production software”；DCC 标识仍使用既有用户提供的 Maya、无白边 Houdini 图标。
- 深色共享模型标题“统一的不是软件，而是生产语义。”已合成单个翻译单元并强制单行。英文为 “Different software. Shared production semantics.”；标题字号以 `clamp(25px, 4vw, 61px)` 适配窄屏，不能重新插入 `<br>` 造成两行。
- 上述最后一轮页面修改后，`npm run build` 通过（编译、TypeScript 与静态导出）。未就这些纯视觉微调重新运行实体设备、完整浏览器回归或部署检查；本轮未提交、推送 GitHub 或部署 Pages。
