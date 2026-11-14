import type { JSX } from '@solidjs/web'
import { type UseTreeViewNodeContext, useTreeViewNodeContext } from './use-tree-view-node-context.ts'

export interface TreeViewNodeContextProps {
  children: (context: UseTreeViewNodeContext) => JSX.Element
}

export const TreeViewNodeContext = (props: TreeViewNodeContextProps) => props.children(useTreeViewNodeContext())
