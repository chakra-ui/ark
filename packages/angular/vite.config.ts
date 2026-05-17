/// <reference types="vitest" />
import angular from '@analogjs/vite-plugin-angular'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => ({
  plugins: [angular()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/setup-test.ts'],
    include: ['**/*.spec.ts', '**/*.spec.mts'],
    coverage: {
      provider: 'v8',
    },
  },
  resolve: {
    conditions: ['source'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}))
