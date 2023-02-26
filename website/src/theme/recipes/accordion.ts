import { accordionAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

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
      divideY: '1px',
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
      p: '0',
      pb: '2',
      textStyle: 'md',
      width: '100%',
      '&:not([data-expanded])': {
        pb: '4',
      },
    },
    item: {
      '&:not([hidden]) ~ :not([hidden]) > [data-part="trigger"]': {
        pt: '4',
      },
    },
    content: {
      color: 'fg.muted',
      pr: '12',
      textStyle: 'sm',
      pb: '4',
    },
  }),
})
