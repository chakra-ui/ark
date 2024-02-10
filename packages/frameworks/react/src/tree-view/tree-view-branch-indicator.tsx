// import type { BranchProps } from '@zag-js/tree-view'
import { treeViewAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTreeViewContext, type BranchProps } from './tree-view-context'

export interface TreeViewBranchIndicatorProps extends Assign<HTMLArkProps<'div'>, BranchProps> {}

export const TreeViewBranchIndicator = forwardRef<HTMLDivElement, TreeViewBranchIndicatorProps>(
  (props, ref) => {
    const [branchProps, { ...localProps }] = createSplitProps<BranchProps>()(props, [
      'depth',
      'id',
      'disabled',
    ])
    const api = useTreeViewContext()
    const mergedProps = mergeProps(
      api.getBranchProps(branchProps),
      treeViewAnatomy.build().branchIndicator.attrs as Record<string, string>,
      localProps,
    )

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TreeViewBranchIndicator.displayName = 'TreeViewBranchIndicator'
