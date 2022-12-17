import { defineRecipe } from 'css-panda'

export const button = defineRecipe({
  name: 'button',
  description: 'A button styles',
  base: {
    alignItems: 'center',
    appearance: 'none',
    borderRadius: 'lg',
    cursor: 'pointer',
    display: 'inline-flex',
    fontWeight: 'semibold',
    justifyContent: 'center',
    outline: 'none',
    position: 'relative',
    transitionProperty: 'base',
    transitionDuration: '100',
    transitionTimingFunction: 'ease-out',
    userSelect: 'none',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
  variants: {
    variant: {
      primary: {
        color: 'fg.inverted.default',
        backgroundColor: 'accent.default',
        _hover: {
          backgroundColor: 'accent.emphasized',
        },
        _focusVisible: {
          '--shadow': {
            base: 'colors.purple.100',
            _dark: 'colors.gray.100',
          },
          boxShadow: '0 0 0 4px var(--shadow)',
        },
      },
      secondary: {
        background: 'bg.surface',
        borderWidth: '1px',
        borderColor: 'border.emphasized',
        boxShadow: 'xs',
        color: 'fg.emphasized',
        _hover: {
          color: 'fg.default',
          background: 'bg.subtle',
          _disabled: {
            borderColor: 'border.default',
            color: 'fg.subtle',
            cursor: 'not-allowed',
          },
        },
        _selected: {
          background: 'bg.subtle',
        },
        _focusVisible: {
          '--shadow': {
            base: 'colors.gray.100',
            _dark: 'colors.gray.900',
          },
          boxShadow: '0 0 0 4px var(--shadow)',
        },
        _disabled: {
          borderColor: 'border.default',
          color: 'fg.subtle',
          cursor: 'not-allowed',
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
        px: '4.5',
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
