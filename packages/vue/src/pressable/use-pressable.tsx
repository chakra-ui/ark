import { connect, machine, type Context } from '@zag-js/pressable'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, ref, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UsePressableProps = Optional<Context, 'id'>

export const usePressable = <T extends ExtractPropTypes<UsePressableProps>>(
  emit: CallableFunction,
  context: T,
) => {
  const machineContext = ref(context)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...machineContext.value,
      id: machineContext.value.id || useId().value,
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
    { context: machineContext },
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UsePressableReturn = ReturnType<typeof usePressable>
