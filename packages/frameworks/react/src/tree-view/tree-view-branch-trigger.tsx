// import type { BranchProps } from '@zag-js/tree-view'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTreeViewContext, type BranchProps } from './tree-view-context'

export interface TreeViewBranchTriggerProps extends Assign<HTMLArkProps<'button'>, BranchProps> {}

export const TreeViewBranchTrigger = forwardRef<HTMLButtonElement, TreeViewBranchTriggerProps>(
  (props, ref) => {
    const [branchProps, { ...localProps }] = createSplitProps<BranchProps>()(props, [
      'depth',
      'id',
      'disabled',
    ])
    const api = useTreeViewContext()
    const mergedProps = mergeProps(api.getBranchTriggerProps(branchProps), localProps)

    return <ark.button {...mergedProps} ref={ref} />
  },
)

TreeViewBranchTrigger.displayName = 'TreeViewBranchTrigger'
