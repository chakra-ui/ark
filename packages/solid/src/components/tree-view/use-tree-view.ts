import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as treeView from '@zag-js/tree-view'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import type { TreeCollection, TreeNode } from '../collection'

export interface UseTreeViewProps<T extends TreeNode>
  extends Optional<Omit<treeView.Context, 'dir' | 'getRootNode' | 'colllection'>, 'id'> {
  /**
   * The initial selected items of the tree view.
   * Use this when you do not need to control the state of the tree view.
   */
  defaultSelectedValue?: treeView.Context['selectedValue']
  /**
   * The initial expanded items of the tree view.
   * Use this when you do not need to control the state of the tree view.
   */
  defaultExpandedValue?: treeView.Context['expandedValue']
  /**
   * The collection of tree nodes
   */
  collection: TreeCollection<T>
}
export interface UseTreeViewReturn<T extends TreeNode>
  extends Accessor<treeView.Api<PropTypes, T>> {}

export const useTreeView = <T extends TreeNode>(
  props: UseTreeViewProps<T>,
): UseTreeViewReturn<T> => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    selectedValue: props.defaultSelectedValue,
    expandedValue: props.defaultExpandedValue,
    ...props,
  }))

  const [state, send] = useMachine(treeView.machine(context()), { context })
  return createMemo(() => treeView.connect(state, send, normalizeProps))
}
