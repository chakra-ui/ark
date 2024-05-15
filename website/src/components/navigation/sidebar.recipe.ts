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
    },
    trigger: {
      alignItems: 'center',
      cursor: 'pointer',
      justifyContent: 'space-between',
      display: 'flex',
      width: 'full',
      textStyle: { base: 'md', md: 'sm' },
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
      textStyle: { base: 'md', md: 'sm' },
      fontWeight: 'medium',
      color: 'fg.muted',
      py: '1.5',
      textDecoration: 'none',
      _currentPage: {
        color: 'accent.default',
      },
    },
    group: {
      pt: '2.5',
      pb: '3',
    },
  },
})
