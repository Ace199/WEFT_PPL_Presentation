import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("decision deck stays synchronized through pointer, keyboard and rapid changes", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      !message.text().startsWith("Failed to load resource")
    )
      errors.push(message.text());
  });
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/design-innovation/");
  const deck = page.locator("[data-active-decision]");
  const indexes = page.getByRole("group", { name: "设计决策索引" });
  await expect(
    page
      .getByRole("navigation", { name: "章节导航" })
      .getByRole("link", { name: "02 / 设计&创新" }),
  ).toHaveAttribute("aria-current", "page");
  await expect(deck).toHaveAttribute("data-active-decision", "compatibility");
  await expect(
    page.getByRole("navigation", { name: "In production", exact: true }),
  ).toHaveCount(0);
  await indexes.getByRole("button", { name: /02 \/ MODULARITY/ }).hover();
  await expect(deck).toHaveAttribute("data-active-decision", "compatibility");
  await indexes.getByRole("button", { name: /02 \/ MODULARITY/ }).click();
  await expect(deck).toHaveAttribute("data-active-decision", "modularity");
  await indexes
    .getByRole("button", { name: /02 \/ MODULARITY/ })
    .press("ArrowRight");
  await expect(deck).toHaveAttribute("data-active-decision", "state");
  await expect(
    indexes.getByRole("button", { name: /03 \/ STATE/ }),
  ).toBeFocused();
  await page.getByRole("button", { name: "NEXT →", exact: true }).click();
  await expect(deck).toHaveAttribute("data-active-decision", "task-composition");
  await page.getByRole("button", { name: "NEXT →", exact: true }).click();
  await expect(deck).toHaveAttribute("data-active-decision", "execution");
  await expect(
    page.getByRole("button", { name: "NEXT →", exact: true }),
  ).toBeEnabled();
  await page.getByRole("button", { name: "NEXT →", exact: true }).click();
  await expect(deck).toHaveAttribute("data-active-decision", "compatibility");
  await page.getByRole("button", { name: "← PREV", exact: true }).click();
  await expect(deck).toHaveAttribute("data-active-decision", "execution");
  const navigation = page.getByRole("navigation", { name: "卡片切换" });
  for (const label of [
    "01 / COMPATIBILITY",
    "05 / EXECUTION",
    "02 / MODULARITY",
    "03 / STATE",
    "01 / COMPATIBILITY",
  ]) {
    await navigation.getByRole("button", { name: label, exact: true }).click();
  }
  await expect(deck).toHaveAttribute("data-active-decision", "compatibility");
  await expect(page.locator('[data-panel][data-active="true"]')).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(
    page.locator('[data-panel][data-active="false"]:not([inert])'),
  ).toHaveCount(0);
  await expect(page.locator('[data-panel][data-active="true"]')).toHaveCSS(
    "transform",
    "matrix(1, 0, 0, 1, 0, 0)",
  );
  await page.evaluate(() => {
    (document.activeElement as HTMLElement)?.blur();
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await expect(page.locator("[data-site-header]")).toHaveAttribute(
    "data-in-hero",
    "true",
  );
  await page.screenshot({
    path: "artifacts/design-deck-desktop.png",
    fullPage: true,
  });
  await page
    .getByRole("navigation", { name: "章节导航" })
    .getByRole("link", { name: "01 / 系统思考" })
    .click();
  await expect(page).toHaveURL(/\/systematic-thinking\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "动画生产",
  );
  expect(errors).toEqual([]);
});

test("tablet cards remain readable and expose only the active content to assistive technology", async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/design-innovation/");
  for (let i = 0; i < 5; i++) {
    await page.locator("[data-index]").nth(i).click();
    await expect(page.getByRole("heading", { level: 3 })).toHaveCount(1);
    await page
      .locator("[data-panel][data-active=true] [data-card-scroll]")
      .evaluate((el) => (el.scrollTop = el.scrollHeight));
    const bounds = await page
      .locator("[data-panel][data-active=true]")
      .evaluate((panel) => {
        const link = (panel.querySelector("a") ?? panel.querySelector("figcaption"))!.getBoundingClientRect();
        const frame = panel.getBoundingClientRect();
        return { linkBottom: link.bottom, frameBottom: frame.bottom };
      });
    expect(bounds.linkBottom).toBeLessThanOrEqual(bounds.frameBottom + 1);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const result = await new AxeBuilder({ page })
      .include("#design-main")
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(result.violations).toEqual([]);
    await page
      .locator("[data-panel][data-active=true]")
      .screenshot({ path: `artifacts/design-deck-tablet-${i + 1}.png` });
  }
});

test("all cards, anchored destinations and global language work", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/design-innovation/");
  const ids = ["compatibility", "modularity", "state", "task-composition", "execution"];
  for (let i = 0; i < ids.length; i++) {
    await page.locator("[data-index]").nth(i).click();
    const panel = page.locator(`[data-panel]#decision-${ids[i]}`);
    await expect(panel).toHaveAttribute("data-active", "true");
    if (ids[i] === "task-composition") {
      await expect(panel.locator('[data-card-part="example"]')).toHaveCount(0);
      await expect(panel.getByRole("link")).toHaveCount(0);
      continue;
    }
    await expect(
      panel.getByRole("heading", { name: "PART 03 / PROJECT EXAMPLE", exact: true }),
    ).toBeVisible();
    await expect(panel.getByRole("link")).toHaveAttribute(
      "href",
      `/in-production/#${ids[i]}`,
    );
    await panel.getByRole("link").click();
    await expect(page).toHaveURL(new RegExp(`/in-production/#${ids[i]}$`));
    await expect(page.locator(`section#${ids[i]}`)).toBeVisible();
    await page.goBack();
  }
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /Rethinking the defaults\s+of production\./,
  );
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.locator("[data-index]").nth(4).click();
  await expect(
    page.getByRole("heading", { name: /Put critical rules/ }),
  ).toBeVisible();
  await page.screenshot({
    path: "artifacts/design-deck-english.png",
    fullPage: true,
  });
});

test("mobile swipe, vertical scrolling and reduced motion preserve usable controls", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("/design-innovation/");
  const poster = page.getByRole("region", {
    name: "设计决策卡片，左右方向键切换",
  });
  await poster.scrollIntoViewIfNeeded();
  await poster.dispatchEvent("pointerdown", {
    pointerType: "touch",
    pointerId: 1,
    clientX: 300,
    clientY: 250,
  });
  await poster.dispatchEvent("pointerup", {
    pointerType: "touch",
    pointerId: 1,
    clientX: 80,
    clientY: 260,
  });
  await expect(page.locator("[data-active-decision]")).toHaveAttribute(
    "data-active-decision",
    "modularity",
  );
  await poster.dispatchEvent("pointerdown", {
    pointerType: "touch",
    pointerId: 2,
    clientX: 150,
    clientY: 250,
  });
  await poster.dispatchEvent("pointerup", {
    pointerType: "touch",
    pointerId: 2,
    clientX: 130,
    clientY: 80,
  });
  await expect(page.locator("[data-active-decision]")).toHaveAttribute(
    "data-active-decision",
    "modularity",
  );
  for (let i = 0; i < 5; i++) {
    await page.locator("[data-index]").nth(i).click();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await expect(page.locator('[data-panel][data-active="true"]')).toHaveCSS(
      "opacity",
      "1",
    );
    await page.evaluate(() => {
      (document.activeElement as HTMLElement)?.blur();
      document
        .querySelectorAll("[data-card-scroll]")
        .forEach((el) => (el.scrollTop = 0));
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    await expect(page.locator("[data-site-header]")).toHaveAttribute(
      "data-in-hero",
      "true",
    );
    await page.screenshot({
      path: `artifacts/design-deck-mobile-${i + 1}.png`,
      fullPage: true,
    });
  }
  await context.close();
});
