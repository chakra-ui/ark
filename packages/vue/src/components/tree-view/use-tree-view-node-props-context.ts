import type { NodeProps } from '@zag-js/tree-view'
import { createContext } from '../../utils'

export interface UseTreeViewNodePropsContext extends NodeProps {}

export const [TreeViewNodePropsProvider, useTreeViewNodePropsContext] =
  createContext<UseTreeViewNodePropsContext>('TreeViewNodePropsContext')
