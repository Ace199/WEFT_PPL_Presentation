import { test, expect } from "@playwright/test";

test("compatibility cubes rotate together, pause off card and respect reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/design-innovation/");
  const comparison = page.locator("[data-compatibility-comparison]");
  await comparison.scrollIntoViewIfNeeded();
  const cubes = comparison.locator("[data-rotating-cube]");
  await expect(cubes).toHaveCount(4);
  await expect(comparison).toHaveAttribute("data-rotating", "true");
  const initial = await cubes.first().getAttribute("d");
  await expect.poll(() => cubes.first().getAttribute("d")).not.toBe(initial);
  expect(await cubes.evaluateAll(els => new Set(els.map(el => el.getAttribute("d"))).size)).toBe(1);
  await expect(comparison.getByText("历史Rigcache完全失效", { exact: true })).toBeVisible();
  await expect(comparison.getByText("历史发布仍然可用", { exact: true })).toBeVisible();
  await expect(comparison.locator("figure").nth(1).locator("svg")).not.toContainText("New Work");
  await page.locator("[data-index]").nth(1).click();
  await expect(comparison).toHaveAttribute("data-rotating", "false");
  await page.locator("[data-index]").nth(0).click();
  await comparison.scrollIntoViewIfNeeded();
  await expect(comparison).toHaveAttribute("data-rotating", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(comparison).toHaveAttribute("data-rotating", "false");
  await page.addStyleTag({ content: '#design-viewer{height:auto!important} [data-panel]{display:none!important} [data-panel][data-active="true"]{display:block!important} [data-card-scroll]{overflow:visible!important} [data-site-header]{visibility:hidden!important}' });
  await expect(comparison.locator("svg").first()).toHaveCSS("visibility", "visible");
  await comparison.screenshot({ path: "artifacts/compatibility-comparison-updated.png" });
});
