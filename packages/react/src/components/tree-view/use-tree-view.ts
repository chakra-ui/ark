import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as treeView from '@zag-js/tree-view'
import { useEffect, useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'
import type { TreeCollection, TreeNode } from '../collection'

export interface UseTreeViewProps<T extends TreeNode>
  extends Optional<Omit<treeView.Context, 'dir' | 'getRootNode' | 'collection'>, 'id'> {
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

export interface UseTreeViewReturn<T extends TreeNode> extends treeView.Api<PropTypes, T> {}

export const useTreeView = <T extends TreeNode>(
  props: UseTreeViewProps<T>,
): UseTreeViewReturn<T> => {
  const { collection, ...treeViewProps } = props
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()

  const initialContext: treeView.Context = {
    id: useId(),
    dir: locale.dir,
    getRootNode: environment.getRootNode,
    selectedValue: props.defaultSelectedValue,
    expandedValue: props.defaultExpandedValue,
    collection,
    ...treeViewProps,
  }

  const context = (() => {
    const { collection: _, ...restProps } = initialContext
    return {
      ...restProps,
      selectedValue: props.selectedValue,
      expandedValue: props.expandedValue,
      onFocusChange: useEvent(props.onFocusChange),
      onExpandedChange: useEvent(props.onExpandedChange, { sync: true }),
      onSelectionChange: useEvent(props.onSelectionChange, { sync: true }),
    }
  })()

  const [state, send, service] = useMachine(treeView.machine(initialContext), {
    context,
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    service.setContext({ collection })
  }, [collection])

  return treeView.connect(state, send, normalizeProps)
}
