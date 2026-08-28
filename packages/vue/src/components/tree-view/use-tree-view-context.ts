import { createContext } from '../../utils/create-context.ts'
import type { TreeNode } from '../collection/index.ts'
import type { UseTreeViewReturn } from './use-tree-view.ts'

export interface UseTreeViewContext<T extends TreeNode> extends UseTreeViewReturn<T> {}

export const [TreeViewProvider, useTreeViewContext] = createContext<UseTreeViewContext<TreeNode>>('TreeViewContext')
