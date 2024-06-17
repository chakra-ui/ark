import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewBranchControlBaseProps extends PolymorphicProps {}
export interface TreeViewBranchControlProps
  extends HTMLAttributes<HTMLDivElement>,
    TreeViewBranchControlBaseProps {}

export const TreeViewBranchControl = forwardRef<HTMLDivElement, TreeViewBranchControlProps>(
  (props, ref) => {
    const treeView = useTreeViewContext()
    const branchContext = useTreeViewBranchContext()
    const mergedProps = mergeProps(treeView.getBranchControlProps(branchContext), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TreeViewBranchControl.displayName = 'TreeViewBranchControl'
