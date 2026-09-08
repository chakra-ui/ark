'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'
import type { NodeState } from '@zag-js/tree-view'

export interface TreeViewNodeState extends NodeState {}

export interface TreeViewNodeBaseProps extends PolymorphicProps<TreeViewNodeState> {}
export interface TreeViewNodeProps extends Assign<HTMLProps<'div'>, TreeViewNodeBaseProps> {}

export const TreeViewNode = forwardRef<HTMLDivElement, TreeViewNodeProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(treeView.getNodeProps(nodeProps), props)

  return <ark.div {...mergedProps} ref={ref} state={treeView.getNodeState(nodeProps)} />
})

TreeViewNode.displayName = 'TreeViewNode'
