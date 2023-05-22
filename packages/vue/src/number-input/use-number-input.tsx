import { connect, machine } from '@zag-js/number-input'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import { useId } from '../utils'
import type { NumberInputContext } from './number-input'

export const useNumberInput = <T extends ExtractPropTypes<NumberInputContext>>(
  emit: CallableFunction,
  context: T,
) => {
  const reactiveContext = reactive(context)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: reactiveContext.id || useId().value,
      getRootNode,
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

export type UseNumberInputReturn = ReturnType<typeof connect>
