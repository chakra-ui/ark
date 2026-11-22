import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

const src = resolve(import.meta.dirname, 'src')

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['src/**/tests/*.test.ts'],
    setupFiles: ['src/setup-test.ts'],
  },
  resolve: {
    alias: [
      { find: 'styles', replacement: resolve(import.meta.dirname, '../../.storybook/modules') },
      { find: /^@ark-ui\/web\/(async-list|hotkeys|locale)$/, replacement: resolve(src, 'utils/$1.ts') },
      { find: /^@ark-ui\/web\/(.+)$/, replacement: resolve(src, 'components/$1/index.ts') },
      { find: /^@ark-ui\/web$/, replacement: resolve(src, 'index.ts') },
    ],
  },
})
