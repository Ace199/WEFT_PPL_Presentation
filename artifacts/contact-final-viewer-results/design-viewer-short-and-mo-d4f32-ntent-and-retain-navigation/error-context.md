# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: design-viewer.spec.ts >> short and mobile cards expose scrollable content and retain navigation
- Location: tests\design-viewer.spec.ts:165:5

# Error details

```
Test timeout of 45000ms exceeded.
```

```
Error: locator.scrollIntoViewIfNeeded: Test timeout of 45000ms exceeded.
Call log:
  - waiting for locator('[data-panel][data-active=true] [data-card-part="example"] figcaptionre')

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
        - link "02 / 设计与创新" [ref=e9] [cursor=pointer]:
          - /url: /design-innovation/
        - link "03 / 联系" [ref=e10] [cursor=pointer]:
          - /url: /contact/
      - generic [ref=e11]:
        - generic [ref=e12]:
          - generic [ref=e13]: PRODUCTION SYSTEM
          - generic [ref=e14]: "STATUS: ACTIVE"
          - generic [ref=e15]: "2026"
        - group "Language / 语言" [ref=e16]:
          - button "切换为中文" [pressed] [ref=e17] [cursor=pointer]: 中
          - generic [aria-hidden] [ref=e18]: /
          - button "Switch to English" [ref=e19] [cursor=pointer]: En
    - main [ref=e20]:
      - region [ref=e21]:
        - paragraph [ref=e22]: 02 / DESIGN & INNOVATION
        - heading "重新审视生产的 默认假设。" [level=1] [ref=e23]
        - paragraph [ref=e24]: TRANSFORMING PRODUCTION ASSUMPTIONS
        - paragraph [ref=e25]: 当版本、依赖与变化暴露出边界，WEFT / PPL 选择重新审视生产模型，而不是继续增加补丁。
      - generic [ref=e26]:
        - group "设计决策索引" [ref=e27]:
          - button "01 / COMPATIBILITY Compatible History" [pressed] [ref=e28] [cursor=pointer]:
            - generic [ref=e29]: 01 / COMPATIBILITY
            - generic [ref=e30]: Compatible History
          - button "02 / MODULARITY Composable Modules" [ref=e32] [cursor=pointer]:
            - generic [ref=e33]: 02 / MODULARITY
            - generic [ref=e34]: Composable Modules
          - button "03 / STATE Materialized Full State" [ref=e35] [cursor=pointer]:
            - generic [ref=e36]: 03 / STATE
            - generic [ref=e37]: Materialized Full State
          - button "04 / TASK COMPOSITION Independent Subtasks" [ref=e38] [cursor=pointer]:
            - generic [ref=e39]: 04 / TASK COMPOSITION
            - generic [ref=e40]: Independent Subtasks
          - button "05 / EXECUTION Executable Rules" [ref=e41] [cursor=pointer]:
            - generic [ref=e42]: 05 / EXECUTION
            - generic [ref=e43]: Executable Rules
        - region [ref=e44]:
          - heading "DESIGN DECISION VIEWER / 05" [level=2] [ref=e45]
          - generic [ref=e46]:
            - button "上一张决策卡" [ref=e47] [cursor=pointer]: 05 / EXECUTION
            - region "设计决策卡片，左右方向键切换" [ref=e48]:
              - article [ref=e51]:
                - generic [ref=e52]:
                  - generic [ref=e53]: 01 / COMPATIBILITY
                  - generic [ref=e54]: FIG. 02.01
                - region "COMPATIBILITY — 可上下滚动 / Scroll for details" [ref=e55]:
                  - generic [ref=e56]:
                    - paragraph [ref=e57]: PART 01 / DECISION
                    - heading "从追随最新， 到保留兼容历史。" [level=3] [ref=e58]
                    - paragraph [ref=e59]: 工作继续向前， 已经成立的历史成果仍然有效。
                    - paragraph [ref=e60]:
                      - generic [ref=e61]: SYSTEM SHIFT
                      - text: Global latest
                      - generic [aria-hidden] [ref=e62]: →
                      - text: Compatibility-scoped resolution
                  - region "Before → WEFT / PPL" [ref=e63]:
                    - heading "PART 02 / BEFORE → WEFT / PPL" [level=4] [ref=e64]
                    - generic [ref=e65]:
                      - figure "强制将不兼容的新 Surface 用于历史 RigCache 时，原本可用的发布结果失效。" [ref=e66]:
                        - heading "BEFORE" [level=5] [ref=e67]
                        - 'img "Before: forcing an incompatible new Surface onto historical RigCache invalidates the historical publish." [ref=e68]':
                          - generic [ref=e73]: TIME →
                          - generic [ref=e77]: HistoricalModel (G2)
                          - generic [ref=e81]: Surface (v1)
                          - generic [ref=e85]: White Model(Geometry)
                          - generic [ref=e89]: Animation
                          - generic [ref=e93]: RigCache(Historical)
                          - generic [ref=e109]: LatestModel (G3)
                          - generic [ref=e125]: New Surface(v2)
                          - generic [ref=e127]: 历史Rigcache完全失效
                          - generic [ref=e128]: Not compatiblewith historical RigCache
                          - generic [ref=e130]: 为匹配最新资产，
                          - generic [ref=e131]: 被迫重新发布 RigCache
                      - figure "历史 RigCache 保留兼容 Surface 的引用，新工作继续向前。Mint 表示合法兼容关系，而非最新版本。" [ref=e133]:
                        - heading "WEFT / PPL" [level=5] [ref=e134]
                        - 'img "WEFT / PPL: historical RigCache preserves its compatible Surface reference and remains usable while new work moves forward." [ref=e135]':
                          - generic [ref=e139]: TIME →
                          - generic [ref=e143]: HistoricalModel (G2)
                          - generic [ref=e147]: Surface (v1)
                          - generic [ref=e148]: Compatibility Reference
                          - generic [ref=e154]: White Model(Geometry)
                          - generic [ref=e158]: Animation
                          - generic [ref=e162]: RigCache(Historical Published)
                          - generic [ref=e163]: 历史发布仍然可用
                          - generic [ref=e179]: LatestModel (G3)
                          - generic [ref=e195]: New Surface(v2)
                          - generic [ref=e196]: 按镜头视觉需求，
                          - generic [ref=e197]: 自主发布 RigCache
                      - paragraph [ref=e199]: 概念示意 · 旋转仅用于表达动画与缓存，不代表真实播放记录。
                  - region "Project example" [ref=e200]:
                    - heading "PART 03 / PROJECT EXAMPLE" [level=4] [ref=e201]
                    - heading "RigCache USD / Compatibility Reference" [level=5] [ref=e202]
                    - figure "简化 USDA 示例 · 已发布 RigCache 包含本地动画几何与带兼容范围的 Surface 逻辑依赖；资产继续演进后，历史 RigCache 仍可按原兼容范围解析和渲染。" [ref=e203]:
                      - generic [ref=e204]:
                        - generic [ref=e205]:
                          - generic [ref=e206]: RigCache.usda
                          - generic [ref=e207]: USDA
                        - generic "RigCache.usda" [ref=e208]:
                          - code [ref=e209]:
                            - generic [ref=e210]:
                              - generic [aria-hidden] [ref=e211]: "01"
                              - generic [ref=e212]: "#usda 1.0"
                            - generic [ref=e213]:
                              - generic [aria-hidden] [ref=e214]: "02"
                              - generic [ref=e215]: (
                            - generic [ref=e216]:
                              - generic [aria-hidden] [ref=e217]: "03"
                              - generic [ref=e218]: subLayers = [
                            - generic [ref=e219]:
                              - generic [aria-hidden] [ref=e220]: "04"
                              - generic [ref=e221]: "@./Character__geo.usd@,"
                            - generic [ref=e222]:
                              - generic [aria-hidden] [ref=e223]: "05"
                              - generic [ref=e224]:
                                - text: "@"
                                - img "隐藏的路径前缀" [ref=e225]
                                - text: /ASSET/CHR/Character&
                                - mark [ref=e226]: av=av0003
                                - text: "&"
                                - mark [ref=e227]: step=Srf
                                - text: "@"
                            - generic [ref=e228]:
                              - generic [aria-hidden] [ref=e229]: "06"
                              - generic [ref=e230]: "]"
                            - generic [ref=e231]:
                              - generic [aria-hidden] [ref=e232]: "07"
                              - generic [ref=e233]: )
              - navigation "卡片切换" [ref=e235]:
                - button "← PREV" [ref=e236] [cursor=pointer]
                - generic [ref=e237]:
                  - button "01 / COMPATIBILITY" [pressed] [ref=e238] [cursor=pointer]: "01"
                  - button "02 / MODULARITY" [ref=e240] [cursor=pointer]: "02"
                  - button "03 / STATE" [ref=e242] [cursor=pointer]: "03"
                  - button "04 / TASK COMPOSITION" [ref=e244] [cursor=pointer]: "04"
                  - button "05 / EXECUTION" [ref=e246] [cursor=pointer]: "05"
                - button "NEXT →" [ref=e248] [cursor=pointer]
            - button "下一张决策卡" [ref=e249] [cursor=pointer]: 02 / MODULARITY
          - status [ref=e250]: 01 / COMPATIBILITY · 从追随最新， 到保留兼容历史。
      - region [ref=e251]:
        - generic [ref=e252]:
          - paragraph [ref=e253]: SYNTHESIS
          - heading "不是更多工具， 而是更明确的系统。" [level=2] [ref=e254]
        - generic [ref=e255]:
          - generic [ref=e256]:
            - generic [ref=e257]:
              - generic [ref=e258]: COMPATIBILITY
              - paragraph [ref=e259]: 如何保持历史有效
            - generic [ref=e261]:
              - generic [ref=e262]: MODULE
              - paragraph [ref=e263]: 如何独立组合
            - generic [ref=e265]:
              - generic [ref=e266]: STATE
              - paragraph [ref=e267]: 如何保持完整状态
            - generic [ref=e269]:
              - generic [ref=e270]: TASK
              - paragraph [ref=e271]: 如何独立协作并汇总
            - generic [ref=e273]:
              - generic [ref=e274]: RULE
              - paragraph [ref=e275]: 如何进入执行
          - generic [ref=e277]:
            - text: EXPLICIT PRODUCTION MODEL
            - paragraph [ref=e278]: 明确的生产模型
      - link "03 / CONTACT ↗" [ref=e280] [cursor=pointer]:
        - /url: /contact/
    - contentinfo [ref=e281]:
      - link "WEFT / PPL" [ref=e282] [cursor=pointer]:
        - /url: /
      - link "BACK TO TOP ↑" [ref=e283] [cursor=pointer]:
        - /url: "#top"
  - alert [ref=e284]
```

# Test source

```ts
  78  |         .getByRole("button", { name: "NEXT →", exact: true })
  79  |         .evaluate((el) => el.getBoundingClientRect().top);
  80  |       await body.hover();
  81  |       await page.mouse.wheel(0, 500);
  82  |       await expect
  83  |         .poll(() => body.evaluate((el) => el.scrollTop))
  84  |         .toBeGreaterThan(0);
  85  |       expect(await page.evaluate(() => scrollY)).toBe(pageY);
  86  |       await body.evaluate((el) => (el.scrollTop = el.scrollHeight));
  87  |       await expect(
  88  |         page.locator(i === 3 ? '#decision-task-composition figcaption' : '[data-panel][data-active="true"] [data-card-part="example"] figcaption').last(),
  89  |       ).toBeInViewport({ ratio: 1 });
  90  |       expect(
  91  |         await page
  92  |           .getByRole("button", { name: "NEXT →", exact: true })
  93  |           .evaluate((el) => el.getBoundingClientRect().top),
  94  |       ).toBe(navY);
  95  |       if (i === 0)
  96  |         await page.screenshot({
  97  |           path: `artifacts/design-viewer-${language}-scrolled.png`,
  98  |         });
  99  |     }
  100 |   });
  101 | }
  102 | 
  103 | test("record switch preserves decision and displays parseable delta and full state", async ({
  104 |   page,
  105 | }) => {
  106 |   await page.emulateMedia({ reducedMotion: "reduce" });
  107 |   await page.goto("/design-innovation/");
  108 |   await page.locator("[data-index]").nth(2).click();
  109 |   const read = (id: string) =>
  110 |     page
  111 |       .locator(`${id} code`)
  112 |       .evaluate((el) =>
  113 |         JSON.parse(
  114 |           [...el.querySelectorAll(":scope > span > span:last-child")]
  115 |             .map((line) => line.textContent)
  116 |             .join(""),
  117 |         ),
  118 |       );
  119 |   expect(await read("#record-delta")).toEqual({
  120 |     rigcache: { Character_A: { version: "v003" } },
  121 |   });
  122 |   await page
  123 |     .getByRole("button", { name: "CURRENT STATE", exact: true })
  124 |     .click();
  125 |   expect(await read("#record-current")).toEqual({
  126 |     rigcache: {
  127 |       Character_A: { version: "v003" },
  128 |       Character_B: { version: "v001" },
  129 |     },
  130 |     camera: { version: "v003" },
  131 |   });
  132 |   await page
  133 |     .getByRole("button", { name: "CURRENT STATE", exact: true })
  134 |     .press("ArrowRight");
  135 |   await expect(page.locator("#design-viewer")).toHaveAttribute(
  136 |     "data-active-decision",
  137 |     "state",
  138 |   );
  139 |   await expect(page.locator("#record-delta")).toBeHidden();
  140 |   await page.getByRole("button", { name: "DELTA", exact: true }).click();
  141 |   await expect(page.locator("#record-current")).toBeHidden();
  142 |   await page.locator("[data-index]").nth(0).press("End");
  143 |   await expect(page.locator("#design-viewer")).toHaveAttribute(
  144 |     "data-active-decision",
  145 |     "execution",
  146 |   );
  147 |   await page.locator("[data-index]").nth(4).press("Home");
  148 |   await expect(
  149 |     page.getByRole("button", { name: "← PREV", exact: true }),
  150 |   ).toBeEnabled();
  151 |   const previous = page.getByRole("button", { name: "上一张决策卡", exact: true });
  152 |   const next = page.getByRole("button", { name: "下一张决策卡", exact: true });
  153 |   await expect(previous).toHaveText("05 / EXECUTION");
  154 |   await previous.click();
  155 |   await expect(page.locator("#design-viewer")).toHaveAttribute("data-active-decision", "execution");
  156 |   await expect(next).toHaveText("01 / COMPATIBILITY");
  157 |   await next.click();
  158 |   await expect(page.locator("#design-viewer")).toHaveAttribute("data-active-decision", "compatibility");
  159 |   await page.locator("[data-index]").nth(0).press("ArrowLeft");
  160 |   await expect(page.locator("[data-index]").nth(4)).toBeFocused();
  161 |   await page.locator("[data-index]").nth(4).press("ArrowRight");
  162 |   await expect(page.locator("[data-index]").nth(0)).toBeFocused();
  163 | });
  164 | 
  165 | test("short and mobile cards expose scrollable content and retain navigation", async ({
  166 |   page,
  167 | }) => {
  168 |   await page.emulateMedia({ reducedMotion: "reduce" });
  169 |   for (const size of [
  170 |     { width: 1280, height: 600 },
  171 |     { width: 390, height: 844 },
  172 |   ]) {
  173 |     await page.setViewportSize(size);
  174 |     await page.goto("/design-innovation/");
  175 |     await page.evaluate(() => document.fonts.ready);
  176 |     await page
  177 |       .locator('[data-panel][data-active=true] [data-card-part="example"] figcaptionre')
> 178 |       .scrollIntoViewIfNeeded();
      |        ^ Error: locator.scrollIntoViewIfNeeded: Test timeout of 45000ms exceeded.
  179 |     await page
  180 |       .locator("#design-viewer")
  181 |       .evaluate((el) =>
  182 |         window.scrollTo({
  183 |           top:
  184 |             el.getBoundingClientRect().top +
  185 |             scrollY -
  186 |             document
  187 |               .querySelector("[data-site-header]")!
  188 |               .getBoundingClientRect().height,
  189 |           behavior: "instant",
  190 |         }),
  191 |       );
  192 |     await page.getByRole("button", { name: "NEXT →", exact: true }).scrollIntoViewIfNeeded();
  193 |     await expect(
  194 |       page.getByRole("button", { name: "NEXT →", exact: true }),
  195 |     ).toBeInViewport({ ratio: 1 });
  196 |     expect(
  197 |       await page.evaluate(
  198 |         () => document.documentElement.scrollWidth <= innerWidth,
  199 |       ),
  200 |     ).toBe(true);
  201 |     const panel = page.locator("[data-panel][data-active=true]");
  202 |     const body = panel.locator("[data-card-scroll]");
  203 |     expect(
  204 |       await body.evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
  205 |     ).toBe(true);
  206 |     await body.evaluate((el) => (el.scrollTop = el.scrollHeight));
  207 |     await expect(panel.locator('[data-card-part="example"] figcaption').last()).toBeInViewport({ ratio: 1 });
  208 |     expect(
  209 |       await panel.evaluate((el) => el.scrollHeight <= el.clientHeight + 1),
  210 |     ).toBe(true);
  211 |     await page.screenshot({
  212 |       path: `artifacts/design-viewer-scroll-${size.width}.png`,
  213 |     });
  214 |   }
  215 | });
  216 | 
```