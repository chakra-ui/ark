/// <reference types="vitest" />
/// <reference types="vite/client" />

import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { globbySync } from 'globby'
import { copyFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

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
      afterBuild: () => {
        globbySync(['dist/**/*.d.ts', 'dist/**.d.ts']).map((file) => {
          copyFileSync(file, file.replace(/\.d\.ts$/, '.d.cts'))
        })
      },
    }),
    Vue(),
    VueJsx(),
  ],
  test: {
    setupFiles: 'src/setup-test.ts',
    coverage: {
      provider: 'v8',
      all: true,
      reporter: ['lcov', 'text'],
      include: ['src/**'],
      exclude: ['**/*.stories.tsx'],
    },
    globals: true,
    environment: 'jsdom',
    testTransformMode: {
      web: ['/.[tj]sx$/'],
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      entry: globbySync('src/**/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
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
          entryFileNames: '[name].js',
        },
      ],
    },
  },
})
