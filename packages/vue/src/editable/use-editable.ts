import { connect, machine, type Context } from '@zag-js/editable'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseEditableContext = Optional<Context, 'id'> & {
  modelValue?: Context['value']
  defaultValue?: Context['value']
}

export const useEditable = <T extends ExtractPropTypes<UseEditableContext>>(
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
      onCancel(details) {
        emit('cancel', details)
      },
      onChange(details) {
        emit('change', details)
        emit('update:modelValue', details.value)
      },
      onEdit() {
        emit('edit')
      },
      onSubmit(details) {
        emit('submit', details)
      },
    }),
    { context: machineContext },
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseEditableReturn = ReturnType<typeof useEditable>
