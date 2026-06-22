import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

export interface TreeViewNodeTextBaseProps extends PolymorphicProps<'span'> {}
export interface TreeViewNodeTextProps extends HTMLProps<'span'>, TreeViewNodeTextBaseProps {}

export const TreeViewNodeText = (props: TreeViewNodeTextProps) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(() => treeView().getNodeTextProps(nodeProps), props)

  return <ark.span {...mergedProps} />
}
