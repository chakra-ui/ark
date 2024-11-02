import type { NodeProps } from '@zag-js/tree-view'
import type { ReactNode } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { TreeViewNodePropsProvider } from './use-tree-view-node-props-context'

export interface TreeViewTreeNodeProviderBaseProps extends NodeProps {}
export interface TreeViewTreeNodeProviderProps extends TreeViewTreeNodeProviderBaseProps {
  children?: ReactNode
}

export const TreeViewTreeNodeProvider = (props: TreeViewTreeNodeProviderProps) => {
  const [nodeProps, { children }] = createSplitProps<NodeProps>()(props, ['indexPath', 'node'])

  return <TreeViewNodePropsProvider value={nodeProps}>{children}</TreeViewNodePropsProvider>
}
