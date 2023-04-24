import { connect, machine, type Context as CheckboxContext } from '@zag-js/checkbox'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, watch, watchEffect } from 'vue'
import { useId } from '../utils'

export interface UseCheckboxContext extends Omit<CheckboxContext, 'id'> {
  modelValue?: CheckboxContext['checked']
}

export const useCheckbox = (emit: CallableFunction, context: UseCheckboxContext) => {
  const reactiveContext = reactive(context)

  watchEffect(() => {
    console.log(reactiveContext)
  })

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      checked: reactiveContext.modelValue ?? reactiveContext.checked,
      onChange(details) {
        emit('change', details.checked)
        emit('update:modelValue', !details.checked)
      },
    }),
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  watch(
    () => reactiveContext.modelValue,
    (value) => {
      if (value == undefined) return

      if (value !== api.value.isChecked) {
        api.value.setChecked(value)
      }
    },
  )

  return api
}

export type UseCheckboxReturn = ReturnType<typeof useCheckbox>
