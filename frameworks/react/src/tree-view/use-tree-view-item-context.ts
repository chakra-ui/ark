import type { ItemState } from '@zag-js/tree-view'
import { createContext } from '../create-context'

export interface UseTreeViewItemContext extends ItemState {}

export const [TreeViewItemProvider, useTreeViewItemContext] = createContext<UseTreeViewItemContext>(
  {
    name: 'TreeViewItemContext',
    hookName: 'useTreeViewItemContext',
    providerName: '<TreeViewItemProvider />',
  },
)
