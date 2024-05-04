import { sva } from 'styled-system/css'

export const recipe = sva({
  slots: ['root', 'list', 'item', 'header', 'link', 'content', 'indicator'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '3',
    },
    list: {
      position: 'relative',
      "&[data-depth='1']": {
        _before: {
          bg: 'border.default',
          content: '""',
          height: 'full',
          left: '3',
          position: 'absolute',
          width: '1px',
          zIndex: '1',
        },
      },
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
    item: {
      borderRadius: 'l2',
      color: 'fg.muted',
      fontWeight: 'medium',
      position: 'relative',
      textStyle: 'sm',
    },
    link: {
      display: 'flex',
      gap: '2',
      ps: 'calc(((var(--depth) - 1) * 22px) + 22px)',
      pe: '1',
      py: '1.5',
      transitionDuration: 'normal',
      transitionProperty: 'background, color',
      transitionTimingFunction: 'default',
      _hover: {
        background: 'gray.a2',
        color: 'fg.default',
      },
      _currentPage: {
        background: 'accent.a2',
        color: 'accent.text',
        fontWeight: 'semibold',
        _hover: {
          background: 'accent.a2',
          color: 'accent.text',
        },
        _before: {
          content: '""',
          position: 'absolute',
          left: '3',
          top: '0',
          width: '2px',
          height: 'full',
          bg: 'accent.default',
          zIndex: '1',
        },
      },
    },
    header: {
      alignItems: 'center',
      borderRadius: 'l2',
      color: 'fg.muted',
      cursor: 'pointer',
      display: 'flex',
      fontWeight: 'medium',
      gap: '1.5',
      ps: 'calc((var(--depth) - 1) * 22px)',
      py: '1.5',
      textStyle: 'sm',
      transitionDuration: 'normal',
      transitionProperty: 'background, color',
      transitionTimingFunction: 'default',
      width: 'full',
      _hover: {
        background: 'gray.a2',
        color: 'fg.default',
      },
      "&[data-depth='1']": {
        ps: '1',
        fontWeight: 'semibold',
        color: 'fg.default',
      },
    },
  },
})
