import { connect, machine, type Context as SelectContext } from '@zag-js/select'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, watch } from 'vue'
import { useId } from '../utils'

export interface UseSelectContext extends Omit<SelectContext, 'id' | 'selectedOption'> {
  modelValue: SelectContext['selectedOption']
}

export const useSelect = (emit: CallableFunction, context: UseSelectContext) => {
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      selectedOption: reactiveContext.modelValue,
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
  )

  watch(
    () => reactiveContext.modelValue,
    (value, prevValue) => {
      if (value === prevValue) return
      api.value.setSelectedOption(value as { label: string; value: string })
    },
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  return { api }
}

export type UseSelectReturn = ReturnType<typeof useSelect>
