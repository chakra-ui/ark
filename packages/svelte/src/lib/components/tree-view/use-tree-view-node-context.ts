import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { NodeState } from '@zag-js/tree-view'

export interface UseTreeViewNodeContext extends Accessor<NodeState> {}

export const [TreeViewNodeProvider, useTreeViewNodeContext] = createContext<UseTreeViewNodeContext>({
  name: 'TreeViewNodeContext',
  hookName: 'useTreeViewNodeContext',
  providerName: '<TreeViewNodeProvider />',
})
