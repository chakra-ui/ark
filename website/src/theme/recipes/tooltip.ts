import { tooltipAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(tooltipAnatomy.build())

export const tooltip = defineRecipe({
  name: 'tooltip',
  description: 'A tooltip style',
  base: parts({
    content: {
      py: '2',
      px: '3',
      backgroundColor: {
        base: 'brown.600',
        _dark: 'gray.100',
      },
      boxShadow: 'lg',
      borderRadius: 'lg',
      color: {
        base: 'gray.100',
        _dark: 'brown.600',
      },
      fontWeight: 'semibold',
      textStyle: 'xs',
      '&[data-state=open]': { animation: 'fadeIn 0.25s ease-out' },
      '&[data-state=closed]': { animation: 'fadeOut 0.2s ease-in' },
    },
  }),
})
