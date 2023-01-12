import { connect, Context as CheckboxContext, machine } from '@zag-js/checkbox'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, getCurrentInstance, reactive } from 'vue'

interface CheckboxProps extends CheckboxContext {
  modelValue?: CheckboxContext['value']
  isReadOnly?: CheckboxContext['readOnly']
  isDisabled?: CheckboxContext['disabled']
  isIndeterminate?: CheckboxContext['indeterminate']
  isFocusable?: CheckboxContext['focusable']
  isChecked?: CheckboxContext['defaultChecked']
}

export interface UseCheckboxProps {
  context: Omit<CheckboxProps, 'id'>
  emit: CallableFunction
}

export const useCheckbox = (props: UseCheckboxProps) => {
  const reactiveProps = reactive(props)
  const { context, emit } = reactiveProps
  const reactiveContext = reactive(context)
  const instance = getCurrentInstance()
  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: instance?.uid.toString() as string,
      value: context.modelValue,
      readOnly: context.isReadOnly,
      disabled: context.isDisabled,
      indeterminate: context.isIndeterminate,
      focusable: context.isFocusable,
      defaultChecked: context.isChecked,
      onChange(details) {
        emit('change', { ...details })
        emit('update:modelValue', { ...details })
      },
    }),
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  return api
}

export type UseCheckboxReturn = ReturnType<typeof useCheckbox>
