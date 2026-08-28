import { defineRecipe } from '@pandacss/dev'

export const icon = defineRecipe({
  className: 'icon',
  base: {
    color: 'currentcolor',
    display: 'inline-block',
    flexShrink: '0',
    verticalAlign: 'middle',
    lineHeight: '1em',
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      xs: {
        w: '3',
        h: '3',
      },
      sm: {
        w: '4',
        h: '4',
      },
      md: {
        w: '5',
        h: '5',
      },
      lg: {
        w: '6',
        h: '6',
      },
      xl: {
        w: '7',
        h: '7',
      },
      '2xl': {
        w: '8',
        h: '8',
      },
    },
  },
})
