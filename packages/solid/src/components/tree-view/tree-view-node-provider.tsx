import type { NodeProps } from '@zag-js/tree-view'
import { type JSX, createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { TreeViewNodeStateProvider } from './use-tree-view-node-context.ts'
import { TreeViewNodePropsProvider } from './use-tree-view-node-props-context.ts'

export interface TreeViewNodeProviderBaseProps<T> extends NodeProps {
  node: T
}
export interface TreeViewNodeProviderProps<T> extends TreeViewNodeProviderBaseProps<T> {
  children?: JSX.Element
}

export function TreeViewNodeProvider<T>(props: TreeViewNodeProviderProps<T>) {
  const [nodeProps, localProps] = createSplitProps<NodeProps>()(props, ['indexPath', 'node'])
  const treeView = useTreeViewContext()
  const nodeState = createMemo(() => treeView().getNodeState(nodeProps))
  return (
    <TreeViewNodeStateProvider value={nodeState}>
      <TreeViewNodePropsProvider value={nodeProps}>{localProps.children}</TreeViewNodePropsProvider>
    </TreeViewNodeStateProvider>
  )
}
