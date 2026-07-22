import { defineConfig, devices } from "@playwright/test";

const PORT = 3000;
const baseURL = `http://localhost:${PORT}`;

/**
 * Playwright E2E. Runs the real app against DummyJSON (reads are live; writes are
 * simulated + optimistic). A `setup` project logs in once and saves the session
 * cookie to `e2e/.auth/user.json`; the `chromium` project reuses it. Auth-guard
 * specs opt out of that state per-file.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  // Generous timeouts absorb Next dev's cold, per-route compile on first hit.
  timeout: 60_000,
  use: { baseURL, trace: "on-first-retry", navigationTimeout: 45_000 },
  projects: [
    { name: "setup", testMatch: /auth\.setup\.ts/ },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], storageState: "e2e/.auth/user.json" },
      dependencies: ["setup"],
    },
  ],
  webServer: {
    command: "pnpm dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
