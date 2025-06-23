import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

export interface TreeViewNodeCheckboxBaseProps extends PolymorphicProps<'span'> {}
export interface TreeViewNodeCheckboxProps extends HTMLProps<'span'>, TreeViewNodeCheckboxBaseProps {}

export const TreeViewNodeCheckbox = (props: TreeViewNodeCheckboxProps) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(() => treeView().getItemCheckboxProps(nodeProps), props)

  return <ark.span {...mergedProps} />
}
