import { connect, machine, type Context } from '@zag-js/pagination'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UsePaginationProps = Optional<Context, 'id'> & {
  modelValue?: Context['page']
}

export const usePagination = <T extends ExtractPropTypes<UsePaginationProps>>(
  emit: CallableFunction,
  context: T,
) => {
  const machineContext = computed(() => ({
    ...context,
    count: context.count ?? 0,
  }))

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...machineContext.value,
      id: machineContext.value.id || useId().value,
      getRootNode,
      onChange(details) {
        emit('change', details)
        emit('update:modelValue', details.page)
      },
    }),
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UsePaginationReturn = ReturnType<typeof usePagination>
