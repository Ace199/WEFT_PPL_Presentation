# Design & Innovation — visual QA, 2026-09-18

## 2026-09-19 — Fixed card viewer (supersedes the layout notes below)

- User's latest screenshot correction retains bordered cards and neighboring slivers, with large main diagrams. Each card has a viewport-responsive fixed frame, its own native vertical body scrollbar, and a fixed header/footer. Wheel input inside the body does not move the page. Side slivers, indexes, keyboard, swipe and footer controls select the same decision.
- Removed the model interstitial; kept Synthesis and four deeper anchors. Added simplified USDA / resource tree / JSON / execution specimens, with semantic Mint highlights. JSON Delta / Current State has a small independent selector. Original UI crops remain on the deeper page. No actual runtime results were fabricated.
- Build and 8 targeted Edge checks passed (17.4s) before the subsequent index-overlay correction. Includes real mouse wheel, 1440×800 bilingual card bounds and persistent controls, 1280×600 and 390×844 body bounds, scoped tablet axe, navigation/anchors, keyboard, simulated touch and reduced motion. A short-screen test initially failed because it had not aligned the outer viewer; the final test explicitly aligns it before verifying internal scrolling. Mobile visual inspection additionally exposed a long-code intrinsic-width issue; this was fixed and covered by a body-width and CTA visibility assertion.
- Latest reported defect: standalone sticky indexes moved across the fixed card while the outer page scrolled. Indexes now stay in document flow with the card; an additional scroll-range regression verifies they remain above it.
- After that correction: static build passed; `tests/design-viewer.spec.ts` passed all 5 tests (8.8s), including outer scrolling at 0/150/350/550px offsets and unchanged inner wheel/control behavior. Earlier four Deck tests passed against the fixed-card implementation; no full-site regression was run.
- Screenshots: `artifacts/design-viewer-zh-1.png` through `4.png`, corresponding English images, `design-viewer-zh-scrolled.png`, and `design-viewer-scroll-390.png`. These are browser renderings, not user visual acceptance. USDA is a supplied simplified syntax specimen, not validated against the production Resolver. No deployment or physical-device verification.

final result: passed

## Scope and visual truth

- Source: `ref/final3.png`, 860 × 1828 pixels.
- Implementation: `http://127.0.0.1:4173/design-innovation/`, static export.
- Desktop capture: `artifacts/design-deck-desktop.png`, 1440 × 2650 pixels; viewport 1440 × 1000 CSS px, DPR 1; Compatibility active, Chinese, page at top, no focused control.
- Both source and desktop capture were displayed together in one in-memory comparison image, each normalized to 650px wide without cropping or stretching. The supplied reference is a full-page image, not a measured browser viewport; this is proportional visual comparison, not a pixel-identical claim.
- Intentional source deviations: the existing shared navigation (including language and status) takes precedence over the reference's simplified header; user removed the entire bottom In Production index; no decorative crop marks; technical font and body font reuse the established site. Four procedural diagrams explain concepts, while the two original production UI crops remain real images.

## Focused and responsive comparisons

- `artifacts/design-deck-tablet-1.png` through `design-deck-tablet-4.png`: active-card captures at a 768 × 1024 CSS viewport, DPR 1, reduced motion. The final State capture is 664 × 1663px. State and Modularity were inspected at full readable size; Execution and the two production artifact regions were also inspected separately.
- `artifacts/design-deck-mobile-1.png` through `design-deck-mobile-4.png`: 390 × 844 CSS viewport, DPR 1, touch context, reduced motion. Compatibility full-page capture is 390 × 3081px.
- `artifacts/design-deck-english.png`: English Execution state, language restored after reload.
- Final Shot Builder and Publish crop regions were viewed together after adding explicit clipping rectangles. Original state colors, values and labels remain unchanged. The supplied Publish image does not show QC Instance; it was not fabricated.

## Findings and iteration history

1. Initial desktop capture was taken while scrolled and showed the shared sticky navigation inside the full-page screenshot. Capture now returns to the top, removes focus and waits for the header's Hero state. This was a capture-state mismatch.
2. [P2, fixed] Mobile diagram labels were too small and Synthesis nodes did not align when labels wrapped. Increased diagram label sizes and gave summary items equal label-row height. Re-captured mobile and tablet states.
3. [P2, fixed] Automated contrast checks found two small labels at 4.47/4.49:1 and a faded next-card label. Darkened these labels while preserving the neutral palette. All four active cards now pass the scoped WCAG 2 A/AA axe checks.
4. [P2, fixed] Tablet desktop columns produced a short orphan line in the State heading. Use the vertical poster layout at 960px and below. Final tablet capture has the intended two-line statement and readable diagram.
5. [P2, fixed] A flex sizing adjustment let a card CTA extend beyond its panel boundary. Restored normal article flow and added a bounds assertion for all four tablet cards; re-captures show complete CTAs.
6. [P2, fixed] SVG viewBox alone exposed source-image content outside the desired crop under letterboxing. Added explicit clip paths; final focused comparison confirms the requested image regions.
7. [P2, fixed] Shared Next Link automatic prefetch requested nonexistent static segment files (`__next.$d$section.__PAGE__.txt`). Disabled automatic prefetch in the shared SiteHeader without changing layout, labels or destinations. Actual chapter navigation and console/resource checks pass.

## Required fidelity surfaces

- Typography: established Microsoft YaHei/body fallback and Barlow Condensed technical typography retained; increased main statement, summary and diagnosis hierarchy after comparison; controlled line breaks and complete tablet CTAs verified.
- Spacing/layout: 4.35% outer margins, a 95%-width desktop poster with a narrow next-card edge, thin internal rules, 4px outer radius, stacked small-screen content and a full-width dark Synthesis band. The common panel footprint deliberately avoids navigation jumps across decisions.
- Color/tokens: Ivory / charcoal / Mint retained. Mint denotes valid relations, changed/current entries or selected controls; G2 and G3 both retain valid compatibility paths. Real screenshot colors are untouched.
- Assets: original public Shot Builder and Publish images, display-only crop, no fabricated UI; RigCache structure and record data explicitly labeled simplified. Conceptual SVGs follow the project's explicit diagram requirements.
- Copy: latest user-provided four parallel decisions override the historical sequential specification; diagnosis belongs inside each card; no user-visible Evidence/Proof/Verification heading in cards; the bottom In Production index is absent; all four concrete CTAs reach one anchored page.

## Verification

- `npm run build`: passed, including the new `/in-production/` static route.
- `npm run typecheck` and `git diff --check`: passed during implementation; final build includes TypeScript checking.
- Final `npx playwright test tests/design-deck.spec.ts --output=artifacts/design-test-results --reporter=list`: 4 passed (17.3s).
- Checks include top indexes, Prev/Next, indicators, keyboard arrows, rapid interruption, hover without switching, inactive content inertness, simulated touch swipe versus vertical movement, reduced motion, 390/768px overflow, four destination anchors, bilingual reload, actual shared navigation, active-card axe checks, CTA bounds and absence of page/console/resource errors in the navigation scenario.
- In-app automation was blocked by a local sandbox initialization fault. The user explicitly approved the existing Playwright/Edge fallback. Preview was queued to open in Codex and the static preview server was left running.

No remaining actionable P0/P1/P2 visual findings in the reviewed scope. This is agent QA, not final user visual acceptance or human reader testing. Physical touch hardware, broader cross-browser behavior, real-user performance, runtime production behavior and deployment were not validated. The actual production crops are intentionally small; the In Production destination provides a larger presentation.
# 2026-09-20 / Card 结构冻结

- GitHub 发布前最终回归：Deck/Viewer、Header、Home first frame、Summary、Hero 共 22 项通过（约 1.7 分钟）。Hero 录像进程在允许执行的环境中通过，覆盖此前 EPERM 限制；构建成功。

- 统一三段：Decision → Before / WEFT / PPL → Project Example。保留固定 Card / 内部滚动 / 循环切换；删除独立诊断象限，加入 Before 模型与问题，System Shift 收为一行。
- 模块及状态图与项目示例对齐，JSON Camera 为独立字段；资源状态和执行序列均标为示意。未验证生产运行时。
- `npm run build` 成功；Deck + Viewer 中 8 项首次通过，短窗口/移动测试更新重复 pre 的定位后单独通过，总计 9 项。包括双语、三个连续区域、JSON 解析、滚动/底部控件、触摸、循环及无障碍检查。
- 展开截图 `artifacts/card-freeze-01.png` 至 `04.png` 仅用于内容评审；未部署，未做实体手机或用户视觉验收。

# 2026-09-19 / 卡内图文收紧

- 首页首帧：阻断脚本后，旧版本 Hero SVG 为 visible，完成态闪现已复现；修复后同一测试通过。新增 home-first-frame.spec.ts 覆盖初始化前、正常进入/刷新/章节返回、reduced-motion/无 JS；加 Summary 共 4 项通过，build 成功。旧 hero.spec.ts 录像收尾 spawn EPERM（1440px 另因录像关闭超时），未将其计为通过；未部署，未做所有浏览器冷启动验证。

- 最新循环切换：01 左侧为 04、04 右侧为 01。侧边、底部按钮、左右键、滑动共用循环选择逻辑，过渡方向按操作方向处理。构建成功，Deck + Viewer 9 项测试通过，包含首尾侧边文案、首尾按钮切换与键盘焦点循环；未部署。

- 导航误触修正：AutoHeader 桌面 8px 热区 + 300ms 可取消悬停，移动端明确 44px 点击开关。构建成功；5 项 Viewer 回归通过，新增 2 项导航测试通过（四索引真实坐标点击、悬停取消/展开、键盘、模拟触摸）。未做实体手机验证。测试避免 locator.click 自动滚动将 Viewer 送回 Hero 边界，使用实际坐标验证原位点击。

- 缩小概念图、主标题和说明，桌面 SYSTEM SHIFT 横排，收紧分区间距；保持固定 Card、侧边卡片和内部滚动。
- `npm run build` 成功；`tests/design-viewer.spec.ts` 5 项通过，覆盖中英文四卡、短窗口、移动端、内部滚动和导航。查看桌面中英文截图，主要图文完整位于上部，下方细节仍可滚动。
- 未部署；未做实体手机或用户视觉验收。
