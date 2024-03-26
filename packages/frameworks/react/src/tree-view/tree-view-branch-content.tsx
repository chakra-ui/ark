import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewBranchContentProps extends HTMLArkProps<'ul'> {}

export const TreeViewBranchContent = forwardRef<HTMLUListElement, TreeViewBranchContentProps>(
  (props, ref) => {
    const context = useTreeViewContext()
    const branchContext = useTreeViewBranchContext()
    const mergedProps = mergeProps(context.getBranchContentProps(branchContext), props)

    return <ark.ul {...mergedProps} ref={ref} />
  },
)

TreeViewBranchContent.displayName = 'TreeViewBranchContent'
