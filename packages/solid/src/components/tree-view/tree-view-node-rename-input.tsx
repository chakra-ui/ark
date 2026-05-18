import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

export interface TreeViewNodeRenameInputBaseProps extends PolymorphicProps<'input'> {}
export interface TreeViewNodeRenameInputProps extends Assign<HTMLProps<'input'>, TreeViewNodeRenameInputBaseProps> {}

export const TreeViewNodeRenameInput = (props: TreeViewNodeRenameInputProps) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(() => treeView().getNodeRenameInputProps(nodeProps), props)

  return <ark.input {...mergedProps} />
}
