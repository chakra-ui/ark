import react from '@vitejs/plugin-react'
import { globbySync } from 'globby'
import { copyFileSync } from 'node:fs'
import path from 'node:path'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'
import pkg from './package.json'

export default defineConfig({
  logLevel: 'warn',
  plugins: [
    dts({
      entryRoot: 'src',
      staticImport: true,
      exclude: [
        '**/*.stories.tsx',
        '**/*.test.tsx',
        '**/tests/*',
        '**/examples/*',
        '**/setup-test.ts',
      ],
      afterBuild: () => {
        globbySync(['dist/**/*.d.ts', 'dist/**.d.ts']).map((file) => {
          copyFileSync(file, file.replace(/\.d\.ts$/, '.d.cts'))
        })
      },
    }),
    react(),
  ],
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      entry: globbySync(['src/**/index.ts', 'src/components/anatomy.ts']),
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      logLevel: 'silent',
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
          entryFileNames: '[name].js',
          banner: (x) => renderBanner(x.fileName),
        },
      ],
    },
  },
  test: {
    setupFiles: 'src/setup-test.ts',
    retry: 2,
    globals: true,
    environment: 'jsdom',
    css: false,
  },
  resolve: {
    conditions: ['source'],
  },
})

const renderBanner = (fileName: string) => {
  const file = path.parse(fileName)
  if (['portal', 'frame', 'client-only', 'focus-trap'].includes(file.name)) {
    return `'use client';`
  }
  if (isBarrelComponent(file) || isSpecialFile(file)) {
    return ''
  }
  return `'use client';`
}

// e.g Avatar.tsx, Accordion.tsx
const isBarrelComponent = (file: path.ParsedPath) =>
  file.dir.endsWith(file.name) && !['presence', 'environment', 'locale'].includes(file.dir)

const isSpecialFile = (file: path.ParsedPath) =>
  ['index', 'factory', 'anatomy', 'compose-refs', 'collection'].includes(file.name)
