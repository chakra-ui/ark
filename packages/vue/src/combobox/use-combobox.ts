import { connect, machine } from '@zag-js/combobox'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import { useId } from '../utils'
import type { ComboboxProps } from './combobox'

export const useCombobox = <T extends ExtractPropTypes<ComboboxProps>>(
  emit: CallableFunction,
  context: T,
) => {
  const reactiveContext = reactive(context)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: reactiveContext.id || useId().value,
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
