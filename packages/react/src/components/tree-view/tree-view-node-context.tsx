'use client'

import { type UseTreeViewNodeContext, useTreeViewNodeContext } from './use-tree-view-node-context.ts'

export interface TreeViewNodeContextProps {
  children: (context: UseTreeViewNodeContext) => React.ReactNode
}

export const TreeViewNodeContext = (props: TreeViewNodeContextProps) => props.children(useTreeViewNodeContext())
