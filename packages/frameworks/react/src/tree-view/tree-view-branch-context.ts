import { createContext } from '../create-context'

export interface ItemState {
  id: string
  isDisabled: boolean
  isSelected: boolean
  isFocused: boolean
  isExpanded: boolean
}

export interface ItemProps {
  id: string
  disabled?: boolean
}

export interface TreeViewBranchContext extends ItemProps {
  depth: number
}

export const [TreeViewBranchProvider, useTreeViewBranchContext] =
  createContext<TreeViewBranchContext>({
    name: 'TreeViewBranchContext',
    hookName: 'useTreeViewBranchContext',
    providerName: '<TreeViewBranchProvider />',
  })
