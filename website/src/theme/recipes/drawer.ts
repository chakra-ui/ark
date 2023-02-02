import { dialogAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from 'css-panda'

const parts = defineParts(dialogAnatomy.build())

export const drawer = defineRecipe({
  name: 'drawer',
  description: 'A drawer style',
  base: parts({
    backdrop: {
      background: {
        base: 'gray.700',
        dark: 'black',
      },
      opacity: '0.7',
      inset: '0',
      position: 'fixed',
      zIndex: '200',
    },
    container: {
      alignItems: 'start',
      display: 'flex',
      inset: '0',
      justifyContent: 'start',
      position: 'fixed',
      zIndex: '200',
    },
    content: {
      background: 'bg.surface',
      boxShadow: 'lg',
      position: 'relative',
      height: 'full',
      minW: 'xs',
      py: '6',
      px: '4',
      overflowY: 'auto',
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
