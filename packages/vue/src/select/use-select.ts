import { connect, Context as SelectContext, machine } from '@zag-js/select'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, watch } from 'vue'
import { useId } from '../utils'

interface UseSelectContext extends Omit<SelectContext, 'id' | 'selectedOption'> {
  modelValue: SelectContext['selectedOption']
}

export interface UseSelectProps {
  context: UseSelectContext
  emit: CallableFunction
}

export const useSelect = (props: UseSelectProps) => {
  const reactiveProps = reactive(props)
  const { context, emit } = reactiveProps
  const reactiveContext = reactive(context)
  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      selectedOption: context.modelValue,
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
    () => context.modelValue,
    (value, prevValue) => {
      if (value === prevValue) return
      api.value.setSelectedOption(value as { label: string; value: string })
    },
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  return { api }
}

export type UseSelectReturn = ReturnType<typeof useSelect>
