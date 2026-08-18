import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/sveltekit'

const __dirname = dirname(fileURLToPath(import.meta.url))

const VIRTUAL_MODULE_PREFIX = 'virtual-module:'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
  framework: '@storybook/sveltekit',
  addons: ['@storybook/addon-a11y'],
  core: {
    disableTelemetry: true,
  },
  viteFinal(config) {
    config.resolve ??= {}
    config.resolve.alias ??= {}
    config.resolve.alias['styles'] = resolve(__dirname, '../../../.storybook/modules')

    config.optimizeDeps ??= {}
    if (!config.optimizeDeps.rolldownOptions) {
      config.optimizeDeps.rolldownOptions = {}
    }
    const rolldownOptions = config.optimizeDeps.rolldownOptions
    const prior = rolldownOptions.plugins
    const priorPlugins = Array.isArray(prior) ? [...prior] : prior ? [prior] : []
    rolldownOptions.plugins = [
      ...priorPlugins,
      {
        name: 'storybook:svelte-dep-scan-resolve',
        resolveId(source: string, importer: string | undefined) {
          if (!source.endsWith('.svelte') || !importer || !source.startsWith('.')) {
            return
          }
          if (importer.startsWith(VIRTUAL_MODULE_PREFIX)) {
            const realPath = importer.slice(VIRTUAL_MODULE_PREFIX.length).replace(/\?.*$/, '')
            return {
              id: resolve(dirname(realPath), source),
              external: true,
            }
          }
        },
      },
    ]

    return config
  },
}

export default config
