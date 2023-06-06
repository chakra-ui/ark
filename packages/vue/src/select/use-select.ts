import { connect, machine, type Context } from '@zag-js/select'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseSelectContext = Optional<Context, 'id'> & {
  modelValue?: Context['selectedOption']
  defaultValue?: Context['selectedOption']
}

export const useSelect = <T extends ExtractPropTypes<UseSelectContext>>(
  emit: CallableFunction,
  context: T,
) => {
  const machineContext = computed(() => ({
    ...context,
    selectedOption: (context.modelValue ?? context.selectedOption) || context.defaultValue,
  }))

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...machineContext.value,
      id: machineContext.value.id || useId().value,
      getRootNode,
      onChange: (details) => {
        emit('change', { ...details })
        emit('update:modelValue', { ...details })
      },
      onHighlight(details) {
        emit('highlight', { ...details })
      },
      onClose() {
        emit('close')
      },
      onOpen() {
        emit('open')
      },
    }),
    { context: machineContext },
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseSelectReturn = ReturnType<typeof useSelect>
