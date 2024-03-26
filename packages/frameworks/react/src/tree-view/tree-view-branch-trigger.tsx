import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewBranchTriggerProps extends HTMLArkProps<'div'> {}

export const TreeViewBranchTrigger = forwardRef<HTMLDivElement, TreeViewBranchTriggerProps>(
  (props, ref) => {
    const context = useTreeViewContext()
    const branchContext = useTreeViewBranchContext()
    const mergedProps = mergeProps(context.getBranchTriggerProps(branchContext), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TreeViewBranchTrigger.displayName = 'TreeViewBranchTrigger'
