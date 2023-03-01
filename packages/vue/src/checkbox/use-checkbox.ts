import { connect, Context as CheckboxContext, machine } from '@zag-js/checkbox'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, watch } from 'vue'
import { useId } from '../utils'

interface CheckboxPropsContext extends Omit<CheckboxContext, 'id'> {
  modelValue?: CheckboxContext['defaultChecked']
}

export interface UseCheckboxProps {
  context: CheckboxPropsContext
  emit: CallableFunction
}

export const useCheckbox = (props: UseCheckboxProps) => {
  const emit = props.emit
  const reactiveContext = reactive(props.context)
  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      defaultChecked: props.context.modelValue,
      onChange(details) {
        emit('change', details.checked)
        emit('update:modelValue', details.checked)
      },
    }),
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  watch(
    () => reactiveContext.modelValue,
    (value) => {
      if (value == undefined) return

      api.value.setChecked(value)
    },
  )

  return api
}

export type UseCheckboxReturn = ReturnType<typeof useCheckbox>
