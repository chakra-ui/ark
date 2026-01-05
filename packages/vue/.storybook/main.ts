import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/vue3-vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      docgen: false,
    },
  },
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y'],
  viteFinal(config) {
    config.resolve ??= {}
    config.resolve.alias ??= {}
    // @ts-expect-error - alias type mismatch
    config.resolve.alias['styles'] = resolve(__dirname, '../../../.storybook/modules')
    return config
  },
}

export default config
