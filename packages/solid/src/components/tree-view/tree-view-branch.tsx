import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type ItemProps, TreeViewBranchProvider } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'
import { TreeViewDepthProvider, useTreeViewDepthContext } from './use-tree-view-depth-context'

export interface TreeViewBranchBaseProps extends ItemProps, PolymorphicProps<'li'> {}
export interface TreeViewBranchProps extends Assign<HTMLProps<'li'>, TreeViewBranchBaseProps> {}

export const TreeViewBranch = (props: TreeViewBranchProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['disabled', 'value'])
  const api = useTreeViewContext()
  const depth = useTreeViewDepthContext()
  const branchProps = mergeProps(itemProps, { depth })
  const mergedProps = mergeProps(() => api().getBranchProps(branchProps), localProps)

  return (
    <TreeViewDepthProvider value={depth + 1}>
      <TreeViewBranchProvider value={branchProps}>
        <ark.li {...mergedProps} />
      </TreeViewBranchProvider>
    </TreeViewDepthProvider>
  )
}
