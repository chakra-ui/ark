import { connect, machine, type Context as PaginationContext } from '@zag-js/pagination'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type UnwrapRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'
import { useId } from '../utils'

export type UsePaginationContext = Optional<PaginationContext, 'id'>

export const usePagination = (emit: CallableFunction, context: UsePaginationContext) => {
  const reactiveContext = reactive(context)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      getRootNode,
      onChange(details) {
        emit('change', details)
      },
    }),
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UsePaginationReturn = UnwrapRef<ReturnType<typeof usePagination>>
