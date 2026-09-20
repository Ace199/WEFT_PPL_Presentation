# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: header-reveal.spec.ts >> mobile has a visible bounded toggle that opens and closes on tap
- Location: tests\header-reveal.spec.ts:41:5

# Error details

```
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 12
Received:    98

Call Log:
- Timeout 5000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - link "跳到正文" [ref=e3] [cursor=pointer]:
      - /url: "#design-main"
    - banner [ref=e4]:
      - link "WEFT / PPL" [ref=e5] [cursor=pointer]:
        - /url: /
      - navigation "章节导航" [ref=e6]:
        - link "00 / 项目概览" [ref=e7] [cursor=pointer]:
          - /url: /
        - link "01 / 系统思考" [ref=e8] [cursor=pointer]:
          - /url: /systematic-thinking/
        - link "02 / 设计&创新" [ref=e9] [cursor=pointer]:
          - /url: /design-innovation/
        - link "03 / 下一步" [ref=e10] [cursor=pointer]:
          - /url: /next/
      - generic [ref=e11]:
        - 'group "生产状态：PRODUCTION SYSTEM，STATUS: ACTIVE，2026" [ref=e12]':
          - generic [aria-hidden] [ref=e13]:
            - generic [ref=e14]: PRODUCTION SYSTEM
            - generic [ref=e15]: "STATUS: ACTIVE"
            - generic [ref=e16]: "2026"
        - group "Language / 语言" [ref=e17]:
          - button "切换为中文" [pressed] [ref=e18] [cursor=pointer]: 中
          - generic [aria-hidden] [ref=e19]: /
          - button "Switch to English" [ref=e20] [cursor=pointer]: En
    - main [ref=e21]:
      - region [ref=e22]:
        - paragraph [ref=e23]: 02 / DESIGN & INNOVATION
        - heading "重新审视生产的 默认假设。" [level=1] [ref=e24]
        - paragraph [ref=e25]: TRANSFORMING PRODUCTION ASSUMPTIONS
        - paragraph [ref=e26]: 当版本、依赖与变化暴露出边界，WEFT / PPL 选择重新审视生产模型，而不是继续增加补丁。
      - generic [ref=e27]:
        - group "设计决策索引" [ref=e28]:
          - button "01 / COMPATIBILITY Compatible History" [pressed] [ref=e29] [cursor=pointer]:
            - generic [ref=e30]: 01 / COMPATIBILITY
            - generic [ref=e31]: Compatible History
          - button "02 / MODULARITY Composable Modules" [ref=e33] [cursor=pointer]:
            - generic [ref=e34]: 02 / MODULARITY
            - generic [ref=e35]: Composable Modules
          - button "03 / STATE Materialized Full State" [ref=e36] [cursor=pointer]:
            - generic [ref=e37]: 03 / STATE
            - generic [ref=e38]: Materialized Full State
          - button "04 / TASK COMPOSITION Independent Subtasks" [ref=e39] [cursor=pointer]:
            - generic [ref=e40]: 04 / TASK COMPOSITION
            - generic [ref=e41]: Independent Subtasks
          - button "05 / EXECUTION Executable Rules" [ref=e42] [cursor=pointer]:
            - generic [ref=e43]: 05 / EXECUTION
            - generic [ref=e44]: Executable Rules
        - region [ref=e45]:
          - heading "DESIGN DECISION VIEWER / 05" [level=2] [ref=e46]
          - generic [ref=e47]:
            - button "上一张决策卡" [ref=e48] [cursor=pointer]: 05 / EXECUTION
            - region "设计决策卡片，左右方向键切换" [ref=e49]:
              - article [ref=e52]:
                - generic [ref=e53]:
                  - generic [ref=e54]: 01 / COMPATIBILITY
                  - generic [ref=e55]: FIG. 02.01
                - region "COMPATIBILITY — 可上下滚动 / Scroll for details" [ref=e56]:
                  - generic [ref=e57]:
                    - paragraph [ref=e58]: PART 01 / DECISION
                    - heading "从追随最新， 到保留兼容历史。" [level=3] [ref=e59]
                    - paragraph [ref=e60]: 工作继续向前， 已经成立的历史成果仍然有效。
                    - paragraph [ref=e61]:
                      - generic [ref=e62]: SYSTEM SHIFT
                      - text: Global latest
                      - generic [aria-hidden] [ref=e63]: →
                      - text: Compatibility-scoped resolution
                  - region "Before → WEFT / PPL" [ref=e64]:
                    - heading "PART 02 / BEFORE → WEFT / PPL" [level=4] [ref=e65]
                    - generic [ref=e66]:
                      - figure "强制将不兼容的新 Surface 用于历史 RigCache 时，原本可用的发布结果失效。" [ref=e67]:
                        - heading "BEFORE" [level=5] [ref=e68]
                        - 'img "Before: forcing an incompatible new Surface onto historical RigCache invalidates the historical publish." [ref=e69]':
                          - generic [ref=e74]: TIME →
                          - generic [ref=e78]: HistoricalModel (G2)
                          - generic [ref=e82]: Surface (v1)
                          - generic [ref=e86]: White Model(Geometry)
                          - generic [ref=e90]: Animation
                          - generic [ref=e94]: RigCache(Historical)
                          - generic [ref=e110]: LatestModel (G3)
                          - generic [ref=e126]: New Surface(v2)
                          - generic [ref=e128]: 历史Rigcache完全失效
                          - generic [ref=e129]: Not compatiblewith historical RigCache
                          - generic [ref=e131]: 为匹配最新资产，
                          - generic [ref=e132]: 被迫重新发布 RigCache
                      - figure "历史 RigCache 保留兼容 Surface 的引用，新工作继续向前。Mint 表示合法兼容关系，而非最新版本。" [ref=e134]:
                        - heading "WEFT / PPL" [level=5] [ref=e135]
                        - 'img "WEFT / PPL: historical RigCache preserves its compatible Surface reference and remains usable while new work moves forward." [ref=e136]':
                          - generic [ref=e140]: TIME →
                          - generic [ref=e144]: HistoricalModel (G2)
                          - generic [ref=e148]: Surface (v1)
                          - generic [ref=e149]: Compatibility Reference
                          - generic [ref=e155]: White Model(Geometry)
                          - generic [ref=e159]: Animation
                          - generic [ref=e163]: RigCache(Historical Published)
                          - generic [ref=e164]: 历史发布仍然可用
                          - generic [ref=e180]: LatestModel (G3)
                          - generic [ref=e196]: New Surface(v2)
                          - generic [ref=e197]: 按镜头视觉需求，
                          - generic [ref=e198]: 自主发布 RigCache
                      - paragraph [ref=e200]: 概念示意 · 旋转仅用于表达动画与缓存，不代表真实播放记录。
                  - region "Project example" [ref=e201]:
                    - heading "PART 03 / PROJECT EXAMPLE" [level=4] [ref=e202]
                    - heading "RigCache USD / Compatibility Reference" [level=5] [ref=e203]
                    - figure "简化 USDA 示例 · 已发布 RigCache 包含本地动画几何与带兼容范围的 Surface 逻辑依赖；资产继续演进后，历史 RigCache 仍可按原兼容范围解析和渲染。" [ref=e204]:
                      - generic [ref=e205]:
                        - generic [ref=e206]:
                          - generic [ref=e207]: RigCache.usda
                          - generic [ref=e208]: USDA
                        - generic "RigCache.usda" [ref=e209]:
                          - code [ref=e210]:
                            - generic [ref=e211]:
                              - generic [aria-hidden] [ref=e212]: "01"
                              - generic [ref=e213]: "#usda 1.0"
                            - generic [ref=e214]:
                              - generic [aria-hidden] [ref=e215]: "02"
                              - generic [ref=e216]: (
                            - generic [ref=e217]:
                              - generic [aria-hidden] [ref=e218]: "03"
                              - generic [ref=e219]: subLayers = [
                            - generic [ref=e220]:
                              - generic [aria-hidden] [ref=e221]: "04"
                              - generic [ref=e222]: "@./Character__geo.usd@,"
                            - generic [ref=e223]:
                              - generic [aria-hidden] [ref=e224]: "05"
                              - generic [ref=e225]:
                                - text: "@"
                                - img "隐藏的路径前缀" [ref=e226]
                                - text: /ASSET/CHR/Character&
                                - mark [ref=e227]: av=av0003
                                - text: "&"
                                - mark [ref=e228]: step=Srf
                                - text: "@"
                            - generic [ref=e229]:
                              - generic [aria-hidden] [ref=e230]: "06"
                              - generic [ref=e231]: "]"
                            - generic [ref=e232]:
                              - generic [aria-hidden] [ref=e233]: "07"
                              - generic [ref=e234]: )
                    - link "查看兼容关系如何在生产中工作 ↗" [ref=e236] [cursor=pointer]:
                      - /url: /in-production/#compatibility
              - navigation "卡片切换" [ref=e237]:
                - button "← PREV" [ref=e238] [cursor=pointer]
                - generic [ref=e239]:
                  - button "01 / COMPATIBILITY" [pressed] [ref=e240] [cursor=pointer]: "01"
                  - button "02 / MODULARITY" [ref=e242] [cursor=pointer]: "02"
                  - button "03 / STATE" [ref=e244] [cursor=pointer]: "03"
                  - button "04 / TASK COMPOSITION" [ref=e246] [cursor=pointer]: "04"
                  - button "05 / EXECUTION" [ref=e248] [cursor=pointer]: "05"
                - button "NEXT →" [ref=e250] [cursor=pointer]
            - button "下一张决策卡" [ref=e251] [cursor=pointer]: 02 / MODULARITY
          - status [ref=e252]: 01 / COMPATIBILITY · 从追随最新， 到保留兼容历史。
      - region [ref=e253]:
        - generic [ref=e254]:
          - paragraph [ref=e255]: SYNTHESIS
          - heading "不是更多工具， 而是更明确的系统。" [level=2] [ref=e256]
        - generic [ref=e257]:
          - generic [ref=e258]:
            - generic [ref=e259]:
              - generic [ref=e260]: COMPATIBILITY
              - paragraph [ref=e261]: 如何保持历史有效
            - generic [ref=e262]:
              - generic [ref=e263]: MODULE
              - paragraph [ref=e264]: 如何独立组合
            - generic [ref=e265]:
              - generic [ref=e266]: STATE
              - paragraph [ref=e267]: 如何保持完整状态
            - generic [ref=e268]:
              - generic [ref=e269]: TASK
              - paragraph [ref=e270]: 如何独立协作并汇总
            - generic [ref=e271]:
              - generic [ref=e272]: RULE
              - paragraph [ref=e273]: 如何进入执行
          - generic [ref=e274]:
            - text: EXPLICIT PRODUCTION MODEL
            - paragraph [ref=e275]: 明确的生产模型
      - region [ref=e276]:
        - generic [ref=e277]:
          - heading "从明确的模型，走向持续演进。" [level=2] [ref=e278]
          - paragraph [ref=e279]: TRANSFORM IDEAS INTO A MORE RELIABLE PRODUCTION SYSTEM.
        - link "03 / WHAT COMES NEXT ↗" [ref=e280] [cursor=pointer]:
          - /url: /next/
    - contentinfo [ref=e281]:
      - link "WEFT / PPL" [ref=e282] [cursor=pointer]:
        - /url: /
      - link "BACK TO TOP ↑" [ref=e283] [cursor=pointer]:
        - /url: "#top"
  - alert [ref=e284]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("desktop navigation does not intercept decisions and requires a deliberate edge hover", async ({ page }) => {
  4  |   await page.setViewportSize({ width: 1440, height: 800 });
  5  |   await page.goto("/design-innovation/");
  6  |   await page.evaluate(() => document.fonts.ready);
  7  |   await page.mouse.move(700, 600);
  8  |   await page.locator("#design-viewer").evaluate(el => window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 12, behavior: "instant" }));
  9  |   const header = page.locator("[data-site-header]");
  10 |   const handle = page.locator("[data-header-toggle]");
  11 |   await expect(header).toHaveAttribute("data-collapsed", "true");
  12 |   expect(await handle.evaluate(el => el.getBoundingClientRect().height)).toBe(8);
  13 |   await expect.poll(() => page.evaluate(() => {
  14 |     const toggle = document.querySelector("[data-header-toggle]")!.getBoundingClientRect();
  15 |     const index = document.querySelector("[data-index]")!.getBoundingClientRect();
  16 |     return toggle.bottom <= index.top;
  17 |   })).toBe(true);
  18 |   for (let i = 0; i < 5; i++) {
  19 |     const bounds = await page.locator("[data-index]").nth(i).boundingBox();
  20 |     await page.mouse.click(bounds!.x + bounds!.width / 2, bounds!.y + bounds!.height / 2);
  21 |     await expect(page.locator("[data-index]").nth(i)).toHaveAttribute("aria-pressed", "true");
  22 |     await expect(header).toHaveAttribute("data-collapsed", "true");
  23 |   }
  24 |   await page.clock.install();
  25 |   await handle.hover();
  26 |   await page.clock.runFor(200);
  27 |   await expect(header).toHaveAttribute("data-collapsed", "true");
  28 |   await page.mouse.move(700, 300);
  29 |   await page.clock.runFor(400);
  30 |   await expect(header).toHaveAttribute("data-collapsed", "true");
  31 |   await handle.hover();
  32 |   await page.clock.runFor(350);
  33 |   await expect(header).toHaveAttribute("data-collapsed", "false");
  34 |   await header.locator("a").first().focus();
  35 |   await page.keyboard.press("Escape");
  36 |   await expect(header).toHaveAttribute("data-collapsed", "true");
  37 |   await handle.press("Enter");
  38 |   await expect(header).toHaveAttribute("data-collapsed", "false");
  39 | });
  40 | 
  41 | test("mobile has a visible bounded toggle that opens and closes on tap", async ({ browser }) => {
  42 |   const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  43 |   const page = await context.newPage();
  44 |   await page.goto("/design-innovation/");
  45 |   await page.evaluate(() => document.fonts.ready);
  46 |   await page.locator("#design-viewer").evaluate(el => window.scrollTo({ top: el.getBoundingClientRect().top + scrollY, behavior: "instant" }));
  47 |   const header = page.locator("[data-site-header]");
  48 |   const handle = page.locator("[data-header-toggle]");
  49 |   await expect(header).toHaveAttribute("data-collapsed", "true");
  50 |   await expect(handle.locator("span")).toBeVisible();
  51 |   expect(await handle.evaluate(el => el.getBoundingClientRect().width)).toBe(44);
  52 |   await handle.tap();
  53 |   await expect(header).toHaveAttribute("data-collapsed", "false");
  54 |   await handle.tap();
  55 |   await expect(header).toHaveAttribute("data-collapsed", "true");
> 56 |   await expect.poll(() => header.evaluate(el => el.getBoundingClientRect().bottom)).toBeLessThanOrEqual(12);
     |                                                                                     ^ Error: expect(received).toBeLessThanOrEqual(expected)
  57 |   await page.screenshot({ path: "artifacts/header-mobile-toggle.png" });
  58 |   await context.close();
  59 | });
  60 | 
```