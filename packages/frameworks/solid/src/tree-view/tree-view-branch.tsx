import { mergeProps } from '@zag-js/solid'
import { type Accessor, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { TreeViewBranchProvider, type ItemProps, type ItemState } from './tree-view-branch-context'
import { useTreeViewContext } from './tree-view-context'
import { TreeViewDepthProvider, useTreeViewDepthContext } from './tree-view-depth-context'

interface ElementProps extends ItemProps {
  children?: JSX.Element | ((state: Accessor<ItemState>) => JSX.Element)
}

export interface TreeViewBranchProps extends Assign<HTMLArkProps<'li'>, ElementProps> {}

export const TreeViewBranch: ArkComponent<'li', ElementProps> = (props: TreeViewBranchProps) => {
  const [foo, localProps] = createSplitProps<ItemProps>()(props, ['disabled', 'id'])
  const api = useTreeViewContext()
  const depth = useTreeViewDepthContext()
  const branchProps = mergeProps(foo, { depth })

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
