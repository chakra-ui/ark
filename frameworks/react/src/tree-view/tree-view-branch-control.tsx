import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewBranchControlProps extends HTMLArkProps<'div'> {}

export const TreeViewBranchControl = forwardRef<HTMLDivElement, TreeViewBranchControlProps>(
  (props, ref) => {
    const context = useTreeViewContext()
    const branchContext = useTreeViewBranchContext()
    const mergedProps = mergeProps(context.getBranchControlProps(branchContext), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TreeViewBranchControl.displayName = 'TreeViewBranchControl'
