import { connect, Context as NumberInputContext, machine } from '@zag-js/number-input'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, watch } from 'vue'
import { useId } from '../utils'

interface NumberInputPropsContext extends Omit<NumberInputContext, 'id'> {
  modelValue?: NumberInputContext['value']
}

export type UseNumberInputProps = {
  context: NumberInputPropsContext
  emit: CallableFunction
}

export const useNumberInput = (props: UseNumberInputProps) => {
  const reactiveProps = reactive(props)
  const { context, emit } = reactiveProps
  const reactiveContext = reactive(context)
  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      value: reactiveContext.modelValue ?? reactiveContext.value,
      onBlur(details) {
        emit('blur', details)
      },
      onChange(details) {
        emit('change', details)
        emit('update:modelValue', details.value)
      },
      onFocus(details) {
        emit('focus', details)
      },
      onInvalid(details) {
        emit('invalid', details)
      },
    }),
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  watch(
    () => reactiveContext.modelValue,
    (value, prevValue) => {
      if (value === prevValue) return

      api.value.setValue(value as string)
    },
  )

  return api
}

export type UseNumberInputReturn = ReturnType<typeof useNumberInput>
