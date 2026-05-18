import type { StorybookConfig } from '@storybook/angular'

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.ts',
    '../avatar/**/*.stories.ts',
    '../progress/**/*.stories.ts',
    '../toggle/**/*.stories.ts',
  ],
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
