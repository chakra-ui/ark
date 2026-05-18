'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

export interface TreeViewBranchControlBaseProps extends PolymorphicProps {}
export interface TreeViewBranchControlProps extends HTMLProps<'div'>, TreeViewBranchControlBaseProps {}

export const TreeViewBranchControl = forwardRef<HTMLDivElement, TreeViewBranchControlProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(treeView.getBranchControlProps(nodeProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

TreeViewBranchControl.displayName = 'TreeViewBranchControl'
