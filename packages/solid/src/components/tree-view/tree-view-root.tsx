import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import {
  type RenderStrategyProps,
  RenderStrategyProvider,
  splitRenderStrategyProps,
} from '../../utils/render-strategy'
import type { TreeNode } from '../collection'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseTreeViewProps, useTreeView } from './use-tree-view'
import { TreeViewProvider } from './use-tree-view-context'

export interface TreeViewRootBaseProps<T extends TreeNode>
  extends UseTreeViewProps<T>,
    RenderStrategyProps,
    PolymorphicProps<'div'> {}
export interface TreeViewRootProps<T extends TreeNode>
  extends HTMLProps<'div'>,
    TreeViewRootBaseProps<T> {}

export const TreeViewRoot = <T extends TreeNode>(props: TreeViewRootProps<T>) => {
  const [renderStrategyProps, treeViewProps] = splitRenderStrategyProps(props)
  const [useTreeViewProps, localProps] = createSplitProps<UseTreeViewProps<T>>()(treeViewProps, [
    'collection',
    'defaultExpandedValue',
    'defaultSelectedValue',
    'expandedValue',
    'expandOnClick',
    'focusedValue',
    'id',
    'ids',
    'onExpandedChange',
    'onFocusChange',
    'onSelectionChange',
    'selectedValue',
    'selectionMode',
    'typeahead',
  ])
  const treeView = useTreeView(useTreeViewProps)
  const mergedProps = mergeProps(() => treeView().getRootProps(), localProps)

  return (
    <TreeViewProvider value={treeView}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <ark.div {...mergedProps} />
      </RenderStrategyProvider>
    </TreeViewProvider>
  )
}
