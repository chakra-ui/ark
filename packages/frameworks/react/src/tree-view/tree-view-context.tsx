import { useTreeViewContext, type UseTreeViewContext } from './use-tree-view-context'

export interface TreeViewContextProps {
  children: (context: UseTreeViewContext) => React.ReactNode
}

export const TreeViewContext = (props: TreeViewContextProps) => props.children(useTreeViewContext())
