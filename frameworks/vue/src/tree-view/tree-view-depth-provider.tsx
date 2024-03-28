import { createContext } from '../context'

export type TreeViewDepthContext = number

export const [TreeViewDepthProvider, useTreeViewDepthContext] =
  createContext<TreeViewDepthContext>('TreeViewDepthContext')
