import { connect, machine, type Context } from '@zag-js/number-input'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseNumberInputContext = Optional<Context, 'id'> & {
  modelValue?: Context['value']
  defaultValue?: Context['value']
}

export const useNumberInput = <T extends ExtractPropTypes<UseNumberInputContext>>(
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
      onBlur(details) {
        emit('blur', details)
      },
      onChange(details) {
        emit('change', details)
        emit('update:modelValue', details.value)
      },
      onFocus(details) {
        emit('focus', details)
      },
      onInvalid(details) {
        emit('invalid', details)
      },
    }),
    { context: machineContext },
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseNumberInputReturn = ReturnType<typeof useNumberInput>
