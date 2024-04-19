import type { ItemState } from '@zag-js/tree-view'
import { createContext } from '../../utils'

export interface UseTreeViewItemContext extends ItemState {}

export const [TreeViewItemProvider, useTreeViewItemContext] =
  createContext<UseTreeViewItemContext>('TreeViewItemContext')
