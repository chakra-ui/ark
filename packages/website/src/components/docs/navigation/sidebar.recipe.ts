import { sva } from 'styled-system/css'

export const recipe = sva({
  slots: ['root', 'list', 'item', 'header', 'link', 'content'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4',
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
    item: {
      borderRadius: 'l2',
      color: 'fg.muted',
      fontWeight: 'medium',
      position: 'relative',
      textStyle: 'sm',
    },
    link: {
      display: 'block',
      ps: 'calc(((var(--depth) - 1) * 22px) + 22px)',
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
        _hover: {
          background: 'accent.a2',
          color: 'accent.text',
        },
        _before: {
          content: '""',
          position: 'absolute',
          left: '3',
          top: '0',
          width: '1px',
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
    content: {
      _open: {
        animation: 'slide-down 250ms {easings.emphasized-in}',
      },
      _closed: {
        animation: 'slide-up 200ms {easings.emphasized-out}',
      },
    },
  },
})
