import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { useRenderStrategyPropsContext } from '../../utils/render-strategy'
import { Collapsible } from '../collapsible'
import type { HTMLProps, PolymorphicProps } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import {
  TreeViewNodePropsProvider,
  useTreeViewNodePropsContext,
} from './use-tree-view-node-props-context'

export interface TreeViewBranchBaseProps extends PolymorphicProps {}
export interface TreeViewBranchProps extends Assign<HTMLProps<'div'>, TreeViewBranchBaseProps> {}

export const TreeViewBranch = forwardRef<HTMLDivElement, TreeViewBranchProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const renderStrategy = useRenderStrategyPropsContext()
  const node = treeView.getNodeState(nodeProps)
  const mergedProps = mergeProps(treeView.getBranchProps(nodeProps), props)
  const branchContentProps = treeView.getBranchContentProps(nodeProps)

  return (
    <TreeViewNodePropsProvider value={nodeProps}>
      <Collapsible.Root
        ref={ref}
        open={node.expanded}
        ids={{ content: branchContentProps.id }}
        {...renderStrategy}
        {...mergedProps}
      />
    </TreeViewNodePropsProvider>
  )
})

TreeViewBranch.displayName = 'TreeViewBranch'
