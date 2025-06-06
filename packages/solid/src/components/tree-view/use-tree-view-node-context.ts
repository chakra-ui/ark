import type { NodeState } from '@zag-js/tree-view'
import type { Accessor } from 'solid-js'
import { createContext } from '../../utils/create-context'

export interface UseTreeViewNodeContext extends Accessor<NodeState> {}

export const [TreeViewNodeStateProvider, useTreeViewNodeContext] = createContext<UseTreeViewNodeContext>({
  hookName: 'useTreeViewNodeContext',
  providerName: '<TreeViewNodeProvider />',
})
