import type { JSX } from 'solid-js'
import { type UseTreeViewNodeContext, useTreeViewNodeContext } from './use-tree-view-node-context'

export interface TreeViewNodeContextProps {
  children: (context: UseTreeViewNodeContext) => JSX.Element
}

export const TreeViewNodeContext = (props: TreeViewNodeContextProps) =>
  props.children(useTreeViewNodeContext())
