# WEFT / PPL 开发交接 · 2026-09-20

本文件是本轮交接入口。历史设计与实现记录保留于 [2026-09-17 交接](WEFT_PPL_Development_Handoff_2026-09-17.md)，Card 的早期结构基线见 [冻结原文](WEFT_PPL_Chapter02_Card_Structure_Freeze_2026-09-20.md)。以下最新用户决定优先于历史四卡冻结记录；明确区分网站展示、概念示例与生产运行时。

## 本次上传摘要 · 2026-09-20

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

- 首页、Systematic Thinking、Design & Innovation、带五个锚点（含 task-composition）的 In Production 页面已实现。
- `/next/`、旧 `/evidence/` 仍是占位页，不应视为已完成章节。
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
