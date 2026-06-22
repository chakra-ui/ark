import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import type { Assign } from '../../types.ts'
import { useRenderStrategyContext } from '../../utils/render-strategy.ts'
import { Collapsible } from '../collapsible/index.tsx'
import type { HTMLProps, PolymorphicProps } from '../factory.tsx'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodeContext } from './use-tree-view-node-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

export interface TreeViewNodeGroupBaseProps extends PolymorphicProps<'div'> {}
export interface TreeViewNodeGroupProps extends Assign<HTMLProps<'div'>, TreeViewNodeGroupBaseProps> {}

export const TreeViewNodeGroup = (props: TreeViewNodeGroupProps) => {
  const treeView = useTreeViewContext()

  const nodeProps = useTreeViewNodePropsContext()
  const nodeState = useTreeViewNodeContext()

  const renderStrategyProps = useRenderStrategyContext()
  const nodeGroupContentProps = createMemo(() => treeView().getNodeGroupContentProps(nodeProps))
  const mergedProps = mergeProps(() => treeView().getNodeGroupProps(nodeProps), props)

  return (
    <Collapsible.Root
      open={nodeState().expanded}
      ids={{ content: nodeGroupContentProps().id }}
      {...renderStrategyProps}
      {...mergedProps}
    />
  )
}
