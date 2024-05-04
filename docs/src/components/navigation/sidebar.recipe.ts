import { sva } from 'styled-system/css'

export const recipe = sva({
  slots: ['root', 'item', 'trigger', 'link', 'group', 'indicator'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    indicator: {
      color: 'fg.muted',
      transformOrigin: 'center',
      transitionDuration: 'normal',
      transitionProperty: 'transform',
      transitionTimingFunction: 'default',
      _open: {
        transform: 'rotate(90deg)',
      },
    },
    trigger: {
      display: 'flex',
      width: 'full',
      textStyle: 'sm',
      fontWeight: 'bold',
      py: '1.5',
    },
    link: {
      display: 'flex',
      textStyle: 'sm',
      color: 'fg.muted',
      py: '1.5',
      textDecoration: 'none',
    },
    group: {
      borderTopWidth: '1px',
      pt: '2.5',
      pb: '6',
    },
  },
})
