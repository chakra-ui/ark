import { createContext } from '../context'
import { type UseTreeViewReturn } from './use-tree-view'

// TODO: remove after zag release
export interface ItemProps {
  depth: number
  id: string
  disabled?: boolean
}

export interface BranchProps extends ItemProps {}

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

export interface TreeViewContext extends UseTreeViewReturn {}

export const [TreeViewProvider, useTreeViewContext] =
  createContext<UseTreeViewReturn>('TreeViewContext')
