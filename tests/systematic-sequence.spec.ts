import { test, expect } from "@playwright/test";

test("network reveals nodes and connecting arrows in dependency order", async ({ page }) => {
  await page.goto("/systematic-thinking/");
  const network = page.locator('[data-reveal]').first();
  await expect(network).toHaveAttribute('data-motion', 'ready');
  const result = await network.evaluate(element => new Promise<{violations: string[]; seen: number[]}>((resolve, reject) => {
    const steps = Array.from(element.querySelectorAll<SVGElement>('[data-step]'));
    const violations = new Set<string>();
    const seen = new Set<number>();
    const start = performance.now();
    element.scrollIntoView({block: 'center', behavior: 'instant'});
    const sample = () => {
      const opacity = steps.map(step => Number(getComputedStyle(step).opacity));
      opacity.forEach((value, i) => {
        if (value > 0 && value < 1) seen.add(i);
        if (i > 0 && value > 0 && opacity[i - 1] < .999) violations.add(`Step ${i} started before ${i - 1} finished`);
      });
      if (element.getAttribute('data-motion') === 'complete') resolve({violations: [...violations], seen: [...seen]});
      else if (performance.now() - start > 16000) reject(new Error('Sequence did not finish'));
      else requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  }));
  expect(result.violations).toEqual([]);
  expect(result.seen).toHaveLength(31);
  await expect(network.locator('[data-step="30"]')).toHaveCSS('opacity', '1');
  await expect(network.locator('[data-draw]').first()).toHaveCSS('stroke-dashoffset', '0px');
});
