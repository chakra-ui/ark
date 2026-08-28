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
    branchContent: {
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
    branchIndentGuide: {
      height: '100%',
      width: '1px',
      bg: 'border.default',
      position: 'absolute',
      left: 'calc((var(--depth) - 1) * 29px)',
      "&[data-depth='1']": {
        left: '3',
      },
    },
    branchControl: {
      alignItems: 'center',
      borderRadius: 'l2',
      display: 'flex',
      gap: '1.5',
      ps: 'calc((var(--depth) - 1) * 22px)',
      py: '1.5',
      cursor: 'pointer',
      userSelect: 'none',
      "&[data-depth='1']": {
        ps: '1',
      },
      _hover: {
        background: 'gray.a2',
        color: 'fg.default',
      },
      _selected: {
        color: 'colorPalette.default!',
      },
    },
    branchIndicator: {
      color: 'colorPalette.default',
      transformOrigin: 'center',
      transitionDuration: 'normal',
      transitionProperty: 'transform',
      transitionTimingFunction: 'default',

      _open: {
        transform: 'rotate(90deg)',
      },
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      borderRadius: 'l2',
      cursor: 'pointer',
      position: 'relative',
      ps: 'calc(((var(--depth) - 1) * 22px) + 22px)',
      py: '1.5',
      "&[data-depth='1']": {
        ps: '6',
        color: 'fg.default',
      },
      _hover: {
        background: 'gray.a2',
        color: 'fg.default',
      },
      _selected: {
        color: 'colorPalette.default!',
      },
    },
    itemText: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
    },
    branchText: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
    },
    itemIndicator: {
      _icon: {
        width: '3',
        height: '3',
      },
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

export const BranchContent = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, TreeView.BranchContentBaseProps>
>(TreeView.BranchContent, 'branchContent')

export const BranchIndentGuide = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, TreeView.BranchIndentGuideBaseProps>
>(TreeView.BranchIndentGuide, 'branchIndentGuide')

export const BranchControl = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, TreeView.BranchControlBaseProps>
>(TreeView.BranchControl, 'branchControl')

export const BranchIndicator = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, TreeView.BranchIndicatorBaseProps>
>(TreeView.BranchIndicator, 'branchIndicator')

export const Branch = withContext<HTMLDivElement, Assign<HTMLStyledProps<'div'>, TreeView.BranchBaseProps>>(
  TreeView.Branch,
  'branch',
)

export const BranchText = withContext<HTMLSpanElement, Assign<HTMLStyledProps<'span'>, TreeView.BranchTextBaseProps>>(
  TreeView.BranchText,
  'branchText',
)

export const BranchTrigger = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, TreeView.BranchTriggerBaseProps>
>(TreeView.BranchTrigger, 'branchTrigger')

export const ItemIndicator = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, TreeView.ItemIndicatorBaseProps>
>(TreeView.ItemIndicator, 'itemIndicator')

export const Item = withContext<HTMLDivElement, Assign<HTMLStyledProps<'div'>, TreeView.ItemBaseProps>>(
  TreeView.Item,
  'item',
)

export const ItemText = withContext<HTMLSpanElement, Assign<HTMLStyledProps<'span'>, TreeView.ItemTextBaseProps>>(
  TreeView.ItemText,
  'itemText',
)

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
