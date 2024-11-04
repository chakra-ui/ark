import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

export interface TreeViewBranchControlBaseProps extends PolymorphicProps<'div'> {}
export interface TreeViewBranchControlProps
  extends HTMLProps<'div'>,
    TreeViewBranchControlBaseProps {}

export const TreeViewBranchControl = (props: TreeViewBranchControlProps) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(() => treeView().getBranchControlProps(nodeProps), props)

  return <ark.div {...mergedProps} />
}
