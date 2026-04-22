import { pinInputAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const pinInput = defineSlotRecipe({
  className: 'pinInput',
  slots: pinInputAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
    },
    control: {
      display: 'flex',
      gap: '2',
    },
    label: {
      color: 'fg.default',
      fontWeight: 'medium',
    },
    input: {
      px: '0!',
      textAlign: 'center',
    },
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      xs: {
        label: {
          textStyle: 'sm',
        },
        input: {
          width: '8',
        },
      },
      sm: {
        label: {
          textStyle: 'sm',
        },
        input: {
          width: '9',
        },
      },
      md: {
        label: {
          textStyle: 'sm',
        },
        input: {
          width: '10',
        },
      },
      lg: {
        label: {
          textStyle: 'sm',
        },
        input: {
          width: '11',
        },
      },
      xl: {
        label: {
          textStyle: 'md',
        },
        input: {
          width: '12',
        },
      },
      '2xl': {
        label: {
          textStyle: 'md',
        },
        input: {
          width: '16',
        },
      },
    },
  },
})
