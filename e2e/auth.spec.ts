import { expect, test } from "@playwright/test";

// Run these unauthenticated (ignore the saved session).
test.use({ storageState: { cookies: [], origins: [] } });

test("redirects an unauthenticated visitor to /login", async ({ page }) => {
  await page.goto("/articles");
  await page.waitForURL("**/login");
  await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
});

test("rejects bad credentials with an error toast", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Username").fill("emilys");
  await page.getByLabel("Password").fill("wrong-password");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByText("Sign-in Failed!")).toBeVisible();
});
