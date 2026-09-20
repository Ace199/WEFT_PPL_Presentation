# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home-scroll-snap.spec.ts >> 02 viewer snaps as a unit while the card body scrolls independently
- Location: tests\home-scroll-snap.spec.ts:102:5

# Error details

```
Error: expect(locator).toBeInViewport() failed

Locator: getByRole('link', { name: '03 / CONTACT', exact: true })
Expected: in viewport
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeInViewport" getByRole('link', { name: '03 / CONTACT', exact: true }) with timeout 5000ms
  - waiting for getByRole('link', { name: '03 / CONTACT', exact: true })

```

```yaml
- link "跳到正文":
  - /url: "#design-main"
- banner:
  - button "展开导航"
  - link "WEFT / PPL":
    - /url: /
  - navigation "章节导航":
    - link "00 / 项目概览":
      - /url: /
    - link "01 / 系统思考":
      - /url: /systematic-thinking/
    - link "02 / 设计&创新":
      - /url: /design-innovation/
    - link "03 / 联系":
      - /url: /contact/
  - 'group "生产状态：PRODUCTION SYSTEM，STATUS: ACTIVE，2026"'
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
  25  |   await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before + 100);
  26  |   const after = await page.evaluate(() => scrollY);
  27  |   await page.mouse.wheel(0, -600);
  28  |   await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(after - 100);
  29  |   await page.keyboard.press("Control+End");
  30  |   await expect.poll(() => page.evaluate(() => document.documentElement.scrollHeight - innerHeight - scrollY)).toBeLessThan(2);
  31  |   await page.getByRole("link", { name: /BACK TO TOP/ }).click();
  32  |   await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(2);
  33  | });
  34  | 
  35  | test("production anchor and expanded reading stay usable", async ({ page }) => {
  36  |   await page.goto("/#views");
  37  |   await page.locator('[data-control="operate"]').click();
  38  |   await page.getByRole("link", { name: "VIEW PRODUCTION", exact: true }).click();
  39  |   await expect(page).toHaveURL(/#production$/);
  40  |   await expect.poll(() => page.locator("#production").evaluate(el => {
  41  |     const top = el.getBoundingClientRect().top;
  42  |     const documentTop = top + scrollY;
  43  |     const maxScroll = document.documentElement.scrollHeight - innerHeight;
  44  |     return Math.abs(top - Math.max(8, documentTop - maxScroll));
  45  |   })).toBeLessThan(2);
  46  |   await page.locator("#production").getByRole("button", { name: /放大查看/ }).first().click();
  47  |   await expect(page.locator("dialog[open]")).toBeVisible();
  48  |   await expect.poll(() => snapType(page)).toBe("none");
  49  |   await page.keyboard.press("Escape");
  50  |   await expect.poll(() => snapType(page)).toBe("y proximity");
  51  |   await page.locator("#views details summary").click();
  52  |   await expect.poll(() => snapType(page)).toBe("none");
  53  |   await page.locator("#views details summary").click();
  54  |   await expect.poll(() => snapType(page)).toBe("y proximity");
  55  | });
  56  | 
  57  | test("coarse pointers and no-JavaScript fallback keep natural scrolling", async ({ browser }) => {
  58  |   for (const options of [{ hasTouch: true }, { javaScriptEnabled: false }]) {
  59  |     const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "no-preference", ...options });
  60  |     const page = await context.newPage();
  61  |     await page.goto("http://127.0.0.1:4173/");
  62  |     expect(await snapType(page)).toBe("none");
  63  |     await context.close();
  64  |   }
  65  | });
  66  | 
  67  | test("01 and 02 opt in, Contact and accessibility fallbacks keep natural scrolling", async ({ page }) => {
  68  |   await page.goto("/");
  69  |   await page.getByRole("link", { name: "02 / 设计&创新", exact: true }).click();
  70  |   await expect(page).toHaveURL(/\/design-innovation\/$/);
  71  |   await expect.poll(() => snapType(page)).toBe("y proximity");
  72  |   await page.goto("/systematic-thinking/");
  73  |   await expect.poll(() => snapType(page)).toBe("y proximity");
  74  |   await page.goto("/contact/");
  75  |   expect(await snapType(page)).toBe("none");
  76  |   for (const route of ["/", "/systematic-thinking/", "/design-innovation/"]) {
  77  |     await page.goto(route);
  78  |     await page.setViewportSize({ width: 390, height: 844 });
  79  |     expect(await snapType(page)).toBe("none");
  80  |     await page.setViewportSize({ width: 1440, height: 900 });
  81  |     await page.emulateMedia({ reducedMotion: "reduce" });
  82  |     expect(await snapType(page)).toBe("none");
  83  |     await page.emulateMedia({ reducedMotion: "no-preference" });
  84  |     await expect.poll(() => snapType(page)).toBe("y proximity");
  85  |   }
  86  | });
  87  | 
  88  | test("01 section stops preserve reading of the tall opening", async ({ page }) => {
  89  |   await page.goto("/systematic-thinking/");
  90  |   await page.evaluate(() => document.fonts.ready);
  91  |   await expect.poll(() => snapType(page)).toBe("y proximity");
  92  |   await page.mouse.move(1420, 450);
  93  |   await page.mouse.wheel(0, 380);
  94  |   await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(100);
  95  |   const section = page.locator("#systematic-change");
  96  |   await page.mouse.wheel(0, await section.evaluate(el => el.getBoundingClientRect().top - 8 - 45));
  97  |   await expect.poll(async () => Math.abs((await section.boundingBox())!.y - 8)).toBeLessThan(2);
  98  |   await page.keyboard.press("Control+End");
  99  |   await expect.poll(() => page.evaluate(() => document.documentElement.scrollHeight - innerHeight - scrollY)).toBeLessThan(2);
  100 | });
  101 | 
  102 | test("02 viewer snaps as a unit while the card body scrolls independently", async ({ page }) => {
  103 |   await page.goto("/design-innovation/");
  104 |   await page.evaluate(() => document.fonts.ready);
  105 |   await expect.poll(() => snapType(page)).toBe("y proximity");
  106 |   await page.mouse.move(1420, 450);
  107 |   const viewer = page.locator("#design-viewer");
  108 |   await page.mouse.wheel(0, await viewer.evaluate(el => el.getBoundingClientRect().top - 8 - 45));
  109 |   await expect.poll(async () => Math.abs((await viewer.boundingBox())!.y - 8)).toBeLessThan(2);
  110 |   const outer = await page.evaluate(() => scrollY);
  111 |   const body = page.locator('#decision-compatibility [data-card-scroll]');
  112 |   const box = (await body.boundingBox())!;
  113 |   await page.mouse.move(box.x + box.width / 2, box.y + 80);
  114 |   await page.mouse.wheel(0, 450);
  115 |   await expect.poll(() => body.evaluate(el => el.scrollTop)).toBeGreaterThan(100);
  116 |   expect(Math.abs(await page.evaluate(() => scrollY) - outer)).toBeLessThan(2);
  117 |   await expect(viewer).toHaveAttribute("data-active-decision", "compatibility");
  118 |   await body.evaluate(el => { el.scrollTop = el.scrollHeight; });
  119 |   await page.mouse.wheel(0, 450);
  120 |   await page.waitForTimeout(350);
  121 |   expect(Math.abs(await page.evaluate(() => scrollY) - outer)).toBeLessThan(2);
  122 |   await page.mouse.move(1420, 450);
  123 |   await page.mouse.wheel(0, 700);
  124 |   await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(outer + 100);
> 125 |   await expect(page.getByRole("link", { name: "03 / CONTACT", exact: true })).toBeInViewport();
      |                                                                               ^ Error: expect(locator).toBeInViewport() failed
  126 | });
  127 | 
```