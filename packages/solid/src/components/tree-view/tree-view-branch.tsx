import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import type { Assign } from '../../types'
import { useRenderStrategyContext } from '../../utils/render-strategy'
import { Collapsible } from '../collapsible'
import type { HTMLProps, PolymorphicProps } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodeContext } from './use-tree-view-node-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

export interface TreeViewBranchBaseProps extends PolymorphicProps<'div'> {}
export interface TreeViewBranchProps extends Assign<HTMLProps<'div'>, TreeViewBranchBaseProps> {}

export const TreeViewBranch = (props: TreeViewBranchProps) => {
  const treeView = useTreeViewContext()

  const nodeProps = useTreeViewNodePropsContext()
  const nodeState = useTreeViewNodeContext()

  const renderStrategyProps = useRenderStrategyContext()
  const branchContentProps = createMemo(() => treeView().getBranchContentProps(nodeProps))
  const mergedProps = mergeProps(() => treeView().getBranchProps(nodeProps), props)

  return (
    <Collapsible.Root
      open={nodeState().expanded}
      ids={{ content: branchContentProps().id }}
      {...renderStrategyProps}
      {...mergedProps}
    />
  )
}
