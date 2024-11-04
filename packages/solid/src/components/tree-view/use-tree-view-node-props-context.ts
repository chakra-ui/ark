import type { NodeProps } from '@zag-js/tree-view'
import { createContext } from '../../utils/create-context'

export interface UseTreeViewNodePropsContext extends NodeProps {}

export const [TreeViewNodePropsProvider, useTreeViewNodePropsContext] =
  createContext<UseTreeViewNodePropsContext>({
    hookName: 'useTreeViewNodePropsContext',
    providerName: '<TreeViewNodeProvider />',
  })
