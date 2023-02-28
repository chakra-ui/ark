import { connect, Context as PressableContext, machine } from '@zag-js/pressable'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive } from 'vue'
import { useId } from '../utils'

type PressablePropsContext = Omit<PressableContext, 'id' | 'disabled' | 'cancelOnPointerExit'> & {
  isDisabled?: PressableContext['disabled']
  isCanceledOnExit?: PressableContext['cancelOnPointerExit']
}

export type UsePressableProps = {
  context: PressablePropsContext
  emit: CallableFunction
}

export const usePressable = (props: UsePressableProps) => {
  const emit = props.emit
  const reactiveContext = reactive(props.context)

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      disabled: reactiveContext.isDisabled,
      cancelOnPointerExit: reactiveContext.isCanceledOnExit,
      id: useId().value,
      onLongPress(event) {
        emit('longPress', event)
      },
      onPress(event) {
        emit('press', event)
      },
      onPressEnd(event) {
        emit('pressEnd', event)
      },
      onPressStart(event) {
        emit('pressStart', event)
      },
      onPressUp(event) {
        emit('pressUp', event)
      },
    }),
  )

  const api = computed(() => connect(state.value, send, normalizeProps))

  return api
}

export type UsePressableReturn = ReturnType<typeof usePressable>
