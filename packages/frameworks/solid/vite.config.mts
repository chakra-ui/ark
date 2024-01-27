import solid from 'vite-plugin-solid'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solid()],
  test: {
    globals: true,
    setupFiles: ['src/setup-test.ts'],
    coverage: {
      provider: 'v8',
      all: true,
      reporter: ['lcov', 'text'],
      include: ['src/**'],
      exclude: ['**/*.stories.tsx'],
    },
    css: false,
  },
})
