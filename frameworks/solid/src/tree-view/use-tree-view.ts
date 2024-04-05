import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import * as treeView from '@zag-js/tree-view'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export interface UseTreeViewProps extends Optional<treeView.Context, 'id'> {}
export interface UseTreeViewReturn extends Accessor<treeView.Api<PropTypes>> {}

export const useTreeView = (props: UseTreeViewProps): UseTreeViewReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)

  const [state, send] = useMachine(treeView.machine(context), { context })
  return createMemo(() => treeView.connect(state, send, normalizeProps))
}
