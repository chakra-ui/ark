import * as pinInput from '@zag-js/pin-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { useEnvironmentContext } from '~/providers'
import type { Optional } from '~/types'
import { useId } from '~/utils/utils'

export interface UsePinInputProps extends Optional<pinInput.Context, 'id'> {
  modelValue?: pinInput.Context['value']
}

export interface UsePinInputReturn extends ComputedRef<pinInput.Api<PropTypes>> {}

export const usePinInput = (props: UsePinInputProps, emit: CallableFunction) => {
  const getRootNode = useEnvironmentContext()
  const context = computed(() => {
    const { modelValue, ...rest } = props
    return {
      ...rest,
      value: modelValue,
    }
  })

  const [state, send] = useMachine(
    pinInput.machine({
      ...context.value,
      id: context.value.id || useId().value,
      getRootNode,
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
    { context },
  )

  return computed(() => pinInput.connect(state.value, send, normalizeProps))
}
