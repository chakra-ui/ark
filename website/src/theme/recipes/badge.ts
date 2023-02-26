import { defineRecipe } from '@pandacss/dev'

export const badge = defineRecipe({
  name: 'badge',
  description: 'A badge styles',
  base: {
    borderRadius: '2xl',
    background: {
      base: 'red.50',
      _dark: 'red.500',
    },
    color: {
      base: 'red.600',
      _dark: 'white',
    },
    display: 'inline-flex',
    fontWeight: 'medium',
    px: '2',
    py: '0.5',
    textStyle: 'xs',
  },
})
