import { tooltipAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(tooltipAnatomy.build())

export const tooltip = defineRecipe({
  name: 'tooltip',
  description: 'A tooltip style',
  base: parts({
    positioner: {
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
    },
    content: {
      fontWeight: 'semibold',
      textStyle: 'xs',
    },
    arrow: {
      '--arrow-size': 'sizes.2',
      '--arrow-background': {
        base: 'colors.brown.600',
        _dark: 'colors.gray.100',
      },
    },
  }),
})
