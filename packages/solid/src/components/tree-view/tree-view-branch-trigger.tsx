import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewBranchTriggerBaseProps extends PolymorphicProps<'div'> {}
export interface TreeViewBranchTriggerProps
  extends HTMLProps<'div'>,
    TreeViewBranchTriggerBaseProps {}

export const TreeViewBranchTrigger = (props: TreeViewBranchTriggerProps) => {
  const api = useTreeViewContext()
  const branchProps = useTreeViewBranchContext()
  const mergedProps = mergeProps(() => api().getBranchTriggerProps(branchProps), props)

  return <ark.div {...mergedProps} />
}
