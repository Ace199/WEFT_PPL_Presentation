import { test, expect } from "@playwright/test";

test.use({ video: "on" });
test("facts type character by character, pause between labels, and retain accessible text", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const facts = page.locator("section").first().locator("ul");
  await expect(facts).toHaveAttribute("data-typing", "active");
  const labels = facts.locator("li");
  const bounds = await facts.boundingBox();
  await expect(
    labels.first().locator("[data-hero-glyph]:not([data-untyped])").first(),
  ).toBeVisible();
  expect(
    await labels.first().locator("[data-untyped]").count(),
  ).toBeGreaterThan(0);
  await expect(labels.first().locator("[data-glyph-text]")).toHaveText(
    "Maya / Houdini",
  );
  await expect(labels.first().locator("[data-untyped]")).toHaveCount(0);
  await expect(labels.nth(1).locator("[data-hero-glyph]").first()).toBeHidden();
  await expect(labels.first().locator('[data-caret="end"]')).toHaveCount(1);
  await page.screenshot({ path: "artifacts/hero-typewriter-pause.png" });
  const pauseStart = Date.now();
  await expect(
    labels.nth(1).locator("[data-hero-glyph]").first(),
  ).toBeVisible();
  expect(Date.now() - pauseStart).toBeGreaterThan(450);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(facts).toHaveAttribute("data-paused", "true");
  const untyped = await facts.locator("[data-untyped]").count();
  await page.waitForTimeout(350); // Observe stability while offscreen.
  expect(await facts.locator("[data-untyped]").count()).toBe(untyped);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(facts).toHaveAttribute("data-typing", "complete", {
    timeout: 15000,
  });
  await expect(facts.locator("[data-caret], [data-untyped]")).toHaveCount(0);
  expect(await facts.boundingBox()).toEqual(bounds);
  await page.reload();
  await expect(facts).toHaveAttribute("data-typing", "active");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(facts.locator("[data-caret], [data-untyped]")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(facts.locator("[data-caret], [data-untyped]")).toHaveCount(0);
});

test("hero text lens scales nearby glyphs by distance across every left copy block", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const hero = page.locator('[data-motion="hero"]');
  await expect(hero).toHaveAttribute("data-hero-stage", "complete", {
    timeout: 15000,
  });
  await expect(page.locator("ul[data-typing]")).toHaveAttribute(
    "data-typing",
    "complete",
    { timeout: 15000 },
  );
  const section = page.locator("section").first();
  const scaleOf = async (element: import("@playwright/test").Locator) =>
    element.evaluate((node) => {
      const transform = getComputedStyle(node).transform;
      return transform === "none" ? 1 : new DOMMatrix(transform).a;
    });
  for (const selector of [
    '[data-editable="hero.title"]',
    '[data-editable="hero.subtitle"]',
    '[data-editable="hero.description"]',
    "ul",
  ]) {
    const block = section.locator(selector);
    const glyphs = block.locator("[data-hero-glyph]");
    const center = glyphs.nth(2),
      neighbour = glyphs.nth(3),
      far = glyphs.last();
    await page.mouse.move(10, 10);
    await expect.poll(() => scaleOf(center)).toBe(1);
    const original = (await block.boundingBox())!;
    const box = (await center.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await expect.poll(() => scaleOf(center)).toBeGreaterThan(1.2);
    await expect.poll(() => scaleOf(neighbour)).toBeGreaterThan(1.001);
    expect(await scaleOf(center)).toBeGreaterThan(await scaleOf(neighbour));
    expect(await scaleOf(far)).toBe(1);
    expect((await block.boundingBox())!.width).toBe(original.width);
    if (selector.includes("description"))
      await section.screenshot({ path: "artifacts/hero-text-lens.png" });
  }
  await page.mouse.move(10, 10);
  await expect
    .poll(async () =>
      section.locator('[data-hero-glyph][style*="transform"]').count(),
    )
    .toBe(0);
  await page.getByRole("button", { name: "试编辑" }).click();
  const input = page.getByRole("textbox", { name: "Hero 说明", exact: true });
  await input.fill("中文预览，保持完整文本。");
  await expect(
    section.locator('[data-editable="hero.description"]'),
  ).toHaveText("中文预览，保持完整文本。");
  await page.keyboard.press("Escape");
  await expect(
    section.locator('[data-editable="hero.description"] [data-hero-glyph]'),
  ).toHaveCount(12);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const glyph = section.locator("[data-hero-glyph]").first();
  const box = (await glyph.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await expect(glyph).toHaveCSS("transform", "none");
});
for (const width of [390, 768, 1440]) {
  test(`hero gathers actual cells before resolve at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    const hero = page.locator('[data-motion="hero"]');
    await expect(hero).toHaveAttribute("data-hero-stage", /scatter|gather/);
    await expect(hero.locator("canvas")).toHaveCount(1);
    await expect(hero.locator('[data-boot="resolved"]')).toHaveCSS(
      "opacity",
      "0",
    );
    if (width === 1440)
      await hero.screenshot({ path: "artifacts/hero-intro-scatter.png" });
    await expect(hero).toHaveAttribute("data-hero-stage", "clustered");
    await expect(hero.locator("canvas")).toHaveCount(1);
    if (width === 1440)
      await hero.screenshot({ path: "artifacts/hero-intro-clusters.png" });
    await expect(hero).toHaveAttribute("data-hero-stage", "complete");
    for (const line of await hero
      .locator('[data-boot="lines"] path, [data-boot="resolved"] > path')
      .all()) {
      const d = (await line.getAttribute("d"))!;
      expect(d).toContain("C");
      expect(d).not.toMatch(/[Ll]/);
    }
    await expect(hero.locator('[data-boot="points"]')).toHaveCSS(
      "opacity",
      "0",
    );
    await expect(hero.locator('[data-boot="resolved"]')).toHaveCSS(
      "opacity",
      "1",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.locator("footer").scrollIntoViewIfNeeded();
    await hero.scrollIntoViewIfNeeded();
    await expect(hero.locator("canvas")).toHaveCount(1);
    expect(errors).toEqual([]);
    if (width === 1440) {
      const initialFrames = Number(
        await hero.locator("canvas").getAttribute("data-frames"),
      );
      await expect
        .poll(
          async () =>
            Number(await hero.locator("canvas").getAttribute("data-frames")),
          { timeout: 12000 },
        )
        .toBeGreaterThan(initialFrames + 330);
      await hero.screenshot({ path: "artifacts/hero-curves.png" });
      const video = page.video();
      await page.close();
      await video?.saveAs("artifacts/hero-intro.webm");
    }
  });
}

test("hero cancels cleanly for editing and reduced motion", async ({
  page,
}) => {
  await page.goto("/");
  const hero = page.locator('[data-motion="hero"]');
  await expect(hero.locator("canvas")).toHaveCount(1);
  await page.getByRole("button", { name: "试编辑" }).click();
  await expect(hero.locator("canvas")).toHaveCount(0);
  await expect(hero.locator('[data-boot="points"]')).toHaveCSS("opacity", "1");
  await page.keyboard.press("Escape");
  await hero.scrollIntoViewIfNeeded();
  await expect(hero.locator("canvas")).toHaveCount(1);
  await expect(hero).toHaveAttribute("data-hero-stage", "complete");
  await page.reload();
  await expect(hero.locator("canvas")).toHaveCount(1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(hero.locator("canvas")).toHaveCount(0);
  await expect(hero.locator('[data-boot="resolved"]')).toHaveCSS(
    "opacity",
    "1",
  );
  await page.reload();
  await expect(hero.locator("canvas")).toHaveCount(0);
  await expect(hero.locator('[data-boot="points"]')).toHaveCSS("opacity", "1");
});

test("hero breathes without pointer input, lens falls off, and pauses offscreen", async ({
  page,
  browser,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const hero = page.locator('[data-motion="hero"]');
  const canvas = hero.locator("canvas");
  await expect(hero).toHaveAttribute("data-hero-stage", "complete");
  const breath = await canvas.getAttribute("data-breath");
  await expect.poll(() => canvas.getAttribute("data-breath")).not.toBe(breath);
  const clusters = (await canvas.getAttribute("data-cluster-breaths"))!
    .split(",")
    .map(Number);
  expect(clusters).toHaveLength(8);
  expect(Math.max(...clusters) - Math.min(...clusters)).toBeGreaterThan(0.3);
  const hub = hero.locator('[data-hero-hub][cx="560"]');
  await expect(hub).toHaveCSS("filter", "none");
  const baseFill = await hub.evaluate((node) => getComputedStyle(node).fill);
  const box = (await hub.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await expect
    .poll(async () => Number(await canvas.getAttribute("data-max-lens")))
    .toBeGreaterThan(1.8);
  await expect
    .poll(async () => Number(await hub.getAttribute("data-hover-strength")))
    .toBeGreaterThan(0.85);
  expect(await hub.evaluate((node) => getComputedStyle(node).fill)).not.toBe(
    baseFill,
  );
  await expect(hub).not.toHaveCSS("filter", "none");
  expect(
    Math.max(
      ...(await canvas.getAttribute("data-cluster-expansion"))!
        .split(",")
        .map(Number),
    ),
  ).toBeGreaterThan(1.4);
  await hero.screenshot({ path: "artifacts/hero-lens.png" });
  await hero.screenshot({ path: "artifacts/hero-bloom.png" });
  await page.mouse.move(10, 10);
  await expect
    .poll(async () => Number(await canvas.getAttribute("data-max-lens")))
    .toBeLessThan(1.01);
  await expect
    .poll(async () => Number(await hub.getAttribute("data-hover-strength")))
    .toBeLessThan(0.01);
  await expect(hub).toHaveCSS("filter", "none");
  const plainCluster = await hero.locator("svg").evaluate((svg) => {
    const point = new DOMPoint(65, 165).matrixTransform(
      (svg as SVGSVGElement).getScreenCTM()!,
    );
    return { x: point.x, y: point.y };
  });
  await page.mouse.move(plainCluster.x, plainCluster.y);
  await expect
    .poll(async () =>
      hero
        .locator("[data-hero-hub]")
        .evaluateAll((elements) =>
          elements.every(
            (element) => getComputedStyle(element).filter === "none",
          ),
        ),
    )
    .toBe(true);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await expect(hub).not.toHaveCSS("filter", "none");
  const frames = await page.evaluate(async () => {
    const samples: number[] = [];
    let previous = performance.now();
    await new Promise<void>((resolve) => {
      const step = (now: number) => {
        samples.push(now - previous);
        previous = now;
        if (samples.length < 120) requestAnimationFrame(step);
        else resolve();
      };
      requestAnimationFrame(step);
    });
    const values = samples.slice(1).sort((a, b) => a - b);
    return {
      averageFps: 1000 / (values.reduce((a, b) => a + b) / values.length),
      p95FrameMs: values[Math.floor(values.length * 0.95)],
      samples: values.length,
    };
  });
  const { writeFile } = await import("node:fs/promises");
  await writeFile(
    "artifacts/hero-performance.json",
    JSON.stringify(
      {
        date: new Date().toISOString(),
        browser: browser.version(),
        viewport: "1440x1000",
        conditions:
          "Local static server, no CPU/network throttling, video capture enabled, hovering a green hub with bloom; single lab run, not real-user data",
        frames,
      },
      null,
      2,
    ),
  );
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect(canvas).toHaveAttribute("data-running", "false");
  const pausedFrames = await canvas.getAttribute("data-frames");
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
  expect(await canvas.getAttribute("data-frames")).toBe(pausedFrames);
  await hero.scrollIntoViewIfNeeded();
  await expect(canvas).toHaveAttribute("data-running", "true");
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(canvas).toHaveAttribute("data-running", "false");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(hero.locator("canvas")).toHaveCount(0);
  await expect(hub).toHaveCSS("filter", "none");
});
