import type { ItemProps } from '@zag-js/tree-view'
import { createContext } from '../create-context'

export interface UseTreeViewItemPropsContext extends Omit<ItemProps, 'depth'> {}

export const [TreeViewItemPropsProvider, useTreeViewItemPropsContext] = createContext<ItemProps>({
  name: 'TreeViewItemPropsContext',
  hookName: 'useTreeViewItemPropsContext',
  providerName: '<TreeViewItemProvider />',
})
