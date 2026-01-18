import { resolve } from 'node:path'
import solid from 'vite-plugin-solid'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  logLevel: 'warn',
  plugins: [solid()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/setup-test.ts'],
    coverage: {
      provider: 'v8',
    },
  },
  resolve: {
    conditions: ['source'],
    alias: {
      styles: resolve(__dirname, '../../.storybook/modules'),
    },
  },
})
