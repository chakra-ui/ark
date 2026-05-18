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
    alias: {
      '@ark-ui/angular/src/presence': new URL('./src/presence/public-api.ts', import.meta.url).pathname,
      '@ark-ui/angular/src/providers/environment': new URL('./src/providers/environment/public-api.ts', import.meta.url)
        .pathname,
      '@ark-ui/angular/src/providers/locale': new URL('./src/providers/locale/public-api.ts', import.meta.url).pathname,
    },
    conditions: ['source', 'module', 'browser', 'import', 'default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}))
