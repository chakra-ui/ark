import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

export interface TreeViewItemIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface TreeViewItemIndicatorProps
  extends HTMLProps<'div'>,
    TreeViewItemIndicatorBaseProps {}

export const TreeViewItemIndicator = (props: TreeViewItemIndicatorProps) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(() => treeView().getItemIndicatorProps(nodeProps), props)

  return <ark.div {...mergedProps} />
}
