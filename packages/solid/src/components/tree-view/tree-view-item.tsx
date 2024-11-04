import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import {
  TreeViewNodePropsProvider,
  useTreeViewNodePropsContext,
} from './use-tree-view-node-props-context'

export interface TreeViewItemBaseProps extends PolymorphicProps<'div'> {}
export interface TreeViewItemProps extends Assign<HTMLProps<'div'>, TreeViewItemBaseProps> {}

export const TreeViewItem = (props: TreeViewItemProps) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(() => treeView().getItemProps(nodeProps), props)

  return (
    <TreeViewNodePropsProvider value={nodeProps}>
      <ark.div {...mergedProps} />
    </TreeViewNodePropsProvider>
  )
}
