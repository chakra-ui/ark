import { radioGroupAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const radioButtonGroup = defineSlotRecipe({
  className: 'radioButtonGroup',
  slots: radioGroupAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    item: {
      alignItems: 'center',
      appearance: 'none',
      borderColor: 'border.default',
      borderRadius: 'l2',
      borderWidth: '1px',
      color: 'fg.default',

      cursor: 'pointer',
      display: 'inline-flex',
      fontWeight: 'semibold',
      justifyContent: 'center',
      outline: 'none',
      position: 'relative',
      transitionDuration: 'normal',
      transitionProperty: 'background, border-color, color, box-shadow',
      transitionTimingFunction: 'default',
      userSelect: 'none',
      verticalAlign: 'middle',
      whiteSpace: 'nowrap',
      _hover: {
        background: 'gray.a2',
      },
      _checked: {
        cursor: 'default',
      },
      _disabled: {
        borderColor: 'border.disabled',
        color: 'fg.disabled',
        cursor: 'not-allowed',
        _hover: {
          background: 'initial',
          borderColor: 'border.disabled',
          color: 'fg.disabled',
        },
      },
    },
    itemText: {
      display: 'inline-flex',
      alignItems: 'center',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'solid',
  },
  variants: {
    variant: {
      solid: {
        item: {
          _checked: {
            background: 'colorPalette.default',
            borderColor: 'colorPalette.default',
            color: 'colorPalette.fg',
            _hover: {
              color: 'colorPalette.fg',
              background: 'colorPalette.default',
            },
          },
        },
      },
      outline: {
        item: {
          _checked: {
            borderColor: 'colorPalette.default',
            boxShadow: '0 0 0 1px var(--colors-color-palette-default)',
            _hover: {
              background: 'initial',
            },
          },
        },
      },
    },
    size: {
      sm: {
        root: {
          gap: '2',
        },
        item: {
          h: '9',
          minW: '9',
          textStyle: 'sm',
          px: '3.5',
          '& svg': {
            width: '4.5',
            height: '4.5',
          },
        },
        itemText: {
          gap: '2',
        },
      },
      md: {
        root: {
          gap: '3',
        },
        item: {
          h: '10',
          minW: '10',
          textStyle: 'sm',
          px: '4',
          '& svg': {
            width: '5',
            height: '5',
          },
        },
        itemText: {
          gap: '2',
        },
      },
      lg: {
        root: {
          gap: '3',
        },
        item: {
          h: '11',
          minW: '11',
          textStyle: 'md',
          px: '4.5',
          '& svg': {
            width: '5',
            height: '5',
          },
        },
        itemText: {
          gap: '2',
        },
      },
      xl: {
        root: {
          gap: '3',
        },
        item: {
          h: '12',
          minW: '12',
          textStyle: 'md',
          px: '5',
          '& svg': {
            width: '5',
            height: '5',
          },
        },
        itemText: {
          gap: '2.5',
        },
      },
    },
  },
})
