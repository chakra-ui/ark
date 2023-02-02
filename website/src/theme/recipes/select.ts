import { selectAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from 'css-panda'

const parts = defineParts(selectAnatomy.build())

export const select = defineRecipe({
  name: 'select',
  description: 'A select style',
  base: parts({
    positioner: {
      background: 'bg.surface',
      borderRadius: 'lg',
      borderWidth: '1px',
      boxShadow: 'lg',
      minWidth: 'max-content',
    },
    content: {
      maxW: 'calc(100vw - 1rem)',
      listStyle: 'none',
      p: '1',
    },
    trigger: {
      w: 'full',
      outline: 0,
      position: 'relative',
      appearance: 'none',
      cursor: 'pointer',
      transitionProperty: 'base',
      transitionDuration: '100',
      _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
      },
    },
    option: {
      borderRadius: 'md',
      cursor: 'pointer',
      mb: '1',
      p: '2',
      textStyle: 'md',
      _hover: {
        background: 'bg.subtle',
      },
      _selected: {
        background: 'bg.subtle',
      },
      _last: {
        mb: '0',
      },
    },
  }),
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
  variants: {
    variant: {
      outline: parts({
        trigger: {
          background: 'bg.surface',
          borderColor: 'border.emphasized',
          borderRadius: 'lg',
          borderWidth: '1px',
          boxShadow: 'xs',
          color: 'fg.default',
          textAlign: 'left',
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
      }),
    },
    size: {
      xs: parts({
        trigger: { px: '2', h: '8', maxW: '2xs', textStyle: 'sm' },
        content: { w: '2xs' },
      }),
      sm: parts({
        trigger: { px: '2.5', h: '9', maxW: '2xs', textStyle: 'sm' },
        content: { w: '2xs' },
      }),
      md: parts({
        trigger: { px: '3', h: '10', maxW: 'xs', textStyle: 'md' },
        content: { w: 'xs' },
      }),
      lg: parts({
        trigger: { px: '3.5', h: '11', maxW: 'xs', textStyle: 'md' },
        content: { w: 'xs' },
      }),
      xl: parts({
        trigger: { px: '4', h: '12', maxW: 'xs', textStyle: 'md' },
        content: { w: 'xs' },
      }),
      '2xl': parts({
        trigger: { px: '2', h: '16', maxW: 'xs', textStyle: '3xl' },
        content: { w: 'xs' },
      }),
    },
  },
})
