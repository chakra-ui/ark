import { createContext } from '../../utils'
import type { TreeNode } from '../collection'
import type { UseTreeViewReturn } from './use-tree-view'

export interface UseTreeViewContext<T extends TreeNode> extends UseTreeViewReturn<T> {}

export const [TreeViewProvider, useTreeViewContext] =
  createContext<UseTreeViewContext<TreeNode>>('TreeViewContext')
