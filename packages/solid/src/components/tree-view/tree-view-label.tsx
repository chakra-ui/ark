import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewLabelBaseProps extends PolymorphicProps<'h3'> {}
export interface TreeViewLabelProps extends HTMLProps<'h3'>, TreeViewLabelBaseProps {}

export const TreeViewLabel = (props: TreeViewLabelProps) => {
  const treeView = useTreeViewContext()
  const mergedProps = mergeProps(() => treeView().getLabelProps(), props)

  return <ark.h3 {...mergedProps} />
}
