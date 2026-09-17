import { test, expect } from "@playwright/test";

test.use({ video: "on" });
for (const width of [390, 1440]) {
  test(`footer waits 1.5s, replays, pauses, and restores static content at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const footer = page.locator('[data-motion="footer"]');
    await expect(footer).toHaveAttribute("data-footer-state", "waiting");
    const x = () => footer.locator('[data-circle="0"]').evaluate(el => {
      const transform = getComputedStyle(el).transform;
      return transform === "none" ? 0 : new DOMMatrix(transform).e;
    });
    await expect.poll(x).toBe(-16);
    const start = Date.now();
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toHaveAttribute("data-footer-paused", "false");
    await page.waitForTimeout(900); // Assert the visible initial hold, not only the final pose.
    expect(await x()).toBe(-16);
    await expect.poll(x, { intervals: [20] }).toBeGreaterThan(-16);
    expect(Date.now() - start).toBeGreaterThanOrEqual(1450);
    await expect(footer).toHaveAttribute("data-footer-state", "complete");
    await expect.poll(x).toBe(0);
    const box = (await footer.boundingBox())!;
    await page.mouse.move(0, 0);
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await expect(footer).toHaveAttribute("data-footer-plays", "2");
    for (let i = 0; i < 10; i++) {
      await page.mouse.move(0, 0);
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    }
    await expect(footer).toHaveAttribute("data-footer-plays", "12");
    await expect(footer).toHaveAttribute("data-footer-state", "complete");
    await expect.poll(x).toBe(0);
    await footer.focus();
    await page.keyboard.press("Enter");
    await expect(footer).toHaveAttribute("data-footer-plays", "13");
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(footer).toHaveAttribute("data-footer-paused", "true");
    const paused = await x();
    await page.waitForTimeout(200);
    expect(await x()).toBe(paused);
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toHaveAttribute("data-footer-state", "complete");
    await footer.screenshot({ path: `artifacts/footer-motion-${width}.png` });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(footer).not.toHaveAttribute("role", "button");
    await expect.poll(x).toBe(0);
    await expect(footer.locator('[data-circle][style*="transform"]')).toHaveCount(0);
  });
}

test("footer supports touch replay and cancels when editing", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  const footer = page.locator('[data-motion="footer"]');
  await footer.scrollIntoViewIfNeeded();
  await expect(footer).toHaveAttribute("data-footer-state", "complete");
  await footer.tap();
  await expect(footer).toHaveAttribute("data-footer-plays", "2");
  await page.getByRole("button", { name: /试编辑/ }).click();
  await expect(footer).not.toHaveAttribute("data-footer-state");
  await expect(footer.locator('[data-circle][style*="transform"]')).toHaveCount(0);
  await context.close();
});
