import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewBranchIndicatorBaseProps extends PolymorphicProps {}
export interface TreeViewBranchIndicatorProps
  extends HTMLAttributes<HTMLDivElement>,
    TreeViewBranchIndicatorBaseProps {}

export const TreeViewBranchIndicator = forwardRef<HTMLDivElement, TreeViewBranchIndicatorProps>(
  (props, ref) => {
    const treeView = useTreeViewContext()
    const branchContext = useTreeViewBranchContext()
    const mergedProps = mergeProps(treeView.getBranchIndicatorProps(branchContext), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TreeViewBranchIndicator.displayName = 'TreeViewBranchIndicator'
