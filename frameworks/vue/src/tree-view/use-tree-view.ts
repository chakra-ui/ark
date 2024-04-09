import * as treeView from '@zag-js/tree-view'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, ref, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export interface UseTreeViewProps extends Optional<treeView.Context, 'id'> {
  /**
   * The initial focused index of the tree view.
   */
  defaultFocusedId?: treeView.Context['focusedId']
}

export interface UseTreeViewReturn extends ComputedRef<treeView.Api<PropTypes>> {}

export const useTreeView = (props: UseTreeViewProps, emit: CallableFunction): UseTreeViewReturn => {
  const getRootNode = useEnvironmentContext()
  const context = ref(props)

  const [state, send] = useMachine(
    treeView.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onFocusChange: (details) => {
        emit('focus-change', details)
      },
      onExpandedChange: (details) => {
        emit('expanded-change', details)
      },
      onSelectionChange: (details) => {
        emit('selection-change', details)
      },
    }),
    { context },
  )
  return computed(() => treeView.connect(state.value, send, normalizeProps))
}
