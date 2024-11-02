import type { ReactNode } from 'react'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

export interface TreeViewTreeNodeBaseProps {
  type: 'branch' | 'item'
}
export interface TreeViewTreeNodeProps extends TreeViewTreeNodeBaseProps {
  children?: ReactNode
}

export const TreeViewTreeNode = (props: TreeViewTreeNodeProps) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const nodeState = treeView.getNodeState(nodeProps)

  if (
    (nodeState.isBranch && props.type === 'branch') ||
    (!nodeState.isBranch && props.type === 'item')
  ) {
    return <>{props.children}</>
  }
  return null
}
