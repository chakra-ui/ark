import { numberInputAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(numberInputAnatomy.build())

const trigger = {
  alignItems: 'center',
  appearance: 'none',
  cursor: 'pointer',
  display: 'inline-flex',
  fontWeight: 'semibold',
  flex: '1',
  justifyContent: 'center',
  outline: 'none',
  position: 'relative',
  transitionProperty: 'base',
  transitionDuration: '100',
  transitionTimingFunction: 'ease-out',
  userSelect: 'none',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
  background: 'bg.surface',
  color: 'fg.emphasized',
  _hover: {
    background: 'bg.subtle',
    _disabled: {
      borderColor: 'border.default',
      color: 'fg.subtle',
      cursor: 'not-allowed',
    },
  },
  _selected: {
    background: 'bg.subtle',
  },
  _focusVisible: {
    zIndex: 1,
    '--shadow': {
      base: 'colors.gray.100',
      _dark: 'colors.gray.800',
    },
    boxShadow: '0 0 0 4px var(--shadow)',
  },
  _disabled: {
    borderColor: 'border.default',
    color: 'fg.subtle',
    cursor: 'not-allowed',
    _hover: {
      background: 'bg.surface',
    },
  },
} as const

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
          base: 'colors.orange.400',
          _dark: 'colors.orange.400',
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
    decrementTrigger: trigger,
    incrementTrigger: { ...trigger, borderBottomWidth: '1px', borderColor: 'border.emphasized' },
  }),
})
