import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewTreeBaseProps extends PolymorphicProps<'div'> {}
export interface TreeViewTreeProps extends HTMLProps<'div'>, TreeViewTreeBaseProps {}

export const TreeViewTree = (props: TreeViewTreeProps) => {
  const treeView = useTreeViewContext()
  const mergedProps = mergeProps(() => treeView().getTreeProps(), props)

  return <ark.div {...mergedProps} />
}
