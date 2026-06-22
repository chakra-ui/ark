import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

export interface TreeViewNodeBaseProps extends PolymorphicProps<'div'> {}
export interface TreeViewNodeProps extends Assign<HTMLProps<'div'>, TreeViewNodeBaseProps> {}

export const TreeViewNode = (props: TreeViewNodeProps) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(() => treeView().getNodeProps(nodeProps), props)

  return <ark.div {...mergedProps} />
}
