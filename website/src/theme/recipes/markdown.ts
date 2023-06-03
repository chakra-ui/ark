import { defineRecipe } from '@pandacss/dev'

export const markdown = defineRecipe({
  name: 'markdown',
  description: 'A recipe for markdown content',
  base: {
    '&': {
      width: 'full',
    },
    '& strong': {
      color: 'fg.emphasized',
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
    },
    '& li::before': {
      display: 'inline-block',
      content: "'–'",
      width: '1em',
      color: 'fg.emphasized',
    },
    '& [data-rehype-pretty-code-fragment]': {
      my: '8',
    },
    '& [data-rehype-pretty-code-fragment] pre': {
      background: 'brown.600 !important',
    },
    '& pre': {
      borderRadius: 'lg',
      borderWidth: '1px',
      p: '4',
    },
    '& kbd': {
      background: 'bg.subtle',
      borderRadius: 'sm',
      borderWidth: '1px',
      borderColor: 'border.emphasized',
      borderBottomWidth: '3px',
      fontSize: 'xs',
      fontWeight: 'bold',
      fontFamily: 'var(--font-fira-code)',
      lineHeight: 'normal',
      px: '1',
      py: '0.5',
      whiteSpace: 'nowrap',
    },
    '& :first-child': {
      mt: '0',
    },
    '& :last-child': {
      mb: '0',
    },
    '& blockquote': {
      padding: '1em',
      borderWidth: '1px',
      mb: '4',
      borderRadius: '0.5em',
    },
  },
})
