import * as treeView from '@zag-js/tree-view'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './tree-view.types'

export interface UseTreeViewProps
  extends Optional<Omit<treeView.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial focused index of the tree view.
   */
  defaultFocusedId?: treeView.Context['focusedValue']
}

export interface UseTreeViewReturn extends ComputedRef<treeView.Api<PropTypes>> {}

export const useTreeView = (
  props: UseTreeViewProps,
  emit: EmitFn<RootEmits>,
): UseTreeViewReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const context = ref(props)

  const [state, send] = useMachine(
    treeView.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      onFocusChange: (details) => emit('focusChange', details),
      onExpandedChange: (details) => emit('expandedChange', details),
      onSelectionChange: (details) => emit('selectionChange', details),
    }),
    { context },
  )
  return computed(() => treeView.connect(state.value, send, normalizeProps))
}
