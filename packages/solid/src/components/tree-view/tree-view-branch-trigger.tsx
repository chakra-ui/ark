import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

export interface TreeViewBranchTriggerBaseProps extends PolymorphicProps<'div'> {}
export interface TreeViewBranchTriggerProps
  extends HTMLProps<'div'>,
    TreeViewBranchTriggerBaseProps {}

export const TreeViewBranchTrigger = (props: TreeViewBranchTriggerProps) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(() => treeView().getBranchTriggerProps(nodeProps), props)

  return <ark.div {...mergedProps} />
}
