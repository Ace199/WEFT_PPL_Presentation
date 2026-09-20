# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: design-viewer.spec.ts >> desktop viewer adds 40px of reading space and keeps controls reachable (en)
- Location: tests\design-viewer.spec.ts:18:7

# Error details

```
Error: expect(locator).toBeInViewport() failed

Locator: locator('[data-panel][data-active="true"] a')
Expected: in viewport
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeInViewport" locator('[data-panel][data-active="true"] a') with timeout 5000ms
  - waiting for locator('[data-panel][data-active="true"] a')

```

```yaml
- link "Skip to content":
  - /url: "#design-main"
- banner:
  - button "Collapse navigation" [expanded]
  - link "WEFT / PPL":
    - /url: /
  - navigation "Chapter navigation":
    - link "00 / Overview":
      - /url: /
    - link "01 / Systematic Thinking":
      - /url: /systematic-thinking/
    - link "02 / Design & Innovation":
      - /url: /design-innovation/
    - link "03 / Contact":
      - /url: /contact/
  - text: "PRODUCTION SYSTEM STATUS: ACTIVE 2026"
  - group "Language / 语言":
    - button "切换为中文": 中
    - button "Switch to English" [pressed]: En
- main:
  - region "Rethinking the defaults of production.":
    - paragraph: 02 / DESIGN & INNOVATION
    - heading "Rethinking the defaults of production." [level=1]
    - paragraph: TRANSFORMING PRODUCTION ASSUMPTIONS
    - paragraph: When versions, dependencies and change expose the limits, WEFT / PPL rethinks the production model instead of adding more patches.
  - group "Design decision index":
    - button "01 / COMPATIBILITY Compatible History" [pressed]
    - button "02 / MODULARITY Composable Modules"
    - button "03 / STATE Materialized Full State"
    - button "04 / TASK COMPOSITION Independent Subtasks"
    - button "05 / EXECUTION Executable Rules"
  - region "DESIGN DECISION VIEWER / 05":
    - heading "DESIGN DECISION VIEWER / 05" [level=2]
    - button "Previous decision card": 05 / EXECUTION
    - region "Design decision card; use left and right arrow keys":
      - article "From chasing the latest to preserving compatible history.":
        - text: 01 / COMPATIBILITY FIG. 02.01
        - region "COMPATIBILITY — 可上下滚动 / Scroll for details":
          - paragraph: PART 01 / DECISION
          - heading "From chasing the latest to preserving compatible history." [level=3]
          - paragraph: Work moves forward. Published results remain valid.
          - paragraph: SYSTEM SHIFT Global latest Compatibility-scoped resolution
          - region "Before → WEFT / PPL":
            - heading "PART 02 / BEFORE → WEFT / PPL" [level=4]
            - figure "Forcing an incompatible new Surface onto historical RigCache invalidates a previously usable publish.":
              - heading "BEFORE" [level=5]
              - 'img "Before: forcing an incompatible new Surface onto historical RigCache invalidates the historical publish."': TIME → HistoricalModel (G2) Surface (v1) White Model(Geometry) Animation RigCache(Historical) LatestModel (G3) New Surface(v2) Historical RigCache invalidated Not compatiblewith historical RigCache To match the latest asset, RigCache must be republished.
              - text: Forcing an incompatible new Surface onto historical RigCache invalidates a previously usable publish.
            - figure "Historical RigCache keeps its compatible Surface reference while new work moves forward. Mint marks valid compatibility, not the latest version.":
              - heading "WEFT / PPL" [level=5]
              - 'img "WEFT / PPL: historical RigCache preserves its compatible Surface reference and remains usable while new work moves forward."': TIME → HistoricalModel (G2) Surface (v1) Compatibility Reference White Model(Geometry) Animation RigCache(Historical Published) Historical publish remains usable LatestModel (G3) New Surface(v2) For the shot’s visual needs, publish RigCache on demand.
              - text: Historical RigCache keeps its compatible Surface reference while new work moves forward. Mint marks valid compatibility, not the latest version.
            - paragraph: Conceptual diagram · Rotation illustrates animation and cache, not recorded production playback.
          - region "Project example":
            - heading "PART 03 / PROJECT EXAMPLE" [level=4]
            - heading "RigCache USD / Compatibility Reference" [level=5]
            - figure "Simplified USDA · Published RigCache includes local animated geometry and a compatibility-scoped Surface dependency, preserving resolution and rendering within its original scope as the asset evolves.":
              - text: RigCache.usda USDA
              - code:
                - text: "#usda 1.0 ( subLayers = [ @./Character__geo.usd@, @"
                - img "隐藏的路径前缀"
                - text: /ASSET/CHR/Character&
                - mark: av=av0003
                - text: "&"
                - mark: step=Srf
                - text: "@ ] )"
              - text: Simplified USDA · Published RigCache includes local animated geometry and a compatibility-scoped Surface dependency, preserving resolution and rendering within its original scope as the asset evolves.
      - navigation "Decision navigation":
        - button "← PREV"
        - button "01 / COMPATIBILITY" [pressed]: "01"
        - button "02 / MODULARITY": "02"
        - button "03 / STATE": "03"
        - button "04 / TASK COMPOSITION": "04"
        - button "05 / EXECUTION": "05"
        - button "NEXT →"
    - button "Next decision card": 02 / MODULARITY
    - status: 01 / COMPATIBILITY · From chasing the latest to preserving compatible history.
  - region "Not more tools. A more explicit system.":
    - paragraph: SYNTHESIS
    - heading "Not more tools. A more explicit system." [level=2]
    - text: COMPATIBILITY
    - paragraph: Keep history valid
    - text: MODULE
    - paragraph: Compose independently
    - text: STATE
    - paragraph: Maintain full state
    - text: TASK
    - paragraph: Work independently, aggregate together
    - text: RULE
    - paragraph: Enter execution
    - text: EXPLICIT PRODUCTION MODEL
    - paragraph: A shared, explicit model
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
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | test("decision indexes never slide over the card while the outer page scrolls", async ({page}) => {
  4   |   await page.setViewportSize({width:1440,height:800});
  5   |   await page.goto('/design-innovation/');
  6   |   await page.evaluate(()=>document.fonts.ready);
  7   |   for (const offset of [0,150,350,550]) {
  8   |     await page.locator('#design-viewer').evaluate((el,delta)=>window.scrollTo({top:el.getBoundingClientRect().top+scrollY+delta,behavior:'instant'}),offset);
  9   |     const bounds=await page.locator('#design-viewer').evaluate(el=>({
  10  |       tabs:el.querySelector('[data-index]')!.parentElement!.getBoundingClientRect().bottom,
  11  |       card:el.querySelector('[data-panel]')!.getBoundingClientRect().top,
  12  |     }));
  13  |     expect(bounds.tabs).toBeLessThanOrEqual(bounds.card);
  14  |   }
  15  | });
  16  | 
  17  | for (const language of ["zh", "en"]) {
  18  |   test(`desktop viewer adds 40px of reading space and keeps controls reachable (${language})`, async ({
  19  |     page,
  20  |   }) => {
  21  |     await page.setViewportSize({ width: 1440, height: 800 });
  22  |     await page.emulateMedia({ reducedMotion: "reduce" });
  23  |     await page.goto("/design-innovation/");
  24  |     if (language === "en")
  25  |       await page.getByRole("button", { name: "Switch to English" }).click();
  26  |     await page.evaluate(() => document.fonts.ready);
  27  |     const viewer = page.locator("#design-viewer");
  28  |     await expect(
  29  |       page.getByText("问题，往往出在模型。", { exact: true }),
  30  |     ).toHaveCount(0);
  31  |     for (let i = 0; i < 5; i++) {
  32  |       await page.locator("[data-index]").nth(i).click();
  33  |       if (i === 2)
  34  |         await page
  35  |           .getByRole("button", { name: "CURRENT STATE", exact: true })
  36  |           .click();
  37  |       await viewer.evaluate((el) =>
  38  |         window.scrollTo({
  39  |           top:
  40  |             el.getBoundingClientRect().top +
  41  |             scrollY -
  42  |             document
  43  |               .querySelector("[data-site-header]")!
  44  |               .getBoundingClientRect().height,
  45  |           behavior: "instant",
  46  |         }),
  47  |       );
  48  |       await expect
  49  |         .poll(() =>
  50  |           viewer.evaluate((el) => {
  51  |             const header = document
  52  |               .querySelector("[data-site-header]")!
  53  |               .getBoundingClientRect();
  54  |             return (
  55  |               Math.abs(el.getBoundingClientRect().height -
  56  |               (innerHeight - header.height + 40)) <= 2
  57  |             );
  58  |           }),
  59  |         )
  60  |         .toBe(true);
  61  |       await page.getByRole("button", { name: "NEXT →", exact: true }).scrollIntoViewIfNeeded();
  62  |       await page.evaluate(() => window.scrollBy({top: 4, behavior: "instant"}));
  63  |       await expect(
  64  |         page.getByRole("button", { name: "NEXT →", exact: true }),
  65  |       ).toBeInViewport({ ratio: 1 });
  66  |       const body = page.locator(
  67  |         '[data-panel][data-active="true"] [data-card-scroll]',
  68  |       );
  69  |       await expect(body.locator("[data-card-part]")).toHaveCount(i === 3 ? 2 : 3);
  70  |       expect(await body.locator("[data-card-part]").evaluateAll(els => els.map(el => el.getAttribute("data-card-part")))).toEqual(i === 3 ? ["decision", "comparison"] : ["decision", "comparison", "example"]);
  71  |       await expect(body.getByText("MODEL DIAGNOSIS", { exact: true })).toHaveCount(0);
  72  |       await body.evaluate((el) => (el.scrollTop = 0));
  73  |       await page.screenshot({
  74  |         path: `artifacts/design-viewer-${language}-${i + 1}.png`,
  75  |       });
  76  |       const pageY = await page.evaluate(() => scrollY);
  77  |       const navY = await page
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
  88  |         page.locator(i === 3 ? '#decision-task-composition figcaption' : '[data-panel][data-active="true"] a'),
> 89  |       ).toBeInViewport({ ratio: 1 });
      |         ^ Error: expect(locator).toBeInViewport() failed
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
```