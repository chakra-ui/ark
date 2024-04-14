import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewBranchContentProps extends HTMLArkProps<'ul'> {}

export const TreeViewBranchContent = (props: TreeViewBranchContentProps) => {
  const api = useTreeViewContext()
  const branchProps = useTreeViewBranchContext()
  const mergedProps = mergeProps(() => api().getBranchContentProps(branchProps), props)

  return <ark.ul {...mergedProps} />
}
