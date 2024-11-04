import type { NodeState } from '@zag-js/tree-view'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

export interface UseTreeViewNodeContext extends ComputedRef<NodeState> {}

export const [TreeViewNodeProvider, useTreeViewNodeContext] =
  createContext<UseTreeViewNodeContext>('TreeViewNodeContext')
