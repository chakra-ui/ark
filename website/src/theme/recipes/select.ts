import { selectAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(selectAnatomy.build())

export const select = defineRecipe({
  name: 'select',
  description: 'A select style',
  base: parts({
    content: {
      background: 'bg.surface',
      borderRadius: 'lg',
      borderWidth: '1px',
      boxShadow: 'lg',
      listStyle: 'none',
      maxW: 'calc(100vw - 1rem)',
      p: '1',
    },
    trigger: {
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      outline: 0,
      position: 'relative',
      appearance: 'none',
      transitionProperty: 'base',
      transitionDuration: '100',
      width: 'full',

      _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
      },
    },
    option: {
      borderRadius: 'md',
      cursor: 'pointer',
      mb: '1',
      _hover: {
        background: 'bg.subtle',
      },
      _selected: {
        background: 'bg.subtle',
      },
      _focus: {
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
          color: 'fg.default',
          textAlign: 'left',
          width: 'full',
          _focus: {
            zIndex: 1,
            '--shadow': {
              base: 'colors.orange.400',
              _dark: 'colors.orange.400',
            },
            boxShadow: 'inset 0 0 0 1px var(--shadow)',
            borderColor: 'accent.default',
          },
        },
      }),
    },
    size: {
      xs: parts({
        trigger: { px: '2', h: '8', maxW: '2xs', textStyle: 'sm' },
        content: { w: '2xs' },
        option: { textStyle: 'sm', p: '1' },
      }),
      sm: parts({
        trigger: { px: '2.5', h: '9', maxW: '2xs', textStyle: 'sm' },
        content: { w: '2xs' },
        option: { textStyle: 'sm', p: '1.5' },
      }),
      md: parts({
        trigger: { px: '3', h: '10', maxW: 'xs', textStyle: 'md' },
        content: { w: 'xs' },
        option: { textStyle: 'md', p: '2' },
      }),
      lg: parts({
        trigger: { px: '3.5', h: '11', maxW: 'xs', textStyle: 'md' },
        content: { w: 'xs' },
        option: { textStyle: 'md' },
      }),
      xl: parts({
        trigger: { px: '4', h: '12', maxW: 'xs', textStyle: 'md' },
        content: { w: 'xs' },
        option: { textStyle: 'md' },
      }),
      '2xl': parts({
        trigger: { px: '2', h: '16', maxW: 'xs', textStyle: '3xl' },
        content: { w: 'xs' },
        option: { textStyle: '3xl' },
      }),
    },
  },
})
