import { test, expect } from "@playwright/test";

for (const width of [390, 768, 1440]) {
  test(`model disclosure stays below the canvas and preserves controls at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const region = page.getByRole("region", { name: "ONE SYSTEM / THREE VIEWS" });
    const disclosure = region.locator("details");
    const positions = () => region.evaluate((root) => {
      const origin = root.getBoundingClientRect();
      return [...root.querySelectorAll('[data-control], [aria-live="polite"]')].map((element) => {
        const box = element.getBoundingClientRect();
        return { x: box.x - origin.x, y: box.y - origin.y, width: box.width, height: box.height };
      });
    });
    const before = await positions();
    await disclosure.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(disclosure).toHaveAttribute("open", "");
    expect(await positions()).toEqual(before);
    for (const mode of ["organize", "transform", "extend", "overview"]) {
      await region.locator(`[data-control="${mode}"]`).focus();
      await page.keyboard.press("Enter");
      await expect(region).toHaveAttribute("data-mode", mode);
      const overlaps = await region.evaluate((root) => {
        const text = root.querySelector("details")!.getBoundingClientRect();
        return [...root.querySelectorAll('[data-control], [aria-live="polite"]')].some((element) => {
          const box = element.getBoundingClientRect();
          return box.bottom > text.top && box.top < text.bottom && box.right > text.left && box.left < text.right;
        });
      });
      expect(overlaps).toBe(false);
      const explanation = (await region.locator('[aria-live="polite"]').boundingBox())!;
      const overview = (await region.locator('[data-control="overview"]').boundingBox())!;
      expect(explanation.y + explanation.height).toBeLessThanOrEqual(overview.y);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await region.screenshot({
      path: `artifacts/model-expanded-${width}.png`,
      // Isolate the component capture from sticky page chrome during stitching.
      style: '[data-site-header], .skip { visibility: hidden; }',
    });
    await disclosure.locator("summary").focus();
    await page.keyboard.press("Space");
    await expect(disclosure).not.toHaveAttribute("open");
    expect(await positions()).toEqual(before);
  });
}
