import solid from 'vite-plugin-solid'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solid()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/setup-test.ts'],
    deps: {
      optimizer: {
        web: {
          exclude: ['solid-js'],
        },
      },
    },
    coverage: {
      provider: 'v8',
      all: true,
      reporter: ['lcov', 'text'],
      include: ['src/**'],
      exclude: ['**/*.stories.tsx'],
    },
    css: false,
    testTransformMode: {
      web: ['/.[tj]sx$/'],
    },
  },
})
