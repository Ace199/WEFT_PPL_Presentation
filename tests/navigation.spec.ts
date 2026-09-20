import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("navigation and separate CTAs open real exported destinations and survive refresh", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400) errors.push(response.url());
  });
  const routes = [
    {
      label: "01 / 系统思考",
      title: "系统思考",
      slug: "systematic-thinking",
      explore: "SYSTEMATIC THINKING",
    },
    {
      label: "02 / 设计/创新",
      title: "设计/创新",
      slug: "design-innovation",
      explore: "DESIGN & INNOVATION",
    },
    {
      label: "03 / 下一步",
      title: "下一步",
      slug: "next",
      explore: "WHAT COMES NEXT",
    },
  ];
  for (const route of routes) {
    await page.goto("/");
    await page
      .getByRole("navigation")
      .getByRole("link", { name: route.label })
      .click();
    await expect(page).toHaveURL(new RegExp(`/${route.slug}/$`));
    await page.reload();
    if (route.slug === "systematic-thinking") {
      await expect(page.getByRole("heading", { level: 1 })).toContainText(
        "动画生产",
      );
      await expect(
        page.getByRole("heading", { name: "内容尚未开放" }),
      ).toHaveCount(0);
      await page.getByRole("link", { name: "WEFT / PPL", exact: true }).click();
    } else {
      await expect(
        page.getByRole("heading", { name: route.title, exact: true }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "内容尚未开放" }),
      ).toBeVisible();
      await page.getByRole("link", { name: "返回首页" }).click();
    }
    await expect(page).toHaveURL("http://127.0.0.1:4173/");
    await page
      .getByRole("button", {
        name: new RegExp(route.explore.replace("&", "&")),
      })
      .click();
    await expect(page).toHaveURL("http://127.0.0.1:4173/");
    await page.getByRole("link", { name: `EXPLORE ${route.explore}` }).click();
    await expect(page).toHaveURL(new RegExp(`/${route.slug}/$`));
  }
  await page.goto("/");
  await page
    .getByRole("link", { name: /HOW IT WORKS IN PRODUCTION/ })
    .first()
    .click();
  await expect(page).toHaveURL(/\/evidence\/$/);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "内容尚未开放" }),
  ).toBeVisible();
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(axe.violations).toEqual([]);
  await page.screenshot({ path: "artifacts/evidence-unavailable.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await expect(page.getByRole("link", { name: "返回首页" })).toBeVisible();
  expect(errors).toEqual([]);
});
