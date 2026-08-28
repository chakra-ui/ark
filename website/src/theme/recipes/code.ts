import { defineRecipe } from '@pandacss/dev'

export const code = defineRecipe({
  className: 'code',
  base: {
    alignItems: 'center',
    bg: 'bg.subtle',
    borderRadius: 'l2',
    color: 'fg.default',
    display: 'inline-flex',
    fontWeight: 'medium!',
    fontFamily: 'mono',
    whiteSpace: 'pre',
  },
  defaultVariants: {
    size: 'md',
    variant: 'outline',
  },
  variants: {
    variant: {
      outline: {
        borderWidth: '1px',
      },
      ghost: {},
    },
    size: {
      sm: {
        minHeight: '5',
        px: '0.5',
        textStyle: 'xs',
      },
      md: {
        minHeight: '6',
        textStyle: 'sm',
        px: '1',
        py: '1px',
      },
      lg: {
        minHeight: '7',
        px: '1.5',
        py: '1px',
        textStyle: 'md',
      },
    },
  },
})
