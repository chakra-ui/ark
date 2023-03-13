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
  'h1, h2, h3, h4, h5, h6': {
    fontFamily: 'var(--font-mona-sans), sans-serif',
  },
  a: {
    textDecoration: 'none',
  },
  hr: {
    borderBottomWidth: '1px',
  },
  pre: {
    fontFamily: 'var(--font-roboto-mono)',
    fontSize: '0.8125rem',
    '--shiki-color-text': 'colors.gray.100',
    '--shiki-color-background': 'colors.brown.600',
    '--shiki-token-constant': 'colors.gray.100',
    '--shiki-token-string': 'colors.gray.100',
    '--shiki-token-comment': 'colors.gray.100',
    '--shiki-token-keyword': 'colors.gray.100',
    '--shiki-token-parameter': 'colors.gray.100',
    '--shiki-token-function': 'colors.gray.100',
    '--shiki-token-string-expression': 'colors.gray.100',
    '--shiki-token-punctuation': 'colors.gray.100',
    '--shiki-token-link': 'colors.gray.100',
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

// '& [data-rehype-pretty-code-fragment]': {
//   my: '8',
//   backgroundColor: 'gray.950',
//   borderRadius: 'lg',
//   overflowY: 'hidden',
// },
// '& pre': {
//   boxShadow: 'sm',
//   fontFamily: 'var(--font-roboto-mono)',
//   py: '5',
//   wordBreak: 'break-word',
// },
// '& [data-rehype-pretty-code-title]': {
//   padding: '12px 20px',
//   background: '#1e1e1e',
//   color: '#888888',
//   borderRadius: '10px 10px 0 0',
//   fontSize: '14px',
//   borderBottom: '1px solid token(colors.gray.900)',
// },
// '& code:not([class])': {
//   fontFamily: 'var(--font-roboto-mono)',
//   textStyle: 'sm',
// },
// '& pre > code': {
//   display: 'grid',
// },
// '& pre > code > .line': {
//   px: '5',
//   borderLeftWidth: '2px',
//   borderColor: 'transparent',
// },
// '& pre > code > .line.highlighted': {
//   bg: 'gray.800',
//   borderColor: 'purple.500',
// },
