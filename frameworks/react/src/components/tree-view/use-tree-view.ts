import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as treeView from '@zag-js/tree-view'
import { useId } from 'react'
import { useEnvironmentContext } from '../../providers/environment'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseTreeViewProps extends Optional<treeView.Context, 'id'> {
  /**
   * The initial selected ids of the tree view.
   */
  defaultSelectedValue?: treeView.Context['selectedValue']
  /**
   * The initial expanded ids of the tree view.
   */
  defaultExpandedValue?: treeView.Context['expandedValue']
}

export interface UseTreeViewReturn extends treeView.Api<PropTypes> {}

export const useTreeView = (props: UseTreeViewProps = {}): UseTreeViewReturn => {
  const initialContext: treeView.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    selectedValue: props.defaultSelectedValue,
    expandedValue: props.defaultExpandedValue,
    ...props,
  }

  const context: treeView.Context = {
    ...initialContext,
    onFocusChange: useEvent(props.onFocusChange, { sync: true }),
    onExpandedChange: useEvent(props.onExpandedChange),
    onSelectionChange: useEvent(props.onSelectionChange),
  }

  const [state, send] = useMachine(treeView.machine(initialContext), { context })
  return treeView.connect(state, send, normalizeProps)
}
