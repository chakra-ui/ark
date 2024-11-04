import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import type { Assign } from '../../types'
import { useRenderStrategyContext } from '../../utils/render-strategy'
import { Collapsible } from '../collapsible'
import type { HTMLProps, PolymorphicProps } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import {
  TreeViewNodePropsProvider,
  useTreeViewNodePropsContext,
} from './use-tree-view-node-props-context'

export interface TreeViewBranchBaseProps extends PolymorphicProps<'div'> {}
export interface TreeViewBranchProps extends Assign<HTMLProps<'div'>, TreeViewBranchBaseProps> {}

export const TreeViewBranch = (props: TreeViewBranchProps) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const renderStrategyProps = useRenderStrategyContext()
  const nodeState = createMemo(() => treeView().getNodeState(nodeProps))
  const branchContentProps = treeView().getBranchContentProps(nodeProps)
  const mergedProps = mergeProps(() => treeView().getBranchProps(nodeProps), props)

  return (
    <TreeViewNodePropsProvider value={nodeProps}>
      <Collapsible.Root
        open={nodeState().expanded}
        ids={{ content: branchContentProps.id }}
        {...renderStrategyProps}
        {...mergedProps}
      />
    </TreeViewNodePropsProvider>
  )
}
