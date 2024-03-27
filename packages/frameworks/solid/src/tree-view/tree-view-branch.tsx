import { mergeProps } from '@zag-js/solid'
import type { ItemState } from '@zag-js/tree-view'
import { type Accessor, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { TreeViewBranchProvider, type ItemProps } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'
import { TreeViewDepthProvider, useTreeViewDepthContext } from './use-tree-view-depth-context'

interface ElementProps extends ItemProps {
  children?: JSX.Element | ((state: Accessor<ItemState>) => JSX.Element)
}

export interface TreeViewBranchProps extends Assign<HTMLArkProps<'li'>, ElementProps> {}

export const TreeViewBranch = (props: TreeViewBranchProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['disabled', 'id'])
  const api = useTreeViewContext()
  const depth = useTreeViewDepthContext()
  const branchProps = mergeProps(itemProps, { depth })

  const mergedProps = mergeProps(() => api().getBranchProps(branchProps), localProps)
  const getChildren = () => runIfFn(localProps.children, () => api().getBranchState(branchProps))

  return (
    <TreeViewDepthProvider value={depth + 1}>
      <TreeViewBranchProvider value={branchProps}>
        <ark.li {...mergedProps}>{getChildren()}</ark.li>
      </TreeViewBranchProvider>
    </TreeViewDepthProvider>
  )
}
