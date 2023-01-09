import { defineRecipe } from 'css-panda'

export const link = defineRecipe({
  name: 'link',
  description: 'A link styles',
  base: {
    transitionProperty: 'base',
    transitionDuration: '100',
    transitionTimingFunction: 'ease-out',
    cursor: 'pointer',
    textDecoration: 'none',
    outline: 'none',
    _focusVisible: {
      boxShadow: 'outline',
    },
  },
  defaultVariants: {},
  variants: {
    variant: {
      sidebar: {
        display: 'flex',
        alignSelf: 'stretch',
        borderLeftWidth: '1px',
        color: 'fg.muted',
        ml: '-1px',
        pl: '4',
        textStyle: 'sm',
        lineHeight: '1.5rem',
        _hover: { color: 'fg.default', borderLeftColor: 'fg.muted' },
        _currentPage: {
          color: 'accent.default',
          fontWeight: 'semibold',
          borderColor: 'accent.default',
        },
      },
      toc: {
        display: 'flex',
        alignSelf: 'stretch',
        color: 'fg.muted',
        textStyle: 'sm',
        lineHeight: '1.5rem',
        _hover: { color: 'fg.default', borderLeftColor: 'fg.muted' },
        _currentPage: {
          color: 'accent.default',
          fontWeight: 'semibold',
          borderColor: 'accent.default',
        },
      },
    },
  },
})
