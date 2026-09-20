import { test, expect } from "@playwright/test";
import { home } from "../src/content/home";

// Recording is optional; functional timing checks do not require FFmpeg.
test.use({ video: process.env.PW_RECORD_VIDEO === "1" ? "on" : "off" });
for (const width of [390, 768, 1440]) {
  test(`production facts type faster with row pauses and stable layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const table = page.locator('[data-fact-typing="production"]');
    const rows = table.locator('[data-typing-row]');
    await expect(table).toHaveAttribute("data-paused", "true");
    await expect(rows.first().locator('[data-typing-glyph]').first()).toBeHidden();
    const glyphCount = await table.locator('[data-untyped]').count();
    // A small sliver at the viewport bottom must not start the sequence.
    await table.evaluate(element => {
      const box = element.getBoundingClientRect();
      window.scrollTo({ top: scrollY + box.top - innerHeight + box.height * .2, behavior: "instant" });
    });
    await expect(table).toHaveAttribute("data-paused", "true");
    await page.waitForTimeout(500);
    expect(await table.locator('[data-untyped]').count()).toBe(glyphCount);
    await table.scrollIntoViewIfNeeded();
    const before = (await table.boundingBox())!;
    const started = Date.now();
    await expect.poll(() => rows.first().locator('[data-untyped]').count(), { intervals: [20] }).toBe(0);
    // Production alone now runs at 2x its previous rhythm.
    expect(Date.now() - started).toBeLessThan(1600);
    const rowFinished = Date.now();
    await expect(rows.nth(1).locator('[data-typing-glyph]').first()).toBeHidden();
    await expect(rows.first().locator('[data-caret="end"]')).toHaveCount(1);
    await expect.poll(() => rows.nth(1).locator('[data-typing-glyph]').first().isVisible(), { intervals: [20] }).toBe(true);
    const rowPause = Date.now() - rowFinished;
    expect(rowPause).toBeGreaterThan(200);
    expect(rowPause).toBeLessThan(500);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(table).toHaveAttribute("data-paused", "true");
    const remaining = await table.locator('[data-untyped]').count();
    await page.waitForTimeout(250); // Confirm that typing stops outside the viewport.
    expect(await table.locator('[data-untyped]').count()).toBe(remaining);
    await table.scrollIntoViewIfNeeded();
    await expect(table).toHaveAttribute("data-typing", "complete", { timeout: 15000 });
    await expect(table.locator('[data-untyped], [data-caret]')).toHaveCount(0);
    const after = (await table.boundingBox())!;
    expect({ width: after.width, height: after.height }).toEqual({ width: before.width, height: before.height });
    for (let i = 0; i < home.proof.facts.length; i++) {
      await expect(rows.nth(i).locator('dt [data-glyph-text]')).toHaveText(home.proof.facts[i][0]);
      expect((await rows.nth(i).locator('dd [data-glyph-text]').allTextContents()).join('')).toBe(home.proof.facts[i][1]);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await table.scrollIntoViewIfNeeded();
    await expect(table).toHaveAttribute("data-typing", "complete");
    await expect(table.locator('[data-untyped]')).toHaveCount(0);
    await table.screenshot({ path: `artifacts/production-typing-complete-${width}.png` });
    if (width === 1440) {
      const video = page.video();
      await page.close();
      await video?.saveAs("artifacts/production-typewriter.webm");
    }
  });
}

test("production typing yields to reduced motion without replaying", async ({ page }) => {
  await page.goto("/");
  const table = page.locator('[data-fact-typing="production"]');
  await table.scrollIntoViewIfNeeded();
  await expect(table.locator('[data-untyped]').first()).toBeHidden();
  // The trial-editor launcher is temporarily hidden by user request.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(table.locator('[data-untyped], [data-caret]')).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(table.locator('[data-untyped], [data-caret]')).toHaveCount(0);
});
