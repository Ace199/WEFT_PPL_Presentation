import { test, expect } from "@playwright/test";

test("system hints roll into black labels, support keyboard and localize", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const facts = page.locator('[data-fact-typing="production"]');
  await facts.scrollIntoViewIfNeeded();
  await expect(facts).toHaveAttribute("data-typing", "complete", { timeout: 15000 });
  const rez = facts.getByRole("link", { name: "Rez", exact: true });
  const ftrack = facts.getByRole("link", { name: "Ftrack", exact: true });
  const hint = facts.getByRole("tooltip");
  await rez.hover();
  await expect(hint).toHaveText("版本管理");
  await expect(hint.locator('span').first()).toHaveCSS("background-color", "rgb(17, 20, 17)");
  await expect(hint.locator('span').first()).toHaveCSS("color", "rgb(255, 255, 255)");
  await expect(hint.locator('span').first()).toHaveCSS("font-family", /Microsoft YaHei/);
  await expect(hint.locator('span').first()).toHaveCSS("font-size", "12px");
  await expect(hint.locator('span span')).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)");
  await page.locator('#production').screenshot({ path: 'artifacts/production-term-hints-desktop.png' });
  const rezBox = (await rez.boundingBox())!;
  const hintBox = (await hint.boundingBox())!;
  expect(Math.abs(rezBox.x - hintBox.x)).toBeLessThan(1);
  expect(Math.abs(rezBox.y - hintBox.y)).toBeLessThan(1);
  await page.keyboard.press("Escape");
  await expect(hint).toHaveCount(0);
  await ftrack.focus();
  await expect(hint).toHaveText("制片管理");
  await page.keyboard.press("Tab");
  await expect(hint).toHaveText("Pub Base");
  await expect(hint.locator('span').first()).toHaveCSS("font-family", /Barlow Condensed/);
  await expect(hint.locator('span').first()).toHaveCSS("font-size", "12px");
  await page.keyboard.press("Escape");
  await expect(hint).toHaveCount(0);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.getByRole("button", { name: "Switch to English" }).click();
  await facts.scrollIntoViewIfNeeded();
  await rez.hover();
  await expect(hint).toHaveText("Version management");
  await expect(facts).toContainText("Active / 2026");
  await expect(facts).toContainText("Animated film Zhao Zilong");
  await expect(facts.locator('[data-untyped]')).toHaveCount(0);
});

test("system hints fit on mobile and respect reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const facts = page.locator('[data-fact-typing="production"]');
  await facts.scrollIntoViewIfNeeded();
  for (const term of ["Rez", "Ftrack", "Pyblish"]) {
    await facts.getByRole("link", { name: term, exact: true }).focus();
    const hint = facts.getByRole("tooltip");
    await expect(hint).toBeVisible();
    // The site's global reduced-motion rule uses 0.01ms rather than zero.
    expect(await hint.locator('span span').evaluate(element =>
      parseFloat(getComputedStyle(element).transitionDuration))).toBeLessThanOrEqual(.00001);
    const box = (await hint.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(390);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await page.locator('#production').screenshot({ path: 'artifacts/production-term-hints-mobile.png' });
});

test("production system links open the supplied destinations in new tabs", async ({ page, context }) => {
  // Check tab behavior without relying on availability of external websites.
  const links = [
    ["Rez", "https://rez.readthedocs.io/en/stable/#"],
    ["Ftrack", "https://www.ftrack.com/cn/"],
    ["Pyblish", "https://pyblish.com/"],
  ];
  for (const [, url] of links) await context.route(url.split('#')[0], route =>
    route.fulfill({ contentType: "text/html", body: "<title>External destination</title>" }));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const facts = page.locator('[data-fact-typing="production"]');
  await facts.scrollIntoViewIfNeeded();
  for (const [name, url] of links) {
    const link = facts.getByRole("link", { name, exact: true });
    await expect(link).toHaveAttribute("href", url);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    const opened = page.waitForEvent("popup");
    await link.click();
    const popup = await opened;
    await popup.waitForLoadState("domcontentloaded");
    expect(popup.url().replace(/#$/, "")).toBe(url.replace(/#$/, ""));
    expect(await popup.evaluate(() => window.opener === null)).toBeTruthy();
    await popup.close();
  }
});

for (const width of [320, 390, 768, 1024, 1280, 1440]) {
  test(`system names stay on one row in both languages at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const facts = page.locator('[data-fact-typing="production"]');
    for (const language of ["zh", "en"]) {
      if (language === "en") {
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
        await page.getByRole("button", { name: "Switch to English" }).click();
      }
      await facts.scrollIntoViewIfNeeded();
      await expect(facts.locator('dt [data-glyph-text]').first()).toHaveText('DCC Software');
      await expect(facts.locator('dt [data-glyph-text]').nth(3)).toHaveText('Production Format');
      for (const row of await facts.locator(':scope > div').all()) {
        await expect(row.locator('dt')).toHaveCSS('text-align', 'left');
        await expect(row.locator('dd')).toHaveCSS('text-align', 'right');
      }
      if (language === 'zh') {
        await expect(facts.locator('dd').last().locator(':scope > span').first()).toHaveCSS('font-family', /Microsoft YaHei/);
      }
        for (const name of ['Rez', 'Ftrack', 'Pyblish']) {
          const row = facts.locator('dd').nth(1);
          const before = (await row.boundingBox())!;
          await facts.getByRole('link', { name, exact: true }).focus();
          const label = facts.getByRole('tooltip').locator('span span');
          const metrics = await label.evaluate(element => ({
            height: element.getBoundingClientRect().height,
            lineHeight: parseFloat(getComputedStyle(element).lineHeight),
            width: element.getBoundingClientRect().width,
            textWidth: element.scrollWidth,
            available: element.parentElement!.clientWidth - 8,
          }));
          expect(metrics.height).toBeLessThanOrEqual(metrics.lineHeight + 1);
          expect(metrics.width).toBeLessThanOrEqual(metrics.available + 1);
          expect(metrics.textWidth).toBeLessThanOrEqual(metrics.available + 1);
          expect((await row.boundingBox())!.height).toBeCloseTo(before.height, 1);
          await page.keyboard.press('Escape');
        }
      const boxes = await Promise.all(["Rez", "Ftrack", "Pyblish"].map(name =>
        facts.getByRole("link", { name, exact: true }).boundingBox()));
      for (const box of boxes) {
        expect(Math.abs(box!.y - boxes[0]!.y)).toBeLessThan(1);
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(width);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    }
  });
}
