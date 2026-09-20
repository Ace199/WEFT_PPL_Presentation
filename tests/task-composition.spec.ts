import { test, expect } from "@playwright/test";

test("task composition retains responsibility and provenance without a detail-page CTA", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/design-innovation/");
  const index = page.locator("[data-index]").nth(3);
  await expect(page.locator("[data-index]")).toHaveCount(5);
  await expect(index).toHaveText("04 / TASK COMPOSITIONIndependent Subtasks");
  await index.click();
  const panel = page.locator("#decision-task-composition");
  await expect(panel.getByRole("heading", { level: 3 })).toContainText("一个镜头的动画工作");
  await expect(panel.locator("[data-card-part]")).toHaveCount(2);
  await expect(panel.locator('[data-card-part="example"]')).toHaveCount(0);
  await expect(panel.getByRole("link")).toHaveCount(0);
  await expect(panel.locator('[data-card-part="comparison"] pre')).toContainText("Secondary 07");
  await expect(panel).toContainText("10 个角色都集中在同一个 Ani Task 中制作");
  await expect(panel.getByRole("heading", {name:"Main Characters Task"})).toHaveCount(1);
  await expect(panel.getByRole("heading", {name:"Secondary Characters Task"})).toHaveCount(1);
  await expect(panel.getByRole("heading", {name:"Camera / Layout Task"})).toHaveCount(1);
  await expect(panel).toContainText("task sources retained");
  await expect(panel).not.toContainText("Task_A");
  await expect(page.locator('a[href*="in-production"]')).toHaveCount(0);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(panel).toContainText("Single Shot Ani Task");
  await expect(panel).toContainText("shared shot state");
});

test("five indexes stay compact and task content fits desktop and narrow cards", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/design-innovation/");
    await page.evaluate(() => document.fonts.ready);
    await page.locator("[data-index]").nth(3).click();
    const subtitleSize = await page.locator("[data-index]").nth(3).locator("span").nth(1).evaluate(el => parseFloat(getComputedStyle(el).fontSize));
    expect(subtitleSize).toBeLessThanOrEqual(15);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const panel = page.locator("#decision-task-composition");
    const body = panel.locator("[data-card-scroll]");
    expect(await body.evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
    await panel.locator('[data-card-part="comparison"]').scrollIntoViewIfNeeded();
    await page.locator("#design-viewer").screenshot({ path: `artifacts/task-composition-${width}.png` });
    await body.evaluate(el => el.scrollTop = el.scrollHeight);
    await expect(panel.locator("figcaption")).toBeInViewport({ ratio: 1 });
    await page.locator("#design-viewer").screenshot({ path: `artifacts/task-composition-end-${width}.png` });
    const footer = page.getByRole("navigation", { name: "卡片切换", exact: true });
    expect(await footer.evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
  }
});
