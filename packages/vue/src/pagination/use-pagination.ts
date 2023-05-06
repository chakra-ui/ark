import { connect, machine, type Context as PaginationContext } from '@zag-js/pagination'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type ExtractPropTypes } from 'vue'
import { useId } from '../utils'

export const usePagination = <T extends ExtractPropTypes<PaginationContext>>(
  emit: CallableFunction,
  context: T,
) => {
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      count: reactiveContext.count || 0,
      id: reactiveContext.id || useId().value,
      onChange(details) {
        emit('change', details)
      },
    }),
  )

  return computed(() => connect(state.value, send, normalizeProps))
}
