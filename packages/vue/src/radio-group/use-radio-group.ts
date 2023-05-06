import { connect, machine } from '@zag-js/radio-group'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type ExtractPropTypes } from 'vue'
import { useId } from '../utils'
import type { RadioGroupContext } from './radio-group'

export const useRadioGroup = <T extends ExtractPropTypes<RadioGroupContext>>(
  emit: CallableFunction,
  context: T,
) => {
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: reactiveContext.id || useId().value,
      value: reactiveContext.modelValue ?? reactiveContext.value,
      onChange(details) {
        emit('change', details)
        emit('update:modelValue', details.value)
      },
    }),
  )

  return computed(() => connect(state.value, send, normalizeProps))
}
