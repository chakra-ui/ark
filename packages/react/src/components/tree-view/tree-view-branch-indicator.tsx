import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'

export type TreeViewBranchIndicatorBaseProps = {}
export interface TreeViewBranchIndicatorProps
  extends HTMLArkProps<'div'>,
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
