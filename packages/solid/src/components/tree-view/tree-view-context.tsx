import type { JSX } from 'solid-js'
import type { TreeNode } from '../collection/index.tsx'
import { type UseTreeViewContext, useTreeViewContext } from './use-tree-view-context.ts'

export interface TreeViewContextProps<T extends TreeNode> {
  children: (context: UseTreeViewContext<T>) => JSX.Element
}

export const TreeViewContext = <T extends TreeNode>(props: TreeViewContextProps<T>) =>
  props.children(useTreeViewContext())
