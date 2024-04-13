import type { JSX } from 'solid-js'
import { type UseTreeViewContext, useTreeViewContext } from './use-tree-view-context'

export interface TreeViewContextProps {
  children: (context: UseTreeViewContext) => JSX.Element
}

export const TreeViewContext = (props: TreeViewContextProps) => props.children(useTreeViewContext())
