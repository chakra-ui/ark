'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { useRenderStrategyPropsContext } from '../../utils/render-strategy.ts'
import { Collapsible } from '../collapsible/index.ts'
import type { HTMLProps, PolymorphicProps } from '../factory.ts'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodeContext } from './use-tree-view-node-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

export interface TreeViewNodeGroupBaseProps extends PolymorphicProps {}
export interface TreeViewNodeGroupProps extends Assign<HTMLProps<'div'>, TreeViewNodeGroupBaseProps> {}

export const TreeViewNodeGroup = forwardRef<HTMLDivElement, TreeViewNodeGroupProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const nodeState = useTreeViewNodeContext()
  const renderStrategyProps = useRenderStrategyPropsContext()
  const mergedProps = mergeProps(treeView.getNodeGroupProps(nodeProps), props)
  const nodeGroupContentProps = treeView.getNodeGroupContentProps(nodeProps)

  return (
    <Collapsible.Root
      ref={ref}
      open={nodeState.expanded}
      ids={{ content: nodeGroupContentProps.id }}
      {...renderStrategyProps}
      {...mergedProps}
    />
  )
})

TreeViewNodeGroup.displayName = 'TreeViewNodeGroup'
