import { segmentGroupAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const segmentGroup = defineSlotRecipe({
  className: 'segmentGroup',
  slots: segmentGroupAnatomy.keys(),
  base: {
    root: {
      alignItems: 'flex-start',
      display: 'flex',
      flexDirection: {
        _horizontal: 'row',
        _vertical: 'column',
      },
      gap: {
        _horizontal: '4',
        _vertical: '1',
      },
      borderBottomWidth: {
        _horizontal: '1px',
      },
      borderLeftWidth: {
        _vertical: '1px',
      },
    },
    indicator: {
      borderColor: 'colorPalette.default',
      _horizontal: {
        bottom: '0',
        borderBottomWidth: '2px',
        transform: 'translateY(1px)',
        width: 'var(--width)',
      },
      _vertical: {
        borderLeftWidth: '2px',
        height: 'var(--height)',
        transform: 'translateX(-1px)',
      },
    },
    item: {
      color: 'fg.muted',
      cursor: 'pointer',
      fontWeight: 'medium',
      transitionDuration: 'normal',
      transitionProperty: 'color',
      transitionTimingFunction: 'default',
      _hover: {
        color: 'fg.default',
      },
      _checked: {
        fontWeight: 'semibold',
        color: 'fg.default',
        _hover: {
          color: 'fg.default',
        },
      },
      _disabled: {
        color: 'fg.disabled',
        cursor: 'not-allowed',
        _hover: {
          color: 'fg.disabled',
        },
      },
      px: {
        _horizontal: '1',
        _vertical: '3',
      },
      pb: {
        _horizontal: '3',
      },
      py: {
        _vertical: '1.5',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      sm: {
        item: {
          textStyle: 'sm',
        },
      },
      md: {
        item: {
          textStyle: 'md',
        },
      },
    },
  },
})
