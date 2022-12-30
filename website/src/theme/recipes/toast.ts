import { defineRecipe } from 'css-panda'
import { createAnatomy } from './create-anatomy'
import { defineParts } from './define-parts'

const parts = defineParts(
  createAnatomy('toast').parts('group', 'root', 'title', 'description', 'closeTrigger').build(),
)

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
