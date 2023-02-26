import { toastAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(toastAnatomy.build())

export const toast = defineRecipe({
  name: 'toast',
  description: 'A toast style',
  base: parts({
    root: {
      background: 'bg.surface',
      borderRadius: 'xl',
      borderWidth: '1px',
      boxShadow: 'lg',
      minWidth: 'xs',
      p: '4',
    },
    group: {
      p: '4',
    },
    title: {
      fontWeight: 'semibold',
      textStyle: 'sm',
    },
    description: {
      color: 'fg.muted',
      textStyle: 'sm',
    },
  }),
})
