import { treeViewAnatomy } from '@ark-ui/react/anatomy'
import { defineSlotRecipe } from '@pandacss/dev'

export const treeView = defineSlotRecipe({
  className: 'treeView',
  slots: treeViewAnatomy.keys(),
  base: {
    root: {
      width: 'full',
    },
    nodeGroup: {
      "&[data-depth='1'] > [data-tree-view-node-group-content]": {
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
    nodeGroupContent: {
      position: 'relative',
    },
    indentGuide: {},
    node: {
      alignItems: 'center',
      borderRadius: 'l2',
      color: 'fg.muted',
      cursor: 'pointer',
      display: 'flex',
      fontWeight: 'medium',
      gap: '1.5',
      py: '1.5',
      textStyle: 'sm',
      transitionDuration: 'normal',
      transitionProperty: 'background, color',
      transitionTimingFunction: 'default',
      _hover: {
        background: 'gray.a2',
        color: 'fg.default',
      },
      '&[data-branch]': {
        ps: 'calc((var(--depth) - 1) * 22px)',
        "&[data-depth='1']": {
          ps: '1',
          '& [data-tree-view-node-text]': {
            fontWeight: 'semibold',
            color: 'fg.default',
          },
        },
      },
      '&:not([data-branch])': {
        gap: '2',
        position: 'relative',
        ps: 'calc(((var(--depth) - 1) * 22px) + 22px)',
        "&[data-depth='1']": {
          ps: '6',
          fontWeight: 'semibold',
          color: 'fg.default',
          _selected: {
            _before: {
              bg: 'transparent',
            },
          },
        },
        _selected: {
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
            width: '2px',
            height: 'full',
            bg: 'accent.default',
            zIndex: '1',
          },
        },
      },
    },
    nodeIndicator: {
      "&[data-type='expanded']": {
        color: 'accent.default',
        transformOrigin: 'center',
        transitionDuration: 'normal',
        transitionProperty: 'transform',
        transitionTimingFunction: 'default',
        '& svg': {
          fontSize: 'md',
          width: '4',
          height: '4',
        },
        _open: {
          transform: 'rotate(90deg)',
        },
      },
    },
    tree: {
      display: 'flex',
      flexDirection: 'column',
      gap: '3',
    },
  },
})
