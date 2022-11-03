/// <reference types="vitest" />
/// <reference types="vite/client" />

import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [Vue()],
  test: {
    coverage: {
      all: true,
      reporter: ['lcov', 'text'],
    },
    globals: true,
    environment: 'jsdom',
  },
})
