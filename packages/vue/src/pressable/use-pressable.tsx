import { connect, machine, type Context as PressableContext } from '@zag-js/pressable'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed } from 'vue'
import { transformComposableProps, useId } from '../utils'

type PressablePropsContext = Omit<PressableContext, 'id' | 'disabled' | 'cancelOnPointerExit'> & {
  isDisabled?: PressableContext['disabled']
  isCanceledOnExit?: PressableContext['cancelOnPointerExit']
}

export type UsePressableProps = {
  context: PressablePropsContext
  emit: CallableFunction
}

export const usePressable = (props: UsePressableProps) => {
  const { context, emit } = transformComposableProps(props)

  const [state, send] = useMachine(
    machine({
      ...context,
      disabled: context.isDisabled,
      cancelOnPointerExit: context.isCanceledOnExit,
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
