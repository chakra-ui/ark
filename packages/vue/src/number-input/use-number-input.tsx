import { connect, machine, type Context as NumberInputContext } from '@zag-js/number-input'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive } from 'vue'
import { useId } from '../utils'

export interface UseNumberInputContext extends Omit<NumberInputContext, 'id'> {
  modelValue?: NumberInputContext['value']
}

export const useNumberInput = (emit: CallableFunction, context: UseNumberInputContext) => {
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

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseNumberInputReturn = ReturnType<typeof useNumberInput>
