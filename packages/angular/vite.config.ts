/// <reference types="vitest" />
import angular from '@analogjs/vite-plugin-angular'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [angular()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/setup-test.ts'],
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
    },
  },
  resolve: {
    conditions: ['source'],
  },
})
