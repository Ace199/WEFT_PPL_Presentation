import { test, expect } from "@playwright/test";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { cpus, platform, release } from "node:os";

test("record local static-server web vitals and animated frame timing", async ({
  page,
  browser,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const library = await readFile(
    "node_modules/web-vitals/dist/web-vitals.iife.js",
    "utf8",
  );
  await page.addInitScript({
    content: `${library}\nwindow.__metrics={};['onLCP','onCLS','onINP','onFCP','onTTFB'].forEach(name=>webVitals[name](metric=>{window.__metrics[metric.name]=metric.value},{reportAllChanges:true}));`,
  });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as unknown as { __metrics: Record<string, number> }).__metrics
            .LCP || 0,
      ),
    )
    .toBeGreaterThan(0);
  const region = page.getByRole("region", { name: "ONE SYSTEM / THREE VIEWS" });
  await region.scrollIntoViewIfNeeded();
  const names = [/01 \/ SYSTEMATIC/, /02 \/ DESIGN/];
  for (const name of names) await page.getByRole("button", { name }).click();
  await expect(region).toHaveAttribute("data-settled", "true");
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as unknown as { __metrics: Record<string, number> }).__metrics
            .INP || 0,
      ),
    )
    .toBeGreaterThan(0);
  const frames = await page.evaluate(async () => {
    const times: number[] = [];
    let previous = performance.now();
    const controls = [
      ...document.querySelectorAll<HTMLButtonElement>("[data-control]"),
    ];
    await new Promise<void>((resolve) => {
      const frame = (now: number) => {
        times.push(now - previous);
        previous = now;
        if (times.length % 12 === 0)
          controls[(times.length / 12) % controls.length].click();
        if (times.length < 120) requestAnimationFrame(frame);
        else resolve();
      };
      requestAnimationFrame(frame);
    });
    const sorted = times.slice(1).sort((a, b) => a - b);
    return {
      sampleFrames: sorted.length,
      averageFps: 1000 / (sorted.reduce((a, b) => a + b, 0) / sorted.length),
      p95FrameMs: sorted[Math.floor(sorted.length * 0.95)],
      over33ms: sorted.filter((t) => t > 33.4).length,
    };
  });
  const metrics = await page.evaluate(
    () =>
      (window as unknown as { __metrics: Record<string, number> }).__metrics,
  );
  const resources = await page.evaluate(() =>
    (
      performance.getEntriesByType("resource") as PerformanceResourceTiming[]
    ).map((r) => ({
      name: r.name.replace(location.origin, ""),
      bytes: r.encodedBodySize,
    })),
  );
  const result = {
    date: new Date().toISOString(),
    environment: {
      browser: browser.version(),
      os: `${platform()} ${release()}`,
      cpu: cpus()[0].model,
      viewport: "1440 × 1000",
      network:
        "loopback; no network or CPU throttling; fresh browser context; static out/ server",
      reducedMotion: false,
    },
    metrics,
    frames,
    resources,
    limitations:
      "One lab run; not field data. INP is from scripted pointer interactions. Hidden-document test uses a simulated visibility event; no physical device or OS tab-switch validation.",
  };
  await mkdir("artifacts", { recursive: true });
  await writeFile(
    "artifacts/performance.json",
    JSON.stringify(result, null, 2),
  );
  for (let i = 0; i < names.length; i++) {
    await page.getByRole("button", { name: names[i] }).click();
    await expect(region).toHaveAttribute("data-settled", "true");
    await region.screenshot({
      path: `artifacts/view-${["organize", "transform"][i]}.png`,
    });
  }
  expect(metrics.LCP).toBeLessThan(2500);
  expect(metrics.CLS ?? 0).toBeLessThan(0.1);
  expect(metrics.INP).toBeLessThan(200);
});
