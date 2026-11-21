import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/html-vite'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = resolve(__dirname, '../src')

const config: StorybookConfig = {
  framework: { name: '@storybook/html-vite', options: {} },
  stories: ['../src/components/**/*.stories.ts'],
  addons: ['@storybook/addon-a11y'],
  core: { disableTelemetry: true },
  viteFinal(config) {
    config.resolve ??= {}
    const aliases = config.resolve.alias
    config.resolve.alias = [
      ...(Array.isArray(aliases)
        ? aliases
        : Object.entries(aliases ?? {}).map(([find, replacement]) => ({ find, replacement }))),
      { find: 'styles', replacement: resolve(__dirname, '../../../.storybook/modules') },
      { find: /^@ark-ui\/web\/(async-list|locale)$/, replacement: resolve(src, 'utils/$1.ts') },
      { find: /^@ark-ui\/web\/(.+)$/, replacement: resolve(src, 'components/$1/index.ts') },
      { find: /^@ark-ui\/web$/, replacement: resolve(src, 'index.ts') },
    ]
    return config
  },
}

export default config
