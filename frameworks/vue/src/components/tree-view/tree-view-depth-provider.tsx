import { createContext } from '../../utils'

export type TreeViewDepthContext = number

export const [TreeViewDepthProvider, useTreeViewDepthContext] =
  createContext<TreeViewDepthContext>('TreeViewDepthContext')
