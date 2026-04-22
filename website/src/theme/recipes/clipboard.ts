import { clipboardAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const clipboard = defineSlotRecipe({
  className: 'clipboard',
  slots: clipboardAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
    },
    control: {
      display: 'flex',
      gap: '3',
    },
  },
})
