import type { JSX } from 'solid-js'
import { type UseTreeViewItemContext, useTreeViewItemContext } from './use-tree-view-item-context'

export interface TreeViewItemContextProps {
  children: (context: UseTreeViewItemContext) => JSX.Element
}

export const TreeViewItemContext = (props: TreeViewItemContextProps) =>
  props.children(useTreeViewItemContext())
