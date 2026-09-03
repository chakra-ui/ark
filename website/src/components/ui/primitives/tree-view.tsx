'use client'
import type { Assign } from '@ark-ui/react'
import { type TreeNode, TreeView, treeViewAnatomy } from '@ark-ui/react/tree-view'
import { sva } from 'styled-system/css'
import type { TreeViewVariantProps } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

export const treeView = sva({
  slots: treeViewAnatomy.keys(),
  base: {
    root: {
      width: 'full',
      color: 'fg.default',
    },
    nodeGroupContent: {
      position: 'relative',
      overflow: 'hidden',
      transitionProperty: 'padding-bottom',
      transitionDuration: 'normal',
      transitionTimingFunction: 'default',
      _open: {
        animation: 'collapse-in',
      },
      _closed: {
        animation: 'collapse-out',
      },
    },
    indentGuide: {
      height: '100%',
      width: '1px',
      bg: 'border.default',
      position: 'absolute',
      left: 'calc((var(--depth) - 1) * 29px)',
      "&[data-depth='1']": {
        left: '3',
      },
    },
    node: {
      alignItems: 'center',
      borderRadius: 'l2',
      cursor: 'pointer',
      display: 'flex',
      gap: '1.5',
      py: '1.5',
      userSelect: 'none',
      _hover: {
        background: 'gray.a2',
        color: 'fg.default',
      },
      _selected: {
        color: 'colorPalette.default!',
      },
      '&[data-branch]': {
        ps: 'calc((var(--depth) - 1) * 22px)',
        "&[data-depth='1']": {
          ps: '1',
        },
      },
      '&:not([data-branch])': {
        gap: '2',
        position: 'relative',
        ps: 'calc(((var(--depth) - 1) * 22px) + 22px)',
        "&[data-depth='1']": {
          ps: '6',
          color: 'fg.default',
        },
      },
    },
    cell: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      flex: '1',
      minWidth: '0',
    },
    nodeIndicator: {
      "&[data-type='expanded']": {
        color: 'colorPalette.default',
        transformOrigin: 'center',
        transitionDuration: 'normal',
        transitionProperty: 'transform',
        transitionTimingFunction: 'default',
        _open: {
          transform: 'rotate(90deg)',
        },
      },
      "&[data-type='selected']": {
        _icon: {
          width: '3',
          height: '3',
        },
      },
    },
    nodeText: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
    },
    tree: {
      display: 'flex',
      flexDirection: 'column',
      textStyle: 'sm',
      '& svg': {
        width: '4',
        height: '4',
      },
    },
  },
})

const { withProvider, withContext } = createStyleContext(treeView)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, TreeView.RootProviderBaseProps<TreeNode>>, TreeViewVariantProps>
>(TreeView.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, TreeView.RootBaseProps<TreeNode>>, TreeViewVariantProps>
>(TreeView.Root, 'root')

export const NodeGroupContent = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, TreeView.NodeGroupContentBaseProps>
>(TreeView.NodeGroupContent, 'nodeGroupContent')

export const IndentGuide = withContext<HTMLDivElement, Assign<HTMLStyledProps<'div'>, TreeView.IndentGuideBaseProps>>(
  TreeView.IndentGuide,
  'indentGuide',
)

export const Node = withContext<HTMLDivElement, Assign<HTMLStyledProps<'div'>, TreeView.NodeBaseProps>>(
  TreeView.Node,
  'node',
)

export const Cell = withContext<HTMLDivElement, Assign<HTMLStyledProps<'div'>, TreeView.CellBaseProps>>(
  TreeView.Cell,
  'cell',
)

export const NodeIndicator = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, TreeView.NodeIndicatorBaseProps>
>(TreeView.NodeIndicator, 'nodeIndicator')

export const NodeGroup = withContext<HTMLDivElement, Assign<HTMLStyledProps<'div'>, TreeView.NodeGroupBaseProps>>(
  TreeView.NodeGroup,
  'nodeGroup',
)

export const NodeText = withContext<HTMLSpanElement, Assign<HTMLStyledProps<'span'>, TreeView.NodeTextBaseProps>>(
  TreeView.NodeText,
  'nodeText',
)

export const NodeExpandTrigger = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, TreeView.NodeExpandTriggerBaseProps>
>(TreeView.NodeExpandTrigger, 'nodeExpandTrigger')

export const Label = withContext<HTMLHeadingElement, Assign<HTMLStyledProps<'h3'>, TreeView.LabelBaseProps>>(
  TreeView.Label,
  'label',
)

export const Tree = withContext<HTMLDivElement, Assign<HTMLStyledProps<'div'>, TreeView.TreeBaseProps>>(
  TreeView.Tree,
  'tree',
)

export const Context = TreeView.Context

export type NodeProviderProps = TreeView.NodeProviderProps<TreeNode>
export const NodeProvider = TreeView.NodeProvider
