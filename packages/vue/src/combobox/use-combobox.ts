import { connect, machine, type Context as ComboboxContext } from '@zag-js/combobox'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type UnwrapRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import { useId } from '../utils'

export type UseComboboxContext = Omit<ComboboxContext, 'id'> & {
  modelValue?: ComboboxContext['inputValue']
}

export const useCombobox = (emit: CallableFunction, context: UseComboboxContext) => {
  const reactiveContext = reactive(context)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      getRootNode,
      inputValue: reactiveContext.modelValue,
      onClose() {
        emit('close')
      },
      onOpen() {
        emit('open')
      },
      onHighlight(details) {
        emit('highlight', details)
      },
      onInputChange(details) {
        emit('input-change', details)
        emit('update:modelValue', details.value)
      },
      onSelect(details) {
        emit('select', details)
      },
    }),
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseComboboxReturn = UnwrapRef<ReturnType<typeof useCombobox>>
