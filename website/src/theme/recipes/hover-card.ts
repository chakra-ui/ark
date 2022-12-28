import { defineRecipe } from 'css-panda'
import { createAnatomy } from './create-anatomy'
import { defineParts } from './define-parts'

const parts = defineParts(
  createAnatomy('hoverCard').parts('arrow', 'arrowTip', 'trigger', 'positioner', 'content').build(),
)

export const hoverCard = defineRecipe({
  name: 'hoverCard',
  description: 'A hover card style',
  base: parts({
    positioner: {
      background: 'bg.surface',
      borderRadius: 'lg',
      borderWidth: '1px',
      boxShadow: 'xl',
    },
    content: {
      maxWidth: 'xs',
      p: '4',
      position: 'relative',
    },
    arrow: {
      '--arrow-size': '12px',
      '--arrow-background': {
        base: 'white',
        _dark: 'colors.gray.950',
      },
    },
    arrowTip: {
      borderTopWidth: '1px',
      borderLeftWidth: '1px',
    },
  }),
})
