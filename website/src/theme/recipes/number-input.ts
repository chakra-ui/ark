import { defineRecipe } from 'css-panda'
import { createAnatomy } from './create-anatomy'
import { defineParts } from './define-parts'

const parts = defineParts(
  createAnatomy('numberInput')
    .parts('root', 'label', 'input', 'control', 'incrementTrigger', 'decrementTrigger', 'scrubber')
    .build(),
)

export const numberInput = defineRecipe({
  name: 'numberInput',
  description: 'A number input style',
  base: parts({
    root: {
      borderColor: 'border.emphasized',
      borderRadius: 'lg',
      borderWidth: '1px',
      boxShadow: 'xs',

      display: 'flex',
      overflow: 'hidden',

      pl: '3',
      h: '10',
      minW: '10',
      textStyle: 'md',
      _focusWithin: {
        zIndex: 1,
        '--shadow': {
          base: 'colors.purple.500',
          _dark: 'colors.purple.200',
        },
        boxShadow: '0 0 0 1px var(--shadow)',
        borderColor: 'accent.default',
      },
    },
    control: {
      borderLeftWidth: '1px',
      borderColor: 'border.emphasized',
      display: 'flex',
      flexDirection: 'column',
    },
    input: {
      background: 'bg.surface',
      color: 'fg.default',
      outline: 'none',
    },
  }),
})
