import { pinInputAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(pinInputAnatomy.build())

export const pinInput = defineRecipe({
  name: 'pinInput',
  description: 'An pin input style',
  base: parts({
    control: {
      display: 'flex',
      gap: '2',
    },
  }),
})
