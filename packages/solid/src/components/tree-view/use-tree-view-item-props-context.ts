import type { ItemProps } from '@zag-js/tree-view'
import { createContext } from '../../utils/create-context'

export interface UseTreeViewItemPropsContext extends Omit<ItemProps, 'depth'> {}

export const [TreeViewItemPropsProvider, useTreeViewItemPropsContext] = createContext<ItemProps>({
  hookName: 'useTreeViewItemPropsContext',
  providerName: '<TreeViewItemProvider />',
})
