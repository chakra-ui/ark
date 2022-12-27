import { defineRecipe } from 'css-panda'
import { createAnatomy } from './create-anatomy'
import { defineParts } from './define-parts'

const parts = defineParts(
  createAnatomy('checkbox').parts('root', 'input', 'label', 'control').build(),
)

export const checkbox = defineRecipe({
  name: 'checkbox',
  description: 'A checkbox style',
  base: parts({
    root: {
      cursor: 'pointer',
      display: 'flex',
      gap: '3',
    },
    label: {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: '0.5',
    },
    control: {
      alignItems: 'center',
      background: 'bg.surface',
      borderColor: 'border.emphasized',
      borderRadius: 'md',
      borderWidth: '1px',
      display: 'flex',
      height: '5',
      justifyContent: 'center',
      transitionProperty: 'base',
      transitionDuration: '100',
      width: '5',
      _peerFocusVisible: {
        '--shadow': {
          base: 'colors.purple.100',
          _dark: 'colors.gray.800',
        },
        boxShadow: '0 0 0 4px var(--shadow)',
      },
      _hover: {
        borderColor: {
          base: 'gray.400',
          _dark: 'gray.700',
        },
      },
      _checked: {
        background: 'accent.default',
        borderColor: 'accent.default',
        color: 'fg.inverted.default',
        _hover: {
          borderColor: 'accent.default',
        },
      },
      _indeterminate: {
        borderColor: 'accent.default',
        color: 'accent.default',
        _hover: {
          borderColor: 'accent.default',
        },
      },
    },
  }),
})
