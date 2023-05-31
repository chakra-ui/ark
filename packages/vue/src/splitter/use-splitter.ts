import { connect, machine, type Context as SplitterContext } from '@zag-js/splitter'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type ExtractPropTypes, type UnwrapRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import { useId } from '../utils'

export const useSplitter = <T extends ExtractPropTypes<SplitterContext>>(
  emit: CallableFunction,
  context: T,
) => {
  const reactiveContext = reactive(context)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: reactiveContext.id || useId().value,
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
  )

  return computed(() => connect(state.value, send, normalizeProps))
}

export type UseSplitterReturn = UnwrapRef<ReturnType<typeof useSplitter>>
