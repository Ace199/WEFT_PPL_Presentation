# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: design-viewer.spec.ts >> short and mobile cards expose scrollable content and retain navigation
- Location: tests\design-viewer.spec.ts:165:5

# Error details

```
Error: expect(locator).toBeInViewport() failed

Locator: locator('[data-panel][data-active=true]').locator('[data-card-part="example"] p').last()
Expected: in viewport
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeInViewport" locator('[data-panel][data-active=true]').locator('[data-card-part="example"] p').last() with timeout 5000ms
  - waiting for locator('[data-panel][data-active=true]').locator('[data-card-part="example"] p').last()

```

```yaml
- link "跳到正文":
  - /url: "#design-main"
- banner:
  - button "收起导航" [expanded]
  - link "WEFT / PPL":
    - /url: /
  - navigation "章节导航":
    - link "00 / 项目概览":
      - /url: /
    - link "01 / 系统思考":
      - /url: /systematic-thinking/
    - link "02 / 设计与创新":
      - /url: /design-innovation/
    - link "03 / 联系":
      - /url: /contact/
  - text: "PRODUCTION SYSTEM STATUS: ACTIVE 2026"
  - group "Language / 语言":
    - button "切换为中文" [pressed]: 中
    - button "Switch to English": En
- main:
  - region "重新审视生产的 默认假设。":
    - paragraph: 02 / DESIGN & INNOVATION
    - heading "重新审视生产的 默认假设。" [level=1]
    - paragraph: TRANSFORMING PRODUCTION ASSUMPTIONS
    - paragraph: 当版本、依赖与变化暴露出边界，WEFT / PPL 选择重新审视生产模型，而不是继续增加补丁。
  - group "设计决策索引":
    - button "01 / COMPATIBILITY Compatible History" [pressed]
    - button "02 / MODULARITY Composable Modules"
    - button "03 / STATE Materialized Full State"
    - button "04 / TASK COMPOSITION Independent Subtasks"
    - button "05 / EXECUTION Executable Rules"
  - region "DESIGN DECISION VIEWER / 05":
    - heading "DESIGN DECISION VIEWER / 05" [level=2]
    - button "上一张决策卡": 05 / EXECUTION
    - region "设计决策卡片，左右方向键切换":
      - article "从追随最新， 到保留兼容历史。":
        - text: 01 / COMPATIBILITY FIG. 02.01
        - region "COMPATIBILITY — 可上下滚动 / Scroll for details":
          - paragraph: PART 01 / DECISION
          - heading "从追随最新， 到保留兼容历史。" [level=3]
          - paragraph: 工作继续向前， 已经成立的历史成果仍然有效。
          - paragraph: SYSTEM SHIFT Global latest Compatibility-scoped resolution
          - region "Before → WEFT / PPL":
            - heading "PART 02 / BEFORE → WEFT / PPL" [level=4]
            - figure "强制将不兼容的新 Surface 用于历史 RigCache 时，原本可用的发布结果失效。":
              - heading "BEFORE" [level=5]
              - 'img "Before: forcing an incompatible new Surface onto historical RigCache invalidates the historical publish."': TIME → HistoricalModel (G2) Surface (v1) White Model(Geometry) Animation RigCache(Historical) LatestModel (G3) New Surface(v2) 历史Rigcache完全失效 Not compatiblewith historical RigCache 为匹配最新资产， 被迫重新发布 RigCache
              - text: 强制将不兼容的新 Surface 用于历史 RigCache 时，原本可用的发布结果失效。
            - figure "历史 RigCache 保留兼容 Surface 的引用，新工作继续向前。Mint 表示合法兼容关系，而非最新版本。":
              - heading "WEFT / PPL" [level=5]
              - 'img "WEFT / PPL: historical RigCache preserves its compatible Surface reference and remains usable while new work moves forward."': TIME → HistoricalModel (G2) Surface (v1) Compatibility Reference White Model(Geometry) Animation RigCache(Historical Published) 历史发布仍然可用 LatestModel (G3) New Surface(v2) 按镜头视觉需求， 自主发布 RigCache
              - text: 历史 RigCache 保留兼容 Surface 的引用，新工作继续向前。Mint 表示合法兼容关系，而非最新版本。
            - paragraph: 概念示意 · 旋转仅用于表达动画与缓存，不代表真实播放记录。
          - region "Project example":
            - heading "PART 03 / PROJECT EXAMPLE" [level=4]
            - heading "RigCache USD / Compatibility Reference" [level=5]
            - figure "简化 USDA 示例 · 已发布 RigCache 包含本地动画几何与带兼容范围的 Surface 逻辑依赖；资产继续演进后，历史 RigCache 仍可按原兼容范围解析和渲染。":
              - text: RigCache.usda USDA
              - code:
                - text: "#usda 1.0 ( subLayers = [ @./Character__geo.usd@, @"
                - img "隐藏的路径前缀"
                - text: /ASSET/CHR/Character&
                - mark: av=av0003
                - text: "&"
                - mark: step=Srf
                - text: "@ ] )"
              - text: 简化 USDA 示例 · 已发布 RigCache 包含本地动画几何与带兼容范围的 Surface 逻辑依赖；资产继续演进后，历史 RigCache 仍可按原兼容范围解析和渲染。
      - navigation "卡片切换":
        - button "← PREV"
        - button "01 / COMPATIBILITY" [pressed]: "01"
        - button "02 / MODULARITY": "02"
        - button "03 / STATE": "03"
        - button "04 / TASK COMPOSITION": "04"
        - button "05 / EXECUTION": "05"
        - button "NEXT →"
    - button "下一张决策卡": 02 / MODULARITY
    - status: 01 / COMPATIBILITY · 从追随最新， 到保留兼容历史。
  - region "不是更多工具， 而是更明确的系统。":
    - paragraph: SYNTHESIS
    - heading "不是更多工具， 而是更明确的系统。" [level=2]
    - text: COMPATIBILITY
    - paragraph: 如何保持历史有效
    - text: MODULE
    - paragraph: 如何独立组合
    - text: STATE
    - paragraph: 如何保持完整状态
    - text: TASK
    - paragraph: 如何独立协作并汇总
    - text: RULE
    - paragraph: 如何进入执行
    - text: EXPLICIT PRODUCTION MODEL
    - paragraph: 明确的生产模型
  - link "03 / CONTACT ↗":
    - /url: /contact/
- contentinfo:
  - link "WEFT / PPL":
    - /url: /
  - link "BACK TO TOP ↑":
    - /url: "#top"
- alert
```

# Test source

```ts
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
  177 |       .locator('[data-panel][data-active=true] [data-card-part="example"] pre')
  178 |       .scrollIntoViewIfNeeded();
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
> 207 |     await expect(panel.locator('[data-card-part="example"] p').last()).toBeInViewport({ ratio: 1 });
      |                                                                        ^ Error: expect(locator).toBeInViewport() failed
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