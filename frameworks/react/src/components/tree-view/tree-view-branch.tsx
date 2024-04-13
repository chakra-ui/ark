import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { createSplitProps } from '~/utils/create-split-props'
import { type ItemProps, TreeViewBranchProvider } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'
import { TreeViewDepthProvider, useTreeViewDepthContext } from './use-tree-view-depth-context'

export interface TreeViewBranchProps extends Assign<HTMLArkProps<'li'>, ItemProps> {}

export const TreeViewBranch = forwardRef<HTMLLIElement, TreeViewBranchProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['disabled', 'id'])
  const treeView = useTreeViewContext()
  const depth = useTreeViewDepthContext()
  const branchContext = { ...itemProps, depth }
  const mergedProps = mergeProps(treeView.getBranchProps(branchContext), localProps)

  return (
    <TreeViewDepthProvider value={depth + 1}>
      <TreeViewBranchProvider value={branchContext}>
        <ark.li {...mergedProps} ref={ref} />
      </TreeViewBranchProvider>
    </TreeViewDepthProvider>
  )
})

TreeViewBranch.displayName = 'TreeViewBranch'
