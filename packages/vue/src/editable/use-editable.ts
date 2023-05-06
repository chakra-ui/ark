import { connect, machine } from '@zag-js/editable'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type ExtractPropTypes } from 'vue'
import { useId } from '../utils'
import type { EditableProps } from './editable'

export const useEditable = <T extends ExtractPropTypes<EditableProps>>(
  emit: CallableFunction,
  context: T,
) => {
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: reactiveContext.id || useId().value,
      value: reactiveContext.modelValue ?? reactiveContext.value,
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
  )

  return computed(() => connect(state.value, send, normalizeProps))
}
