import { connect, machine } from '@zag-js/checkbox'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, watch, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import { useId } from '../utils'
import type { CheckboxContext } from './checkbox'

export const useCheckbox = <T extends ExtractPropTypes<CheckboxContext>>(
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
      checked: reactiveContext.modelValue ?? reactiveContext.checked,
      onChange(details) {
        emit('change', details.checked)
        emit('update:checked', details.checked)
        emit('update:modelValue', details.checked)
      },
    }),
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  watch(
    () => reactiveContext.modelValue,
    (newValue, previousValue) => {
      if (newValue == undefined) return
      if (newValue !== previousValue) {
        api.value.setChecked(newValue)
      }
    },
  )

  watch(
    () => reactiveContext.checked,
    (newValue, previousValue) => {
      if (newValue == undefined) return
      if (newValue !== previousValue) {
        api.value.setChecked(newValue)
      }
    },
  )

  return api
}
