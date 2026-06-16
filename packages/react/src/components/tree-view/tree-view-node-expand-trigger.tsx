'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

export interface TreeViewNodeExpandTriggerBaseProps extends PolymorphicProps {}
export interface TreeViewNodeExpandTriggerProps extends HTMLProps<'div'>, TreeViewNodeExpandTriggerBaseProps {}

export const TreeViewNodeExpandTrigger = forwardRef<HTMLDivElement, TreeViewNodeExpandTriggerProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(treeView.getNodeExpandTriggerProps(nodeProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

TreeViewNodeExpandTrigger.displayName = 'TreeViewNodeExpandTrigger'
