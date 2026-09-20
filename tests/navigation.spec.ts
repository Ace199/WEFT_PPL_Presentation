import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  { label: "01 / 系统思考", slug: "systematic-thinking", heading: "动画生产", explore: "SYSTEMATIC THINKING" },
  { label: "02 / 设计&创新", slug: "design-innovation", heading: "重新审视生产", explore: "DESIGN & INNOVATION" },
  { label: "03 / 联系", slug: "contact", heading: "我们可以聊聊", explore: null },
];

test("four public chapters navigate and refresh, without roadmap or deep-page links", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  for (const route of routes) {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "章节导航" });
    await expect(nav.getByRole("link")).toHaveCount(4);
    await nav.getByRole("link", { name: route.label }).click();
    await expect(page).toHaveURL(new RegExp(`/${route.slug}/$`));
    await page.reload();
    await expect(page.getByRole("heading", { level: 1 })).toContainText(route.heading);
    await expect(page.getByRole("heading", { name: "内容尚未开放" })).toHaveCount(0);
    await expect(page.getByRole("navigation", { name: "章节导航" }).getByRole("link", {name: route.label})).toHaveAttribute("aria-current", "page");
    await expect(page.locator('a[href*="/next"], a[href*="/in-production"], a[href*="/evidence"]')).toHaveCount(0);
    if (route.explore) {
      await page.goto("/");
      await page.getByRole("link", { name: `EXPLORE ${route.explore}` }).click();
      await expect(page).toHaveURL(new RegExp(`/${route.slug}/$`));
    }
  }
  await page.goto("/design-innovation/");
  await page.getByRole("link", { name: "03 / CONTACT" }).click();
  await expect(page).toHaveURL(/\/contact\/$/);
  expect(errors).toEqual([]);
});

test("Contact uses the supplied email and fits both languages on narrow screens", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 375, 414, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const language of ["zh", "en"]) {
      await page.goto("/contact/");
      await page.evaluate(lang => localStorage.setItem("weft-ppl.language", lang), language);
      await page.reload();
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("html")).toHaveAttribute("lang", language === "zh" ? "zh-CN" : "en");
      const email = page.getByRole("link", { name: "EMAIL: ace199704@icloud.com" });
      await expect(email).toHaveAttribute("href", "mailto:ace199704@icloud.com");
      await expect(page.locator("form, input, textarea")).toHaveCount(0);
      await expect(page.locator("main li")).toHaveText(["Production Systems", "Human–Tool Workflows", "Agent Systems & Tool Orchestration", "Creative Technology"]);
      await expect(page.getByRole("heading", {name:"GET IN TOUCH",exact:true})).toBeVisible();
      await expect(page.locator("main header")).toContainText("Production systems, human–tool workflows, agent systems and creative technology.");
      await expect(page.getByRole("heading", {name:"03 / CONTACT",exact:true})).toHaveCount(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await email.focus();
      await expect(email).toBeFocused();
      expect(await email.evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe("none");
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await page.screenshot({ path: `artifacts/contact-${width}-${language}.png`, fullPage: true });
      if (width === 375 || width === 1440) {
        expect((await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze()).violations).toEqual([]);
      }
    }
  }
  await page.getByRole("navigation", { name: "Chapter navigation" }).getByRole("link", { name: "01 / Systematic Thinking" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("Master Canvas has three views, no hidden future nodes, and cyclic keyboard controls", async ({ page }) => {
  await page.goto("/");
  const master = page.locator("#views");
  await expect(master.getByRole("heading", { level: 2 })).toHaveText("ONE SYSTEM / THREE VIEWS");
  await expect(master.locator('a[aria-label^="EXPLORE"]')).toHaveCount(2);
  await expect(master.locator('[data-control="extend"], [data-future], [data-hit^="future"]')).toHaveCount(0);
  await expect(master).not.toContainText(/Governance|Recovery|Observability|Regression|未来方向|治理/);
  await page.locator('[data-control="organize"]').focus();
  await page.keyboard.press("ArrowRight");
  await expect(master).toHaveAttribute("data-mode", "transform");
  await page.keyboard.press("ArrowRight");
  await expect(master).toHaveAttribute("data-mode", "operate");
  await page.keyboard.press("ArrowRight");
  await expect(master).toHaveAttribute("data-mode", "overview");
  await page.keyboard.press("ArrowLeft");
  await expect(master).toHaveAttribute("data-mode", "operate");
  await page.keyboard.press("Home");
  await expect(master).toHaveAttribute("data-mode", "overview");
  await page.keyboard.press("End");
  await expect(master).toHaveAttribute("data-mode", "operate");
  await expect(master).toHaveAttribute("data-settled", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator('[data-control="organize"]').click();
  await expect(master).toHaveAttribute("data-settled", "true");
  await master.screenshot({ path: "artifacts/master-three-views.png" });
});

test("withdrawn routes are not public destinations", async ({ request }) => {
  for (const route of ["/next/", "/in-production/", "/evidence/"]) {
    expect((await request.get(route)).status()).toBe(404);
  }
});
