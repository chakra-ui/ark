import { numberInputAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

const trigger = {
  alignItems: 'center',
  borderColor: 'border.default',
  color: 'fg.muted',
  cursor: 'pointer',
  display: 'inline-flex',
  justifyContent: 'center',
  transitionDuration: 'normal',
  transitionProperty: 'background, border-color, color, box-shadow',
  transitionTimingFunction: 'default',
  '& :where(svg)': {
    width: '4',
    height: '4',
  },
  _hover: {
    background: 'gray.a2',
    color: 'fg.default',
  },
  _disabled: {
    color: 'fg.disabled',
    cursor: 'not-allowed',
    _hover: {
      background: 'transparent',
      color: 'fg.disabled',
    },
  },
}

export const numberInput = defineSlotRecipe({
  className: 'numberInput',
  slots: numberInputAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
    },
    control: {
      borderColor: 'border.default',
      borderRadius: 'l2',
      borderWidth: '1px',
      display: 'grid',
      divideX: '1px',
      gridTemplateColumns: '1fr 32px',
      gridTemplateRows: '1fr 1fr',
      overflow: 'hidden',
      transitionDuration: 'normal',
      transitionProperty: 'border-color, box-shadow',
      transitionTimingFunction: 'default',
      _focusWithin: {
        borderColor: 'colorPalette.default',
        boxShadow: '0 0 0 1px var(--colors-color-palette-default)',
      },
      _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
      },
    },
    input: {
      background: 'transparent',
      border: 'none',
      gridRow: 'span 2 / span 2',
      outline: 'none',
      width: 'full',
      _disabled: {
        cursor: 'not-allowed',
      },
    },
    label: {
      color: 'fg.default',
      fontWeight: 'medium',
    },
    decrementTrigger: { ...trigger, borderTopWidth: '1px' },
    incrementTrigger: trigger,
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      md: {
        control: {
          ps: '3',
          h: '10',
          minW: '10',
          fontSize: 'md',
        },
        label: {
          textStyle: 'sm',
        },
      },
      lg: {
        control: {
          ps: '3.5',
          h: '11',
          minW: '11',
          fontSize: 'md',
        },
        label: {
          textStyle: 'sm',
        },
      },
      xl: {
        control: {
          ps: '4',
          h: '12',
          minW: '12',
          fontSize: 'lg',
        },
        label: {
          textStyle: 'md',
        },
      },
    },
  },
})
