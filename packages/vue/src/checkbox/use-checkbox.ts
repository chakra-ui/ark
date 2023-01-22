import { connect, Context as CheckboxContext, machine } from '@zag-js/checkbox'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, getCurrentInstance, reactive, watch } from 'vue'

interface CheckboxPropsContext extends Omit<CheckboxContext, 'id'> {
  modelValue?: CheckboxContext['defaultChecked']
}

export interface UseCheckboxProps {
  context: CheckboxPropsContext
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
      onChange(details) {
        emit('change', details.checked)
        emit('update:modelValue', typeof details.checked == 'boolean' && details.checked)
      },
    }),
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  watch(
    () => context.modelValue,
    (value) => {
      if (value == undefined) return

      api.value.setChecked(value)
    },
  )

  return api
}

export type UseCheckboxReturn = ReturnType<typeof useCheckbox>
