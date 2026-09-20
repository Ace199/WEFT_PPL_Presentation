import { test, expect } from "@playwright/test";

test("desktop navigation does not intercept decisions and requires a deliberate edge hover", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto("/design-innovation/");
  await page.evaluate(() => document.fonts.ready);
  await page.mouse.move(700, 600);
  await page.locator("#design-viewer").evaluate(el => window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 12, behavior: "instant" }));
  const header = page.locator("[data-site-header]");
  const handle = page.locator("[data-header-toggle]");
  await expect(header).toHaveAttribute("data-collapsed", "true");
  expect(await handle.evaluate(el => el.getBoundingClientRect().height)).toBe(8);
  await expect.poll(() => page.evaluate(() => {
    const toggle = document.querySelector("[data-header-toggle]")!.getBoundingClientRect();
    const index = document.querySelector("[data-index]")!.getBoundingClientRect();
    return toggle.bottom <= index.top;
  })).toBe(true);
  for (let i = 0; i < 4; i++) {
    const bounds = await page.locator("[data-index]").nth(i).boundingBox();
    await page.mouse.click(bounds!.x + bounds!.width / 2, bounds!.y + bounds!.height / 2);
    await expect(page.locator("[data-index]").nth(i)).toHaveAttribute("aria-pressed", "true");
    await expect(header).toHaveAttribute("data-collapsed", "true");
  }
  await page.clock.install();
  await handle.hover();
  await page.clock.runFor(200);
  await expect(header).toHaveAttribute("data-collapsed", "true");
  await page.mouse.move(700, 300);
  await page.clock.runFor(400);
  await expect(header).toHaveAttribute("data-collapsed", "true");
  await handle.hover();
  await page.clock.runFor(350);
  await expect(header).toHaveAttribute("data-collapsed", "false");
  await header.locator("a").first().focus();
  await page.keyboard.press("Escape");
  await expect(header).toHaveAttribute("data-collapsed", "true");
  await handle.press("Enter");
  await expect(header).toHaveAttribute("data-collapsed", "false");
});

test("mobile has a visible bounded toggle that opens and closes on tap", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto("/design-innovation/");
  await page.evaluate(() => document.fonts.ready);
  await page.locator("#design-viewer").evaluate(el => window.scrollTo({ top: el.getBoundingClientRect().top + scrollY, behavior: "instant" }));
  const header = page.locator("[data-site-header]");
  const handle = page.locator("[data-header-toggle]");
  await expect(header).toHaveAttribute("data-collapsed", "true");
  await expect(handle.locator("span")).toBeVisible();
  expect(await handle.evaluate(el => el.getBoundingClientRect().width)).toBe(44);
  await handle.tap();
  await expect(header).toHaveAttribute("data-collapsed", "false");
  await handle.tap();
  await expect(header).toHaveAttribute("data-collapsed", "true");
  await expect.poll(() => header.evaluate(el => el.getBoundingClientRect().bottom)).toBeLessThanOrEqual(12);
  await page.screenshot({ path: "artifacts/header-mobile-toggle.png" });
  await context.close();
});
