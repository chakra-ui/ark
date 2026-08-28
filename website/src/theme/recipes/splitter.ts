import { splitterAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const splitter = defineSlotRecipe({
  className: 'splitter',
  slots: splitterAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      gap: '2',
    },
    panel: {
      borderWidth: '1px',
      background: 'bg.default',
      borderRadius: 'l2',
      color: 'fg.muted',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    resizeTrigger: {
      borderRadius: 'full',
      transitionDuration: 'normal',
      transitionProperty: 'background',
      transitionTimingFunction: 'default',
      outline: '0',
      background: 'gray.7',
      _hover: {
        background: 'gray.8',
      },
      _active: {
        background: 'gray.8',
      },
      _horizontal: {
        minWidth: '1.5',
        margin: 'min(1rem, 20%) 0',
      },
      _vertical: {
        minHeight: '1.5',
        margin: '0 min(1rem, 20%)',
      },
    },
  },
})
