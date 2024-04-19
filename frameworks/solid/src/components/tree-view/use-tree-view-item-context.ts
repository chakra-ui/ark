import type { ItemState } from '@zag-js/tree-view'
import type { Accessor } from 'solid-js'
import { createContext } from '../../utils/create-context'

export interface UseTreeViewItemContext extends Accessor<ItemState> {}

export const [TreeViewItemProvider, useTreeViewItemContext] = createContext<UseTreeViewItemContext>(
  {
    hookName: 'useTreeViewItemContext',
    providerName: '<TreeViewItemProvider />',
  },
)
