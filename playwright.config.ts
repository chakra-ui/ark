import { defineConfig } from '@playwright/test'

const CI = !!process.env.CI

const frameworks = ['react', 'solid', 'svelte', 'vue'] as const
type Framework = (typeof frameworks)[number]

const framework = (process.env.FRAMEWORK ?? 'react') as Framework
if (!frameworks.includes(framework)) {
  throw new Error(`Unknown FRAMEWORK "${framework}". Expected one of: ${frameworks.join(', ')}`)
}

const port = process.env.PORT ?? '6006'

export default defineConfig({
  testDir: './e2e',
  outputDir: './e2e/results',
  testMatch: '*.e2e.ts',
  forbidOnly: CI,
  fullyParallel: true,
  retries: CI ? 1 : 0,
  workers: 2,
  reporter: CI ? [['github'], ['html', { outputFolder: 'e2e/report', open: 'never' }]] : [['list']],
  // A static build: the dev server re-optimizes dependencies on first load and reloads stories mid-test
  webServer: {
    cwd: `./packages/${framework}`,
    command: [
      framework === 'svelte' ? 'bunx svelte-kit sync' : '',
      'bunx storybook build -o storybook-static --quiet',
      `python3 -m http.server ${port} -d storybook-static`,
    ]
      .filter(Boolean)
      .join(' && '),
    url: `http://localhost:${port}/index.json`,
    reuseExistingServer: !CI,
    timeout: 10 * 60_000,
  },
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'retain-on-failure',
    // CHROME points at a local Chrome when the Playwright browser isn't installed
    launchOptions: process.env.CHROME ? { executablePath: process.env.CHROME } : {},
  },
})
