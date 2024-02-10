// import type { BranchProps } from '@zag-js/tree-view'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTreeViewContext, type BranchProps } from './tree-view-context'

export interface TreeViewBranchContentProps extends Assign<HTMLArkProps<'ul'>, BranchProps> {}

export const TreeViewBranchContent = forwardRef<HTMLUListElement, TreeViewBranchContentProps>(
  (props, ref) => {
    const [branchProps, { ...localProps }] = createSplitProps<BranchProps>()(props, [
      'depth',
      'id',
      'disabled',
    ])
    const api = useTreeViewContext()
    const mergedProps = mergeProps(api.getBranchContentProps(branchProps), localProps)

    return <ark.ul {...mergedProps} ref={ref} />
  },
)

TreeViewBranchContent.displayName = 'TreeViewBranchContent'
