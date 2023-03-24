import { connect, machine, type Context as SplitterContext } from '@zag-js/splitter'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, type UnwrapRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { transformComposableProps, useId } from '../utils'

export type UseSplitterProps = {
  context: Optional<SplitterContext, 'id'>
  emit: CallableFunction
}

export const useSplitter = (props: UseSplitterProps) => {
  const { context, emit } = transformComposableProps(props)

  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    machine({
      ...context,
      id: useId().value,
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

  const api = computed(() => connect(state.value, send, normalizeProps))

  return api
}

export type UseSplitterReturn = UnwrapRef<ReturnType<typeof useSplitter>>
