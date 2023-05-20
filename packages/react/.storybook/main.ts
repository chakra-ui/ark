import type { StorybookConfig } from '@storybook/react-vite'
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: { backgrounds: false, outline: false, actions: false },
    },
    {
      name: '@storybook/addon-a11y',
    },
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
}
export default config
