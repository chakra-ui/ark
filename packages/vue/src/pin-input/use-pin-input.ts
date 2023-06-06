import { connect, machine, type Context } from '@zag-js/pin-input'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UsePinInputContext = Optional<Context, 'id'> & {
  modelValue?: Context['value']
  defaultValue?: Context['value']
}

export const usePinInput = <T extends ExtractPropTypes<UsePinInputContext>>(
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
        emit('change', details)
        emit('update:modelValue', Array.from(details.value))
      },
      onComplete(details) {
        emit('complete', details)
      },
      onInvalid(details) {
        emit('invalid', details)
      },
    }),
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UsePinInputReturn = ReturnType<typeof usePinInput>
