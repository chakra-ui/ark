import { mergeProps } from '@zag-js/react'
import { type JSX, forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import {
  type RenderStrategyProps,
  RenderStrategyPropsProvider,
  splitRenderStrategyProps,
} from '../../utils/render-strategy'
import type { TreeNode } from '../collection'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseTreeViewProps, useTreeView } from './use-tree-view'
import { TreeViewProvider } from './use-tree-view-context'

export interface TreeViewRootBaseProps<T extends TreeNode>
  extends UseTreeViewProps<T>, RenderStrategyProps, PolymorphicProps {}
export interface TreeViewRootProps<T extends TreeNode> extends HTMLProps<'div'>, TreeViewRootBaseProps<T> {}

const TreeViewImpl = <T extends TreeNode>(props: TreeViewRootProps<T>, ref: React.Ref<HTMLDivElement>) => {
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
    'scrollToIndexFn',
    'selectedValue',
    'selectionMode',
    'typeahead',
  ])

  const treeView = useTreeView(useTreeViewProps)
  const mergedProps = mergeProps(treeView.getRootProps(), localProps)

  return (
    <TreeViewProvider value={treeView}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <ark.div {...mergedProps} ref={ref} />
      </RenderStrategyPropsProvider>
    </TreeViewProvider>
  )
}

export type TreeViewRootComponentProps<T extends TreeNode = TreeNode, P = {}> = Assign<TreeViewRootProps<T>, P> &
  React.RefAttributes<HTMLDivElement>

export type TreeViewRootComponent<P = {}> = <T extends TreeNode>(props: TreeViewRootComponentProps<T, P>) => JSX.Element

export const TreeViewRoot = forwardRef(TreeViewImpl) as TreeViewRootComponent
