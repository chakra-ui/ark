import { defineSlotRecipe } from '@pandacss/dev'

export const tabBar = defineSlotRecipe({
  className: 'tabBar',
  slots: ['root', 'list', 'link'],
  base: {
    root: {
      borderBottomWidth: '1px',
      borderColor: 'border.default',
      bg: 'bg.canvas',
    },
    list: {
      display: 'flex',
      alignItems: 'center',
      gap: '1',
      maxW: '1440px',
      mx: 'auto',
      px: { base: '4', md: '8' },
      height: 'var(--tabbar-height)',
      overflowX: 'auto',
    },
    link: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      px: '3',
      height: 'full',
      whiteSpace: 'nowrap',
      textStyle: 'sm',
      fontWeight: 'semibold',
      color: 'fg.muted',
      transitionProperty: 'color',
      transitionDuration: 'normal',
      '& svg': { width: '4', height: '4' },
      _hover: { color: 'fg.default' },
      _after: {
        content: '""',
        position: 'absolute',
        left: '3',
        right: '3',
        bottom: '0',
        height: '2px',
        background: 'transparent',
        transitionProperty: 'background',
        transitionDuration: 'normal',
      },
      _currentPage: {
        color: 'fg.default',
        _after: { background: 'var(--colors-color-palette-default)' },
      },
    },
  },
})
