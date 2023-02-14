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
    '& pre': {
      backgroundColor: 'gray.950',
      borderRadius: 'lg',
      boxShadow: 'sm',
      fontFamily: 'var(--font-roboto-mono)',
      my: '8',
      p: '4',
      wordBreak: 'break-word',
    },
    '& code:not([class])': {
      background: 'bg.subtle',
      borderRadius: 'sm',
      borderWidth: '1px',
      fontFamily: 'var(--font-roboto-mono)',
      textStyle: 'sm',
      px: '1',
      py: '0.5',
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
