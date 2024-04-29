import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as treeView from '@zag-js/tree-view'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'

export interface UseTreeViewProps
  extends Optional<Omit<treeView.Context, 'dir' | 'getRootNode'>, 'id'> {
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
  const { dir } = useLocaleContext()
  const initialContext: treeView.Context = {
    id: useId(),
    dir,
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
