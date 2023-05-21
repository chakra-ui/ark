import { connect, machine, type Context } from '@zag-js/splitter'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, ref, type ExtractPropTypes } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseSplitterProps = Optional<Context, 'id'>

export const useSplitter = <T extends ExtractPropTypes<UseSplitterProps>>(
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
      onResize(details) {
        emit('resize', details)
      },
      onResizeStart(details) {
        emit('resize-start', details)
      },
      onResizeEnd(details) {
        emit('resize-end', details)
      },
    }),
    { context: machineContext },
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseSplitterReturn = ReturnType<typeof useSplitter>
