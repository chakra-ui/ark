import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewBranchContentBaseProps extends PolymorphicProps {}
export interface TreeViewBranchContentProps
  extends HTMLProps<'ul'>,
    TreeViewBranchContentBaseProps {}

export const TreeViewBranchContent = forwardRef<HTMLUListElement, TreeViewBranchContentProps>(
  (props, ref) => {
    const treeView = useTreeViewContext()
    const branchContext = useTreeViewBranchContext()
    const mergedProps = mergeProps(treeView.getBranchContentProps(branchContext), props)

    return <ark.ul {...mergedProps} ref={ref} />
  },
)

TreeViewBranchContent.displayName = 'TreeViewBranchContent'
