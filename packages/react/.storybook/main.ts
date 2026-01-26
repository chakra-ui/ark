import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/react-vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.tsx'],
  addons: ['@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  typescript: {
    reactDocgen: false,
  },
  viteFinal(config) {
    config.resolve ??= {}
    config.resolve.alias ??= {}
    // @ts-expect-error - alias type mismatch
    config.resolve.alias.styles = resolve(__dirname, '../../../.storybook/modules')
    return config
  },
}

export default config
