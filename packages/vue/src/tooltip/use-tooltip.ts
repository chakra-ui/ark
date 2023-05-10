import { connect, machine, type Context as TooltipContext } from '@zag-js/tooltip'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive } from 'vue'
import { useId } from '../utils'

export type UseTooltipContext = Omit<TooltipContext, 'id'>

export const useTooltip = (emit: CallableFunction, context: UseTooltipContext) => {
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
