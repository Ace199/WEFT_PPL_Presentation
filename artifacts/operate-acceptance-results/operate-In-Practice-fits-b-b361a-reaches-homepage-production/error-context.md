# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: operate.spec.ts >> In Practice fits both languages and its explicit anchor reaches homepage production
- Location: tests\operate.spec.ts:34:5

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('#views')
Expected: "operate"
Received: "transform"
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" locator('#views') with timeout 5000ms
  - waiting for locator('#views')
    14 × locator resolved to <section id="views" data-settled="true" data-pinned-node="" data-focused-node="" data-mode="transform" aria-labelledby="views-title" class="MasterCanvas_master__wLQPq">…</section>
       - unexpected value "transform"

```

```yaml
- region "ONE SYSTEM / THREE VIEWS":
  - heading "ONE SYSTEM / THREE VIEWS" [level=2]
  - paragraph: 同一个系统，三个观察角度。
  - group "检查生产模型节点"
  - button "检查 CONTEXT": CONTEXT
  - button "检查 PRODUCT": PRODUCT
  - button "检查 VERSION": VERSION
  - button "检查 DEPENDENCY": DEPENDENCY
  - button "检查 STATE": STATE
  - button "检查 VALIDATION": VALIDATION
  - button "检查 RESOLUTION": RESOLUTION
  - button "检查 COMPOSITION": COMPOSITION
  - button "01 / SYSTEMATIC THINKING 复杂生产，如何成为系统？ ORGANIZE"
  - link "EXPLORE SYSTEMATIC THINKING":
    - /url: /systematic-thinking/
    - text: EXPLORE
  - button "02 / DESIGN & INNOVATION 重新审视生产的默认假设。 TRANSFORM" [pressed]
  - link "EXPLORE DESIGN & INNOVATION":
    - /url: /design-innovation/
    - text: EXPLORE
  - button "03 / IN PRACTICE 设计如何进入真实制作？ OPERATE"
  - link "VIEW PRODUCTION":
    - /url: "#production"
  - text: TRANSFORM PREVIEW
  - paragraph: 先确定兼容范围，再选择版本；让模块独立变化，让交付规则可以执行。
  - button "OVERVIEW"
  - text: VIEW MODE / TRANSFORM PREVIEW 结构示意 · 版本号仅作说明
  - group: 查看模型文字说明
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import AxeBuilder from "@axe-core/playwright";
  3  | 
  4  | test("Operate reuses the scene, exposes execution relationships and clears obsolete inspection", async ({ page }) => {
  5  |   const errors: string[] = [];
  6  |   page.on("pageerror", e => errors.push(e.message));
  7  |   await page.goto("/");
  8  |   const master = page.locator("#views");
  9  |   const geometry = await master.locator("[data-result-dots]").getAttribute("d");
  10 |   await master.locator('[data-control="operate"]').click();
  11 |   await expect(master).toHaveAttribute("data-settled", "true");
  12 |   expect(await master.locator("[data-result-dots]").getAttribute("d")).toBe(geometry);
  13 |   await expect(master.locator('[data-operate-network]')).toBeVisible();
  14 |   for (const id of ["builder", "loader", "publish", "resolver", "review", "maya", "houdini"]) {
  15 |     await expect(master.locator(`[data-hit="${id}"]`)).toBeVisible();
  16 |     await master.locator(`[data-hit="${id}"]`).click();
  17 |     await expect(master).toHaveAttribute("data-pinned-node", id);
  18 |     await expect(master.locator(`[data-scene-node="${id}"]`)).toHaveAttribute("data-link-state", "active");
  19 |     await expect(master.locator('[aria-live]')).toContainText(id.toUpperCase());
  20 |   }
  21 |   await master.locator('[data-control="transform"]').click();
  22 |   await expect(master).toHaveAttribute("data-pinned-node", "");
  23 |   await expect(master.locator('[data-hit="builder"], [data-operate-network]')).toHaveCount(0);
  24 |   for (let i = 0; i < 9; i++) {
  25 |     await master.locator(`[data-control="${["operate", "transform", "organize"][i%3]}"]`).focus();
  26 |   }
  27 |   await master.locator('[data-control="operate"]').click();
  28 |   await expect(master).toHaveAttribute("data-settled", "true");
  29 |   await expect(master.locator('[data-operate-network]')).toHaveCount(1);
  30 |   await expect(master.locator('[data-future], [data-control="extend"]')).toHaveCount(0);
  31 |   expect(errors).toEqual([]);
  32 | });
  33 | 
  34 | test("In Practice fits both languages and its explicit anchor reaches homepage production", async ({ page }) => {
  35 |   test.setTimeout(90000);
  36 |   await page.emulateMedia({ reducedMotion: "reduce" });
  37 |   for (const width of [320, 390, 768, 1024, 1440]) {
  38 |     await page.setViewportSize({ width, height: 900 });
  39 |     for (const lang of ["zh", "en"]) {
  40 |       await page.goto("/");
  41 |       await page.evaluate(value => localStorage.setItem("weft-ppl.language", value), lang);
  42 |       await page.reload();
  43 |       await page.evaluate(() => document.fonts.ready);
  44 |       const master = page.locator("#views");
  45 |       await master.locator('[data-control="operate"]').click();
  46 |       await expect(master).toHaveAttribute("data-settled", "true");
  47 |       await expect(master).toContainText(lang === "zh" ? "设计如何进入真实制作？" : "How does design enter real production?");
  48 |       await expect(master).not.toContainText(/治理|恢复|Governance|Recovery|Observability|Regression|EXTEND/);
  49 |       expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  50 |       const overflow = await master.evaluate(el => [...el.querySelectorAll("button, a")].some(node => {
  51 |         const r = node.getBoundingClientRect(); return r.width && (r.left < -1 || r.right > innerWidth+1);
  52 |       }));
  53 |       expect(overflow).toBe(false);
  54 |       if (width === 390 || width === 1440) {
  55 |         expect((await new AxeBuilder({ page }).include("#views").withTags(["wcag2a", "wcag2aa"]).analyze()).violations).toEqual([]);
  56 |       }
  57 |       await page.mouse.move(0, 0);
  58 |       await master.screenshot({ path: `artifacts/master-operate-${width}-${lang}.png`, style: '[data-site-header], .skip { visibility: hidden !important; }' });
> 59 |       await expect(master).toHaveAttribute("data-mode", "operate");
     |                            ^ Error: expect(locator).toHaveAttribute(expected) failed
  60 |       const link = master.getByRole("link", { name: "VIEW PRODUCTION", exact: true });
  61 |       await expect(link).toHaveAttribute("href", "#production");
  62 |       await link.focus();
  63 |       await page.keyboard.press("Enter");
  64 |       await expect(page).toHaveURL(/\/#production$/);
  65 |       await expect(page.locator("#production-title")).toBeInViewport();
  66 |     }
  67 |   }
  68 | });
  69 | 
  70 | test("production anchor works without JavaScript and leaves Contact as page navigation", async ({ browser }) => {
  71 |   const context = await browser.newContext({ javaScriptEnabled: false });
  72 |   const page = await context.newPage();
  73 |   await page.goto("/");
  74 |   await expect(page.locator('nav a[href="/contact/"]')).toHaveCount(1);
  75 |   await page.getByRole("link", {name:"VIEW PRODUCTION", exact:true}).click();
  76 |   await expect(page).toHaveURL(/\/#production$/);
  77 |   await expect(page.locator("#production-title")).toBeInViewport();
  78 |   await context.close();
  79 | });
  80 | 
```