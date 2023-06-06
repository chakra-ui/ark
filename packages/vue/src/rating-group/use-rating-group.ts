import { connect, machine, type Context } from '@zag-js/rating-group'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseRatingGroupContext = Optional<Context, 'id'> & {
  modelValue?: Context['value']
  defaultValue?: Context['value']
}

export const useRatingGroup = <T extends ExtractPropTypes<UseRatingGroupContext>>(
  emit: CallableFunction,
  context: T,
) => {
  const machineContext = computed(() => ({
    ...context,
    value: (context.modelValue ?? context.value) || context.defaultValue,
  }))
  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...machineContext.value,
      id: machineContext.value.id || useId().value,
      getRootNode,
      onChange(details) {
        emit('change', details.value)
        emit('update:modelValue', details.value)
      },
      onHover(details) {
        emit('hover', details)
      },
    }),
    { context: machineContext },
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseRatingGroupReturn = ReturnType<typeof useRatingGroup>
