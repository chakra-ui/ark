import type { StorybookConfig } from '@storybook/angular'

const config: StorybookConfig = {
  stories: ['../*/**/*.stories.ts'],
  addons: ['@storybook/addon-a11y'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
}

export default config
