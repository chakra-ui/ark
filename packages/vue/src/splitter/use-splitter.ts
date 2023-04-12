import { connect, machine, type Context as SplitterContext } from '@zag-js/splitter'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, type UnwrapRef } from 'vue'
import { type Optional } from '../types'
import { useId } from '../utils'

export type UseSplitterContext = Optional<SplitterContext, 'id'>

export const useSplitter = (emit: CallableFunction, context: UseSplitterContext) => {
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    machine({
      ...reactiveContext,
      id: useId().value,
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
