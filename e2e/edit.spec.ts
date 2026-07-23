import { expect, test } from "@playwright/test";

test("edits an article from the list and returns", async ({ page }) => {
  await page.goto("/articles");

  // Open the first row's actions menu and follow Edit.
  await page
    .getByRole("button", { name: /^Actions for / })
    .first()
    .click();
  await page.getByRole("menuitem", { name: "Edit" }).click();

  await page.waitForURL("**/articles/edit/**");
  const title = page.getByLabel("Title");
  await expect(title).not.toHaveValue(""); // prefilled from the post

  await title.fill("Edited via E2E");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Article updated")).toBeVisible();
  await page.waitForURL(/\/articles(\/page\/\d+)?$/);
});

test("cancel on the edit form returns to the list", async ({ page }) => {
  await page.goto("/articles");
  await page
    .getByRole("button", { name: /^Actions for / })
    .first()
    .click();
  await page.getByRole("menuitem", { name: "Edit" }).click();
  await page.waitForURL("**/articles/edit/**");

  await page.getByRole("button", { name: "Cancel" }).click();
  await page.waitForURL(/\/articles(\/page\/\d+)?$/);
});
