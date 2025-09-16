import type { NodeState } from '@zag-js/tree-view'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context'

export interface UseTreeViewNodeContext extends ComputedRef<NodeState> {}

export const [TreeViewNodeStateProvider, useTreeViewNodeContext] =
  createContext<UseTreeViewNodeContext>('TreeViewNodeContext')
