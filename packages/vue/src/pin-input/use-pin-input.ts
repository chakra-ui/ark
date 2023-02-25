import { connect, Context as PinInputContext, machine } from '@zag-js/pin-input'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive } from 'vue'
import { useId } from '../utils'

interface PinInputPropsContext extends Omit<PinInputContext, 'id'> {
  modelValue?: PinInputContext['value']
}

export type UsePinInputProps = {
  context: PinInputPropsContext
  emit: CallableFunction
}

export const usePinInput = (props: UsePinInputProps) => {
  const reactiveProps = reactive(props)
  const { context, emit } = reactiveProps
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      value: reactiveContext.modelValue ?? reactiveContext.value,
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
