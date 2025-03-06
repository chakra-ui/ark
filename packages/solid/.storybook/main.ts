import { dirname, join } from 'node:path'
import type { StorybookConfig } from 'storybook-solidjs-vite'

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')))
}

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.tsx'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    {
      name: getAbsolutePath('@storybook/addon-essentials'),
      options: { backgrounds: false, actions: false },
    },
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-a11y'),
  ],
  framework: {
    // @ts-ignore
    name: getAbsolutePath('storybook-solidjs-vite'),
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
}

export default config
