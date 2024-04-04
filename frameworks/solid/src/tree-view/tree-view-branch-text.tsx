import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewBranchTextProps extends HTMLArkProps<'span'> {}

export const TreeViewBranchText = (props: TreeViewBranchTextProps) => {
  const api = useTreeViewContext()
  const branchProps = useTreeViewBranchContext()
  const mergedProps = mergeProps(() => api().getBranchTextProps(branchProps), props)

  return <ark.span {...mergedProps()} />
}
