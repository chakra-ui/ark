import { mergeConfig } from 'vite'

import type { StorybookConfig } from 'storybook-solidjs-vite'

export default {
  framework: 'storybook-solidjs-vite',
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  async viteFinal(config) {
    return mergeConfig(config, {
      define: {
        'process.env': {},
      },
    })
  },
  docs: {
    autodocs: false,
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop: Record<string, any>) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
} as StorybookConfig
