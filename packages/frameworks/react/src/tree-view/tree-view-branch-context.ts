import { createContext } from '../create-context'

export interface BranchProps {
  depth: number
  id: string
  disabled?: boolean
}

interface ItemState {
  id: string
  isDisabled: boolean
  isSelected: boolean
  isFocused: boolean
}

export interface BranchState extends ItemState {
  isExpanded: boolean
}

export const [TreeViewBranchProvider, useTreeViewBranchContext] = createContext<BranchProps>({
  name: 'TreeViewBranchContext',
  hookName: 'useTreeViewBranchContext',
  providerName: '<TreeViewBranchProvider />',
})
