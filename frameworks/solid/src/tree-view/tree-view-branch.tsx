import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { TreeViewBranchProvider, type ItemProps } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'
import { TreeViewDepthProvider, useTreeViewDepthContext } from './use-tree-view-depth-context'

export interface TreeViewBranchProps extends Assign<HTMLArkProps<'li'>, ItemProps> {}

export const TreeViewBranch = (props: TreeViewBranchProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['disabled', 'id'])
  const api = useTreeViewContext()
  const depth = useTreeViewDepthContext()
  const branchProps = mergeProps(itemProps, { depth })
  const mergedProps = mergeProps(() => api().getBranchProps(branchProps), localProps)

  return (
    <TreeViewDepthProvider value={depth + 1}>
      <TreeViewBranchProvider value={branchProps}>
        <ark.li {...mergedProps()} />
      </TreeViewBranchProvider>
    </TreeViewDepthProvider>
  )
}
