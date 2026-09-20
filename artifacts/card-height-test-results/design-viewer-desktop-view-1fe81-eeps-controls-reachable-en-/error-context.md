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

Locator:  getByRole('button', { name: 'NEXT →', exact: true })
Expected: in viewport
Received: viewport ratio 0.9914772510528564
Timeout:  5000ms

Call log:
  - Expect "toBeInViewport" getByRole('button', { name: 'NEXT →', exact: true }) with timeout 5000ms
  - waiting for getByRole('button', { name: 'NEXT →', exact: true })
    14 × locator resolved to <button type="button">NEXT →</button>
       - unexpected value "viewport ratio 0.9914772510528564"

```

```yaml
- button "NEXT →"
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
  62  |       await expect(
  63  |         page.getByRole("button", { name: "NEXT →", exact: true }),
> 64  |       ).toBeInViewport({ ratio: 1 });
      |         ^ Error: expect(locator).toBeInViewport() failed
  65  |       const body = page.locator(
  66  |         '[data-panel][data-active="true"] [data-card-scroll]',
  67  |       );
  68  |       await expect(body.locator("[data-card-part]")).toHaveCount(i === 3 ? 2 : 3);
  69  |       expect(await body.locator("[data-card-part]").evaluateAll(els => els.map(el => el.getAttribute("data-card-part")))).toEqual(i === 3 ? ["decision", "comparison"] : ["decision", "comparison", "example"]);
  70  |       await expect(body.getByText("MODEL DIAGNOSIS", { exact: true })).toHaveCount(0);
  71  |       await body.evaluate((el) => (el.scrollTop = 0));
  72  |       await page.screenshot({
  73  |         path: `artifacts/design-viewer-${language}-${i + 1}.png`,
  74  |       });
  75  |       const pageY = await page.evaluate(() => scrollY);
  76  |       const navY = await page
  77  |         .getByRole("button", { name: "NEXT →", exact: true })
  78  |         .evaluate((el) => el.getBoundingClientRect().top);
  79  |       await body.hover();
  80  |       await page.mouse.wheel(0, 500);
  81  |       await expect
  82  |         .poll(() => body.evaluate((el) => el.scrollTop))
  83  |         .toBeGreaterThan(0);
  84  |       expect(await page.evaluate(() => scrollY)).toBe(pageY);
  85  |       await body.evaluate((el) => (el.scrollTop = el.scrollHeight));
  86  |       await expect(
  87  |         page.locator(i === 3 ? '#decision-task-composition figcaption' : '[data-panel][data-active="true"] a'),
  88  |       ).toBeInViewport({ ratio: 1 });
  89  |       expect(
  90  |         await page
  91  |           .getByRole("button", { name: "NEXT →", exact: true })
  92  |           .evaluate((el) => el.getBoundingClientRect().top),
  93  |       ).toBe(navY);
  94  |       if (i === 0)
  95  |         await page.screenshot({
  96  |           path: `artifacts/design-viewer-${language}-scrolled.png`,
  97  |         });
  98  |     }
  99  |   });
  100 | }
  101 | 
  102 | test("record switch preserves decision and displays parseable delta and full state", async ({
  103 |   page,
  104 | }) => {
  105 |   await page.emulateMedia({ reducedMotion: "reduce" });
  106 |   await page.goto("/design-innovation/");
  107 |   await page.locator("[data-index]").nth(2).click();
  108 |   const read = (id: string) =>
  109 |     page
  110 |       .locator(`${id} code`)
  111 |       .evaluate((el) =>
  112 |         JSON.parse(
  113 |           [...el.querySelectorAll(":scope > span > span:last-child")]
  114 |             .map((line) => line.textContent)
  115 |             .join(""),
  116 |         ),
  117 |       );
  118 |   expect(await read("#record-delta")).toEqual({
  119 |     rigcache: { Character_A: { version: "v003" } },
  120 |   });
  121 |   await page
  122 |     .getByRole("button", { name: "CURRENT STATE", exact: true })
  123 |     .click();
  124 |   expect(await read("#record-current")).toEqual({
  125 |     rigcache: {
  126 |       Character_A: { version: "v003" },
  127 |       Character_B: { version: "v001" },
  128 |     },
  129 |     camera: { version: "v003" },
  130 |   });
  131 |   await page
  132 |     .getByRole("button", { name: "CURRENT STATE", exact: true })
  133 |     .press("ArrowRight");
  134 |   await expect(page.locator("#design-viewer")).toHaveAttribute(
  135 |     "data-active-decision",
  136 |     "state",
  137 |   );
  138 |   await expect(page.locator("#record-delta")).toBeHidden();
  139 |   await page.getByRole("button", { name: "DELTA", exact: true }).click();
  140 |   await expect(page.locator("#record-current")).toBeHidden();
  141 |   await page.locator("[data-index]").nth(0).press("End");
  142 |   await expect(page.locator("#design-viewer")).toHaveAttribute(
  143 |     "data-active-decision",
  144 |     "execution",
  145 |   );
  146 |   await page.locator("[data-index]").nth(4).press("Home");
  147 |   await expect(
  148 |     page.getByRole("button", { name: "← PREV", exact: true }),
  149 |   ).toBeEnabled();
  150 |   const previous = page.getByRole("button", { name: "上一张决策卡", exact: true });
  151 |   const next = page.getByRole("button", { name: "下一张决策卡", exact: true });
  152 |   await expect(previous).toHaveText("05 / EXECUTION");
  153 |   await previous.click();
  154 |   await expect(page.locator("#design-viewer")).toHaveAttribute("data-active-decision", "execution");
  155 |   await expect(next).toHaveText("01 / COMPATIBILITY");
  156 |   await next.click();
  157 |   await expect(page.locator("#design-viewer")).toHaveAttribute("data-active-decision", "compatibility");
  158 |   await page.locator("[data-index]").nth(0).press("ArrowLeft");
  159 |   await expect(page.locator("[data-index]").nth(4)).toBeFocused();
  160 |   await page.locator("[data-index]").nth(4).press("ArrowRight");
  161 |   await expect(page.locator("[data-index]").nth(0)).toBeFocused();
  162 | });
  163 | 
  164 | test("short and mobile cards expose scrollable content and retain navigation", async ({
```