import { connect, machine, type Context as ComboboxContext } from '@zag-js/combobox'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, onMounted, reactive, watch, type UnwrapRef } from 'vue'
import { useId } from '../utils'

export type UseComboboxContext = Omit<ComboboxContext, 'id' | 'inputValue'> & {
  modelValue?: ComboboxContext['inputValue']
}

export type UseComboboxDefaultValue = ComboboxContext['inputValue']

export const useCombobox = (
  emit: CallableFunction,
  context: UseComboboxContext,
  defaultValue?: UseComboboxDefaultValue,
) => {
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      inputValue: defaultValue,
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

  onMounted(() => {
    emit('update:modelValue', defaultValue)
  })

  watch(
    () => reactiveContext.modelValue,
    (value, prevValue) => {
      if (value === prevValue) return
      if (value === undefined) return
      api.value.setInputValue(value)
    },
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  return api
}

export type UseComboboxReturn = UnwrapRef<ReturnType<typeof useCombobox>>
