import { defineConfig } from '@pandacss/dev'
import type { ContainerProperties } from 'styled-system/patterns'

export default defineConfig({
  preflight: true,
  presets: ['@pandacss/dev/presets', '@park-ui/presets'],
  include: ['./src/**/*.{ts,tsx,js,jsx,astro}'],
  exclude: [],
  jsxFramework: 'react',
  outdir: 'styled-system',
  globalCss: {
    extend: {
      html: {
        scrollPaddingTop: '6rem',
        minHeight: '100%',
      },
      'html, body': {
        display: 'flex',
        flexDirection: 'column',
        height: 'unset',
      },
      '&:root': {
        '--font-body': 'Inter Variable',
        '--font-code': 'Fira Code Variable',
      },
      body: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1',
      },
      pre: {
        fontFamily: 'var(--font-code)',
        overflowX: 'auto',
        fontSize: '14px !important',
        '--shiki-color-text': 'white',
        '--shiki-color-background': 'colors.grayPalette.400',
        '--shiki-token-constant': 'colors.grayPalette.400',
        '--shiki-token-string': 'colors.grayPalette.400',
        '--shiki-token-comment': 'colors.grayPalette.400',
        '--shiki-token-keyword': 'colors.grayPalette.400',
        '--shiki-token-parameter': 'colors.grayPalette.400',
        '--shiki-token-function': 'white',
        '--shiki-token-string-expression': 'colors.grayPalette.400',
        '--shiki-token-punctuation': 'colors.grayPalette.400',
        '--shiki-token-link': 'colors.grayPalette.400',
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
          grayPalette: {
            25: { value: '{colors.stone.25}' },
            50: { value: '{colors.stone.50}' },
            100: { value: '{colors.stone.100}' },
            200: { value: '{colors.stone.200}' },
            300: { value: '{colors.stone.300}' },
            400: { value: '{colors.stone.400}' },
            500: { value: '{colors.stone.500}' },
            600: { value: '{colors.stone.600}' },
            700: { value: '{colors.stone.700}' },
            800: { value: '{colors.stone.800}' },
            900: { value: '{colors.stone.900}' },
            950: { value: '{colors.stone.950}' },
          },
        },
      },
      semanticTokens: {
        colors: {
          accent: {
            default: { value: { base: '{colors.coral.500}', _dark: '{colors.coral.500}' } },
            emphasized: { value: { base: '{colors.coral.600}', _dark: '{colors.coral.400}' } },
            fg: { value: { base: '{colors.white}', _dark: '{colors.white}' } },
          },
          fg: {
            default: {
              value: { base: '{colors.grayPalette.900}', _dark: '{colors.grayPalette.100}' },
            },
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
