/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { globbySync } from 'globby'
import path from 'path'
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
          banner: (x) => renderBanner(x.fileName),
        },
        {
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          entryFileNames: '[name].mjs',
          banner: (x) => renderBanner(x.fileName),
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

const renderBanner = (fileName: string) => {
  const file = path.parse(fileName)
  if (isBarrelComponent(file) || isSpecialFile(file)) {
    return ''
  }
  return `'use client';`
}

// e.g Avatar.tsx, Accordion.tsx
const isBarrelComponent = (file: path.ParsedPath) =>
  file.name === file.dir &&
  !['presence', 'environment', 'locale', 'number-format', 'byte-format'].includes(file.dir)

const isSpecialFile = (file: path.ParsedPath) =>
  ['index', 'factory', 'compose-refs'].includes(file.name)
