'use client'

import type { NodeState } from '@zag-js/tree-view'
import { createContext } from '../../utils/create-context.ts'

export interface UseTreeViewNodeContext extends NodeState {}

export const [TreeViewNodeStateProvider, useTreeViewNodeContext] = createContext<UseTreeViewNodeContext>({
  name: 'TreeViewNodeContext',
  hookName: 'useTreeViewNodeContext',
  providerName: '<TreeViewNodeProvider />',
})
