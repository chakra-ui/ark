import solid from 'vite-plugin-solid'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  logLevel: 'warn',
  plugins: [solid()],
  test: {
    globals: true,
    setupFiles: ['src/setup-test.ts'],
    retry: 0,
    css: false,
  },
  resolve: {
    conditions: ['source'],
  },
})
