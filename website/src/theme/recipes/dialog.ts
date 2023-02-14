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
