import { test, expect } from "@playwright/test";

test.use({ video: "on" });
test("summary waits until well inside the viewport, delays, and holds between phases", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 800 });
  await page.goto("/");
  const summary = page.locator('[data-motion="summary"]');
  const phases = [0, 1, 2].map((phase) => summary.locator(`[data-phase="${phase}"]`));
  const opacity = (index: number) => phases[index].evaluate((element) => Number(getComputedStyle(element).opacity));
  const scrollToFraction = (fraction: number) => summary.evaluate((element, part) => {
    window.scrollTo({ top: scrollY + element.getBoundingClientRect().top - innerHeight * part, behavior: "instant" });
  }, fraction);
  // The diagram can peek below Hero without consuming its entrance sequence.
  await scrollToFraction(0.7);
  await expect(phases[0]).toHaveCSS("opacity", "0.2");
  await page.waitForTimeout(1200);
  expect(await opacity(0)).toBe(0.2);
  await scrollToFraction(0.5);
  await page.waitForTimeout(650);
  expect(await opacity(0)).toBe(0.2);
  for (const index of [0, 1]) {
    await expect(phases[index]).toHaveCSS("opacity", "1");
    const finished = Date.now();
    const nextStart = index === 0 ? 0.15 : 0;
    expect(await opacity(index + 1)).toBe(nextStart);
    await expect.poll(() => opacity(index + 1)).toBeGreaterThan(nextStart);
    expect(Date.now() - finished).toBeGreaterThanOrEqual(750);
  }
  await expect(phases[2]).toHaveCSS("opacity", "1");
  await summary.screenshot({ path: "artifacts/summary-delayed-complete.png" });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await scrollToFraction(0.5);
  for (const phase of phases) await expect(phase).toHaveCSS("opacity", "1");
  await page.reload();
  await scrollToFraction(0.5);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const phase of phases) await expect(phase).toHaveCSS("opacity", "1");
  const video = page.video();
  await page.close();
  await video?.saveAs("artifacts/summary-delayed.webm");
});
