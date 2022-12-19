import { defineRecipe } from 'css-panda'

export const markdown = defineRecipe({
  name: 'markdown',
  description: 'A recipe for markdown content',
  base: {
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
      mb: '4',
    },
    '& pre': {
      backgroundColor: 'gray.950 !important',
      borderRadius: 'lg',
      boxShadow: 'sm',
      my: '8',
      p: '4',
    },
    '& :last-child': {
      mb: '0',
    },
  },
})
