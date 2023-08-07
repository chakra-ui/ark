import { recipes } from '@/theme/recipes'
import { defineConfig } from '@pandacss/dev'
import { ContainerProperties } from 'panda/patterns'

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.tsx'],
  presets: ['@pandacss/dev/presets', '@park-ui/presets'],
  outdir: 'panda',
  jsxFramework: 'react',
  theme: {
    extend: {
      recipes,
    },
  },
  patterns: {
    extend: {
      container: {
        transform(props: ContainerProperties) {
          return {
            position: 'relative',
            width: '100%',
            maxWidth: '7xl',
            mx: 'auto',
            paddingX: { base: '4', md: '6' },
            ...props,
          }
        },
      },
    },
  },
})
