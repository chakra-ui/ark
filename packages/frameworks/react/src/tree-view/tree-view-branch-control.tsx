// import type { BranchProps } from '@zag-js/tree-view'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTreeViewContext, type BranchProps } from './tree-view-context'

export interface TreeViewBranchControlProps extends Assign<HTMLArkProps<'div'>, BranchProps> {}

export const TreeViewBranchControl = forwardRef<HTMLDivElement, TreeViewBranchControlProps>(
  (props, ref) => {
    const [branchProps, { ...localProps }] = createSplitProps<BranchProps>()(props, [
      'depth',
      'id',
      'disabled',
    ])
    const api = useTreeViewContext()
    const mergedProps = mergeProps(api.getBranchControlProps(branchProps), localProps)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TreeViewBranchControl.displayName = 'TreeViewBranchControl'
