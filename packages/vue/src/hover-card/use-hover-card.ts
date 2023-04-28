import { connect, machine, type Context as HoverCardContext } from '@zag-js/hover-card'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive } from 'vue'
import { useEnvironmentContext } from '../environment'
import { useId } from '../utils'

export type UseHoverCardContext = Omit<HoverCardContext, 'id'>

export const useHoverCard = (emit: CallableFunction, context: UseHoverCardContext) => {
  const reactiveContext = reactive(context)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      getRootNode,
      onOpen() {
        emit('open')
      },
      onClose() {
        emit('close')
      },
    }),
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseHoverCardReturn = ReturnType<typeof useHoverCard>
