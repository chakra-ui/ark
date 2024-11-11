'use client'
import type { Assign } from '@ark-ui/react'
import { type TreeNode, TreeView, treeViewAnatomy } from '@ark-ui/react/tree-view'
import { sva } from 'styled-system/css'
import type { TreeViewVariantProps } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

export const treeView = sva({
  className: 'treeView',
  slots: treeViewAnatomy.keys(),
  base: {
    root: {
      width: 'full',
    },
    branch: {
      "&[data-depth='1'] > [data-part='branch-content']": {
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
    branchControl: {
      alignItems: 'center',
      borderRadius: 'l2',
      display: 'flex',
      fontWeight: 'medium',
      gap: '1.5',
      ps: 'calc((var(--depth) - 1) * 22px)',
      py: '1.5',
      justifyContent: 'space-between',
      transitionDuration: 'normal',
      transitionProperty: 'background, color',
      transitionTimingFunction: 'default',
      "&[data-depth='1']": {
        ps: '1',
      },
      "&[data-depth='1'] > [data-part='branch-text'] ": {
        fontWeight: 'semibold',
        color: 'fg.default',
      },
      _hover: {
        background: 'gray.a2',
        color: 'fg.default',
      },
    },
    branchIndicator: {
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
    item: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      borderRadius: 'l2',
      cursor: 'pointer',
      fontWeight: 'medium',
      position: 'relative',
      ps: 'calc(((var(--depth) - 1) * 22px) + 22px)',
      py: '1.5',
      transitionDuration: 'normal',
      transitionProperty: 'background, color',
      transitionTimingFunction: 'default',
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
      _hover: {
        background: 'gray.a2',
        color: 'fg.default',
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
    tree: {
      display: 'flex',
      flexDirection: 'column',
      gap: '3',
      textStyle: 'sm',
    },
  },
})

const { withProvider, withContext } = createStyleContext(treeView)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<
    Assign<HTMLStyledProps<'div'>, TreeView.RootProviderBaseProps<TreeNode>>,
    TreeViewVariantProps
  >
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

export const Branch = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, TreeView.BranchBaseProps>
>(TreeView.Branch, 'branch')

export const BranchText = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, TreeView.BranchTextBaseProps>
>(TreeView.BranchText, 'branchText')

export const BranchTrigger = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, TreeView.BranchTriggerBaseProps>
>(TreeView.BranchTrigger, 'branchTrigger')

export const ItemIndicator = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, TreeView.ItemIndicatorBaseProps>
>(TreeView.ItemIndicator, 'itemIndicator')

export const Item = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, TreeView.ItemBaseProps>
>(TreeView.Item, 'item')

export const ItemText = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, TreeView.ItemTextBaseProps>
>(TreeView.ItemText, 'itemText')

export const Label = withContext<
  HTMLLabelElement,
  Assign<HTMLStyledProps<'label'>, TreeView.LabelBaseProps>
>(TreeView.Label, 'label')

export const Tree = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, TreeView.TreeBaseProps>
>(TreeView.Tree, 'tree')

export const Context = TreeView.Context

export type NodeProviderProps = TreeView.NodeProviderProps<TreeNode>
export const NodeProvider = TreeView.NodeProvider
