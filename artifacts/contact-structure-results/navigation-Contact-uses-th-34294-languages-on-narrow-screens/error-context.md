# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.ts >> Contact uses the supplied email and fits both languages on narrow screens
- Location: tests\navigation.spec.ts:37:5

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('html')
Expected: "zh"
Received: "zh-CN"
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" locator('html') with timeout 5000ms
  - waiting for locator('html')
    14 × locator resolved to <html lang="zh-CN">…</html>
       - unexpected value "zh-CN"

```

```yaml
- document:
  - link "跳到正文":
    - /url: "#contact-main"
  - banner
  - main
  - contentinfo
  - alert
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import AxeBuilder from "@axe-core/playwright";
  3  | 
  4  | const routes = [
  5  |   { label: "01 / 系统思考", slug: "systematic-thinking", heading: "动画生产", explore: "SYSTEMATIC THINKING" },
  6  |   { label: "02 / 设计与创新", slug: "design-innovation", heading: "重新审视生产", explore: "DESIGN & INNOVATION" },
  7  |   { label: "03 / 联系", slug: "contact", heading: "我们可以聊聊", explore: null },
  8  | ];
  9  | 
  10 | test("four public chapters navigate and refresh, without roadmap or deep-page links", async ({ page }) => {
  11 |   await page.emulateMedia({ reducedMotion: "reduce" });
  12 |   const errors: string[] = [];
  13 |   page.on("pageerror", error => errors.push(error.message));
  14 |   for (const route of routes) {
  15 |     await page.goto("/");
  16 |     const nav = page.getByRole("navigation", { name: "章节导航" });
  17 |     await expect(nav.getByRole("link")).toHaveCount(4);
  18 |     await nav.getByRole("link", { name: route.label }).click();
  19 |     await expect(page).toHaveURL(new RegExp(`/${route.slug}/$`));
  20 |     await page.reload();
  21 |     await expect(page.getByRole("heading", { level: 1 })).toContainText(route.heading);
  22 |     await expect(page.getByRole("heading", { name: "内容尚未开放" })).toHaveCount(0);
  23 |     await expect(page.getByRole("navigation", { name: "章节导航" }).getByRole("link", {name: route.label})).toHaveAttribute("aria-current", "page");
  24 |     await expect(page.locator('a[href*="/next"], a[href*="/in-production"], a[href*="/evidence"]')).toHaveCount(0);
  25 |     if (route.explore) {
  26 |       await page.goto("/");
  27 |       await page.getByRole("link", { name: `EXPLORE ${route.explore}` }).click();
  28 |       await expect(page).toHaveURL(new RegExp(`/${route.slug}/$`));
  29 |     }
  30 |   }
  31 |   await page.goto("/design-innovation/");
  32 |   await page.getByRole("link", { name: "03 / CONTACT" }).click();
  33 |   await expect(page).toHaveURL(/\/contact\/$/);
  34 |   expect(errors).toEqual([]);
  35 | });
  36 | 
  37 | test("Contact uses the supplied email and fits both languages on narrow screens", async ({ page }) => {
  38 |   await page.emulateMedia({ reducedMotion: "reduce" });
  39 |   for (const width of [320, 375, 414, 768, 1440]) {
  40 |     await page.setViewportSize({ width, height: 900 });
  41 |     for (const language of ["zh", "en"]) {
  42 |       await page.goto("/contact/");
  43 |       await page.evaluate(lang => localStorage.setItem("weft-ppl.language", lang), language);
  44 |       await page.reload();
  45 |       await page.evaluate(() => document.fonts.ready);
> 46 |       await expect(page.locator("html")).toHaveAttribute("lang", language);
     |                                          ^ Error: expect(locator).toHaveAttribute(expected) failed
  47 |       const email = page.getByRole("link", { name: "EMAIL: ace199704@icloud.com" });
  48 |       await expect(email).toHaveAttribute("href", "mailto:ace199704@icloud.com");
  49 |       await expect(page.locator("form, input, textarea")).toHaveCount(0);
  50 |       await expect(page.locator("main li")).toHaveText(["Production Systems", "Human–Tool Workflows", "Agent / Tool Orchestration", "Creative Technology"]);
  51 |       expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  52 |       await email.focus();
  53 |       await expect(email).toBeFocused();
  54 |       expect(await email.evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe("none");
  55 |       await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  56 |       await page.screenshot({ path: `artifacts/contact-${width}-${language}.png`, fullPage: true });
  57 |       if (width === 375 || width === 1440) {
  58 |         expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze()).violations).toEqual([]);
  59 |       }
  60 |     }
  61 |   }
  62 |   await page.getByRole("navigation", { name: "Chapter navigation" }).getByRole("link", { name: "01 / Systematic Thinking" }).click();
  63 |   await expect(page.locator("html")).toHaveAttribute("lang", "en");
  64 | });
  65 | 
  66 | test("Master Canvas has two perspectives, no hidden future nodes, and cyclic keyboard controls", async ({ page }) => {
  67 |   await page.goto("/");
  68 |   const master = page.locator("#views");
  69 |   await expect(master.getByRole("heading", { level: 2 })).toHaveText("ONE SYSTEM / TWO PERSPECTIVES");
  70 |   await expect(master.locator('a[aria-label^="EXPLORE"]')).toHaveCount(2);
  71 |   await expect(master.locator('[data-control="extend"], [data-future], [data-hit^="future"]')).toHaveCount(0);
  72 |   await expect(master).not.toContainText(/Governance|Recovery|Observability|Regression|未来方向|治理/);
  73 |   await page.locator('[data-control="organize"]').focus();
  74 |   await page.keyboard.press("ArrowRight");
  75 |   await expect(master).toHaveAttribute("data-mode", "transform");
  76 |   await page.keyboard.press("ArrowRight");
  77 |   await expect(master).toHaveAttribute("data-mode", "overview");
  78 |   await page.keyboard.press("ArrowLeft");
  79 |   await expect(master).toHaveAttribute("data-mode", "transform");
  80 |   await page.keyboard.press("Home");
  81 |   await expect(master).toHaveAttribute("data-mode", "overview");
  82 |   await page.keyboard.press("End");
  83 |   await expect(master).toHaveAttribute("data-mode", "transform");
  84 |   await expect(master).toHaveAttribute("data-settled", "true");
  85 |   await page.emulateMedia({ reducedMotion: "reduce" });
  86 |   await page.locator('[data-control="organize"]').click();
  87 |   await expect(master).toHaveAttribute("data-settled", "true");
  88 |   await master.screenshot({ path: "artifacts/master-two-perspectives.png" });
  89 | });
  90 | 
  91 | test("withdrawn routes are not public destinations", async ({ request }) => {
  92 |   for (const route of ["/next/", "/in-production/", "/evidence/"]) {
  93 |     expect((await request.get(route)).status()).toBe(404);
  94 |   }
  95 | });
  96 | 
```