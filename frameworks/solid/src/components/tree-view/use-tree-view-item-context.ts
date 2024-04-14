import type { ItemProps as ZagItemProps } from '@zag-js/tree-view'
import { createContext } from '../../utils/create-context'

export interface ItemProps extends Omit<ZagItemProps, 'depth'> {}
export interface UseTreeViewItemContext extends ZagItemProps {}

export const [TreeViewItemProvider, useTreeViewItemContext] = createContext<UseTreeViewItemContext>(
  {
    hookName: 'useTreeViewItemContext',
    providerName: '<TreeViewItemProvider />',
  },
)
