import { connect, machine, type Context as PressableContext } from '@zag-js/pressable'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import { useId } from '../utils'

export type UsePressableContext = PressableContext

export const usePressable = <T extends ExtractPropTypes<PressableContext>>(
  emit: CallableFunction,
  context: T,
) => {
  const reactiveContext = reactive(context)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      disabled: reactiveContext.disabled,
      cancelOnPointerExit: reactiveContext.cancelOnPointerExit,
      id: reactiveContext.id || useId().value,
      getRootNode,
      onLongPress(event) {
        emit('long-press', event)
      },
      onPress(event) {
        emit('press', event)
      },
      onPressEnd(event) {
        emit('press-end', event)
      },
      onPressStart(event) {
        emit('press-start', event)
      },
      onPressUp(event) {
        emit('press-up', event)
      },
    }),
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UsePressableReturn = ReturnType<typeof usePressable>
