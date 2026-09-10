import { mergeProps } from '@zag-js/solid'
import type { NodeState } from '@zag-js/tree-view'
import type { Assign } from '../../types.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

export interface TreeViewNodeState extends NodeState {}

export interface TreeViewNodeBaseProps extends PolymorphicProps<'div', TreeViewNodeState> {}
export interface TreeViewNodeProps extends Assign<HTMLProps<'div'>, TreeViewNodeBaseProps> {}

export const TreeViewNode = (props: TreeViewNodeProps) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(() => treeView().getNodeProps(nodeProps), props)

  return <ark.div {...mergedProps} state={treeView().getNodeState(nodeProps)} />
}
