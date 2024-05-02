import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import * as treeView from '@zag-js/tree-view'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseTreeViewProps
  extends Optional<Omit<treeView.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseTreeViewReturn extends Accessor<treeView.Api<PropTypes>> {}

export const useTreeView = (props: UseTreeViewProps): UseTreeViewReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const context = mergeProps(
    { id: createUniqueId(), dir: locale().dir, getRootNode: environment().getRootNode },
    props,
  )

  const [state, send] = useMachine(treeView.machine(context), { context })
  return createMemo(() => treeView.connect(state, send, normalizeProps))
}
