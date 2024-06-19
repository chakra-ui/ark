import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewBranchIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface TreeViewBranchIndicatorProps
  extends HTMLProps<'div'>,
    TreeViewBranchIndicatorBaseProps {}

export const TreeViewBranchIndicator = (props: TreeViewBranchIndicatorProps) => {
  const api = useTreeViewContext()
  const branchProps = useTreeViewBranchContext()
  const mergedProps = mergeProps(() => api().getBranchIndicatorProps(branchProps), props)

  return <ark.div {...mergedProps} />
}
