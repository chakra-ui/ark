import { connect, machine, type Context as CheckboxContext } from '@zag-js/checkbox'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, watch } from 'vue'
import { useId } from '../utils'

export type UseCheckboxContext = Omit<CheckboxContext, 'id'>

export const useCheckbox = (emit: CallableFunction, context: UseCheckboxContext) => {
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      onChange(details) {
        emit('change', details.checked)
        emit('update:checked', !details.checked)
      },
    }),
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  watch(
    () => reactiveContext.checked,
    (value) => {
      if (value === undefined) return

      if (value !== api.value.isChecked) {
        api.value.setChecked(value)
      }
    },
  )

  watch(
    () => reactiveContext.indeterminate,
    (value, oldValue) => {
      if (value == undefined || value === oldValue) return
      api.value.setIndeterminate(value)
    },
  )

  return api
}

export type UseCheckboxReturn = ReturnType<typeof useCheckbox>
