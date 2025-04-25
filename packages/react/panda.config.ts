import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  preflight: true,

  include: ['./src/components/*/examples/**/*.{ts,tsx}'],
  exclude: [],

  jsxFramework: 'react',
  staticCss: {
    recipes: '*',
  },
  importMap: '@ark-ui/design-system',
  presets: ['@pandacss/preset-panda', '@ark-ui/design-system'],
})
