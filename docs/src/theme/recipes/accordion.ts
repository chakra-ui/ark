import { defineRecipe } from 'css-panda'
import { createAnatomy } from './create-anatomy'
import { defineParts } from './define-parts'

const parts = defineParts(
  createAnatomy('accordion').parts('root', 'item', 'trigger', 'content').build(),
)

export const accordion = defineRecipe({
  name: 'accordion',
  description: 'An accordion style',
  base: parts({
    root: {
      width: '100%',
      background: 'bg.surface',
    },
    trigger: {
      alignItems: 'center',
      background: 'transparent',
      borderRadius: 'lg',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: 'medium',
      textStyle: 'md',
      width: '100%',
      p: '0',
    },
    item: {
      borderTopWidth: '1px',
      pt: '4',
      pb: '6',
    },
    content: {
      color: 'fg.muted',
      textStyle: 'sm',
      pt: '2',
    },
  }),
})
