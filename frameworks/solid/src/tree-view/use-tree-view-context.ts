import { createContext } from '../create-context'
import type { UseTreeViewReturn } from './use-tree-view'

export interface UseTreeViewContext extends UseTreeViewReturn {}

export const [TreeViewProvider, useTreeViewContext] = createContext<UseTreeViewContext>({
  hookName: 'useTreeViewContext',
  providerName: '<TreeViewProvider />',
})
