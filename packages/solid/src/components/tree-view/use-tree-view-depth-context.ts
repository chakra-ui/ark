import { createContext } from '../../utils/create-context'

export type UseTreeViewDepthContext = number

export const [TreeViewDepthProvider, useTreeViewDepthContext] =
  createContext<UseTreeViewDepthContext>({
    hookName: 'useTreeViewDepthContext',
    providerName: '<TreeViewDepthProvider />',
  })
