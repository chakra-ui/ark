import { defineConfig } from '@pandacss/dev'
import type { ContainerProperties } from 'styled-system/patterns/container'

export default defineConfig({
  preflight: true,
  presets: ['@pandacss/dev/presets', '@park-ui/presets'],
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  jsxFramework: 'react',
  outdir: 'styled-system',
  globalCss: {
    extend: {
      html: {
        scrollPaddingTop: '6rem',
      },
      pre: {
        fontFamily: 'var(--font-code)',
        overflowX: 'auto',
        fontSize: '0.8125rem!',
        p: '4',
        '--shiki-color-text': 'colors.gray.100',
        '--shiki-color-background': 'colors.orange.950',
        '--shiki-token-constant': 'colors.orange.200',
        '--shiki-token-string': 'colors.orange.100',
        '--shiki-token-comment': 'colors.gray.500',
        '--shiki-token-keyword': 'colors.orange.200',
        '--shiki-token-parameter': 'colors.gray.100',
        '--shiki-token-function': 'colors.gray.100',
        '--shiki-token-string-expression': 'colors.yellow.100',
        '--shiki-token-punctuation': 'colors.gray.100',
        '--shiki-token-link': 'colors.gray.100',
        '& code': {
          fontFamily: 'inherit',
        },
      },
    },
  },
  theme: {
    extend: {
      tokens: {
        colors: {
          coral: {
            '50': { value: '#fef2ea' },
            '100': { value: '#fee2d3' },
            '200': { value: '#fecab8' },
            '300': { value: '#fca590' },
            '400': { value: '#f8725f' },
            '500': { value: '#eb5e41' },
            '600': { value: '#db532c' },
            '700': { value: '#b74221' },
            '800': { value: '#98331d' },
            '900': { value: '#7c251a' },
            '950': { value: '#420f0b' },
          },
        },
      },
      semanticTokens: {
        colors: {
          accent: {
            default: { value: { base: '{colors.coral.500}', _dark: '{colors.coral.500}' } },
            emphasized: { value: { base: '{colors.coral.600}', _dark: '{colors.coral.400}' } },
            fg: { value: '{colors.white}' },
          },
          border: {
            accent: { value: { base: '{colors.coral.500}', _dark: '{colors.coral.500}' } },
          },
        },
      },
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
            px: { base: '4', md: '6' },
            ...props,
          }
        },
      },
    },
  },
})
