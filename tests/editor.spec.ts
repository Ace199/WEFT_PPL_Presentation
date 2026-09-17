import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { home, editableFields } from "../src/content/home";
import { readFile } from "node:fs/promises";

for (const width of [390, 768, 1440]) {
  test(`temporary editor works with keyboard and readable layout at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.getByRole("button", { name: "试编辑" }).click();
    const panel = page.getByRole("complementary", { name: "临时内容编辑" });
    const input = page.getByRole("textbox", { name: "Hero 说明", exact: true });
    await expect(input).toBeFocused();
    await input.fill("让独立的成果，连接成共同的制作。");
    await expect(page.locator('[data-editable="hero.description"]')).toHaveText(
      "让独立的成果，连接成共同的制作。",
    );
    await page.getByRole("button", { name: "定位页面文案" }).click();
    const panelBox = (await panel.boundingBox())!;
    const textBox = (await page
      .locator('[data-editable="hero.description"]')
      .boundingBox())!;
    expect(textBox.y).toBeGreaterThanOrEqual(panelBox.y + panelBox.height);
    expect(textBox.y + textBox.height).toBeLessThanOrEqual(
      width === 390 ? 844 : 1000,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      axe.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
    await page.screenshot({ path: `artifacts/editor-${width}.png` });
    await input.focus();
    await page.keyboard.press("Escape");
    await expect(panel).toHaveCount(0);
    await expect(page.getByRole("button", { name: "试编辑" })).toBeFocused();
    await expect(page.getByRole("status")).toContainText(
      "临时预览，刷新后恢复",
    );
    await page.getByRole("button", { name: "试编辑" }).click();
    await expect(input).toHaveValue("让独立的成果，连接成共同的制作。");
    await page.getByRole("button", { name: "恢复此字段" }).click();
    await expect(input).toHaveValue(home.hero.description);
    await input.fill("尚未正式保存");
    await page.getByLabel("选择字段").selectOption("summary.title");
    await page
      .getByRole("textbox", { name: "系统摘要标题" })
      .fill("另一种标题");
    await page.getByRole("button", { name: "恢复全部" }).click();
    await expect(page.locator('[data-editable="hero.description"]')).toHaveText(
      home.hero.description,
    );
    await expect(page.locator('[data-editable="summary.title"]')).toHaveText(
      home.summary.title,
    );
    await page
      .getByRole("textbox", { name: "系统摘要标题" })
      .fill("刷新后消失");
    await page.reload();
    await expect(page.locator('[data-editable="summary.title"]')).toHaveText(
      home.summary.title,
    );
    await expect(panel).toHaveCount(0);
  });
}

test("diff whitelist, empty text, quotes, newlines and clipboard failure fallback", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: async () => {
          throw new Error("Clipboard denied");
        },
      },
    });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "试编辑" }).click();
  const value =
    '第一行 "引号"\n第二行 <img src=x onerror=alert(1)> & <script>window.injected=1</script>';
  await page.getByRole("textbox", { name: "Hero 说明" }).fill(value);
  await page.getByLabel("选择字段").selectOption("hero.subtitle");
  await page.getByRole("textbox", { name: "Hero 副标题" }).fill("");
  await page.getByLabel("选择字段").selectOption("summary.title");
  await page.getByRole("textbox", { name: "系统摘要标题" }).fill("临时");
  await page
    .getByRole("textbox", { name: "系统摘要标题" })
    .fill(home.summary.title);
  await page.getByRole("button", { name: "复制修改清单" }).click();
  await expect(page.getByRole("status")).toContainText("复制失败");
  const output = page.getByRole("textbox", {
    name: "修改清单（可手动选择复制）",
  });
  const data = JSON.parse(await output.inputValue());
  expect(data).toEqual({
    schemaVersion: 1,
    source: "src/content/home.ts",
    changes: [
      {
        fieldId: "hero.subtitle",
        label: "Hero 副标题",
        original: home.hero.subtitle,
        modified: "",
      },
      {
        fieldId: "hero.description",
        label: "Hero 说明",
        original: home.hero.description,
        modified: value,
      },
    ],
  });
  expect(
    await page.locator('[data-editable="hero.description"]').textContent(),
  ).toBe(value);
  await expect(page.locator('[data-editable="hero.subtitle"]')).toBeEmpty();
  await expect(
    page.locator(
      '[data-editable="hero.description"] img, [data-editable="hero.description"] script',
    ),
  ).toHaveCount(0);
  const ids = await page
    .getByLabel("选择字段")
    .locator("option")
    .evaluateAll((options) =>
      options.map((option) => (option as HTMLOptionElement).value),
    );
  expect(ids.sort()).toEqual(Object.keys(editableFields).sort());
  await page.getByRole("button", { name: "恢复全部" }).click();
  await page.getByRole("button", { name: "复制修改清单" }).click();
  await expect(page.getByRole("status")).toHaveText("暂无实际修改。");
});

test("successful copy uses current diff and does not claim publishing", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "试编辑" }).click();
  await page.getByRole("textbox", { name: "Hero 说明" }).fill("待维护者核对");
  await page.getByRole("button", { name: "复制修改清单" }).click();
  await expect(page.getByRole("status")).toHaveText(
    "已复制修改清单；尚未保存或发布。",
  );
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(JSON.parse(copied).changes[0].modified).toBe("待维护者核对");
});

test("two pages are isolated; no persistence or writes; graph view survives editing", async ({
  context,
  page,
}) => {
  await page.goto("/");
  const second = await context.newPage();
  await second.goto("/");
  const writes: string[] = [];
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (!["GET", "HEAD"].includes(request.method())) writes.push(request.url());
  });
  await page.evaluate(() => {
    const fail = () => {
      throw new Error("Persistence is forbidden");
    };
    Storage.prototype.setItem = fail;
    indexedDB.open = fail;
    Object.defineProperty(document, "cookie", {
      get: () => "",
      set: fail,
      configurable: true,
    });
  });
  await page.getByRole("button", { name: /03 \/ WHAT/ }).click();
  const region = page.getByRole("region", { name: "ONE SYSTEM / THREE VIEWS" });
  await expect(region).toHaveAttribute("data-mode", "extend");
  await page.getByRole("button", { name: "试编辑" }).click();
  await page.getByRole("textbox", { name: "Hero 说明" }).fill("仅本页面可见");
  await expect(region).toHaveAttribute("data-mode", "extend");
  await expect(region.locator("canvas")).toHaveCount(0);
  await expect(second.locator('[data-editable="hero.description"] [data-glyph-text]')).toHaveText(
    home.hero.description,
  );
  await page.getByRole("button", { name: "关闭编辑面板" }).click();
  await expect(region).toHaveAttribute("data-mode", "extend");
  expect(writes).toEqual([]);
  expect(errors).toEqual([]);
  const storage = await page.evaluate(() => ({
    local: localStorage.length,
    session: sessionStorage.length,
  }));
  expect(storage).toEqual({ local: 0, session: 0 });
  expect(await context.cookies()).toEqual([]);
  const html = await readFile("out/index.html", "utf8");
  expect(html).toContain(home.hero.description);
  expect(html).not.toContain("仅本页面可见");
  await second.close();
});

test("touch editor preserves composition events and keyboard entry", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173");
  await page.getByRole("button", { name: "试编辑" }).tap();
  const input = page.getByRole("textbox", { name: "Hero 说明" });
  await input.tap();
  await input.dispatchEvent("compositionstart", { data: "" });
  await input.fill("中文输入，保留标点。");
  await input.dispatchEvent("compositionend", { data: "中文输入，保留标点。" });
  await page.keyboard.press("End");
  await page.keyboard.press("Enter");
  await page.keyboard.insertText("第二行");
  expect(
    await page.locator('[data-editable="hero.description"]').textContent(),
  ).toBe("中文输入，保留标点。\n第二行");
  await page.getByRole("button", { name: "关闭编辑面板" }).tap();
  await page.getByRole("button", { name: "恢复全部" }).tap();
  await expect(page.locator('[data-editable="hero.description"] [data-glyph-text]')).toHaveText(
    home.hero.description,
  );
  await context.close();
});
