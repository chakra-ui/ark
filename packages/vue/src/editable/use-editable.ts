import { connect, Context as EditableContext, machine } from '@zag-js/editable'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, UnwrapRef, watch } from 'vue'
import type { Optional } from '../types'
import { useId } from '../utils'

interface EditablePropContext extends Optional<EditableContext, 'id'> {
  modelValue?: EditableContext['value']
}

export type UseEditableProps = {
  context: EditablePropContext
  emit: CallableFunction
}

export const useEditable = (props: UseEditableProps) => {
  const reactiveProps = reactive(props)
  const { context, emit } = reactiveProps
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

  const api = computed(() => connect(state.value, send, normalizeProps))

  watch(
    () => context.modelValue,
    (val, prevVal) => {
      if (val == undefined) return

      if (val === prevVal) return

      api.value.setValue(val)
    },
  )

  return api
}

export type UseEditableReturn = UnwrapRef<ReturnType<typeof useEditable>>
