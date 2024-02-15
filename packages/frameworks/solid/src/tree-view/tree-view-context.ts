import { createContext } from '../create-context'
import { type UseTreeViewReturn } from './use-tree-view'

export interface TreeViewContext extends UseTreeViewReturn {}

export const [TreeViewProvider, useTreeViewContext] = createContext<TreeViewContext>({
  hookName: 'useTreeViewContext',
  providerName: '<TreeViewProvider />',
})
