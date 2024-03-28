import type { StorybookConfig } from '@storybook/svelte-vite'
import path from 'path'

const getAbsolutePath = (value: string): any => {
  return path.dirname(require.resolve(path.join(value, 'package.json')))
}

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-a11y'),
    // getAbsolutePath('@storybook/addon-svelte-csf'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/svelte-vite'),
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
}
export default config
