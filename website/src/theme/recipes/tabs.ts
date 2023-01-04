import { tabsAnatomy } from '@ark-ui/react'
import { defineRecipe } from 'css-panda'
import { defineParts } from './define-parts'

const parts = defineParts(tabsAnatomy.build())

export const tabs = defineRecipe({
  name: 'tabs',
  description: 'A tabs style',
  base: parts({
    root: {},
    tablist: {
      borderBottomWidth: '1px',
      position: 'relative',
    },
    trigger: {
      background: 'transparent',
      cursor: 'pointer',
      color: 'fg.muted',
      fontWeight: 'semibold',
      mr: '4',
      pt: '0',
      pb: '3',
      _selected: {
        color: 'accent.default',
      },
      _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
      },
      _last: {
        mr: '0',
      },
    },
    indicator: {
      height: '0.5',
      background: 'accent.default',
      bottom: '-1px',
    },
    content: {
      py: '10',
    },
  }),
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      sm: parts({
        trigger: {
          textStyle: 'sm',
          px: '2',
        },
      }),
      md: parts({
        trigger: {
          textStyle: 'md',
          px: '3',
        },
      }),
    },
  },
})
