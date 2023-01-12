import { connect, Context as CheckboxContext, machine } from '@zag-js/checkbox'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, getCurrentInstance, reactive, watchEffect } from 'vue'

interface CheckboxProps extends CheckboxContext {
  modelValue?: CheckboxContext['value']
  checked?: CheckboxContext['defaultChecked']
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
      onChange(details) {
        emit('change', { ...details })
        emit('update:modelValue', { ...details })
      },
    }),
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  watchEffect(() => {
    if (context.checked == undefined) return

    if (context.checked !== api.value.isChecked) {
      api.value.setChecked(context.checked)
    }
  })

  return api
}

export type UseCheckboxReturn = ReturnType<typeof useCheckbox>
