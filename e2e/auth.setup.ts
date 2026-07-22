import { expect, test as setup } from "@playwright/test";

const authFile = "e2e/.auth/user.json";

/** Log in with the demo user once and persist the session cookie for other specs. */
setup("authenticate", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Username").fill("emilys");
  await page.getByLabel("Password").fill("emilyspass");
  await page.getByRole("button", { name: "Sign in" }).click();

  await page.waitForURL("**/articles");
  await expect(page.getByRole("heading", { name: "All Posts" })).toBeVisible();

  await page.context().storageState({ path: authFile });
});
