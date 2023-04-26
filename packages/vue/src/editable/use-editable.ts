import { connect, machine, type Context as EditableContext } from '@zag-js/editable'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type UnwrapRef } from 'vue'
import { type Optional } from '../types'
import { useId } from '../utils'

export interface UseEditableContext extends Optional<EditableContext, 'id'> {
  modelValue?: EditableContext['value']
}

export const useEditable = (emit: CallableFunction, context: UseEditableContext) => {
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
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

export type UseEditableReturn = UnwrapRef<ReturnType<typeof useEditable>>
