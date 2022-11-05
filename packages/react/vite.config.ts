/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: './src/setupTest.ts',
    coverage: {
      all: true,
      reporter: ['lcov', 'text'],
    },
    globals: true,
    environment: 'jsdom',
    css: false,
  },
})
