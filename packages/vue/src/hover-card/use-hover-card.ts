import { connect, Context as HoverCardContext, machine } from '@zag-js/hover-card'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive } from 'vue'
import { useId } from '../utils'

type HoverCardPropsContext = Omit<HoverCardContext, 'id'>

export type UseHoverCardProps = {
  context: HoverCardPropsContext
  emit: CallableFunction
}

export const useHoverCard = (props: UseHoverCardProps) => {
  const emit = props.emit
  const reactiveContext = reactive(props.context)
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
