// import type { BranchProps, BranchState } from '@zag-js/tree-view'
import { mergeProps } from '@zag-js/solid'
import { type Accessor, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useTreeViewContext, type BranchProps, type BranchState } from './tree-view-context'

interface ElementProps extends BranchProps {
  children?: JSX.Element | ((state: Accessor<BranchState>) => JSX.Element)
}

export interface TreeViewBranchProps extends Assign<HTMLArkProps<'li'>, ElementProps> {}

export const TreeViewBranch: ArkComponent<'li', ElementProps> = (props: TreeViewBranchProps) => {
  const [branchProps, localProps] = createSplitProps<BranchProps>()(props, [
    'depth',
    'id',
    'disabled',
  ])
  const api = useTreeViewContext()
  const mergedProps = mergeProps(() => api().getBranchProps(branchProps), localProps)
  const getChildren = () => runIfFn(localProps.children, () => api().getBranchState(branchProps))

  return <ark.li {...mergedProps}>{getChildren()}</ark.li>
}
