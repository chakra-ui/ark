import { defineRecipe } from 'css-panda'
import { createAnatomy } from './create-anatomy'
import { defineParts } from './define-parts'

const parts = defineParts(
  createAnatomy('pinInput').parts('root', 'label', 'hiddenInput', 'input', 'control').build(),
)

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
