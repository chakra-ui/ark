import type { ItemProps as ZagItemProps } from '@zag-js/tree-view'
import { createContext } from '../../utils'

export interface ItemProps extends Omit<ZagItemProps, 'depth'> {}
export interface UseTreeViewBranchContext extends ZagItemProps {}

export const [TreeViewBranchProvider, useTreeViewBranchContext] =
  createContext<UseTreeViewBranchContext>('TreeViewBranchContext')
