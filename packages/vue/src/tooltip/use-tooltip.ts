import { connect, Context as TooltipContext, machine } from '@zag-js/tooltip'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive } from 'vue'
import { useId } from '../utils'

type TooltipPropsContext = Omit<TooltipContext, 'id'>

export type UseTooltipProps = {
  context: TooltipPropsContext
  emit: CallableFunction
}

export const useTooltip = (props: UseTooltipProps) => {
  const reactiveProps = reactive(props)
  const { context, emit } = reactiveProps
  const reactiveContext = reactive(context)
  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
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

export type UseTooltipReturn = ReturnType<typeof useTooltip>
