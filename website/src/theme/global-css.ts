import { defineGlobalStyles } from '@pandacss/dev'

export const globalCss = defineGlobalStyles({
  html: {
    colorPalette: 'coral',
    scrollPaddingTop: '6rem',
    minHeight: '100%',
    '--global-color-border': 'colors.border.subtle',
  },
  'html, body': {
    display: 'flex',
    flexDirection: 'column',
  },
  body: {
    background: 'var(--colors-bg-canvas)',
    color: 'fg.default',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    fontFamily: 'var(--font-wix-madefor-text), token(fonts.sans)',
    _dark: {
      colorScheme: 'dark',
    },
  },
  '*, *::before, *::after': {
    borderColor: 'border.subtle',
    borderStyle: 'solid',
    boxSizing: 'border-box',
  },
  ':is(h1, h2, h3, h4, h5, h6, [data-scroll-target])': {
    scrollMarginTop:
      'calc(var(--navbar-height, 4rem) + var(--banner-height, 0px) + var(--tabbar-height, 3rem) + 1.5rem)',
  },
  '*::placeholder': {
    opacity: 1,
    color: 'fg.subtle',
  },
  '*::selection': {
    bg: 'gray.3',
  },
  pre: {
    overflowX: 'auto',
    fontSize: '13px !important',
    bg: 'gray.dark.2!',
    lineHeight: '1.5!',
  },
  blockquote: {
    fontStyle: 'normal!',
    fontWeight: 'normal!',
  },
  strong: {
    color: 'fg.default!',
  },
  code: {
    fontFamily: 'var(--font-roboto-mono), token(fonts.mono)!',
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
})
