import { menuAnatomy } from '@ark-ui/react'
import { defineParts, defineRecipe } from '@pandacss/dev'

const parts = defineParts(menuAnatomy.build())

const baseItemStyle = {
  alignItems: 'center',
  borderRadius: 'md',
  color: 'fg.emphasized',
  cursor: 'pointer',
  display: 'flex',
  my: '1',
  textStyle: 'sm',
  _focus: {
    background: 'bg.subtle',
  },
  _selected: {
    background: 'bg.subtle',
  },
} as const

export const menu = defineRecipe({
  name: 'menu',
  description: 'A menu style',
  base: parts({
    positioner: {
      zIndex: '100',
    },
    separator: {
      borderBottomWidth: '1px',
      my: '1',
    },
    itemGroupLabel: {
      fontWeight: 'semibold',
      px: '2.5',
      py: '3',
      textStyle: 'sm',
    },
    content: {
      background: 'bg.surface',
      borderRadius: 'lg',
      borderWidth: '1px',
      boxShadow: 'lg',
      minWidth: '15rem',
      px: '1.5',
      py: '0.5',
      outline: 'none',
    },
    item: {
      ...baseItemStyle,
      px: '2.5',
      py: '2',
    },
    optionItem: {
      ...baseItemStyle,
      '& > *': {
        flex: '1',
        px: '2.5',
        py: '2',
      },
    },
    triggerItem: {
      ...baseItemStyle,
      px: '2.5',
      py: '2',
    },
  }),
})
