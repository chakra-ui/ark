import { defineConfig } from '@playwright/test'

const port = 6017
const CI = !!process.env.CI

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  workers: 2,
  reporter: 'list',
  webServer: {
    command: `bun run build:storybook --quiet && bun build tests/fixtures/register.ts --target browser --outfile storybook-static/test-fixtures/register.js && python3 -m http.server ${port} -d storybook-static`,
    url: `http://localhost:${port}/index.json`,
    reuseExistingServer: !CI,
    timeout: 180_000,
  },
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'retain-on-failure',
    launchOptions: process.env.CHROME ? { executablePath: process.env.CHROME } : {},
  },
})
