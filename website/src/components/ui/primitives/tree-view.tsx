'use client'
import type { Assign } from '@ark-ui/react'
import { TreeView } from '@ark-ui/react/tree-view'
import { type TreeViewVariantProps, treeView } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(treeView)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, TreeView.RootProviderBaseProps>, TreeViewVariantProps>
>(TreeView.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, TreeView.RootBaseProps>, TreeViewVariantProps>
>(TreeView.Root, 'root')

export const BranchContent = withContext<
  HTMLUListElement,
  Assign<HTMLStyledProps<'ul'>, TreeView.BranchContentBaseProps>
>(TreeView.BranchContent, 'branchContent')

export const BranchControl = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, TreeView.BranchControlBaseProps>
>(TreeView.BranchControl, 'branchControl')

export const BranchIndicator = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, TreeView.BranchIndicatorBaseProps>
>(TreeView.BranchIndicator, 'branchIndicator')

export const Branch = withContext<
  HTMLLIElement,
  Assign<HTMLStyledProps<'li'>, TreeView.BranchBaseProps>
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
  HTMLLIElement,
  Assign<HTMLStyledProps<'li'>, TreeView.ItemBaseProps>
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
  HTMLUListElement,
  Assign<HTMLStyledProps<'ul'>, TreeView.TreeBaseProps>
>(TreeView.Tree, 'tree')

export { TreeViewContext as Context } from '@ark-ui/react/tree-view'
