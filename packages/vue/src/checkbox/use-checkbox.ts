import { connect, machine, type Context } from '@zag-js/checkbox'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseCheckboxProps = Optional<Context, 'id'> & {
  modelValue?: Context['checked']
}

export const useCheckbox = <T extends ExtractPropTypes<UseCheckboxProps>>(
  emit: CallableFunction,
  context: T,
) => {
  const machineContext = computed(() => ({
    ...context,
    checked: context.modelValue ?? context.checked,
  }))

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...machineContext.value,
      id: machineContext.value.id || useId().value,
      getRootNode,
      onChange(details) {
        emit('change', details.checked)
        emit('update:checked', details.checked)
        emit('update:modelValue', details.checked)
      },
    }),
    { context: machineContext },
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseCheckboxReturn = ReturnType<typeof useCheckbox>
