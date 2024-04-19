import type { ItemState } from '@zag-js/tree-view'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

export interface UseTreeViewItemContext extends ComputedRef<ItemState> {}

export const [TreeViewItemProvider, useTreeViewItemContext] =
  createContext<UseTreeViewItemContext>('TreeViewItemContext')
