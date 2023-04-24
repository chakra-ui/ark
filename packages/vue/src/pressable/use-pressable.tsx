import { connect, machine, type Context as PressableContext } from '@zag-js/pressable'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive } from 'vue'
import { useId } from '../utils'

export type UsePressableContext = Omit<
  PressableContext,
  'id' | 'disabled' | 'cancelOnPointerExit'
> & {
  isDisabled?: PressableContext['disabled']
  isCanceledOnExit?: PressableContext['cancelOnPointerExit']
}

export const usePressable = (emit: CallableFunction, context: UsePressableContext) => {
  const reactiveContext = reactive(context)

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
