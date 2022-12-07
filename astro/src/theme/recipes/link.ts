import { defineRecipe } from 'css-panda'

export const link = defineRecipe({
  name: 'link',
  description: 'A link styles',
  base: {
    transitionProperty: 'common',
    transitionDuration: 'fast',
    transitionTimingFunction: 'ease-out',
    cursor: 'pointer',
    textDecoration: 'none',
    outline: 'none',
    color: 'inherit',
    fontWeight: 'medium',
    _hover: {
      textDecoration: 'none',
      color: 'purple.600',
      _dark: {
        color: 'purple.500',
      },
    },
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
        textStyle: 'sm',
        py: '1.5',
        px: '2',
        borderRadius: 'sm',
        _hover: {
          color: 'default',
          backgroundColor: 'gray.100',
        },
      },
    },
  },
})
