import { connect, Context as HoverCardContext, machine } from '@zag-js/hover-card'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, getCurrentInstance, reactive } from 'vue'

type HoverCardPropsContext = Omit<HoverCardContext, 'id'>

export type UseHoverCardProps = {
  context: HoverCardPropsContext
  emit: CallableFunction
}

export const useHoverCard = (props: UseHoverCardProps) => {
  const reactiveProps = reactive(props)
  const { context, emit } = reactiveProps
  const reactiveContext = reactive(context)
  const instance = getCurrentInstance()
  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: instance?.uid.toString() as string,
      onOpenChange(open) {
        emit('open-change', open)
      },
    }),
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseHoverCardReturn = ReturnType<typeof useHoverCard>
