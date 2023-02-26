import { hoverCardAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(hoverCardAnatomy.build())

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
