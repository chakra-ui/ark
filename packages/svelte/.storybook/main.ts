import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/sveltekit'

const __dirname = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
  framework: '@storybook/sveltekit',
  addons: ['@storybook/addon-a11y'],
  core: {
    disableTelemetry: true,
  },
  viteFinal(config) {
    config.resolve ??= {}
    config.resolve.alias ??= {}
    // @ts-expect-error - alias type mismatch
    config.resolve.alias['styles'] = resolve(__dirname, '../../../.storybook/modules')
    return config
  },
}

export default config
