# WEFT / PPL 开发交接 · 2026-09-20

本文件是本轮交接入口。历史设计与实现记录保留于 [2026-09-17 交接](WEFT_PPL_Development_Handoff_2026-09-17.md)，当前用户确认的 Card 结构见 [冻结原文](WEFT_PPL_Chapter02_Card_Structure_Freeze_2026-09-20.md)。明确区分网站展示、概念示例与生产运行时。

## 当前完成范围

- 首页、Systematic Thinking、Design & Innovation、带四个锚点的 In Production 页面已实现。
- `/next/`、旧 `/evidence/` 仍是占位页，不应视为已完成章节。
- Next.js 静态导出，React / TypeScript / CSS Modules / GSAP / SVG / Canvas；无后台或 CMS。语言偏好允许 localStorage，临时编辑只保存在内存。

## 本轮最终设计决定

### 最新接续：四卡修订与截图放大

以下为同日后续用户决定，覆盖下面早期“全部 Before 对比”的描述。

- **01 Compatibility**：保留细网格立方体，可见面为白色或薄荷绿填充，深色轮廓及浅色网格一致；动画和历史缓存同步旋转。模型和材质球使用同一套密集经纬线球体，材质只增加薄荷绿填充。右下只保留 Latest Model → New Surface。新增左侧“为匹配最新资产，被迫重新发布 RigCache”、右侧“按镜头视觉需求，自主发布 RigCache”。失效结论限于图注说明的不兼容替换情境，不是任何更新必然失效。
- **02 Modularity / 第三部分**：左侧示意资源树，右侧真实 Shot Builder 截图节选，保留原始版本及状态，不把示例数据说成截图中的数据。窄屏上下排列。
- **03 State**：取消 Before 对比。因模块可以独立发布，单次发布描述局部变化，系统将变化合并到已有状态，维护完整镜头状态。第二段改为 `MODULAR PUBLISH → FULL STATE` 单幅图，标题区为 `STATE MODEL`；保留 Delta / Current State JSON 切换。历史冻结原文不改写。
- **04 Execution / 第三部分**：左侧五阶段执行示意，右侧 Publish 原始界面缩略图，约 190px 宽，去掉顶部窗口栏。点击直接放大实际截图，不播放首页的原型转实现动画。支持关闭按钮、Escape、背景点击及关闭后焦点返回，打开时锁定外层页面滚动。移动端上下排列。查看器为独立小型 Client Component，卡片正文仍由服务端生成。
- 导航中文“设计与创新”改为“设计/创新”，英文仍为 Design & Innovation，URL 不变。

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
| `src/components/design/DesignPage.tsx` | 共用三段 Card 模板 |
| `src/content/decisionCards.ts` | Before、问题、设计结论、示例标题 |
| `src/content/decisions.ts` | 四卡主文案、索引、深入链接文案 |
| `src/components/design/DecisionDeck.tsx` | 循环、切换方向、键盘、触摸、内部滚动重置 |
| `src/components/design/DecisionDiagrams.tsx` | 四个概念图，模块与状态示例同步 |
| `src/components/design/ProductionSpecimen.tsx` / `ArtifactState.tsx` | 示例和 JSON 双视图、灰色前缀块 |
| `src/components/design/DesignPage.module.css` | 卡片尺寸、三段版式、内部滚动、示例样式 |
| `src/components/AutoHeader.tsx` / `.module.css` | 导航窄条悬停和移动点击开关 |
| `src/components/MotionFigure.tsx` / `.module.css` | 图形首帧与异步动画初始化 |
| `src/components/HeroFactsMotion.tsx` / `.module.css` | 打字信息首帧与停止后的完整显示 |

## 验证与发布

### 本次接续发布检查

- **当前发布状态：源码已成功推送 GitHub `main`。** 实现提交 `70dca1a`（`feat: refine decision cards and add Publish image preview`），`git push origin main` 返回成功，远程由 `0fb8dff` 更新为 `70dca1a`。本条发布回执单独追加文档提交；下方失败记录均为历史。未部署 GitHub Pages。

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

- **本轮实际发布状态：未推送成功。** 本地实现提交 `2789f1931398080897caaa7751be9822188eca8d`，包含源码、文档、测试与选定截图。两次 `git push origin main` 均因无法连接 github.com:443 失败；随后尝试 GitHub 连接器，创建 blob 返回 `403 Resource not accessible by integration`，未写入远程内容。连接器读取确认远程 main 仍为 `99dfed65c773376fa116574f66e5d6416f61da7e`。需要恢复 GitHub 网络连接或提供连接器仓库写权限后再发布；正常推送前重新 fetch，不强推。
- 用户最终视觉验收、实体手机、多浏览器冷启动、真实读者反馈尚未完成。
- 性能目标不是保证；旧性能文件仅为当时实验数据，本轮没有重新完整测量 Core Web Vitals。
- 如果后续要求网站上线，需要确认 Pages 设置、根域名/仓库子路径，构建时设置 base path 并验证线上资源和直达刷新。
- 新会话先检查 Git 状态与本文，再按任务读取历史交接。不要恢复四象限、独立吸顶索引、非循环端点或整行透明导航热区。
