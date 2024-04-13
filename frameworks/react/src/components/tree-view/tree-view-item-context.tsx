import type { ReactNode } from 'react'
import { type UseTreeViewItemContext, useTreeViewItemContext } from './use-tree-view-item-context'

export interface TreeViewItemContextProps {
  children: (context: UseTreeViewItemContext) => ReactNode
}

export const TreeViewItemContext = (props: TreeViewItemContextProps) =>
  props.children(useTreeViewItemContext())
