import * as pagination from '@zag-js/pagination'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'
import { useId } from '../../utils'

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
