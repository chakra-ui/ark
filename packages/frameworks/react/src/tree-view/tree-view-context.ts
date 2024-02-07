import { createContext } from '../create-context'
import { type UseTreeViewReturn } from './use-tree-view'

export interface ItemState {
  id: string
  isDisabled: boolean
  isSelected: boolean
  isFocused: boolean
}

export interface BranchState extends ItemState {
  isExpanded: boolean
}

export interface TreeViewContext extends UseTreeViewReturn {}

export const [TreeViewProvider, useTreeViewContext] = createContext<TreeViewContext>({
  name: 'TreeViewContext',
  hookName: 'useTreeViewContext',
  providerName: '<TreeViewProvider />',
})
