'use client'
import type { Assign } from '@ark-ui/react'
import { JsonTreeView } from '@ark-ui/react/json-tree-view'
import { treeViewAnatomy } from '@ark-ui/react/tree-view'
import { sva } from 'styled-system/css'
import type { HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

export const jsonTreeView = sva({
  slots: treeViewAnatomy.keys(),
  base: {
    root: {
      width: 'full',
      color: 'fg.default',
      fontFamily: 'mono',

      '& [data-part="branch-content"]': {
        position: 'relative',
      },

      '& [data-part="branch-indent-guide"]': {
        height: '100%',
        width: '1px',
        bg: 'border.default',
        position: 'absolute',
        insetStart: 'calc((var(--depth) - 1) * 16px)',
        "&[data-depth='1']": {
          insetStart: '3',
        },
      },

      '& [data-part="branch-control"]': {
        display: 'flex',
        alignItems: 'baseline',
        ps: 'calc((var(--depth) - 1) * 12px)',
        userSelect: 'none',
        "&[data-depth='1']": {
          ps: '1',
        },
        _hover: {
          background: 'gray.a2',
        },
      },

      '& [data-part="branch-indicator"]': {
        transformOrigin: 'center',
        transitionDuration: 'normal',
        transitionProperty: 'transform',
        transitionTimingFunction: 'default',
        position: 'relative',
        top: '1',
        me: '1',

        _open: {
          transform: 'rotate(90deg)',
        },
      },

      '& [data-part="item"]': {
        display: 'flex',
        alignItems: 'baseline',
        position: 'relative',
        ps: 'calc(((var(--depth) - 1) * 12px) + 12px)',
        "&[data-depth='1']": {
          ps: '6',
        },
        _hover: {
          background: 'gray.a2',
        },
      },

      '& [data-part="item-text"], & [data-part="branch-text"]': {
        display: 'flex',
        alignItems: 'baseline',
      },
    },

    tree: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: 'xs',
      lineHeight: '1.8',
      fontFamily: 'mono',
      '& svg': {
        width: '4',
        height: '4',
      },

      // JSON value styling
      '& [data-type="string"]': {
        color: 'fg.error',
      },
      '& [data-type="number"]': {
        color: 'fg.info',
      },
      '& [data-type="boolean"]': {
        color: 'fg.warning',
        fontWeight: 'semibold',
      },
      '& [data-type="null"]': {
        color: 'fg.muted',
        fontWeight: 'semibold',
        fontStyle: 'italic',
      },
      '& [data-type="undefined"]': {
        color: 'fg.muted',
        fontWeight: 'semibold',
        fontStyle: 'italic',
      },
      // Object and array brackets
      '& [data-kind="brace"]': {
        color: 'fg.default',
        fontWeight: 'bold',
      },
      // Object keys
      '& [data-kind="key"]': {
        color: 'fg.success',
        fontWeight: 'medium',
      },
      // Colon separator
      '& [data-kind="colon"]': {
        color: 'fg.subtle',
        mx: '1',
      },
      // Function styling
      '& [data-type="function"]': {
        color: 'fg.warning',
        fontStyle: 'italic',
      },
      // Date styling
      '& [data-type="date"]': {
        color: 'fg.info',
      },
      // Error styling
      '& [data-type="error"]': {
        color: 'fg.error',
        fontWeight: 'medium',
      },
      // Regex styling
      '& [data-type="regex"]': {
        color: 'fg.accent',
      },
      // Preview text (for collapsed objects/arrays)
      '& [data-kind="preview-text"]': {
        color: 'fg.muted',
        fontStyle: 'italic',
      },
      // Constructor names
      '& [data-kind="constructor"]': {
        color: 'fg.accent',
        fontWeight: 'medium',
      },
    },
  },
})

const { withProvider, withContext } = createStyleContext(jsonTreeView)

export const Root = withProvider<HTMLDivElement, Assign<HTMLStyledProps<'div'>, JsonTreeView.RootProps>>(
  JsonTreeView.Root,
  'root',
)

export const Tree = withContext<HTMLDivElement, Assign<HTMLStyledProps<'div'>, JsonTreeView.TreeProps>>(
  JsonTreeView.Tree,
  'tree',
)

export { JsonTreeView as JsonTreeViewNamespace }
