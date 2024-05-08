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
      code: {
        fontFamily: 'code',
      },
      article: {
        '--colors-prose-body': 'colors.fg.muted',
        '--colors-prose-heading': 'colors.fg.default',
        '--colors-prose-bold': 'colors.fg.default',
        '--colors-prose-link': 'colors.fg.default',
        '--colors-prose-code': 'colors.fg.muted',
        '--colors-prose-hr-border': 'colors.border.subtle',
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
    },
  },
})
