import { copyFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { globbySync } from 'globby'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'
import pkg from './package.json'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  logLevel: 'warn',
  plugins: [
    dts({
      entryRoot: 'src',
      staticImport: true,
      exclude: ['**/*.stories.*', '**/*.test.*', '**/tests/*', '**/examples/*', '**/setup-test.ts'],
      afterBuild: () => {
        globbySync(['dist/**/*.d.ts', 'dist/**.d.ts']).forEach((file) => {
          copyFileSync(file, file.replace(/\.d\.ts$/, '.d.cts'))
        })
      },
    }),
    Vue(),
    VueJsx(),
  ],
  test: {
    setupFiles: 'src/setup-test.ts',
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
    },
    testTransformMode: {
      web: ['/.[tj]sx$/'],
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      entry: globbySync(['src/**/index.ts', 'src/components/anatomy.ts']),
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      external: [...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.peerDependencies ?? {})],
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
  resolve: {
    conditions: ['source'],
    alias: {
      styles: path.resolve(__dirname, '../../.storybook/modules'),
    },
  },
})
