import { createContext } from '../../utils/create-context'

export type UseTreeViewDepthContext = number

export const [TreeViewDepthProvider, useTreeViewDepthContext] =
  createContext<UseTreeViewDepthContext>({
    name: 'TreeViewDepthContext',
    hookName: 'useTreeViewDepthContext',
    providerName: '<TreeViewDepthProvider />',
  })
