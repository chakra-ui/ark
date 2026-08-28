import { defineGlobalStyles } from '@pandacss/dev'

export const globalCss = defineGlobalStyles({
  html: {
    colorPalette: 'coral',
    scrollPaddingTop: '6rem',
    minHeight: '100%',
  },
  'html, body': {
    display: 'flex',
    flexDirection: 'column',
  },
  body: {
    background: 'bg.canvas',
    color: 'fg.default',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    fontFamily: 'sans',
    _dark: {
      colorScheme: 'dark',
    },
  },
  '*, *::before, *::after': {
    borderColor: 'border.subtle',
    borderStyle: 'solid',
    boxSizing: 'border-box',
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
    fontFamily: 'mono!',
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
