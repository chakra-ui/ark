import { defineRecipe } from '@pandacss/dev'

export const kbd = defineRecipe({
  className: 'kbd',
  base: {
    alignItems: 'center',
    bg: 'bg.subtle',
    borderRadius: 'l2',
    boxShadow: '0 -2px 0 0 inset var(--colors-border-muted), 0 0 0 1px inset var(--colors-border-muted)',
    color: 'fg.default',
    display: 'inline-flex',
    fontFamily: 'mono',
    fontWeight: 'medium',
    whiteSpace: 'pre',
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
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
