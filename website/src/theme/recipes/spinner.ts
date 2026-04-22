import { defineRecipe } from '@pandacss/dev'

export const spinner = defineRecipe({
  className: 'spinner',
  base: {
    display: 'inline-block',
    borderWidth: '2px',
    borderColor: 'colorPalette.default',
    borderStyle: 'solid',
    borderRadius: 'full',
    width: 'var(--size)',
    height: 'var(--size)',
    animation: 'spin',
    animationDuration: 'slowest',
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      xs: { '--size': 'sizes.3' },
      sm: { '--size': 'sizes.4' },
      md: { '--size': 'sizes.6' },
      lg: { '--size': 'sizes.8' },
      xl: { '--size': 'sizes.12' },
    },
  },
})
