import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

export interface TreeViewNodeCheckboxBaseProps extends PolymorphicProps<'span'> {}
export interface TreeViewNodeCheckboxProps extends HTMLProps<'span'>, TreeViewNodeCheckboxBaseProps {}

export const TreeViewNodeCheckbox = (props: TreeViewNodeCheckboxProps) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(() => treeView().getNodeCheckboxProps(nodeProps), props)

  return <ark.span {...mergedProps} />
}
