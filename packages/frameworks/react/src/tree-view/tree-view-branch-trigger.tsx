import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTreeViewBranchContext } from './tree-view-branch-context'
import { useTreeViewContext } from './tree-view-context'

export interface TreeViewBranchTriggerProps extends HTMLArkProps<'div'> {}

export const TreeViewBranchTrigger = forwardRef<HTMLDivElement, TreeViewBranchTriggerProps>(
  (props, ref) => {
    const api = useTreeViewContext()
    const branchProps = useTreeViewBranchContext()
    const mergedProps = mergeProps(api.getBranchTriggerProps(branchProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TreeViewBranchTrigger.displayName = 'TreeViewBranchTrigger'
