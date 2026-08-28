'use client'

import type { NodeProps } from '@zag-js/tree-view'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { TreeViewNodeStateProvider } from './use-tree-view-node-context.ts'
import { TreeViewNodePropsProvider } from './use-tree-view-node-props-context.ts'

export interface TreeViewNodeProviderBaseProps<T> extends NodeProps {
  node: T
}
export interface TreeViewNodeProviderProps<T> extends TreeViewNodeProviderBaseProps<T> {
  children?: React.ReactNode | undefined
}

const splitNodeProps = createSplitProps<NodeProps>()

export function TreeViewNodeProvider<T>(props: TreeViewNodeProviderProps<T>) {
  const [nodeProps, localProps] = splitNodeProps(props, ['indexPath', 'node'])
  const treeView = useTreeViewContext()
  const nodeState = treeView.getNodeState(nodeProps)
  return (
    <TreeViewNodeStateProvider value={nodeState}>
      <TreeViewNodePropsProvider value={nodeProps}>{localProps.children}</TreeViewNodePropsProvider>
    </TreeViewNodeStateProvider>
  )
}
