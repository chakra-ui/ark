import solid from 'vite-plugin-solid'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  logLevel: 'warn',
  plugins: [tsconfigPaths({ root: './' }), solid()],
  test: {
    globals: true,
    setupFiles: ['src/setup-test.ts'],
    retry: 2,
    css: false,
  },
})
