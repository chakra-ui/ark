import * as splitter from '@zag-js/splitter'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, ref, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseSplitterProps = Optional<splitter.Context, 'id'>
export type UseSplitterReturn = ComputedRef<splitter.Api<PropTypes>>

export const useSplitter = (props: UseSplitterProps, emit: CallableFunction): UseSplitterReturn => {
  const getRootNode = useEnvironmentContext()
  const context = ref(props)

  const [state, send] = useMachine(
    splitter.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onSizeChange: (details) => {
        emit('size-change', details)
      },
      onSizeChangeStart: (details) => {
        emit('size-change-start', details)
      },
      onSizeChangeEnd(details) {
        emit('size-change-end', details)
      },
    }),
    { context },
  )
  return computed(() => splitter.connect(state.value, send, normalizeProps))
}
