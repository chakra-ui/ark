// import type { BranchProps, BranchState } from '@zag-js/tree-view'
import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useTreeViewContext, type BranchProps, type BranchState } from './tree-view-context'

export interface TreeViewBranchProps
  extends Assign<
    Assign<
      HTMLArkProps<'li'>,
      {
        children?: ReactNode | ((state: BranchState) => ReactNode)
      }
    >,
    BranchProps
  > {}

export const TreeViewBranch = forwardRef<HTMLLIElement, TreeViewBranchProps>((props, ref) => {
  const [branchProps, { children, ...localProps }] = createSplitProps<BranchProps>()(props, [
    'depth',
    'id',
    'disabled',
  ])
  const api = useTreeViewContext()
  const mergedProps = mergeProps(api.getBranchProps(branchProps), localProps)
  const branchState = api.getBranchState(branchProps)
  const view = runIfFn(children, branchState)

  return (
    <ark.li {...mergedProps} ref={ref}>
      {view}
    </ark.li>
  )
})

TreeViewBranch.displayName = 'TreeViewBranch'
