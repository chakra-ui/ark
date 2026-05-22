import { createHash } from 'node:crypto'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/react-vite'

const __dirname = dirname(fileURLToPath(import.meta.url))
const stylesDir = resolve(__dirname, '../../../.storybook/modules')

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.tsx', '../src/providers/**/*.stories.tsx'],
  addons: ['@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  typescript: {
    reactDocgen: false,
  },
  viteFinal(config) {
    config.resolve ??= {}
    config.resolve.alias ??= {}
    // @ts-expect-error - alias type mismatch
    config.resolve.alias.styles = stylesDir
    config.css ??= {}
    config.css.modules = {
      ...config.css.modules,
      generateScopedName: (name, filename) => {
        const hash = createHash('md5').update(relative(stylesDir, filename)).digest('hex').slice(0, 5)
        return `_${name}_${hash}`
      },
    }
    return config
  },
}

export default config
