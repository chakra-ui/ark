/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
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
    }),
    react(),
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
        'react/jsx-runtime',
      ],
      output: [
        {
          format: 'cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          entryFileNames: '[name].cjs',
          banner: (x) =>
            ['index.cjs', 'factory.cjs', 'compose-refs.cjs'].includes(x.fileName)
              ? ''
              : `'use client';`,
        },
        {
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          entryFileNames: '[name].mjs',
          banner: (x) =>
            ['index.mjs', 'factory.mjs', 'compose-refs.mjs'].includes(x.fileName)
              ? ''
              : `'use client';`,
        },
      ],
    },
  },
  test: {
    setupFiles: 'src/setup-test.ts',
    coverage: {
      provider: 'v8',
      all: true,
      reporter: ['lcov', 'text'],
      include: ['src/**'],
      exclude: ['**/*.stories.tsx'],
    },
    retry: 2,
    globals: true,
    environment: 'jsdom',
    css: false,
  },
})
