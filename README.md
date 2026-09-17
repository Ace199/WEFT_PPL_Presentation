# WEFT / PPL — V1 首页

Next.js App Router / React / TypeScript / CSS Modules / GSAP / SVG / Canvas 2D。V1 只完成首页内容；章节与 Evidence 仅提供“内容尚未开放”的最小目标页承接真实导航，无完整章节正文、CMS、后端或部署工作流。

## 本地运行

需要 Node.js 20.9+（本次使用 24.12.0）。

```powershell
npm ci
npm run dev
```

打开 http://127.0.0.1:3000。

## 构建与静态预览

```powershell
npm run build
npm run preview
```

打开 http://127.0.0.1:4173。`out/` 是完整静态导出，预览服务直接读取导出文件，不使用 Next.js 请求时服务。

## 验证

```powershell
npm run typecheck
npm test -- --reporter=list
node scripts/verify-export.mjs
```

测试使用本机 Microsoft Edge（Playwright 的 `msedge` channel）。其他环境需安装 Edge，或将配置改成已安装的 Chromium channel。测试自动启动静态预览服务；构建必须先完成。测试包括 390 / 768 / 1440px 截图、axe、12 次切换、键盘、触摸、缩放后命中对齐、减少动画、无 JS、RAF 生命周期，以及本机性能采样。

实际截图与测量结果在 `artifacts/`，详细检查记录见 [IMPLEMENTATION.md](IMPLEMENTATION.md)。

## 临时试编辑（V2.2）

页面右下角的“试编辑”对所有访客开放。打开后选择字段并输入，页面即时预览；关闭面板保留本页覆盖值，刷新恢复正式内容。支持单字段 / 全部恢复，以及复制只含实际差异的 JSON 清单。剪贴板不可用时展示可手动选择的只读清单。

23 个白名单字段及其稳定 ID 定义在 `src/content/home.ts`。覆盖值仅存在客户端 Provider 内存中；没有浏览器持久存储、后台写入、登录或 GitHub API。编辑器不修改网页 metadata、事实元数据、图节点、动画、图片或 URL。面板采用占据文档流的粘性顶部区域，支持定位正在编辑的文案；编辑期间暂停 ambient 和自动入场动画。

永久落实修改时：维护者先核对 `source`、`schemaVersion`、白名单字段以及每项 `original` 是否仍等于当前源值。有冲突先处理冲突；无冲突才修改代码、验证、提交、构建与部署。网站不提供直接保存或发布功能。

## 文件结构

- `src/app/`：Server Component 首页、metadata、全局 tokens 和页面样式。
- `src/content/home.ts`：本地文案、事实、来源说明、证据占位条目。
- `src/data/graph.ts`：固定图拓扑、语义角色及四种布局。
- `src/lib/`：合法状态 reducer、视觉目标与动效参数。
- `src/components/`：独立交互与动效组件；动态加载 GSAP 和环境 Canvas。
- `tests/`：静态导出上的浏览器检查与性能采样。
- `scripts/`：静态服务器及根路径 / 子路径检查工具。

Master Canvas 鼠标悬停或键盘焦点预览，点击固定选择；离开画布 380ms 后，未固定的预览返回 Overview。方向键、Home、End 切换观察角度；Escape 返回概览。图节点可聚焦或点击查看关系，文字说明可展开。开发环境按 D 打开状态调试信息。

页眉是跨页面的章节导航，不是本页目录。系统思考、设计与创新、下一步分别前往 `/systematic-thinking/`、`/design-innovation/`、`/next/`；画布的独立 EXPLORE 链接前往同名章节。VIEW EVIDENCE 前往 `/evidence/`。这些静态目标页仅说明“内容尚未开放”并提供返回首页，不代表完整章节已经实施。只有明确的 BACK TO TOP 等页内操作使用锚点。

Hero 按用户最新确认先随机散落、先慢后快聚簇，再接连线与 Resolve。各簇以独立的周期和随机幅度平滑呼吸，包含细胞大小、簇舒展及上下起伏；灰色底层连线加密，并与绿色连线一起采用曲线。鼠标进入图形时显示约 84px 半径的圆形影响区，中心细胞最多约 2.2 倍放大，向边缘渐弱，移开平滑恢复。触屏保留入场和呼吸，不模拟悬停；减少动画时直接显示原始 SVG。离屏、隐藏标签页和编辑期间停止持续绘制，退出编辑恢复呼吸但不重播入场。

Summary 仍独立播放 Fragmented → Structured → Coordinated，随后保持最终态；不使用滚动 scrubbing。Hero 的细胞轮廓来自相同 SVG，经一次性缓存后绘制，不改变文案或图拓扑。

鼠标接近某个 Hero 簇时，该簇还会向外舒展，中心绿色节点提高饱和度；离开后恢复。最新调整已移除标题下方的大背景簇，在标题右侧新增紧凑簇；入场仍从整个 Hero 画布随机散落。新增簇与相邻簇补上 10 条灰色曲线。左侧标题、副标题、说明和底部信息均按鼠标圆圈范围逐字放大：半径 84px，越近越大，中心最多 1.22 倍；离开平滑恢复，不改变排版。编辑态与 reduced motion 下停用放大。底部三项信息首次可见时逐字打出，字间 65–170ms、项间 1.15 秒停顿，光标闪烁；完成后保持完整文字，离屏或隐藏标签页暂停。编辑和 reduced motion 直接显示完整信息，无 JavaScript 时也保留全部正文。移动端保持正文与主图的阅读顺序。

## GitHub Pages（本次未部署）

根据 Next.js 官方 [Static Exports](https://nextjs.org/docs/app/guides/static-exports) 使用 `output: 'export'`、静态图片策略和 `.nojekyll`。实际站点 URL 尚未确认，因此未写 canonical、域名或部署工作流。

仓库子路径站点必须在**构建时**设置路径，例如：

```powershell
$env:NEXT_PUBLIC_BASE_PATH='/WEFT_PPL_Presentation'
npm run build
node scripts/verify-export.mjs
npm run preview
```

此时打开 http://127.0.0.1:4173/WEFT_PPL_Presentation/。上例是本地模拟路径，不是已确认线上 URL。根站点或自定义域名通常使用空 base path；清除后需要重新构建：

```powershell
Remove-Item Env:NEXT_PUBLIC_BASE_PATH -ErrorAction SilentlyContinue
npm run build
```

正式发布前需用实际 URL 再验证资源、页面刷新、锚点和缓存。

## 待补

两张真实生产 UI 脱敏截图、联系邮箱、最终视觉确认、实际读者测试。截图框明确是占位内容；没有宣称生产运行时已经独立核验。加入真实截图时需补充尺寸、替代文本并检查敏感信息，同时重新测量加载性能。

导航补充：Hero 在视口内时导航常驻；离开 Hero 后闲置约 800ms 收起，保留 8–10px 暖白边，鼠标移入、触屏点击或键盘进入时展开。桌面高度 78px。状态信息按三条向上轮播，可暂停；编辑和 reduced motion 下显示完整静态信息。返回 Hero 自动展开。
