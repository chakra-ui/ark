import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import * as treeView from '@zag-js/tree-view'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseTreeViewProps
  extends Optional<Omit<treeView.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseTreeViewReturn extends Accessor<treeView.Api<PropTypes>> {}

export const useTreeView = (props: UseTreeViewProps): UseTreeViewReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)

  const [state, send] = useMachine(treeView.machine(context), { context })
  return createMemo(() => treeView.connect(state, send, normalizeProps))
}
