import { createContext } from '~/utils/context'
import type { UseTreeViewReturn } from './use-tree-view'

export interface TreeViewContext extends UseTreeViewReturn {}

export const [TreeViewProvider, useTreeViewContext] =
  createContext<UseTreeViewReturn>('TreeViewContext')
