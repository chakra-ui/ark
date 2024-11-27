import type { StorybookConfig } from '@storybook/sveltekit'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
  framework: '@storybook/sveltekit',
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: { backgrounds: false, controls: false, actions: false },
    },
    '@storybook/addon-a11y',
  ],
  core: {
    disableTelemetry: true,
  },
  docs: {
    autodocs: false,
  },
}

export default config
