import { test, expect } from "@playwright/test";

for (const [width, height] of [[390, 844], [768, 1000], [1440, 800], [1920, 1080]]) {
  test(`navigation and Hero fill the first viewport at ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const measure = () => page.evaluate(() => {
      const header = document.querySelector('[data-site-header]')!.getBoundingClientRect();
      const hero = document.querySelector('[aria-labelledby="hero-title"]')!.getBoundingClientRect();
      const title = document.getElementById('hero-title')!.getBoundingClientRect();
      const summary = document.getElementById('summary')!.getBoundingClientRect();
      return {
        heightError: Math.abs(hero.bottom - innerHeight),
        summaryTop: summary.top,
        titleClearance: title.top - header.bottom,
        heroTop: hero.top, headerBottom: header.bottom,
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    await expect.poll(async () => (await measure()).heightError).toBeLessThan(1);
    const bounds = await measure();
    expect(bounds.summaryTop).toBeGreaterThanOrEqual(height - 1);
    expect(bounds.titleClearance).toBeGreaterThan(0);
    expect(bounds.heroTop).toBeCloseTo(bounds.headerBottom, 0);
    expect(bounds.overflow).toBe(false);
    await page.screenshot({ path: `artifacts/hero-viewport-${width}.png` });
    await page.setViewportSize({ width, height: height + 100 });
    await expect.poll(async () => (await measure()).heightError).toBeLessThan(1);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await expect.poll(async () => (await measure()).heightError).toBeLessThan(1);
  });
}
