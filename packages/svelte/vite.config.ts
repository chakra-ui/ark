/** biome-ignore-all lint/suspicious/noTsIgnore: fix later */
import { sveltekit } from '@sveltejs/kit/vite'
import { svelteTesting } from '@testing-library/svelte/vite'
import { defineConfig } from 'vite'
import { lucideOptimizeImports } from './src/lib/lucide-optimize'

export default defineConfig({
  plugins: [sveltekit(), svelteTesting({ resolveBrowser: true, autoCleanup: true }), lucideOptimizeImports()],
  // @ts-ignore - Vitest types are not updated
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setup-test.ts'],
    include: ['src/**/*.{test,spec}.{js,ts}'],
    globals: true,
    coverage: {
      provider: 'v8',
    },
  },
})
