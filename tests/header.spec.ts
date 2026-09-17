import { test, expect } from "@playwright/test";

test.use({ video: "on" });
for (const width of [390, 768, 1440]) {
  test(`compact header retracts and reveals with pointer, touch and keyboard at ${width}px`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, hasTouch: true });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:4173/");
    const header = page.locator('[data-site-header]');
    await expect(header).toHaveAttribute("data-in-hero", "true");
    await page.waitForTimeout(1200); // Hero must stay open beyond the idle timeout.
    await expect(header).toHaveAttribute("data-collapsed", "false");
    await page.locator('#views').scrollIntoViewIfNeeded();
    await expect(header).toHaveAttribute("data-in-hero", "false");
    await expect(header).toHaveAttribute("data-collapsed", "true", { timeout: 8000 });
    await expect.poll(async () => (await header.boundingBox())!.y + (await header.boundingBox())!.height).toBeLessThanOrEqual(11);
    const handle = header.locator('[data-header-toggle]');
    const readingPosition = await page.evaluate(() => scrollY);
    const hitArea = (await handle.boundingBox())!;
    // Tap the visible fixed strip without locator auto-scroll returning to Hero.
    await page.touchscreen.tap(hitArea.x + hitArea.width / 2, hitArea.y + hitArea.height / 2);
    await expect(header).toHaveAttribute("data-collapsed", "false");
    await page.keyboard.press("Tab");
    await expect(header.getByRole("link", { name: "WEFT / PPL 首页" })).toBeFocused();
    await expect(header).toHaveAttribute("data-in-hero", "false");
    await page.keyboard.press("Escape");
    await expect(header).toHaveAttribute("data-collapsed", "true");
    await expect(handle).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(header).toHaveAttribute("data-collapsed", "false");
    await page.keyboard.press("Escape");
    await page.mouse.move(width / 2, 3);
    await expect(header).toHaveAttribute("data-collapsed", "false");
    await page.mouse.move(width / 2, 250);
    await page.mouse.click(20, 500);
    await expect(header).toHaveAttribute("data-collapsed", "true");
    await handle.evaluate((element: HTMLButtonElement) => element.focus({ preventScroll: true }));
    await page.keyboard.press("Tab");
    await expect(header).toHaveAttribute("data-collapsed", "false");
    await expect.poll(async () => (await header.boundingBox())!.y).toBe(0);
    expect((await header.boundingBox())!.height).toBeLessThanOrEqual(width <= 800 ? 104 : 78);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.evaluate(() => scrollY)).toBe(readingPosition);
    await page.screenshot({ path: `artifacts/header-expanded-${width}.png` });
    await page.keyboard.press("Escape");
    await expect.poll(async () => (await header.boundingBox())!.y + (await header.boundingBox())!.height).toBeLessThanOrEqual(11);
    await page.screenshot({ path: `artifacts/header-collapsed-${width}.png` });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(header).toHaveAttribute("data-in-hero", "true");
    await expect(header).toHaveAttribute("data-collapsed", "false");
    await expect.poll(async () => (await header.boundingBox())!.y).toBe(0);
    await page.screenshot({ path: `artifacts/header-hero-${width}.png` });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(header).toHaveAttribute("data-collapsed", "false");
    await expect(header.getByText("2026", { exact: true })).toBeVisible();
    await context.close();
  });
}

test("status rolls upward, can pause, and preserves navigation destinations", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const header = page.locator('[data-site-header]');
  await header.getByRole("link", { name: "00 / 项目概览" }).focus();
  const status = header.locator('[data-status-paused]');
  const first = status.locator('[aria-hidden="true"] > span').first();
  const transform = () => first.evaluate((element) => getComputedStyle(element).transform);
  const initial = await transform();
  await expect.poll(transform, { timeout: 6000 }).not.toBe(initial);
  await status.click();
  await expect(status).toHaveAttribute("data-status-paused", "true");
  await header.getByRole("link", { name: "00 / 项目概览" }).focus();
  await page.mouse.move(20, 300);
  await expect(first).toHaveCSS("animation-play-state", "paused");
  await status.click();
  await expect(status).toHaveAttribute("data-status-paused", "false");
  await header.getByRole("link", { name: "01 / 系统思考" }).click();
  await expect(page).toHaveURL(/\/systematic-thinking\/$/);
});
