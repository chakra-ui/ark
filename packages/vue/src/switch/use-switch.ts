import { connect, machine, type Context } from '@zag-js/switch'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseSwitchProps = Optional<Context, 'id'> & {
  modelValue?: Context['checked']
}

export const useSwitch = <T extends ExtractPropTypes<UseSwitchProps>>(
  emit: CallableFunction,
  context: T,
) => {
  const getRootNode = useEnvironmentContext()

  const machineContext = computed(() => ({
    ...context,
    checked: context.modelValue ?? context.checked,
  }))

  const [state, send] = useMachine(
    machine({
      ...machineContext.value,
      id: machineContext.value.id || useId().value,
      getRootNode,
      onChange(details) {
        emit('change', details)
        emit('update:modelValue', details.checked)
      },
    }),
    { context: machineContext },
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseSwitchReturn = ReturnType<typeof useSwitch>
