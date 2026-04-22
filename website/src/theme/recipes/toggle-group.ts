import { toggleGroupAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const toggleGroup = defineSlotRecipe({
  className: 'toggleGroup',
  slots: toggleGroupAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      overflow: 'hidden',
      position: 'relative',
      _vertical: {
        flexDirection: 'column',
      },
    },
    item: {
      alignItems: 'center',
      appearance: 'none',
      cursor: 'pointer',
      color: 'fg.subtle',
      display: 'inline-flex',
      fontWeight: 'semibold',
      minWidth: '0',
      justifyContent: 'center',
      outline: 'none',
      position: 'relative',
      transitionDuration: 'normal',
      transitionProperty: 'background, border-color, color, box-shadow',
      transitionTimingFunction: 'default',
      userSelect: 'none',
      verticalAlign: 'middle',
      whiteSpace: 'nowrap',
      _on: {
        background: 'gray.a3',
        color: 'fg.default',
        _hover: {
          background: 'gray.a3',
        },
      },
      _hover: {
        background: 'gray.a2',
      },
      _disabled: {
        borderColor: 'border.disabled',
        color: 'fg.disabled',
        cursor: 'not-allowed',
        _hover: {
          background: 'transparent',
          borderColor: 'border.disabled',
          color: 'fg.disabled',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
  variants: {
    variant: {
      outline: {
        root: {
          borderWidth: '1px',
          borderRadius: 'l2',
          borderColor: 'border.default',
          _horizontal: {
            divideX: '1px',
          },
          _vertical: {
            divideY: '1px',
          },
        },
        item: {
          borderColor: 'border.default',
          _focusVisible: {
            color: 'fg.default',
            background: 'gray.a3',
          },
        },
      },
      ghost: {
        root: {
          gap: '1',
        },
        item: {
          borderRadius: 'l2',
          _focusVisible: {
            outlineOffset: '2px',
            outline: '2px solid',
            outlineColor: 'border.outline',
          },
        },
      },
    },
    size: {
      sm: {
        item: {
          h: '9',
          minW: '9',
          textStyle: 'sm',
          gap: '2',
          '& svg': {
            width: '4.5',
            height: '4.5',
          },
        },
      },
      md: {
        item: {
          h: '10',
          minW: '10',
          textStyle: 'sm',
          gap: '2',
          '& svg': {
            width: '5',
            height: '5',
          },
        },
      },
      lg: {
        item: {
          h: '11',
          minW: '11',
          textStyle: 'md',
          gap: '2',
          '& svg': {
            width: '5',
            height: '5',
          },
        },
      },
    },
  },
})
