import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewBranchContentBaseProps extends PolymorphicProps<'ul'> {}
export interface TreeViewBranchContentProps
  extends HTMLProps<'ul'>,
    TreeViewBranchContentBaseProps {}

export const TreeViewBranchContent = (props: TreeViewBranchContentProps) => {
  const api = useTreeViewContext()
  const branchProps = useTreeViewBranchContext()
  const mergedProps = mergeProps(() => api().getBranchContentProps(branchProps), props)

  return <ark.ul {...mergedProps} />
}
