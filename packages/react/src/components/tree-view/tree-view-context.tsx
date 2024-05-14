import type { ReactNode } from 'react'
import { type UseTreeViewContext, useTreeViewContext } from './use-tree-view-context'

export interface TreeViewContextProps {
  children: (context: UseTreeViewContext) => ReactNode
}

export const TreeViewContext = (props: TreeViewContextProps) => props.children(useTreeViewContext())
