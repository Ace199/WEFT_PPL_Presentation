# WEFT / PPL

**跨软件协作的动画生产系统 · A Cross-DCC Production System**

让不同人、不同软件产出的制作成果，能够正确交接和组合。

本仓库是 WEFT / PPL 的公开案例展示网站，通过交互图示、设计决策和真实工具截图，介绍系统如何组织动画生产中的模块、依赖、版本与状态。仓库包含展示网站源码，不包含生产管线工具的完整实现。

## 页面与内容

| 页面 | 路径 | 内容 |
| --- | --- | --- |
| 项目概览 | `/` | 系统简介、共享场景的三种视角、Shot Builder / Publish 工具展示 |
| 系统思考 | `/systematic-thinking/` | 生产问题、共享语义与系统组织方式 |
| 设计&创新 | `/design-innovation/` | 兼容历史、可组合模块、完整状态、任务协作与可执行规则 |
| 联系 | `/contact/` | 项目介绍、关注方向与联系方式 |

首页的 Organize / Transform / Operate 共用同一场景模型。前两种视角链接到对应章节，Operate 的 VIEW PRODUCTION 进入首页制作工具展示区。当前不导出 `/next/`、`/in-production/` 或 `/evidence/`。

网站支持中英文切换、响应式布局、键盘交互和减少动态效果偏好。概念图、资源状态及执行序列属于说明性示例；真实工具截图与示例分开呈现，不将图示视为生产运行验证记录。

## 技术栈

- Next.js App Router、React、TypeScript
- CSS Modules、GSAP、SVG、Canvas 2D
- 本地类型化内容与静态媒体，无后端或 CMS
- Next.js 静态导出，GitHub Actions / GitHub Pages 发布

## 本地开发

建议使用 Node.js 24，与部署工作流保持一致。

```powershell
npm ci
npm run dev
```

打开 [本地开发页面](http://127.0.0.1:3000)。

构建并预览静态导出：

```powershell
npm run build
npm run preview
```

打开 [本地静态预览](http://127.0.0.1:4173)。构建产物位于 `out/`，预览服务器直接读取该目录。

## 检查与测试

```powershell
npm run typecheck
npm run build
npm test -- --reporter=list
```

Playwright 当前使用 Microsoft Edge（`msedge` channel），运行前需安装 Edge；其他环境需调整浏览器配置。测试会启动静态预览服务，因此必须先构建。默认测试地址使用根路径，运行前应清除非空的 `NEXT_PUBLIC_BASE_PATH` 并重新构建。

测试代码位于 `tests/`，覆盖导航、语言、交互场景、设计卡片、图片查看器及临时编辑等行为。测试范围以代码为准，实际通过情况以对应运行结果为准；历史截图和日志不代表当前版本已通过全部检查。

`scripts/verify-export.mjs` 仍包含旧导航选择器，需更新后才能用于当前页面验收。

## 临时文案预览

页面提供“试编辑”入口，可预览白名单文案修改、恢复原文，并复制实际差异清单。关闭面板保留当前临时修改，刷新后恢复正式内容；网站不提供保存或发布功能。

文案覆盖值只存在内存中，不写入浏览器存储或后台。语言偏好单独保存在浏览器 `localStorage` 的 `weft-ppl.language` 下，用于跨页面和刷新后恢复中英文选择。

永久更新需维护者核对差异清单与当前源文案，再修改源码、验证并提交。

## 项目结构

```text
src/app/          页面路由、metadata 与全局样式
src/components/   页面组件、交互、动效与临时编辑器
src/content/      类型化文案、中英文内容与导航定义
src/data/         共享图模型
src/lib/          状态、视觉目标与路径工具
public/           网站使用的公开静态资源
scripts/          本地静态服务器与检查脚本
tests/            Playwright 浏览器测试
.github/workflows/ GitHub Pages 构建和部署流程
```

`doc/` 和 `ref/` 是本地规划文档与设计参考目录，已加入 `.gitignore`，不再随仓库分发；克隆仓库不会获得这些文件。网站运行所需媒体保存在 `public/`。历史提交仍可能包含上述本地资料。

## GitHub Pages

[部署工作流](.github/workflows/deploy-pages.yml) 在推送到 `main` 或手动触发时执行：安装依赖、静态构建、上传 `out/` 并部署到 GitHub Pages。仓库的 Pages 来源需设置为 GitHub Actions。

工作流当前将 `NEXT_PUBLIC_BASE_PATH` 设置为 `/WEFT_PPL_Presentation`。可在本地按相同子路径预览：

```powershell
$env:NEXT_PUBLIC_BASE_PATH='/WEFT_PPL_Presentation'
npm run build
npm run preview
```

打开 [子路径静态预览](http://127.0.0.1:4173/WEFT_PPL_Presentation/)。切回根路径时清除变量并重新构建：

```powershell
Remove-Item Env:NEXT_PUBLIC_BASE_PATH -ErrorAction SilentlyContinue
npm run build
```

如改用自定义域名或其他仓库路径，需同步调整构建时的 base path。源码推送成功与网站部署成功是不同状态；部署结果以 GitHub Actions 和 Pages 环境记录为准。
