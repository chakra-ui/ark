import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

export interface TreeViewNodeExpandTriggerBaseProps extends PolymorphicProps<'div'> {}
export interface TreeViewNodeExpandTriggerProps extends HTMLProps<'div'>, TreeViewNodeExpandTriggerBaseProps {}

export const TreeViewNodeExpandTrigger = (props: TreeViewNodeExpandTriggerProps) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(() => treeView().getNodeExpandTriggerProps(nodeProps), props)

  return <ark.div {...mergedProps} />
}
