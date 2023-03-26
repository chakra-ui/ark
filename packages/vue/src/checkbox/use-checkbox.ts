import { connect, machine, type Context as CheckboxContext } from '@zag-js/checkbox'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, watch } from 'vue'
import { transformComposableProps, useId } from '../utils'

interface CheckboxPropsContext extends Omit<CheckboxContext, 'id' | 'defaultChecked'> {
  modelValue?: CheckboxContext['defaultChecked']
}

export interface UseCheckboxProps {
  context: CheckboxPropsContext
  emit: CallableFunction
}

export const useCheckbox = (props: UseCheckboxProps) => {
  const { context, emit } = transformComposableProps(props)

  const [state, send] = useMachine(
    machine({
      ...context,
      id: useId().value,
      defaultChecked: context.modelValue,
      onChange(details) {
        emit('change', details)
        emit('update:modelValue', details.checked)
      },
    }),
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  watch(
    () => context.modelValue,
    (value) => {
      if (value === undefined) return

      api.value.setChecked(value)
    },
  )

  watch(
    () => context.indeterminate,
    (value, oldValue) => {
      if (value == undefined || value === oldValue) return
      api.value.setIndeterminate(value)
    },
  )

  return api
}

export type UseCheckboxReturn = ReturnType<typeof useCheckbox>
