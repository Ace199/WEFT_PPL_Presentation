import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Operate reuses the scene, exposes execution relationships and clears obsolete inspection", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.goto("/");
  const master = page.locator("#views");
  const geometry = await master.locator("[data-result-dots]").getAttribute("d");
  await master.locator('[data-control="operate"]').click();
  await expect(master).toHaveAttribute("data-settled", "true");
  expect(await master.locator("[data-result-dots]").getAttribute("d")).toBe(geometry);
  await expect(master.locator('[data-operate-network]')).toBeVisible();
  await expect(master.locator('[data-shared-stack]')).toHaveCount(3);
  await expect(master.locator('[data-operate-path]')).toHaveCount(6);
  await expect(master.locator('[data-hit="resolver"]')).toHaveCount(0);
  for (const id of ["builder", "loader", "publish", "review", "maya", "houdini"]) {
    await expect(master.locator(`[data-hit="${id}"]`)).toBeVisible();
    await master.locator(`[data-hit="${id}"]`).click();
    await expect(master).toHaveAttribute("data-pinned-node", id);
    await expect(master.locator(`[data-scene-node="${id}"]`)).toHaveAttribute("data-link-state", "active");
    await expect(master.locator('[aria-live]')).toContainText(id.toUpperCase());
  }
  await master.locator('[data-control="transform"]').click();
  await expect(master).toHaveAttribute("data-pinned-node", "");
  await expect(master.locator('[data-hit="builder"], [data-operate-network]')).toHaveCount(0);
  for (let i = 0; i < 9; i++) {
    await master.locator(`[data-control="${["operate", "transform", "organize"][i%3]}"]`).focus();
  }
  await master.locator('[data-control="operate"]').click();
  await expect(master).toHaveAttribute("data-settled", "true");
  await expect(master.locator('[data-operate-network]')).toHaveCount(1);
  await expect(master.locator('[data-future], [data-control="extend"]')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("In Practice fits both languages and its explicit anchor reaches homepage production", async ({ page }) => {
  test.setTimeout(90000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const lang of ["zh", "en"]) {
      await page.goto("/");
      await page.evaluate(value => localStorage.setItem("weft-ppl.language", value), lang);
      await page.reload();
      await page.evaluate(() => document.fonts.ready);
      const master = page.locator("#views");
      await master.locator('[data-control="operate"]').click();
      await expect(master).toHaveAttribute("data-mode", "operate");
      await expect(master).toHaveAttribute("data-settled", "true");
      await expect(master).toContainText(lang === "zh" ? "设计如何进入真实制作？" : "How does design enter real production?");
      await expect(master).not.toContainText(/治理|恢复|Governance|Recovery|Observability|Regression|EXTEND/);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const overflow = await master.evaluate(el => [...el.querySelectorAll("button, a")].some(node => {
        const r = node.getBoundingClientRect(); return r.width && (r.left < -1 || r.right > innerWidth+1);
      }));
      expect(overflow).toBe(false);
      if (width === 390 || width === 1440) {
        expect((await new AxeBuilder({ page }).include("#views").withTags(["wcag2a", "wcag2aa"]).analyze()).violations).toEqual([]);
      }
      await page.mouse.move(0, 0);
      await master.screenshot({ path: `artifacts/master-operate-${width}-${lang}.png`, style: '[data-site-header], .skip { visibility: hidden !important; }' });
      await expect(master).toHaveAttribute("data-mode", "operate");
      const link = master.getByRole("link", { name: "VIEW PRODUCTION", exact: true });
      await expect(link).toHaveAttribute("href", "#production");
      await link.focus();
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(/\/#production$/);
      await expect(page.locator("#production-title")).toBeInViewport();
    }
  }
});

test("production anchor works without JavaScript and leaves Contact as page navigation", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator('nav a[href="/contact/"]')).toHaveCount(1);
  await page.getByRole("link", {name:"VIEW PRODUCTION", exact:true}).click();
  await expect(page).toHaveURL(/\/#production$/);
  await expect(page.locator("#production-title")).toBeInViewport();
  await context.close();
});

test("touch selects Operate and pins an execution node without navigating", async ({ browser }) => {
  const context = await browser.newContext({ viewport: {width:390,height:844}, hasTouch:true, isMobile:true, reducedMotion:"reduce" });
  const page = await context.newPage();
  await page.goto("/");
  const master = page.locator("#views");
  await master.locator('[data-control="operate"]').tap();
  await expect(master).toHaveAttribute("data-mode", "operate");
  const builder = master.locator('[data-scene-node="builder"]');
  await builder.tap();
  await expect(master).toHaveAttribute("data-pinned-node", "builder");
  await expect(page).toHaveURL(/\/$/);
  await builder.tap();
  await expect(master).toHaveAttribute("data-pinned-node", "");
  await master.getByRole("link", {name:"VIEW PRODUCTION",exact:true}).tap();
  await expect(page.locator("#production-title")).toBeInViewport();
  await context.close();
});
