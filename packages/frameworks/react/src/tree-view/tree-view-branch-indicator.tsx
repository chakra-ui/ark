import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTreeViewBranchContext } from './tree-view-branch-context'
import { useTreeViewContext } from './tree-view-context'

export interface TreeViewBranchIndicatorProps extends HTMLArkProps<'div'> {}

export const TreeViewBranchIndicator = forwardRef<HTMLDivElement, TreeViewBranchIndicatorProps>(
  (props, ref) => {
    const api = useTreeViewContext()
    const branchProps = useTreeViewBranchContext()
    const mergedProps = mergeProps(api.getBranchIndicatorProps(branchProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TreeViewBranchIndicator.displayName = 'TreeViewBranchIndicator'
