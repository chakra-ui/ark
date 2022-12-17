import { defineRecipe } from 'css-panda'

export const input = defineRecipe({
  name: 'input',
  description: 'An input style',
  base: {
    width: '100%',
    minWidth: 0,
    outline: 0,
    position: 'relative',
    appearance: 'none',
    transitionProperty: 'base',
    transitionDuration: '100',
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
  variants: {
    variant: {
      outline: {
        borderRadius: 'lg',
        borderWidth: '1px',
        boxShadow: 'xs',
        color: 'fg.default',
        background: 'bg.surface',
        borderColor: 'border.input',
        _focus: {
          zIndex: 1,
          '--shadow': {
            base: 'colors.purple.500',
            _dark: 'colors.purple.200',
          },
          boxShadow: '0 0 0 1px var(--shadow)',
          borderColor: 'accent.default',
        },
      },
    },
    size: {
      sm: { px: '2.5', h: '9', textStyle: 'sm' },
      md: { px: '3', h: '10', textStyle: 'md' },
      lg: { px: '3.5', h: '11', textStyle: 'md' },
      xl: { px: '4', h: '12', textStyle: 'md' },
    },
  },
})
