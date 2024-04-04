import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewBranchIndicatorProps extends HTMLArkProps<'div'> {}

export const TreeViewBranchIndicator = (props: TreeViewBranchIndicatorProps) => {
  const api = useTreeViewContext()
  const branchProps = useTreeViewBranchContext()
  const mergedProps = mergeProps(() => api().getBranchIndicatorProps(branchProps), props)

  return <ark.div {...mergedProps()} />
}
