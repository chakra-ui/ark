import type { ReactNode } from 'react'
import type { TreeNode } from '../collection'
import { type UseTreeViewContext, useTreeViewContext } from './use-tree-view-context'

export interface TreeViewContextProps<T extends TreeNode> {
  children: (context: UseTreeViewContext<T>) => ReactNode
}

export const TreeViewContext = <T extends TreeNode>(props: TreeViewContextProps<T>) =>
  props.children(useTreeViewContext())
