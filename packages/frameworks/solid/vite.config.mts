/// <reference types="vitest" />
/// <reference types="vite/client" />

import { globbySync } from 'globby'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import solid from 'vite-plugin-solid'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      entryRoot: 'src',
      staticImport: true,
    }),
    // solid({ solid: { generate: 'ssr', hydratable: true } }),
    solid(),
  ],
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      entry: globbySync('src/**/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.mjs' : 'index.cjs'),
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies ?? {}),
        ...Object.keys(pkg.peerDependencies ?? {}),
        'solid-js',
        'solid-js/web',
        'solid-js/store',
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
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setup-test.ts',
    deps: {
      registerNodeLoader: false,
    },
    coverage: {
      provider: 'v8',
      all: true,
      reporter: ['lcov', 'text'],
      include: ['src/**'],
      exclude: ['**/*.stories.tsx'],
    },
    css: false,
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
})
