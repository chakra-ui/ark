import { resolve } from 'node:path'
import solid from '@solidjs/vite-plugin'
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
      'lucide-solid': resolve(__dirname, 'shims/lucide-solid.tsx'),
    },
  },
})
