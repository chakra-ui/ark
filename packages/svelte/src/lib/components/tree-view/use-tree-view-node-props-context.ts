import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { NodeProps } from '@zag-js/tree-view'

export interface UseTreeViewNodePropsContext extends Accessor<NodeProps> {}

export const [TreeViewNodePropsProvider, useTreeViewNodePropsContext] = createContext<UseTreeViewNodePropsContext>({
  name: 'TreeViewNodePropsContext',
  hookName: 'useTreeViewNodePropsContext',
  providerName: '<TreeViewNodePropsProvider />',
})
