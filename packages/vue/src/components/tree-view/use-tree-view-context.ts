import { createContext } from '../../utils'
import type { UseTreeViewReturn } from './use-tree-view'

export interface UseTreeViewContext extends UseTreeViewReturn {}

export const [TreeViewProvider, useTreeViewContext] =
  createContext<UseTreeViewContext>('TreeViewContext')
