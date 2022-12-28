/// <reference types="vitest" />
/// <reference types="vite/client" />

import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    dts({
      skipDiagnostics: true,
      entryRoot: 'src',
      staticImport: true,
    }),
    Vue(),
    VueJsx(),
  ],
  test: {
    setupFiles: 'src/setup-test.ts',
    coverage: {
      all: true,
      reporter: ['lcov', 'text'],
      include: ['src/**'],
      exclude: ['**/*.stories.tsx'],
    },
    globals: true,
    environment: 'jsdom',
    transformMode: {
      web: [/.[tj]sx$/],
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.mjs' : 'index.cjs'),
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies ?? {}),
        ...Object.keys(pkg.peerDependencies ?? {}),
        'vue',
      ],
      output: [
        {
          format: 'cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          entryFileNames: '[name].cjs',
        },
        {
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          entryFileNames: '[name].mjs',
        },
      ],
    },
  },
})
