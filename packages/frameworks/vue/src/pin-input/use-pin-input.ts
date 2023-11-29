import { connect, machine } from '@zag-js/pin-input'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import { useId } from '../utils'
import type { PinInputContext } from './pin-input'

export const usePinInput = <T extends ExtractPropTypes<PinInputContext>>(
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
      onValueChange(details) {
        emit('value-change', details)
        emit('update:modelValue', details.value)
      },
      onValueComplete(details) {
        emit('value-complete', details)
      },
      onValueInvalid(details) {
        emit('value-invalid', details)
      },
    }),
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  return api
}

export type UsePinInputReturn = ReturnType<typeof connect>
