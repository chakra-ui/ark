import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { TreeViewBranchProvider, type ItemProps, type ItemState } from './tree-view-branch-context'
import { useTreeViewContext } from './tree-view-context'
import { TreeViewDepthProvider, useTreeViewDepthContext } from './tree-view-depth-context'

export interface TreeViewBranchProps
  extends Assign<
    Assign<HTMLArkProps<'li'>, { children?: ReactNode | ((state: ItemState) => ReactNode) }>,
    ItemProps
  > {}

export const TreeViewBranch = forwardRef<HTMLLIElement, TreeViewBranchProps>((props, ref) => {
  const [{ disabled, id }, { children, ...localProps }] = createSplitProps<ItemProps>()(props, [
    'disabled',
    'id',
  ])
  const api = useTreeViewContext()
  const depth = useTreeViewDepthContext()
  const branchProps = { id, disabled, depth }
  const mergedProps = mergeProps(api.getBranchProps(branchProps), localProps)

  const branchState = api.getBranchState(branchProps)
  const view = runIfFn(children, branchState)

  return (
    <TreeViewDepthProvider value={depth + 1}>
      <TreeViewBranchProvider value={branchProps}>
        <ark.li {...mergedProps} ref={ref}>
          {view}
        </ark.li>
      </TreeViewBranchProvider>
    </TreeViewDepthProvider>
  )
})

TreeViewBranch.displayName = 'TreeViewBranch'
