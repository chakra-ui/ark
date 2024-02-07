import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTreeViewBranchContext } from './tree-view-branch-context'
import { useTreeViewContext } from './tree-view-context'

export interface TreeViewBranchTriggerProps extends HTMLArkProps<'button'> {}

export const TreeViewBranchTrigger = forwardRef<HTMLButtonElement, TreeViewBranchTriggerProps>(
  (props, ref) => {
    const api = useTreeViewContext()
    const branchProps = useTreeViewBranchContext()
    const mergedProps = mergeProps(api.getBranchTriggerProps(branchProps), props)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

TreeViewBranchTrigger.displayName = 'TreeViewBranchTrigger'
