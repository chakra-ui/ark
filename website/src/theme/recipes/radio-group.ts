import { radioGroupAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(radioGroupAnatomy.build())

export const radioGroup = defineRecipe({
  name: 'radioGroup',
  description: 'A radio group style',
  base: parts({
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4',
    },
    radioControl: {
      background: 'bg.surface',
      borderColor: 'border.emphasized',
      borderRadius: 'full',
      borderWidth: '1px',
      height: '5',
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
        '--outline-color': {
          base: 'colors.white',
          _dark: 'colors.gray.950',
        },
        outlineColor: 'var(--outline-color)',
        outlineStyle: 'solid',
        outlineWidth: '3px',
        outlineOffset: '-4px',
      },
    },
    radio: {
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      gap: '3',
    },
    radioLabel: {
      color: 'fg.emphasized',
      fontWeight: 'medium',
    },
  }),
})
