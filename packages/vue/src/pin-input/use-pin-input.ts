import { connect, Context as PinInputContext, machine } from '@zag-js/pin-input'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed } from 'vue'
import { useEnvironmentContext } from '../environment'
import { transformComposableProps, useId } from '../utils'

interface PinInputPropsContext extends Omit<PinInputContext, 'id'> {
  modelValue?: PinInputContext['value']
}

export type UsePinInputProps = {
  context: PinInputPropsContext
  emit: CallableFunction
}

export const usePinInput = (props: UsePinInputProps) => {
  const { context, emit } = transformComposableProps(props)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...context,
      id: useId().value,
      getRootNode,
      value: context.modelValue ?? context.value,
      onChange(details) {
        emit('change', details)
        emit('update:modelValue', Array.from(details.value))
      },
      onComplete(details) {
        emit('complete', details)
      },
      onInvalid(details) {
        emit('invalid', details)
      },
    }),
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  return api
}

export type UsePinInputReturn = ReturnType<typeof usePinInput>
