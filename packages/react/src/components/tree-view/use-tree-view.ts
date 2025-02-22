import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as treeView from '@zag-js/tree-view'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import type { TreeCollection, TreeNode } from '../collection'

export interface UseTreeViewProps<T extends TreeNode>
  extends Optional<Omit<treeView.Props, 'dir' | 'getRootNode' | 'collection'>, 'id'> {
  /**
   * The collection of tree nodes
   */
  collection: TreeCollection<T>
}

export interface UseTreeViewReturn<T extends TreeNode> extends treeView.Api<PropTypes, T> {}

export const useTreeView = <T extends TreeNode>(props: UseTreeViewProps<T>): UseTreeViewReturn<T> => {
  const id = useId()
  const { dir } = useLocaleContext()
  const { getRootNode } = useEnvironmentContext()

  const userProps: treeView.Props = {
    id,
    dir,
    getRootNode,
    ...props,
  }

  const service = useMachine(treeView.machine, userProps)
  return treeView.connect(service, normalizeProps)
}
