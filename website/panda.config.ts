import { defineConfig } from '@pandacss/dev'
import { createPreset } from '@park-ui/panda-preset'
import typographyPreset from 'pandacss-preset-typography'

export default defineConfig({
  preflight: true,
  validation: 'none',
  presets: [
    '@pandacss/preset-base',
    createPreset({ grayColor: 'sand' }),
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
  globalVars: {
    '--ark-nav-height': '64px',
    '--ark-layout-max-width': '1440px',
    '--ark-sidebar-width': '272px',
    '--ark-sidebar-ps': 'max(32px, calc((100vw - (var(--ark-layout-max-width) - 64px)) / 2))',
    '--ark-sidebar-max-width':
      'calc((100vw - (var(--ark-layout-max-width) - 64px)) / 2 + var(--ark-sidebar-width) - 32px)',
    '--ark-main-ps': 'calc((100vw - var(--ark-layout-max-width)) / 2 + var(--ark-sidebar-width))',
    '--ark-main-pe': 'calc((100vw - var(--ark-layout-max-width)) / 2)',
  },
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
    },
  },
  globalCss: {
    extend: {
      html: {
        scrollPaddingTop: '6rem',
        scrollBehavior: 'smooth',
        minHeight: '100%',
      },
      'html, body': {
        display: 'flex',
        flexDirection: 'column',
      },
      body: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1',
        fontFamily: 'body',
      },
      pre: {
        background: 'transparent!',
        overflowX: 'auto',
        fontSize: '13px !important',
      },
      blockquote: {
        fontStyle: 'normal!',
        fontWeight: 'normal!',
      },
      strong: {
        color: 'fg.default!',
      },
      code: {
        fontFamily: 'code',
        '::selection': {
          bg: 'gray.dark.a4',
        },
      },
      article: {
        '--colors-prose-body': 'colors.fg.muted',
        '--colors-prose-heading': 'colors.fg.default',
        '--colors-prose-bold': 'colors.fg.default',
        '--colors-prose-link': 'colors.fg.default',
        '--colors-prose-code': 'colors.fg.muted',
        '--colors-prose-hr-border': 'colors.border.subtle',
        '--colors-prose-quote-border': 'colors.accent.default',
      },
    },
  },
  theme: {
    extend: {
      tokens: {
        fonts: {
          body: { value: 'var(--font-outfit), sans-serif' },
          code: { value: 'var(--font-roboto-mono), monospace' },
        },
      },
      semanticTokens: {
        colors: {
          accent: {
            1: { value: { base: '#fff8f7', _dark: '#1c1412' } },
            2: { value: { base: '#ffefef', _dark: '#391a18' } },
            3: { value: { base: '#ffe5e4', _dark: '#55221e' } },
            4: { value: { base: '#ffdbda', _dark: '#722b25' } },
            5: { value: { base: '#ffd2d1', _dark: '#8e342b' } },
            6: { value: { base: '#ffc9c8', _dark: '#aa3d32' } },
            7: { value: { base: '#ffbeb8', _dark: '#c6493a' } },
            8: { value: { base: '#ffb2a8', _dark: '#e2503f' } },
            9: { value: { base: '#EB5E41', _dark: '#EB5E41' } },
            10: { value: { base: '#de5045', _dark: '#ef6b4e' } },
            11: { value: { base: '#c9453b', _dark: '#f47a5c' } },
            12: { value: { base: '#762d25', _dark: '#faa19b' } },

            default: { value: '{colors.accent.9}' },
            emphasized: { value: '{colors.accent.10}' },
            fg: { value: 'white' },
          },
        },
      },
    },
  },
})
