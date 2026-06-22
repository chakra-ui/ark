import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

export interface TreeViewCellBaseProps extends PolymorphicProps<'div'> {}
export interface TreeViewCellProps extends HTMLProps<'div'>, TreeViewCellBaseProps {}

export const TreeViewCell = (props: TreeViewCellProps) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(() => treeView().getCellProps(nodeProps), props)

  return <ark.div {...mergedProps} />
}
