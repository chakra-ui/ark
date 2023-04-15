import { connect, machine, type Context as HoverCardContext } from '@zag-js/hover-card'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed } from 'vue'
import { transformComposableProps, useId } from '../utils'

type HoverCardPropsContext = Omit<HoverCardContext, 'id'>

export type UseHoverCardProps = {
  context: HoverCardPropsContext
  emit: CallableFunction
}

export const useHoverCard = (props: UseHoverCardProps) => {
  const { context, emit } = transformComposableProps(props)

  const [state, send] = useMachine(
    machine({
      ...context,
      id: useId().value,
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
