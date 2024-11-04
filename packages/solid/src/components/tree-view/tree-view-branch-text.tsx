import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

export interface TreeViewBranchTextBaseProps extends PolymorphicProps<'span'> {}
export interface TreeViewBranchTextProps extends HTMLProps<'span'>, TreeViewBranchTextBaseProps {}

export const TreeViewBranchText = (props: TreeViewBranchTextProps) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(() => treeView().getBranchTextProps(nodeProps), props)

  return <ark.span {...mergedProps} />
}
