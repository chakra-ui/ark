import { popoverAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(popoverAnatomy.build())

export const popover = defineRecipe({
  name: 'popover',
  description: 'A popover style',
  base: parts({
    positioner: {
      background: 'bg.surface',
      borderRadius: 'lg',
      borderWidth: '1px',
      boxShadow: 'lg',
      zIndex: '1',
    },
    content: {
      maxWidth: 'sm',
      p: '4',
      position: 'relative',
    },
    title: {
      fontWeight: 'semibold',
      textStyle: 'sm',
    },
    description: {
      color: 'fg.muted',
      textStyle: 'sm',
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
