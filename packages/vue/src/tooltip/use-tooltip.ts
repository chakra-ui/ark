import { connect, Context as TooltipContext, machine } from '@zag-js/tooltip'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed } from 'vue'
import { useEnvironmentContext } from '../environment'
import { transformComposableProps, useId } from '../utils'

type TooltipPropsContext = Omit<TooltipContext, 'id'>

export type UseTooltipProps = {
  context: TooltipPropsContext
  emit: CallableFunction
}

export const useTooltip = (props: UseTooltipProps) => {
  const { context, emit } = transformComposableProps(props)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...context,
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

export type UseTooltipReturn = ReturnType<typeof useTooltip>
