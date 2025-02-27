import * as treeView from '@zag-js/tree-view'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { TreeCollection, TreeNode } from '../collection'
import type { RootEmits } from './tree-view.types'

export interface UseTreeViewProps<T extends TreeNode>
  extends Optional<Omit<treeView.Props, 'dir' | 'getRootNode' | 'collection'>, 'id'> {
  /**
   * The collection of tree nodes
   */
  collection: TreeCollection<T>
}

export interface UseTreeViewReturn<T extends TreeNode> extends ComputedRef<treeView.Api<PropTypes, T>> {}

export const useTreeView = <T extends TreeNode>(
  props: UseTreeViewProps<T>,
  emit?: EmitFn<RootEmits>,
): UseTreeViewReturn<T> => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<treeView.Props>(() => ({
    id,
    dir: locale.value.dir,
    getRootNode: env?.value.getRootNode,
    ...cleanProps(props),
    onFocusChange: (details) => {
      emit?.('focusChange', details)
      emit?.('update:focusedValue', details.focusedValue)
      props.onFocusChange?.(details)
    },
    onExpandedChange: (details) => {
      emit?.('expandedChange', details)
      emit?.('update:expandedValue', details.expandedValue)
      props.onExpandedChange?.(details)
    },
    onSelectionChange: (details) => {
      emit?.('selectionChange', details)
      emit?.('update:selectedValue', details.selectedValue)
      props.onSelectionChange?.(details)
    },
  }))

  const service = useMachine(treeView.machine, context)
  return computed(() => treeView.connect(service, normalizeProps))
}
