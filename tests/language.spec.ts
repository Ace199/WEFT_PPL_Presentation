import {test, expect} from "@playwright/test";

test("language switch covers the homepage, scene and editor without changing view state", async ({page}) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({width, height: 900});
    await page.goto("/");
    await page.emulateMedia({reducedMotion: "reduce"});
    const switchBox = await page.getByRole("group", {name: "Language / 语言"}).boundingBox();
    const brandBox = await page.locator('[data-site-header] a[aria-label="WEFT / PPL"]').boundingBox();
    expect(switchBox!.x).toBeGreaterThan(brandBox!.x + brandBox!.width);
    await page.getByRole("button", {name: "Switch to English"}).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator('[data-editable="hero.subtitle"]')).toContainText("Cross-DCC Animation");
    await expect(page.locator("#summary")).toContainText("Scattered outputs");
    await expect(page.locator("#production")).toContainText("A two-person team");
    await page.screenshot({path: `artifacts/language-header-${width}.png`});
    for (const mode of ["organize", "transform"]) {
      await page.locator(`[data-control="${mode}"]`).click();
      await expect(page.locator("#views")).toHaveAttribute("data-mode", mode);
      await expect(page.locator("[data-production-scene]")).toContainText("Asset");
    }
    // Keep a stationary pointer out of preview controls during screenshot scrolling.
    await page.mouse.move(1, 1);
    await page.locator("#views").screenshot({path: `artifacts/language-scene-${width}.png`, style: "[data-site-header], .skip { visibility: hidden !important; }"});
    await page.locator("#views details summary").click();
    await expect(page.locator("#views"), `after disclosure at ${width}`).toHaveAttribute("data-mode", "transform");
    await expect(page.locator("#views details")).toContainText("Dependency: records");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.mouse.move(1, 1);
    await page.screenshot({path: `artifacts/language-en-${width}.png`, fullPage: true});
    await expect(page.locator("#views"), `after screenshot at ${width}`).toHaveAttribute("data-mode", "transform");
    await page.mouse.move(1, 1);
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page.locator("#views"), `before language switch at ${width}`).toHaveAttribute("data-mode", "transform");
    await page.getByRole("button", {name: "切换为中文"}).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
    await expect(page.locator("#views")).toHaveAttribute("data-mode", "transform");
    await expect(page.locator('[data-editable="hero.subtitle"]')).toContainText("跨软件协作");
  }
  await page.getByRole("button", {name: "试编辑", exact: false}).click();
  await page.locator("#preview-value").fill("中文临时文案");
  await page.getByRole("button", {name: "关闭编辑面板"}).click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.getByRole("button", {name: "Switch to English"}).click();
  await page.getByRole("button", {name: "Try editing", exact: false}).click();
  await expect(page.locator("#preview-value")).not.toHaveValue("中文临时文案");
  await page.locator("#preview-value").fill("Temporary English copy");
  await page.getByRole("button", {name: "View change list"}).click();
  const changes = JSON.parse(await page.locator("#preview-changes").inputValue());
  expect(changes.language).toBe("en");
  expect(changes.source).toBe("src/content/translations.ts");
  expect(changes.changes[0].modified).toBe("Temporary English copy");
  await page.getByRole("button", {name: "Close editing panel"}).click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.getByRole("button", {name: "切换为中文"}).click();
  await expect(page.locator('[data-editable="hero.description"] [data-glyph-text]')).toHaveText("中文临时文案");
  expect(errors).toEqual([]);
});
