import { createHash } from 'node:crypto'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'

import type { StorybookConfig } from 'storybook-solidjs-vite'

const __dirname = dirname(fileURLToPath(import.meta.url))
const stylesDir = resolve(__dirname, '../../../.storybook/modules')

export default {
  framework: 'storybook-solidjs-vite',
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  core: {
    disableTelemetry: true,
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      define: {
        'process.env': {},
      },
      resolve: {
        alias: {
          styles: stylesDir,
        },
      },
      css: {
        modules: {
          generateScopedName: (name: string, filename: string) => {
            const hash = createHash('md5').update(relative(stylesDir, filename)).digest('hex').slice(0, 5)
            return `_${name}_${hash}`
          },
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
