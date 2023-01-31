import { dialogAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from 'css-panda'

const parts = defineParts(dialogAnatomy.build())

export const dialog = defineRecipe({
  name: 'dialog',
  description: 'A dialog style',
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
  variants: {
    variant: {
      drawer: parts({
        container: {
          alignItems: 'start !important',
          justifyContent: 'start !important',
        },
        content: {
          borderRadius: '0 !important',
          height: 'full',
          minW: 'xs !important',
        },
      }),
    },
  },
})
