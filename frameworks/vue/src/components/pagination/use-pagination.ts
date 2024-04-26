import * as pagination from '@zag-js/pagination'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './pagination'

export interface UsePaginationProps
  extends Optional<Omit<pagination.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UsePaginationReturn extends ComputedRef<pagination.Api<PropTypes>> {}

export const usePagination = (
  props: UsePaginationProps,
  emit: EmitFn<RootEmits>,
): UsePaginationReturn => {
  const env = useEnvironmentContext()
  const context = ref(props)

  const [state, send] = useMachine(
    pagination.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode: env?.value.getRootNode,
      onPageChange: (details) => emit('pageChange', details),
    }),
    { context },
  )

  return computed(() => pagination.connect(state.value, send, normalizeProps))
}
