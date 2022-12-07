/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setup-test.ts',
    coverage: {
      all: true,
      reporter: ['lcov', 'text'],
      include: ['src/**'],
      exclude: ['**/*.stories.tsx'],
    },
    css: false,
  },
  plugins: [solid()],
  resolve: {
    conditions: ['development', 'browser'],
  },
})
