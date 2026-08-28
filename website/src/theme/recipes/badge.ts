import { defineRecipe } from '@pandacss/dev'

export const badge = defineRecipe({
  className: 'badge',
  base: {
    alignItems: 'center',
    borderRadius: 'full',
    display: 'inline-flex',
    fontWeight: 'medium',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  },
  defaultVariants: {
    variant: 'subtle',
    size: 'md',
  },
  variants: {
    variant: {
      solid: {
        background: 'colorPalette.default',
        color: 'colorPalette.fg',
      },
      subtle: {
        background: 'bg.subtle',
        borderColor: 'border.subtle',
        borderWidth: '1px',
        color: 'fg.default',
        '& svg': {
          color: 'fg.muted',
        },
      },
      outline: {
        color: 'fg.default',
        borderWidth: '2px',
        borderColor: 'border.default',
      },
    },
    size: {
      sm: {
        textStyle: 'xs',
        px: '2',
        h: '5',
        gap: '1',
        '& svg': {
          width: '3',
          height: '3',
        },
      },
      md: {
        textStyle: 'xs',
        px: '2.5',
        h: '6',
        gap: '1.5',
        '& svg': {
          width: '4',
          height: '4',
        },
      },
      lg: {
        textStyle: 'sm',
        px: '3',
        h: '7',
        gap: '1.5',
        '& svg': {
          width: '4',
          height: '4',
        },
      },
    },
  },
})
