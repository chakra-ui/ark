import { connect, Context as SplitterContext, machine } from '@zag-js/splitter'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive, UnwrapRef } from 'vue'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseSplitterProps = {
  context: Optional<SplitterContext, 'id'>
  emit: CallableFunction
}

export const useSplitter = (props: UseSplitterProps) => {
  const emit = props.emit
  const reactiveContext = reactive(props.context)

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
