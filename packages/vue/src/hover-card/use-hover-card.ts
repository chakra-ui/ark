import { connect, machine, type Context as HoverCardContext } from '@zag-js/hover-card'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive } from 'vue'
import { useId } from '../utils'

export type UseHoverCardContext = Omit<HoverCardContext, 'id'>

export const useHoverCard = (emit: CallableFunction, context: UseHoverCardContext) => {
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
      onOpenChange(open) {
        emit('open-change', open)
      },
    }),
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseHoverCardReturn = ReturnType<typeof useHoverCard>
