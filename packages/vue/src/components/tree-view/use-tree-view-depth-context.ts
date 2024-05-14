import { createContext } from '../../utils'

export type UseTreeViewDepthContext = number

export const [TreeViewDepthProvider, useTreeViewDepthContext] =
  createContext<UseTreeViewDepthContext>('TreeViewDepthContext')
