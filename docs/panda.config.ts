import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  preflight: true,
  presets: ['@pandacss/preset-base', '@park-ui/panda-preset'],
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
      },
      pre: {
        overflowX: 'auto',
        fontSize: '14px !important',
      },
    },
  },
})
