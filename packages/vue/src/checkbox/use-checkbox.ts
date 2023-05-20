import { connect, machine } from '@zag-js/checkbox'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, watch, type ExtractPropTypes } from 'vue'
import { useId } from '../utils'
import type { CheckboxContext } from './checkbox'

export const useCheckbox = <T extends ExtractPropTypes<CheckboxContext>>(
  emit: CallableFunction,
  context: T,
) => {
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: reactiveContext.id || useId().value,
      checked: reactiveContext.modelValue ?? reactiveContext.checked,
      onChange(details) {
        emit('change', details.checked)
        emit('update:checked', details.checked)
      },
    }),
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  watch(
    () => reactiveContext.checked,
    (value) => {
      if (value == undefined) return

      if (value !== api.value.isChecked) {
        api.value.setChecked(value as boolean)
        api.value.checkedState
      }
    },
  )

  return api
}
