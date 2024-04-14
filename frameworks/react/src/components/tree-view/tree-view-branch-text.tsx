import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewBranchTextProps extends HTMLArkProps<'span'> {}

export const TreeViewBranchText = forwardRef<HTMLSpanElement, TreeViewBranchTextProps>(
  (props, ref) => {
    const treeView = useTreeViewContext()
    const branchContext = useTreeViewBranchContext()
    const mergedProps = mergeProps(treeView.getBranchTextProps(branchContext), props)

    return <ark.span {...mergedProps} ref={ref} />
  },
)

TreeViewBranchText.displayName = 'TreeViewBranchText'
