import { popoverAnatomy } from '@ark-ui/react'
import { defineRecipe } from 'css-panda'
import { defineParts } from './define-parts'

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
