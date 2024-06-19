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
      alignItems: 'baseline',
      textStyle: { base: 'md', md: 'sm' },
      fontWeight: 'medium',
      color: 'fg.muted',
      gap: '2',
      py: '1.5',
      textDecoration: 'none',
      transitionDuration: 'normal',
      transitionProperty: 'color',
      transitionTimingFunction: 'default',
      _hover: {
        color: 'fg.default',
      },
      _currentPage: {
        color: 'accent.default',
        _hover: {
          color: 'accent.default',
        },
      },
    },
    group: {
      pt: '2.5',
      pb: '3',
    },
  },
})
