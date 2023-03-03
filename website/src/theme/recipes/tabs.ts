import { tabsAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(tabsAnatomy.build())

export const tabs = defineRecipe({
  name: 'tabs',
  description: 'A tabs style',
  base: parts({
    root: {
      width: 'full',
    },
    tablist: {
      alignItems: 'center',
      background: {
        base: 'gray.200',
        _dark: 'brown.600',
      },
      borderRadius: 'lg',
      display: 'inline-flex',
      gap: '8',
      position: 'relative',
      px: '6',
    },
    trigger: {
      background: 'transparent',
      cursor: 'pointer',
      color: 'fg.muted',
      display: 'inline-flex',
      fontWeight: 'medium',

      _selected: {
        color: 'fg.default',
      },
      _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
      },
    },
    indicator: {
      height: '2px',
      background: 'orange.400',
      bottom: '0',
    },
    content: {
      background: 'brown.700',
      minH: 'xl',
      py: '10',
      px: '6',
    },
  }),
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      md: parts({
        tablist: {
          height: '10',
        },
        trigger: {
          textStyle: 'sm',
          px: '1',
        },
      }),
    },
  },
})
