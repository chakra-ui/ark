/// <reference types="vitest" />
/// <reference types="vite/client" />

import { svelte } from '@sveltejs/vite-plugin-svelte'
import { globbySync } from 'globby'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      entryRoot: 'src',
      staticImport: true,
      exclude: [
        '**/*.stories.tsx',
        '**/*.test.tsx',
        '**/tests/*',
        '**/stories/*',
        '**/setup-test.ts',
      ],
    }),
    svelte(),
  ],
  test: {
    setupFiles: 'src/setup-test.ts',
    coverage: {
      provider: 'v8',
      all: true,
      reporter: ['lcov', 'text'],
      include: ['src/**'],
      exclude: ['**/*.stories.tsx', '**/*.stories.svelte'],
    },
    globals: true,
    environment: 'jsdom',
    testTransformMode: {
      web: ['/.[tj]sx$/'],
    },
  },
})
