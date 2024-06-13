import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'

export type TreeViewBranchTriggerBaseProps = {}
export interface TreeViewBranchTriggerProps
  extends HTMLArkProps<'div'>,
    TreeViewBranchTriggerBaseProps {}

export const TreeViewBranchTrigger = forwardRef<HTMLDivElement, TreeViewBranchTriggerProps>(
  (props, ref) => {
    const treeView = useTreeViewContext()
    const branchContext = useTreeViewBranchContext()
    const mergedProps = mergeProps(treeView.getBranchTriggerProps(branchContext), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TreeViewBranchTrigger.displayName = 'TreeViewBranchTrigger'
