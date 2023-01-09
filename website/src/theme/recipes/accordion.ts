import { accordionAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from 'css-panda'

const parts = defineParts(accordionAnatomy.build())

export const accordion = defineRecipe({
  name: 'accordion',
  description: 'An accordion style',
  base: parts({
    root: {
      width: '100%',
      background: 'bg.surface',
    },
    trigger: {
      alignItems: 'center',
      background: 'transparent',
      borderRadius: 'lg',
      cursor: 'pointer',
      color: 'fg.default',
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: 'medium',
      textStyle: 'md',
      width: '100%',
      p: '0',
    },
    item: {
      borderTopWidth: '1px',
      pt: '4',
      pb: '6',
    },
    content: {
      color: 'fg.muted',
      textStyle: 'sm',
      pt: '2',
    },
  }),
})
