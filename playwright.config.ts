import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  webServer: {
    command: "npm run dev -- --host 127.0.0.1",
    url: "http://127.0.0.1:8080/",
    reuseExistingServer: true,
  },
  fullyParallel: true,
  forbidOnly: Boolean(process.env["CI"]),
  retries: 0,
  use: {
    baseURL: process.env["TEST_URL"] ?? "http://127.0.0.1:8080/",
    viewport: { width: 1440, height: 1000 },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
});
