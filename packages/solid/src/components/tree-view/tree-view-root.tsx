import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type RenderStrategyProps, RenderStrategyProvider, splitRenderStrategyProps } from '../../utils/render-strategy'
import type { TreeNode } from '../collection'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseTreeViewProps, useTreeView } from './use-tree-view'
import { TreeViewProvider } from './use-tree-view-context'

export interface TreeViewRootBaseProps<T extends TreeNode>
  extends UseTreeViewProps<T>, RenderStrategyProps, PolymorphicProps<'div'> {}
export interface TreeViewRootProps<T extends TreeNode> extends Assign<HTMLProps<'div'>, TreeViewRootBaseProps<T>> {}

export const TreeViewRoot = <T extends TreeNode>(props: TreeViewRootProps<T>) => {
  const [renderStrategyProps, treeViewProps] = splitRenderStrategyProps(props)
  const [useTreeViewProps, localProps] = createSplitProps<UseTreeViewProps<T>>()(treeViewProps, [
    'canRename',
    'checkedValue',
    'collection',
    'defaultCheckedValue',
    'defaultExpandedValue',
    'defaultFocusedValue',
    'defaultSelectedValue',
    'expandedValue',
    'expandOnClick',
    'focusedValue',
    'id',
    'ids',
    'loadChildren',
    'onBeforeRename',
    'onCheckedChange',
    'onExpandedChange',
    'onFocusChange',
    'onLoadChildrenComplete',
    'onLoadChildrenError',
    'onRenameComplete',
    'onRenameStart',
    'onSelectionChange',
    'selectedValue',
    'selectionMode',
    'typeahead',
    'scrollToIndexFn',
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

export type TreeViewRootComponentProps<T extends TreeNode = TreeNode, P = {}> = Assign<TreeViewRootProps<T>, P>

export type TreeViewRootComponent<P = {}> = <T extends TreeNode>(props: TreeViewRootComponentProps<T, P>) => JSX.Element
