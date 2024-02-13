import type { ItemProps as ZagItemProps } from '@zag-js/tree-view'
import { createContext } from '../create-context'

export interface ItemProps extends Omit<ZagItemProps, 'depth'> {}
export interface TreeViewBranchContext extends ZagItemProps {}

export const [TreeViewBranchProvider, useTreeViewBranchContext] =
  createContext<TreeViewBranchContext>({
    name: 'TreeViewBranchContext',
    hookName: 'useTreeViewBranchContext',
    providerName: '<TreeViewBranchProvider />',
  })
