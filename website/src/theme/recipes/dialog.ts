import { dialogAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(dialogAnatomy.build())

export const dialog = defineRecipe({
  name: 'dialog',
  description: 'A dialog style',
  base: parts({
    backdrop: {
      background: {
        base: 'gray.700',
        _dark: 'black',
      },
      opacity: '0.7',
      inset: '0',
      position: 'fixed',
      zIndex: '200',
      '&[data-state=open]': { animation: 'backdropIn 0.25s ease-out' },
      '&[data-state=closed]': { animation: 'backdropOut 0.2s ease-in' },
    },
    container: {
      alignItems: 'center',
      display: 'flex',
      inset: '0',
      justifyContent: 'center',
      position: 'fixed',
      zIndex: '200',
    },
    content: {
      background: 'bg.surface',
      borderRadius: 'xl',
      boxShadow: 'lg',
      minW: 'sm',
      position: 'relative',
      '&[data-state=open]': { animation: 'slideIn 0.25s ease-out' },
      '&[data-state=closed]': { animation: 'slideOut 0.2s ease-in' },
    },
    title: {
      fontWeight: 'semibold',
      textStyle: 'lg',
    },
    description: {
      color: 'fg.muted',
      textStyle: 'sm',
    },
  }),
})
