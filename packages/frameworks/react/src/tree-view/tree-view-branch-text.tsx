import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTreeViewBranchContext } from './tree-view-branch-context'
import { useTreeViewContext } from './tree-view-context'

export interface TreeViewBranchTextProps extends HTMLArkProps<'span'> {}

export const TreeViewBranchText = forwardRef<HTMLSpanElement, TreeViewBranchTextProps>(
  (props, ref) => {
    const api = useTreeViewContext()
    const branchProps = useTreeViewBranchContext()
    const mergedProps = mergeProps(api.getBranchTextProps(branchProps), props)

    return <ark.span {...mergedProps} ref={ref} />
  },
)

TreeViewBranchText.displayName = 'TreeViewBranchText'
