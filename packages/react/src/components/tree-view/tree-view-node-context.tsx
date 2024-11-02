import type { ReactNode } from 'react'
import { type UseTreeViewNodeContext, useTreeViewNodeContext } from './use-tree-view-node-context'

export interface TreeViewNodeContextProps {
  children: (context: UseTreeViewNodeContext) => ReactNode
}

export const TreeViewNodeContext = (props: TreeViewNodeContextProps) =>
  props.children(useTreeViewNodeContext())
