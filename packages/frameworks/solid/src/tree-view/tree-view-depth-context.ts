import { createContext } from '../create-context'

export type TreeViewDepthContext = number

export const [TreeViewDepthProvider, useTreeViewDepthContext] = createContext<TreeViewDepthContext>(
  {
    hookName: 'useTreeViewDepthContext',
    providerName: '<TreeViewDepthProvider />',
  },
)
