import { defineGlobalStyles } from '@pandacss/dev'

export const globalCss = defineGlobalStyles({
  html: {
    lineHeight: 1.5,
    textRendering: 'optimizeLegibility',
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
    WebkitTextSizeAdjust: '100%',
    minHeight: '100%',
  },
  body: {
    backgroundColor: 'bg.canvas',
    color: 'fg.default',
    fontFamily: 'var(--font-inter), sans-serif',
    flexGrow: '1',
    _dark: {
      colorScheme: 'dark',
    },
  },
  'html, body': {
    display: 'flex',
    flexDirection: 'column',
    height: 'unset !important', // TODO possbile issue in panda
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
