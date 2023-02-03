import { checkboxAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from 'css-panda'

const parts = defineParts(checkboxAnatomy.build())

export const checkbox = defineRecipe({
  name: 'checkbox',
  description: 'A checkbox style',
  base: parts({
    root: {
      cursor: 'pointer',
      display: 'flex',
      gap: '2',
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

      borderWidth: '1px',
      display: 'flex',
      justifyContent: 'center',
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
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      sm: parts({
        control: {
          borderRadius: 'sm',
          h: '4',
          w: '4',
          '& > svg': {
            h: '3',
            w: '3',
          },
        },
      }),
      md: parts({
        control: {
          borderRadius: 'md',
          h: '5',
          w: '5',
          '& > svg': {
            h: '3.5',
            w: '3.5',
          },
        },
      }),
    },
  },
})
