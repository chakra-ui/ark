import { defineSlotRecipe } from '@pandacss/dev'

export const alert = defineSlotRecipe({
  className: 'alert',
  slots: ['root', 'content', 'description', 'icon', 'title'],
  base: {
    root: {
      background: 'bg.default',
      borderWidth: '1px',
      borderRadius: 'l3',
      display: 'flex',
      gap: '3',
      p: '4',
      width: 'full',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
    },
    description: {
      color: 'fg.muted',
      textStyle: 'sm',
    },
    icon: {
      color: 'fg.default',
      flexShrink: '0',
      width: '5',
      height: '5',
    },
    title: {
      color: 'fg.default',
      fontWeight: 'semibold',
      textStyle: 'sm',
    },
  },
})
