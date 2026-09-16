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
      textStyle: { base: 'md', md: 'sm' },
      fontWeight: 'semibold',
      color: 'fg.default',
      pb: '2',
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      borderInlineStartWidth: '1px',
      borderColor: 'border.default',
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '2',
      textStyle: { base: 'md', md: 'sm' },
      fontWeight: 'medium',
      color: 'fg.muted',
      ms: '-1px',
      ps: '4',
      py: '1.5',
      borderInlineStartWidth: '1px',
      borderColor: 'transparent',
      textDecoration: 'none',
      transitionProperty: 'color, border-color',
      transitionDuration: 'normal',
      transitionTimingFunction: 'default',
      _hover: {
        color: 'fg.default',
      },
      _currentPage: {
        color: 'colorPalette.default',
        borderColor: 'colorPalette.default',
        _hover: { color: 'colorPalette.default' },
      },
    },
  },
})
