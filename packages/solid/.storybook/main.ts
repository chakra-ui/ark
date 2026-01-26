import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'

import type { StorybookConfig } from 'storybook-solidjs-vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default {
  framework: 'storybook-solidjs-vite',
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  async viteFinal(config) {
    return mergeConfig(config, {
      define: {
        'process.env': {},
      },
      resolve: {
        alias: {
          styles: resolve(__dirname, '../../../.storybook/modules'),
        },
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
