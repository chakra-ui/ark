import { defineConfig } from '@pandacss/dev'
import type { ContainerProperties } from 'styled-system/patterns'

export default defineConfig({
  preflight: true,
  presets: ['@pandacss/preset-base', '@park-ui/presets'],
  include: ['./src/**/*.{ts,tsx,js,jsx,astro}'],
  exclude: [],
  jsxFramework: 'react',
  outdir: 'styled-system',
  staticCss: {
    recipes: {
      switchRecipe: [{ size: ['*'] }],
    },
  },
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
      'pre, code': {
        fontFamily: 'Fira Code Variable!',
      },
      pre: {
        overflowX: 'auto',
        fontSize: '14px !important',
        '--astro-code-color-text': 'colors.grayPalette.300',
        '--astro-code-color-background': 'colors.grayPalette.900',
        '--astro-code-token-constant': 'colors.coral.300',
        '--astro-code-token-string': 'colors.yellow.100',
        '--astro-code-token-comment': 'colors.grayPalette.700',
        '--astro-code-token-keyword': 'colors.coral.300',
        '--astro-code-token-parameter': 'colors.grayPalette.600',
        '--astro-code-token-function': 'colors.grayPalette.300',
        '--astro-code-token-string-expression': 'colors.yellow.100',
        '--astro-code-token-punctuation': 'colors.grayPalette.300',
        '--astro-code-token-link': 'colors.coral.200',
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
            50: { value: '#fef2ea' },
            100: { value: '#fee2d3' },
            200: { value: '#fecab8' },
            300: { value: '#fca590' },
            400: { value: '#f8725f' },
            500: { value: '#eb5e41' },
            600: { value: '#db532c' },
            700: { value: '#b74221' },
            800: { value: '#98331d' },
            900: { value: '#7c251a' },
            950: { value: '#420f0b' },
          },
          grayPalette: {
            25: { value: '#fcfcfc' },
            50: { value: '#fafaf9' },
            100: { value: '#f6f4f3' },
            200: { value: '#e1dedb' },
            300: { value: '#cdc8c5' },
            400: { value: '#a89c98' },
            500: { value: '#7f7773' },
            600: { value: '#615a56' },
            700: { value: '#48433f' },
            800: { value: '#302b28' },
            900: { value: '#26221e' },
            950: { value: '#1b1613' },
          },
        },
        spacing: {
          18: { value: '4.5rem' },
        },
        sizes: {
          18: { value: '4.5rem' },
        },
      },
      semanticTokens: {
        colors: {
          accent: {
            default: { value: { base: '{colors.coral.500}', _dark: '{colors.coral.500}' } },
            emphasized: { value: { base: '{colors.coral.600}', _dark: '{colors.coral.600}' } },
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
