'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

export interface TreeViewNodeBaseProps extends PolymorphicProps {}
export interface TreeViewNodeProps extends Assign<HTMLProps<'div'>, TreeViewNodeBaseProps> {}

export const TreeViewNode = forwardRef<HTMLDivElement, TreeViewNodeProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(treeView.getNodeProps(nodeProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

TreeViewNode.displayName = 'TreeViewNode'
