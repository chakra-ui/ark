import { createContext } from '../create-context'

export type UseTreeViewDepthContext = number

export const [TreeViewDepthProvider, useTreeViewDepthContext] =
  createContext<UseTreeViewDepthContext>({
    hookName: 'useTreeViewDepthContext',
    providerName: '<TreeViewDepthProvider />',
  })
