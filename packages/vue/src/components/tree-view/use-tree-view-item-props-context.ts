import type { ItemProps } from '@zag-js/tree-view'
import { createContext } from '../../utils'

export interface UseTreeViewItemPropsContext extends Omit<ItemProps, 'depth'> {}

export const [TreeViewItemPropsProvider, useTreeViewItemPropsContext] = createContext<ItemProps>(
  'TreeViewItemPropsContext',
)
