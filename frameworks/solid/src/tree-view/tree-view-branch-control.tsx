import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewBranchControlProps extends HTMLArkProps<'div'> {}

export const TreeViewBranchControl = (props: TreeViewBranchControlProps) => {
  const api = useTreeViewContext()
  const branchProps = useTreeViewBranchContext()
  const mergedProps = mergeProps(() => api().getBranchControlProps(branchProps), props)

  return <ark.div {...mergedProps} />
}
