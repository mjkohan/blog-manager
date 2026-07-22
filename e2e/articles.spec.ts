import { expect, test } from "@playwright/test";

test.describe("article list", () => {
  test("paginates via the URL", async ({ page }) => {
    await page.goto("/articles");
    await expect(page.getByRole("heading", { name: "All Posts" })).toBeVisible();

    await page.getByRole("link", { name: "Page 2", exact: true }).click();
    await page.waitForURL("**/articles/page/2");
    await expect(page.getByRole("link", { name: "Page 2", exact: true })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  test("optimistically deletes a row", async ({ page }) => {
    await page.goto("/articles");

    const menu = page.getByRole("button", { name: /^Actions for / }).first();
    const label = (await menu.getAttribute("aria-label")) ?? "";
    const title = label.replace(/^Actions for /, "");

    await menu.click();
    await page.getByRole("menuitem", { name: "Delete" }).click();
    await page.getByRole("dialog").getByRole("button", { name: "Delete" }).click();

    await expect(page.getByText("Article deleted")).toBeVisible();
    await expect(page.getByRole("cell", { name: title })).toHaveCount(0);
  });
});

test("creates an article and returns to the list", async ({ page }) => {
  await page.goto("/articles/create");

  await page.getByLabel("Title").fill("My E2E article");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Article created")).toBeVisible();
  await page.waitForURL("**/articles");
});
