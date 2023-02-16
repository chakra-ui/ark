import { defineRecipe } from '@pandacss/dev'

export const markdown = defineRecipe({
  name: 'markdown',
  description: 'A recipe for markdown content',
  base: {
    '&': {
      width: 'full',
    },
    '& h1': {
      fontWeight: 'semibold',
      mt: { base: '8', md: '10' },
      mb: { base: '4', md: '5' },
      textStyle: { base: '2xl', md: '3xl' },
    },
    '& h2': {
      fontWeight: 'semibold',
      mt: { base: '8', md: '8' },
      mb: { base: '3', md: '4' },
      textStyle: { base: 'xl', md: '2xl' },
    },
    '& h3': {
      fontWeight: 'semibold',
      mt: { base: '5', md: '8' },
      mb: { base: '2', md: '3' },
      textStyle: { base: 'lg', md: 'xl' },
    },
    '& p': {
      color: 'fg.muted',
      lineHeight: 'relaxed',
      mb: '4',
    },
    '& ul': {
      color: 'fg.muted',
      listStyle: 'none',
      lineHeight: 'loose',
      mb: '4',
      p: '0',
      pl: '1.675em',
    },
    '& li::before': {
      display: 'inline-block',
      content: "'–'",
      width: '1em',
    },
    '& [data-rehype-pretty-code-fragment]': {
      my: '8',
      backgroundColor: 'gray.950',
      borderRadius: 'lg',
      overflowY: 'hidden',
    },
    '& pre': {
      boxShadow: 'sm',
      fontFamily: 'var(--font-roboto-mono)',
      py: '5',
      wordBreak: 'break-word',
    },
    '& [data-rehype-pretty-code-title]': {
      padding: '12px 20px',
      background: '#1e1e1e',
      color: '#888888',
      borderRadius: '10px 10px 0 0',
      fontSize: '14px',
      borderBottom: '1px solid token(colors.gray.900)',
    },
    '& code:not([class])': {
      fontFamily: 'var(--font-roboto-mono)',
      textStyle: 'sm',
    },
    '& pre > code': {
      display: 'grid',
    },
    '& pre > code > .line': {
      px: '5',
      borderLeftWidth: '2px',
      borderColor: 'transparent',
    },
    '& pre > code > .line.highlighted': {
      bg: 'gray.800',
      borderColor: 'purple.500',
    },
    '& kbd': {
      background: 'bg.subtle',
      borderRadius: 'sm',
      borderWidth: '1px',
      borderColor: 'border.emphasized',
      borderBottomWidth: '3px',
      fontSize: 'xs',
      fontWeight: 'bold',
      fontFamily: 'var(--font-roboto-mono)',
      lineHeight: 'normal',
      px: '1',
      whiteSpace: 'nowrap',
    },
    '& :first-child': {
      mt: '0',
    },
    '& :last-child': {
      mb: '0',
    },
  },
})
