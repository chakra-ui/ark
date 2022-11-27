import { defineRecipe } from 'css-panda'

export const button = defineRecipe({
  name: 'button',
  description: 'A button styles',
  base: {
    cursor: 'pointer',
    borderRadius: 'lg',
    fontWeight: 'semibold',
    display: 'inline-flex',
    appearance: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    position: 'relative',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    outline: 'none',
  },
  defaultVariants: {
    colorPalette: 'blue',
    variant: 'primary',
    size: 'md',
  },
  variants: {
    colorPalette: {
      blue: {
        colorPalette: 'blue',
      },
      purple: {
        colorPalette: 'purple',
      },
    },
    variant: {
      primary: {
        color: {
          base: 'white',
        },
        backgroundColor: {
          base: 'purple.600',
          hover: {
            base: 'purple.700',
          },
        },
      },
    },

    size: {
      sm: {
        h: 9,
        minW: 9,
        fontSize: 'sm',
        px: 3.5,
      },
      md: {
        h: 10,
        minW: 10,
        fontSize: 'sm',
        px: 4,
      },
      lg: {
        h: 11,
        minW: 11,
        // px: '4.5', TODO
        px: '1.125rem',
        fontSize: 'md',
      },
      xl: {
        h: 12,
        minW: 12,
        px: 5,
        fontSize: 'md',
      },
      '2xl': {
        h: 15,
        minW: 15,
        px: 7,
        fontSize: 'lg',
      },
    },
  },
})
