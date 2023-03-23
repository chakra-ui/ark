import { connect, machine, type Context as NumberInputContext } from '@zag-js/number-input'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, watch } from 'vue'
import { transformComposableProps, useId } from '../utils'

interface NumberInputPropsContext extends Omit<NumberInputContext, 'id'> {
  modelValue?: NumberInputContext['value']
}

export type UseNumberInputProps = {
  context: NumberInputPropsContext
  emit: CallableFunction
}

export const useNumberInput = (props: UseNumberInputProps) => {
  const { context, emit } = transformComposableProps(props)
  const [state, send] = useMachine(
    machine({
      ...context,
      id: useId().value,
      value: context.modelValue ?? context.value,
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
    () => context.modelValue,
    (value, prevValue) => {
      if (value === prevValue) return

      api.value.setValue(value as string)
    },
  )

  return api
}

export type UseNumberInputReturn = ReturnType<typeof useNumberInput>
