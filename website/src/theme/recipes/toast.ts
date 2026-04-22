import { toastAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const toast = defineSlotRecipe({
  className: 'toast',
  slots: toastAnatomy.keys(),
  base: {
    root: {
      background: 'bg.default',
      borderRadius: 'l3',
      boxShadow: 'lg',
      minWidth: 'xs',
      height: 'var(--height)',
      opacity: 'var(--opacity)',
      overflowWrap: 'anywhere',
      p: '4',
      position: 'relative',
      scale: 'var(--scale)',
      translate: 'var(--x) var(--y) 0',
      willChange: 'translate, opacity, scale',
      zIndex: 'var(--z-index)',
      transitionDuration: 'slow',
      transitionProperty: 'translate, scale, opacity, height',
      transitionTimingFunction: 'default',
    },
    title: {
      color: 'fg.default',
      fontWeight: 'semibold',
      textStyle: 'sm',
    },
    description: {
      color: 'fg.muted',
      textStyle: 'sm',
    },
    actionTrigger: {
      mt: '2',
    },
    closeTrigger: {
      position: 'absolute',
      top: '3',
      right: '3',
    },
  },
})
