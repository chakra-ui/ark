import { defineGlobalStyles } from '@pandacss/dev'

export const globalCss = defineGlobalStyles({
  html: {
    lineHeight: 1.5,
    textRendering: 'optimizeLegibility',
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
    WebkitTextSizeAdjust: '100%',
    height: '100%',
    scrollPaddingTop: '6rem',
    overflow: 'auto',
  },
  body: {
    backgroundColor: 'bg.canvas',
    color: 'fg.default',
    overflow: 'scroll',
    fontFamily: 'var(--font-inter), sans-serif',
    height: 'fit-content',
    overflowX: 'hidden',
    overflowY: 'auto',
    _dark: {
      colorScheme: 'dark',
    },
  },
  '*, *::before, *::after': {
    borderColor: 'border.default',
    borderStyle: 'solid',
  },
  '*::placeholder': {
    opacity: 1,
    color: 'fg.placeholder',
  },
  a: {
    textDecoration: 'none',
  },
  hr: {
    borderBottomWidth: '1px',
  },
  table: {
    width: 'full',
    tableLayout: 'auto',
    textAlign: 'left',
  },
  th: {
    color: 'fg.muted',
    fontWeight: 'semibold',
    pb: '2.5',
    pt: '0',
    pr: {
      base: '2',
      md: '4',
    },
    textAlign: 'left',
    textStyle: 'sm',
    _last: {
      pl: {
        base: '2',
        md: '4',
      },
      pr: '0',
    },
  },
  td: {
    borderTopWidth: '1px',
    color: 'fg.muted',
    textStyle: 'sm',
    py: '2.5',
    wordWrap: 'break-word',
    pr: {
      base: '2',
      md: '4',
    },
    verticalAlign: 'top',
    _first: {
      minWidth: {
        base: 'unset',
        sm: '12rem',
      },
    },
    _last: {
      width: 'full',
      pl: {
        base: '2',
        md: '4',
      },
      pr: '0',
    },
  },
})
