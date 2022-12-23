import { defineRecipe } from 'css-panda'
import { createAnatomy } from './create-anatomy'
import { defineParts } from './define-parts'

const parts = defineParts(
  createAnatomy('popover')
    .parts(
      'arrow',
      'arrowTip',
      'anchor',
      'trigger',
      'positioner',
      'content',
      'title',
      'description',
      'closeTrigger',
    )
    .build(),
)

export const popover = defineRecipe({
  name: 'popover',
  description: 'A popover style',
  base: parts({
    positioner: {
      background: 'bg.surface',
      borderRadius: 'lg',
      borderWidth: '1px',
      boxShadow: 'lg',
    },
    content: {
      maxWidth: 'sm',
      p: '4',
      position: 'relative',
    },
    title: {
      fontWeight: 'semibold',
      textStyle: 'sm',
    },
    description: {
      color: 'fg.muted',
      textStyle: 'sm',
    },
    arrow: {
      '--arrow-size': '12px',
      '--arrow-background': {
        base: 'white',
        _dark: 'colors.gray.950',
      },
    },
    arrowTip: {
      borderTopWidth: '1px',
      borderLeftWidth: '1px',
    },
  }),
})
