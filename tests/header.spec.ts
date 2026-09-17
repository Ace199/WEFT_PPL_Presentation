import { test, expect } from "@playwright/test";

test.use({ video: "on" });
test("first scroll after refresh follows the boundary after hovering the Hero navigation", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.reload();
  await page.evaluate(() => document.fonts.ready);
  const header = page.locator('[data-site-header]');
  await expect(header).toHaveAttribute("data-in-hero", "true");
  await expect(header).toHaveCSS("--header-scroll-offset", "0px");
  await page.mouse.move(200, 20);
  await page.mouse.move(200, 300);
  const height = (await header.boundingBox())!.height;
  const boundary = await page.locator('#summary').evaluate(el => scrollY + el.getBoundingClientRect().top);
  await page.evaluate(top => window.scrollTo({ top, behavior: "instant" }), boundary - height + 30);
  await expect(header).toHaveAttribute("data-in-hero", "false");
  await expect.poll(async () => Math.abs((await header.boundingBox())!.y + 30)).toBeLessThan(1);
  // It must also work after returning to Hero and passing over the nav again.
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(header).toHaveAttribute("data-in-hero", "true");
  await page.mouse.move(200, 20);
  await page.mouse.move(200, 300);
  await page.evaluate(top => window.scrollTo({ top, behavior: "instant" }), boundary + 20);
  await expect.poll(async () => (await header.boundingBox())!.y + height).toBeLessThanOrEqual(9);
});

for (const width of [390, 768, 1440]) {
  test(`header follows the section boundary in both scroll directions at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page.mouse.move(width / 2, 300);
    const header = page.locator('[data-site-header]');
    const height = (await header.boundingBox())!.height;
    const strip = width <= 800 ? 10 : 8;
    const travel = height - strip;
    const boundary = await page.locator('#summary').evaluate(el => scrollY + el.getBoundingClientRect().top);
    for (const distance of [-20, 0, travel / 4, travel / 2, travel, travel + 90, travel / 2, 0, -20]) {
      await page.evaluate(top => window.scrollTo({ top, behavior: "instant" }), boundary - height + distance);
      const expected = -Math.min(travel, Math.max(0, distance));
      await expect.poll(async () => Math.abs((await header.boundingBox())!.y - expected)).toBeLessThan(1);
      if (distance === travel / 2) {
        const top = (await header.boundingBox())!.y;
        await page.waitForTimeout(250); // A stopped scroll must hold its partial reveal.
        expect(Math.abs((await header.boundingBox())!.y - top)).toBeLessThan(1);
        await page.screenshot({ path: `artifacts/header-boundary-half-${width}.png` });
      }
    }
    await page.evaluate(top => window.scrollTo({ top, behavior: "instant" }), boundary + 50);
    await expect.poll(async () => (await header.boundingBox())!.y + height).toBeLessThanOrEqual(strip + 1);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect.poll(async () => (await header.boundingBox())!.y).toBe(0);
  });
}

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
    await expect(header.getByRole("link", { name: "WEFT / PPL", exact: true })).toBeFocused();
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

test("status keeps rolling on hover and click without a pause button", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const header = page.locator('[data-site-header]');
  await header.getByRole("link", { name: "00 / 项目概览" }).focus();
  const status = header.locator('[data-status-ticker]');
  await expect(header.getByRole("button", { name: /状态轮播/ })).toHaveCount(0);
  const first = status.locator('[aria-hidden="true"] > span').first();
  const transform = () => first.evaluate((element) => getComputedStyle(element).transform);
  const initial = await transform();
  // Observe a complete 9-second cycle, including its offscreen hold.
  await expect.poll(transform, { timeout: 11000, intervals: [100] }).not.toBe(initial);
  await status.hover();
  await expect(first).toHaveCSS("animation-play-state", "running");
  await status.click();
  await expect(first).toHaveCSS("animation-play-state", "running");
  const afterClick = await transform();
  await expect.poll(transform, { timeout: 11000, intervals: [100] }).not.toBe(afterClick);
  await header.getByRole("link", { name: "01 / 系统思考" }).click();
  await expect(page).toHaveURL(/\/systematic-thinking\/$/);
});
