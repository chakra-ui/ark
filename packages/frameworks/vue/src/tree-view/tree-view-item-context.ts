import { createContext } from '../context'

export interface ItemProps {
  id: string
  disabled?: boolean
}

export interface TreeViewItemContext extends ItemProps {
  depth: number
}

export const [TreeViewItemProvider, useTreeViewItemContext] =
  createContext<TreeViewItemContext>('TreeViewItemContext')
