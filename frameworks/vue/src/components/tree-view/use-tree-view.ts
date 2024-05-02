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
   * The initial selected items of the tree view.
   * Use this when you do not need to control the state of the tree view.
   */
  defaultSelectedValue?: treeView.Context['selectedValue']
  /**
   * The initial expanded items of the tree view.
   * Use this when you do not need to control the state of the tree view.
   */
  defaultExpandedValue?: treeView.Context['expandedValue']
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
      expandedValue: props.expandedValue ?? props.defaultExpandedValue,
      selectedValue: props.selectedValue ?? props.defaultSelectedValue,
      getRootNode: env?.value.getRootNode,
      onFocusChange: (details) => {
        emit('focusChange', details)
        emit('update:focusedValue', details.focusedValue)
      },
      onExpandedChange: (details) => {
        emit('expandedChange', details)
        emit('update:expandedValue', details.expandedValue)
      },
      onSelectionChange: (details) => {
        emit('selectionChange', details)
        emit('update:selectedValue', details.selectedValue)
      },
    }),
    { context },
  )
  return computed(() => treeView.connect(state.value, send, normalizeProps))
}
