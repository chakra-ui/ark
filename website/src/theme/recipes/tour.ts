import { tourAnatomy } from '@ark-ui/react/tour'
import { defineSlotRecipe } from '@pandacss/dev'

export const tour = defineSlotRecipe({
  className: 'tour',
  slots: tourAnatomy.keys(),
  base: {
    backdrop: {
      backdropFilter: 'blur(4px)',
      background: {
        _light: 'white.a10',
        _dark: 'black.a10',
      },
      height: '100vh',
      left: '0',
      position: 'fixed',
      top: '0',
      width: '100vw',
      zIndex: 'overlay',
      _open: {
        animation: 'backdrop-in',
      },
      _closed: {
        animation: 'backdrop-out',
      },
    },
    positioner: {},
    content: {
      background: 'bg.default',
      borderRadius: 'l3',
      boxShadow: 'lg',
      minW: 'sm',
      position: 'relative',
      _open: {
        animation: 'dialog-in',
      },
      _closed: {
        animation: 'dialog-out',
      },
    },
  },
})
