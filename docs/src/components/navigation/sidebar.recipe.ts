import { sva } from 'styled-system/css'

export const recipe = sva({
  slots: ['root', 'item', 'trigger', 'link', 'group', 'indicator'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      borderTopWidth: '1px',
    },
    indicator: {
      color: 'fg.muted',
      transformOrigin: 'center',
      transitionDuration: 'normal',
      transitionProperty: 'transform',
      transitionTimingFunction: 'default',
    },
    trigger: {
      alignItems: 'center',
      cursor: 'pointer',
      justifyContent: 'space-between',
      display: 'flex',
      width: 'full',
      textStyle: 'sm',
      fontWeight: 'semibold',
      textTransform: 'capitalize',
      py: '1.5',
      _expanded: {
        '& > svg': {
          transform: 'rotate(90deg)',
        },
      },
    },
    link: {
      display: 'flex',
      textStyle: 'sm',
      fontWeight: 'medium',
      color: 'fg.muted',
      py: '1.5',
      textDecoration: 'none',
      _currentPage: {
        color: '#EB5E41',
      },
    },
    group: {
      pt: '2.5',
      pb: '4',
    },
  },
})
