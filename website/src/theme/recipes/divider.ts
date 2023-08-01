import { defineRecipe } from '@pandacss/dev'

export const divider = defineRecipe({
  className: 'divider',
  description: 'A divider style',
  base: {
    width: 'full',
    borderBottomWidth: '1px',
  },
})
