import { createContext } from '$lib/utils/create-context'
import type { TreeNode } from '../collection'
import type { UseTreeViewReturn } from './use-tree-view.svelte'

export interface UseTreeViewContext<T extends TreeNode> extends UseTreeViewReturn<T> {}

export const [TreeViewProvider, useTreeViewContext] = createContext<UseTreeViewContext<TreeNode>>({
  name: 'TreeViewContext',
  hookName: 'useTreeViewContext',
  providerName: '<TreeViewProvider />',
})
