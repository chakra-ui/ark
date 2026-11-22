import { sva } from 'styled-system/css'

export const recipe = sva({
  slots: ['root', 'group', 'label', 'list', 'link'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6',
    },
    group: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      display: 'block',
      textStyle: { base: 'md', md: 'sm' },
      fontWeight: 'semibold',
      color: 'fg.default',
      pb: '2',
      '&[href]': {
        _hover: { color: 'colorPalette.default' },
      },
      '&[aria-current=page]': {
        color: 'colorPalette.default',
      },
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5',
      textStyle: { base: 'md', md: 'sm' },
      fontWeight: 'medium',
      color: 'fg.muted',
      ps: '3',
      py: '1.5',
      textDecoration: 'none',
      transitionProperty: 'color',
      transitionDuration: 'normal',
      transitionTimingFunction: 'default',
      _hover: {
        color: 'fg.default',
      },
      _currentPage: {
        color: 'colorPalette.default',
        _hover: { color: 'colorPalette.default' },
      },
    },
  },
})
