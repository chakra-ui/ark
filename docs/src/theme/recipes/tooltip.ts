import { defineRecipe } from 'css-panda'
import { createAnatomy } from './create-anatomy'
import { defineParts } from './define-parts'

const parts = defineParts(
  createAnatomy('tooltip')
    .parts('trigger', 'arrow', 'arrowTip', 'positioner', 'content', 'label')
    .build(),
)

export const tooltip = defineRecipe({
  name: 'tooltip',
  description: 'A tooltip style',
  base: parts({
    positioner: {
      py: '2.5',
      px: '4',
      backgroundColor: {
        base: 'gray.950',
        _dark: 'white',
      },
      boxShadow: 'sm',
      borderRadius: 'sm',
      color: {
        base: 'white',
        _dark: 'gray.950',
      },
    },
    content: {
      textStyle: 'sm',
    },
    arrow: {
      '--arrow-size': '8px',
      '--arrow-background': {
        base: 'colors.gray.950',
        _dark: 'colors.white',
      },
    },
  }),
})
