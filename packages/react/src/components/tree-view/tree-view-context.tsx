import type { TreeNode } from '../collection'
import { type UseTreeViewContext, useTreeViewContext } from './use-tree-view-context'

export interface TreeViewContextProps<T extends TreeNode> {
  children: (context: UseTreeViewContext<T>) => React.ReactNode
}

export const TreeViewContext = <T extends TreeNode>(props: TreeViewContextProps<T>) =>
  props.children(useTreeViewContext())
