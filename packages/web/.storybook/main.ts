import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/html-vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  framework: { name: '@storybook/html-vite', options: {} },
  stories: ['../stories/**/*.stories.ts'],
  addons: ['@storybook/addon-a11y'],
  staticDirs: [{ from: '../tests/fixtures', to: '/test-fixtures' }],
  core: { disableTelemetry: true },
  viteFinal(config) {
    config.resolve ??= {}
    const aliases = config.resolve.alias
    config.resolve.alias = [
      ...(Array.isArray(aliases)
        ? aliases
        : Object.entries(aliases ?? {}).map(([find, replacement]) => ({ find, replacement }))),
      { find: 'styles', replacement: resolve(__dirname, '../../../.storybook/modules') },
    ]
    return config
  },
}

export default config
