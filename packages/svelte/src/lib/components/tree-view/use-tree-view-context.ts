import { createContext } from '$lib/utils/create-context'
import type { TreeNode } from '../collection/index.ts'
import type { UseTreeViewReturn } from './use-tree-view.svelte.ts'

export interface UseTreeViewContext<T extends TreeNode> extends UseTreeViewReturn<T> {}

export const [TreeViewProvider, useTreeViewContext] = createContext<UseTreeViewContext<TreeNode>>({
  name: 'TreeViewContext',
  hookName: 'useTreeViewContext',
  providerName: '<TreeViewProvider />',
})
