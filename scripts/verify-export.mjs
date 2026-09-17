import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { writeFile, mkdir } from "node:fs/promises";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const port = "4174";
const server = spawn(process.execPath, ["scripts/serve.mjs"], {
  env: { ...process.env, PORT: port },
  stdio: ["ignore", "pipe", "inherit"],
  windowsHide: true,
});
let browser;
try {
  await new Promise((resolve, reject) => {
    server.stdout.once("data", resolve);
    server.once("error", reject);
    server.once("exit", (code) =>
      reject(new Error(`Static server exited ${code}`)),
    );
  });
  browser = await chromium.launch({ channel: "msedge" });
  const page = await browser.newPage();
  const failures = [];
  const resources = [];
  page.on("pageerror", (error) => failures.push(error.message));
  page.on("response", (response) => {
    resources.push(response.url());
    if (response.status() >= 400)
      failures.push(`${response.status()} ${response.url()}`);
  });
  const url = `http://127.0.0.1:${port}${basePath}/`;
  await page.goto(url);
  await page.getByRole("button", { name: /03 \/ WHAT/ }).click();
  await page
    .getByRole("link", { name: /VIEW EVIDENCE/ })
    .first()
    .click();
  await page.reload();
  await page.getByRole("heading", { name: "内容尚未开放" }).waitFor();
  await page.getByRole("link", { name: "返回首页" }).click();
  await page.getByRole("button", { name: /01 \/ SYSTEMATIC/ }).click();
  await page.waitForFunction(
    () =>
      document.querySelector("#views")?.getAttribute("data-settled") === "true",
  );
  const links = await page
    .getByRole("navigation")
    .getByRole("link")
    .evaluateAll((items) =>
      items.map((item) => item.getAttribute("href")).slice(1),
    );
  for (const link of links) {
    await page.goto(`http://127.0.0.1:${port}${link}`);
    await page.reload();
    await page.getByRole("heading", { name: "内容尚未开放" }).waitFor();
    if (
      (await page
        .getByRole("link", { name: "返回首页" })
        .getAttribute("href")) !== `${basePath}/`
    )
      failures.push("Return-home link escaped base path.");
  }
  if (
    !resources.every((resource) =>
      new URL(resource).pathname.startsWith(basePath + "/"),
    )
  )
    failures.push("A resource escaped the configured base path.");
  const result = {
    basePath,
    url,
    resourceCount: resources.length,
    failures,
    refresh: "passed",
    interactionAfterRefresh: "passed",
    chapterDestinations: "passed",
    deployment: "not performed",
  };
  await mkdir("artifacts", { recursive: true });
  await writeFile(
    `artifacts/export-${basePath ? "subpath" : "root"}.json`,
    JSON.stringify(result, null, 2),
  );
  if (failures.length) throw new Error(failures.join("\n"));
  console.log(JSON.stringify(result));
} finally {
  await browser?.close();
  server.kill();
}
