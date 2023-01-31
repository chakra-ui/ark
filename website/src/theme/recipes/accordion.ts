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
      display: 'flex',
      flexDirection: 'column',
      gap: '8',
    },
    trigger: {
      alignItems: 'center',
      background: 'transparent',
      borderRadius: 'lg',
      cursor: 'pointer',
      color: 'fg.default',
      display: 'flex',
      fontWeight: 'medium',
      justifyContent: 'space-between',
      mb: '2',
      p: '0',
      textStyle: 'lg',
      width: '100%',
    },
    item: {},
    content: {
      color: 'fg.muted',
      pr: '12',
      textStyle: 'md',
    },
  }),
})
