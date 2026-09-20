# WEFT / PPL 开发交接 · 2026-09-20

本文件是本轮交接入口。历史设计与实现记录保留于 [2026-09-17 交接](WEFT_PPL_Development_Handoff_2026-09-17.md)，当前用户确认的 Card 结构见 [冻结原文](WEFT_PPL_Chapter02_Card_Structure_Freeze_2026-09-20.md)。明确区分网站展示、概念示例与生产运行时。

## 当前完成范围

- 首页、Systematic Thinking、Design & Innovation、带四个锚点的 In Production 页面已实现。
- `/next/`、旧 `/evidence/` 仍是占位页，不应视为已完成章节。
- Next.js 静态导出，React / TypeScript / CSS Modules / GSAP / SVG / Canvas；无后台或 CMS。语言偏好允许 localStorage，临时编辑只保存在内存。

## 本轮最终设计决定

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
