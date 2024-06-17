import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewBranchControlBaseProps extends PolymorphicProps<'div'> {}
export interface TreeViewBranchControlProps
  extends HTMLProps<'div'>,
    TreeViewBranchControlBaseProps {}

export const TreeViewBranchControl = (props: TreeViewBranchControlProps) => {
  const api = useTreeViewContext()
  const branchProps = useTreeViewBranchContext()
  const mergedProps = mergeProps(() => api().getBranchControlProps(branchProps), props)

  return <ark.div {...mergedProps} />
}
