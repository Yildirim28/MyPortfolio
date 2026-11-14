import { defineConfig, devices } from "@playwright/test";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const port = 4180;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: "on-first-retry"
  },
  projects: [
    { name: "export-desktop-chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "export-mobile-chromium", use: { ...devices["Pixel 7"] } }
  ],
  webServer: {
    command: `PORT=${port} node scripts/serve-export.mjs`,
    url: `http://127.0.0.1:${port}${basePath || "/"}`,
    reuseExistingServer: false,
    timeout: 30_000
  }
});
