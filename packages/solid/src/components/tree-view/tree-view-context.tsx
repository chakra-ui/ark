import type { JSX } from 'solid-js'
import type { TreeNode } from '../collection'
import { type UseTreeViewContext, useTreeViewContext } from './use-tree-view-context'

export interface TreeViewContextProps<T extends TreeNode> {
  children: (context: UseTreeViewContext<T>) => JSX.Element
}

export const TreeViewContext = <T extends TreeNode>(props: TreeViewContextProps<T>) =>
  props.children(useTreeViewContext())
