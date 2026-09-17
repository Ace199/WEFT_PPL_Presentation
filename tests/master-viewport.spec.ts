import { test, expect } from "@playwright/test";

for (const [width, height] of [[1024, 768], [1366, 768], [1440, 800], [1920, 1080]]) {
  test(`master poster fits below navigation at ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const region = page.getByRole("region", { name: "ONE SYSTEM / THREE VIEWS" });
    const headerHeight = await page.locator('[data-site-header]').evaluate(el => el.getBoundingClientRect().height);
    await region.evaluate((el, offset) => window.scrollTo({
      top: scrollY + el.getBoundingClientRect().top - offset, behavior: "instant",
    }), headerHeight);
    const box = (await region.boundingBox())!;
    expect(box.height + headerHeight).toBeLessThanOrEqual(height);
    expect(box.y + box.height).toBeLessThanOrEqual(height + 1);

    for (const mode of ["organize", "transform", "extend", "overview"]) {
      await region.locator(`[data-control="${mode}"]`).focus();
      await page.keyboard.press("Enter");
      await expect(region).toHaveAttribute("data-mode", mode);
      await expect(region).toHaveAttribute("data-settled", "true");
      const inspect = () => region.evaluate(root => {
        const bounds = root.getBoundingClientRect();
        const elements = [...root.querySelectorAll('header, [data-control], a, [aria-live], details')];
        const boxes = elements.map(el => el.getBoundingClientRect());
        const clipped = boxes.some(b => b.top < bounds.top || b.bottom > bounds.bottom || b.left < 0 || b.right > innerWidth);
        const overlaps = boxes.some((a, i) => boxes.slice(i + 1).some(b =>
          a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top));
        const alignment = [...root.querySelectorAll<SVGGElement>('[data-node]')]
          .filter(node => Number(getComputedStyle(node).opacity) > 0)
          .map(node => {
            const matrix = node.getScreenCTM()!;
            const hit = root.querySelector(`[data-hit="${node.dataset.node}"]`)!.getBoundingClientRect();
            return Math.hypot(matrix.e - hit.x - hit.width / 2, matrix.f - hit.y - hit.height / 2);
          });
        return { clipped, overlaps, alignment: Math.max(...alignment) };
      });
      // Focus and Enter each dispatch a view update; wait for the rendered
      // geometry, rather than sampling between React and the GSAP effect.
      await expect.poll(async () => (await inspect()).alignment).toBeLessThan(2);
      const problems = await inspect();
      expect(problems.clipped).toBe(false);
      expect(problems.overlaps).toBe(false);
    }
    await region.evaluate((el, offset) => window.scrollTo({
      top: scrollY + el.getBoundingClientRect().top - offset, behavior: "instant",
    }), headerHeight);
    await page.screenshot({ path: `artifacts/master-viewport-${width}.png` });
  });
}
