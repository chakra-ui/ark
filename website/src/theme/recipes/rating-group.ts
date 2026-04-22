import { ratingGroupAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const ratingGroup = defineSlotRecipe({
  className: 'ratingGroup',
  slots: ratingGroupAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
    },
    label: {
      color: 'fg.default',
      fontWeight: 'medium',
    },
    control: {
      display: 'flex',
    },
    item: {
      cursor: 'pointer',
      transitionDuration: 'normal',
      transitionProperty: 'color, fill',
      transitionTimingFunction: 'default',
      fill: 'bg.emphasized',
      _highlighted: {
        fill: 'colorPalette.default',
      },
      _focusVisible: {
        outline: 'none',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      sm: {
        control: {
          gap: '0',
        },
        item: {
          '& svg': {
            width: '4',
            height: '4',
          },
        },
        label: {
          textStyle: 'sm',
        },
      },
      md: {
        control: {
          gap: '0.5',
        },
        item: {
          '& svg': {
            width: '5',
            height: '5',
          },
        },
        label: {
          textStyle: 'sm',
        },
      },
      lg: {
        control: {
          gap: '0.5',
        },
        item: {
          '& svg': {
            width: '6',
            height: '6',
          },
        },
        label: {
          textStyle: 'md',
        },
      },
    },
  },
})
