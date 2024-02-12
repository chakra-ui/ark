import * as pagination from '@zag-js/pagination'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, ref, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export interface UsePaginationProps extends Optional<pagination.Context, 'id'> {}
export interface UsePaginationReturn extends ComputedRef<pagination.Api<PropTypes>> {}

export const usePagination = (
  props: UsePaginationProps,
  emit: CallableFunction,
): UsePaginationReturn => {
  const getRootNode = useEnvironmentContext()
  const context = ref(props)

  const [state, send] = useMachine(
    pagination.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onPageChange: (details) => {
        emit('page-change', details)
      },
    }),
    { context },
  )

  return computed(() => pagination.connect(state.value, send, normalizeProps))
}
