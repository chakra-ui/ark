import { tooltipAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from 'css-panda'

const parts = defineParts(tooltipAnatomy.build())

export const tooltip = defineRecipe({
  name: 'tooltip',
  description: 'A tooltip style',
  base: parts({
    positioner: {
      py: '2',
      px: '3',
      backgroundColor: {
        base: 'gray.950',
        _dark: 'white',
      },
      boxShadow: 'lg',
      borderRadius: 'lg',
      color: {
        base: 'white',
        _dark: 'gray.950',
      },
    },
    content: {
      fontWeight: 'semibold',
      textStyle: 'xs',
    },
    arrow: {
      '--arrow-size': 'sizes.2',
      '--arrow-background': {
        base: 'colors.gray.950',
        _dark: 'colors.white',
      },
    },
  }),
})
