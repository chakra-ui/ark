'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

export interface TreeViewItemIndicatorBaseProps extends PolymorphicProps {}
export interface TreeViewItemIndicatorProps extends HTMLProps<'div'>, TreeViewItemIndicatorBaseProps {}

export const TreeViewItemIndicator = ({ ref, ...props }: TreeViewItemIndicatorProps) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(treeView.getItemIndicatorProps(nodeProps), props)

  return <ark.div {...mergedProps} ref={ref} />
}

TreeViewItemIndicator.displayName = 'TreeViewItemIndicator'
