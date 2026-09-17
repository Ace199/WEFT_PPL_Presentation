import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("prototype opens first, symbol transition reveals final and reopening resets", async ({ page }) => {
  await page.goto("/");
  for (const name of ["SHOT BUILDER", "PUBLISH / QC"]) {
    const trigger = page.getByRole("button", { name: `放大查看 ${name}`, exact: true });
    await trigger.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    const stage = dialog.locator("[data-stage]");
    await expect(stage).toHaveAttribute("data-stage", "prototype");
    const initialBounds = await stage.boundingBox();
    await stage.click();
    await expect(dialog.getByRole("status")).toHaveText("从原型到实现…");
    await expect.poll(() => dialog.locator("canvas").getAttribute("data-phase"), { intervals: [20], timeout: 3000 }).toBe("code");
    if (name === "SHOT BUILDER") await dialog.screenshot({ path: "artifacts/proof-symbol-transition.png" });
    await expect(stage).toHaveAttribute("data-stage", "final");
    expect(await stage.boundingBox()).toEqual(initialBounds);
    await expect(dialog.locator("header, footer")).toHaveCount(0);
    await dialog.getByRole("button", { name: "重新查看原型" }).click();
    await expect(stage).toHaveAttribute("data-stage", "prototype");
    await stage.focus();
    await page.keyboard.press("Enter");
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
    await trigger.click();
    await expect(dialog.locator("[data-stage]")).toHaveAttribute("data-stage", "prototype");
    await expect(dialog.getByRole("button", { name: "关闭图片" })).toHaveCount(0);
    await page.mouse.click(2, 2);
    await expect(dialog).not.toBeVisible();
    await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("");
  }
});

test("mobile reduced motion, focus containment, localization and modal accessibility", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "放大查看 PUBLISH / QC", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await dialog.locator("[data-stage]").click();
  await expect(dialog.locator("[data-stage]")).toHaveAttribute("data-stage", "final");
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBeTruthy();
  }
  const axe = await new AxeBuilder({ page }).include("dialog").withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(axe.violations).toEqual([]);
  await dialog.screenshot({ path: "artifacts/proof-dialog-mobile.png" });
  await page.keyboard.press("Escape");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.getByRole("button", { name: "Switch to English" }).click();
  await page.getByRole("button", { name: "View larger SHOT BUILDER" }).click();
  await expect(dialog).toHaveAccessibleName("SHOT BUILDER / Design prototype");
  await expect(dialog.getByRole("button", { name: "Close image" })).toHaveCount(0);
});
