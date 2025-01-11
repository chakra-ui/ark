import { defineSlotRecipe } from '@pandacss/dev'

export const tour = defineSlotRecipe({
  className: 'tour',
  slots: [
    'actionTrigger',
    'arrow',
    'arrowTip',
    'backdrop',
    'closeTrigger',
    'content',
    'control',
    'description',
    'positioner',
    'progressText',
    'spotlight',
    'title',
  ],
  base: {
    backdrop: {
      backdropFilter: 'blur(4px)',
      background: {
        _light: 'white.a10',
        _dark: 'black.a10',
      },
      // height: '100%',
      // left: '0',
      // position: 'fixed',
      // top: '0',
      // width: '100vw',
      zIndex: 'overlay',
      _open: {
        animation: 'backdrop-in',
      },
      _closed: {
        animation: 'backdrop-out',
      },
    },
    content: {
      position: 'relative',
      background: 'bg.default',
      borderRadius: 'l3',
      boxShadow: 'lg',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 'sm',
      p: '4',
    },
    positioner: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      zIndex: 'modal!',
      "&[data-type='dialog']": {
        inset: 0,
        position: 'fixed',
      },
      '&[data-type="tooltip"]': {
        position: 'absolute',
      },
    },
    control: {
      display: 'flex',
      gap: '3',
    },
    arrow: {
      '--arrow-size': 'var(--sizes-3)',
      '--arrow-background': 'var(--colors-bg-default)',
    },
    arrowTip: {
      borderTopWidth: '1px',
      borderLeftWidth: '1px',
    },
    title: {
      fontWeight: 'medium',
      textStyle: 'sm',
    },
    description: {
      color: 'fg.muted',
      textStyle: 'sm',
    },
    closeTrigger: {
      position: 'absolute',
      top: '3',
      right: '3',
    },
  },
})
