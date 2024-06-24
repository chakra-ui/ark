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

      slotRecipes: {
        field: {
          className: 'field',
          slots: ['root', 'label', 'input', 'textarea', 'select', 'helperText', 'errorText'],
          base: {
            root: {
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5',
            },
            label: {
              color: 'fg.default',
              fontWeight: 'medium',
              textStyle: 'sm',
            },
            helperText: {
              color: 'fg.muted',
              textStyle: 'sm',
            },
          },
        },
        layout: {
          className: 'layout',
          slots: ['aside', 'main'],
          base: {
            aside: {
              bg: {
                base: 'gray.2',
                _dark: '#0e0e0e',
              },
              borderRightWidth: '1px',
              position: 'fixed',
              top: '0',
              bottom: '0',
              display: { base: 'none', md: 'block' },
              ps: 'max(32px, calc((100vw - (1440px - 64px)) / 2))',
              pe: '8',
              minWidth: '272px',
              overflow: 'auto',
              width: {
                base: '272px',
                lg: 'calc((100vw - (1440px - 64px)) / 2 + 272px - 32px)',
              },
              zIndex: '2',
            },
            main: {
              minWidth: '0',
              flex: '1',
              ps: {
                base: '0',
                md: 'max(calc((100vw - 1440px) / 2 + 272px), 272px)',
              },
              pe: 'calc((100vw - 1440px) / 2)',
            },
          },
        },
      },
    },
  },
})
