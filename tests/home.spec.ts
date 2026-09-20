import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
const sizes = [390, 768, 1440];
test("chapter navigation does not masquerade as homepage section links", async ({
  page,
}) => {
  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "章节导航" });
  await expect(
    navigation.getByRole("link", { name: "00 / 项目概览" }),
  ).toHaveAttribute("href", "/");
  await expect(navigation.locator('a[href^="#"]')).toHaveCount(0);
  await expect(navigation.getByRole("link")).toHaveCount(4);
  await expect(navigation).toContainText("系统思考");
  await expect(navigation).toContainText("设计/创新");
  await expect(navigation).toContainText("下一步");
});
for (const width of sizes) {
  test(`static homepage, accessibility and screenshot at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => {
      if (response.status() >= 400)
        errors.push(`${response.status()} ${response.url()}`);
    });
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "WEFT / PPL", exact: true }),
    ).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const canvas = page.getByRole("region", {
      name: "ONE SYSTEM / THREE VIEWS",
    });
    await expect(canvas).toHaveAttribute("data-settled", "true");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    const links = await page
      .getByRole("link")
      .evaluateAll((elements) =>
        elements.map((el) => el.getAttribute("href")!),
      );
    for (const link of links) {
      expect(link).not.toBe("#");
      if (link.startsWith("#")) await expect(page.locator(link)).toHaveCount(1);
    }
    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      axe.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
    await mkdir("artifacts", { recursive: true });
    await page.screenshot({
      path: `artifacts/home-${width}.png`,
      fullPage: true,
    });
    expect(errors).toEqual([]);
  });
}

test("shared graph survives 12 rapid switches, inspection, keyboard and resize", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const region = page.getByRole("region", { name: "ONE SYSTEM / THREE VIEWS" });
  await region.scrollIntoViewIfNeeded();
  const buttons = [
    page.getByRole("button", { name: /01 \/ SYSTEMATIC/ }),
    page.getByRole("button", { name: /02 \/ DESIGN/ }),
    page.getByRole("button", { name: /03 \/ WHAT/ }),
  ];
  for (let i = 0; i < 12; i++) await buttons[i % 3].click();
  await expect(region).toHaveAttribute("data-mode", "extend");
  await expect(region).toHaveAttribute("data-settled", "true");
  expect(await region.locator("[data-hit]").count()).toBe(13);
  await expect(region.locator("[data-production-scene]")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "检查 GOVERNANCE", exact: true }),
  ).toBeVisible();
  await buttons[0].focus();
  await page.keyboard.press("ArrowRight");
  await expect(buttons[1]).toBeFocused();
  await expect(region).toHaveAttribute("data-mode", "transform");
  await page.keyboard.press("End");
  await expect(buttons[2]).toBeFocused();
  await page.keyboard.press("Home");
  await expect(region).toHaveAttribute("data-mode", "overview");
  await expect(region).toHaveAttribute("data-settled", "true");
  const futureOpacity = await region
    .locator('[data-future]')
    .evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity));
  expect(futureOpacity.every((o) => o === "0")).toBeTruthy();
  await page.getByRole("button", { name: "检查 PRODUCT", exact: true }).focus();
  await expect(region.locator("[aria-live]")).toContainText("可以独立交付");
  await page.keyboard.press("Escape");
  await expect(region.locator("[aria-live]")).toContainText(
    "SHARED PRODUCTION MODEL",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await buttons[1].click();
  await expect(region).toHaveAttribute("data-mode", "transform");
  await expect(region).toHaveAttribute("data-settled", "true");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  const modelButtons = region.locator("[data-hit]");
  await expect(modelButtons).toHaveCount(8);
  for(const button of await modelButtons.all()) await expect(button).toBeVisible();
});

test("touch and live reduced-motion changes keep views usable", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173");
  const region = page.getByRole("region", { name: "ONE SYSTEM / THREE VIEWS" });
  await page.getByRole("button", { name: /02 \/ DESIGN/ }).tap();
  await expect(region).toHaveAttribute("data-mode", "transform");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("button", { name: /03 \/ WHAT/ }).tap();
  await expect(region).toHaveAttribute("data-settled", "true");
  await expect(region.locator("canvas")).toHaveCount(0);
  await expect(region.locator("[aria-live]")).toContainText("未来方向");
  await context.close();
});

test("production diagram settles without a continuous background canvas", async ({page})=>{
  await page.goto("/");
  const region=page.locator("#views");
  await region.locator('[data-control="transform"]').click();
  await expect(region).toHaveAttribute("data-settled","true");
  await expect(region.locator("canvas")).toHaveCount(0);
  await expect(region.locator("[data-character-result]")).toHaveCSS("opacity","1");
  await page.evaluate(()=>window.scrollTo({top:0,behavior:"instant"}));
  await region.scrollIntoViewIfNeeded();
  await expect(region).toHaveAttribute("data-mode","transform");
  await expect(region).toHaveAttribute("data-settled","true");
});

test("HTML remains informative without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173");
  await expect(page.getByText("独立变化，也能协同工作。")).toBeVisible();
  await expect(page.getByText(/交互预览需要 JavaScript/)).toBeVisible();
  await page.getByText("查看模型文字说明").click();
  await expect(
    page.getByText("解析：先确定兼容范围，再选择具体版本。", { exact: true }),
  ).toBeVisible();
  await context.close();
});
