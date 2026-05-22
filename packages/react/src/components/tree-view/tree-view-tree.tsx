'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewTreeBaseProps extends PolymorphicProps {}
export interface TreeViewTreeProps extends HTMLProps<'div'>, TreeViewTreeBaseProps {}

export const TreeViewTree = ({ ref, ...props }: TreeViewTreeProps) => {
  const treeView = useTreeViewContext()
  const mergedProps = mergeProps(treeView.getTreeProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

TreeViewTree.displayName = 'TreeViewTree'
