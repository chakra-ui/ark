import { connect, machine, type Context } from '@zag-js/avatar'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, ref, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseAvatarContext = Optional<Context, 'id'>

export const useAvatar = <T extends ExtractPropTypes<UseAvatarContext>>(
  emit: CallableFunction,
  context: T,
) => {
  const getRootNode = useEnvironmentContext()
  const machineContext = ref(context)

  const [state, send] = useMachine(
    machine({
      ...machineContext.value,
      id: machineContext.value.id || useId().value,
      getRootNode,
      onError() {
        emit('error')
      },
      onLoad() {
        emit('load')
      },
    }),
    { context: machineContext },
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseAvatarReturn = ReturnType<typeof useAvatar>
