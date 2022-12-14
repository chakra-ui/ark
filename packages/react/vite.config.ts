/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

// see https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      tsConfigFilePath: 'tsconfig.build.json',
    }),
    react(),
  ],
  build: {
    target: 'esnext',
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.esm.js' : 'index.cjs.js'),
    },
    rollupOptions: {
      external: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)],
    },
  },
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
    css: false,
  },
})
