import type { ReactNode } from 'react'
import { useTreeViewItemContext, type UseTreeViewItemContext } from './use-tree-view-item-context'

export interface TreeViewItemContextProps {
  children: (context: UseTreeViewItemContext) => ReactNode
}

export const TreeViewItemContext = (props: TreeViewItemContextProps) =>
  props.children(useTreeViewItemContext())
