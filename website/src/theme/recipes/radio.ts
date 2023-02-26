import { createAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(createAnatomy('radio', ['root', 'control', 'label', 'input']).build())

export const radio = defineRecipe({
  name: 'radio',
  description: 'A radio style',
  base: parts({
    root: {
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      gap: '2',
    },
    control: {
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
    label: {
      color: 'fg.emphasized',
      fontWeight: 'medium',
    },
    input: {
      border: '0',
      clip: 'rect(0 0 0 0)',
      height: '1px',
      margin: '-1px',
      overflow: 'hidden',
      padding: '0',
      position: 'absolute',
      width: '1px',
      whiteSpace: 'nowrap',
      wordWrap: 'normal',
    },
  }),
})
