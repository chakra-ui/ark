import type { StorybookConfig } from '@storybook/sveltekit'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
  framework: '@storybook/sveltekit',
  addons: ['@storybook/addon-a11y'],
  core: {
    disableTelemetry: true,
  },
}

export default config
