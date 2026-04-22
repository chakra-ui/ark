import { defineConfig } from '@pandacss/dev'
import typographyPreset from 'pandacss-preset-typography'
import { parkPreset } from '~/theme'

export default defineConfig({
  preflight: true,
  validation: 'none',
  presets: [
    parkPreset,
    typographyPreset({
      recipe: {
        sizes: ['base'],
        notProse: true,
      },
    }),
  ],
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  jsxFramework: 'react',
  outdir: 'styled-system',
  patterns: {
    extend: {
      container: {
        transform(props: Record<string, unknown>) {
          return {
            position: 'relative',
            width: '100%',
            maxW: '8xl',
            mx: 'auto',
            px: { base: '4', md: '8' },
            ...props,
          }
        },
      },
    },
  },
  staticCss: {
    recipes: {
      code: [{ size: ['*'] }],
      drawer: ['*'],
      dialog: ['*'],
      popover: ['*'],
      hoverCard: ['*'],
      tooltip: ['*'],
      menu: ['*'],
      tour: ['*'],
    },
  },
})
