import * as splitter from '@zag-js/splitter'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, ref, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { generateEventMap, useId } from '../utils'
import { emits } from './splitter.props'

export type UseSplitterProps = Optional<splitter.Context, 'id'>
export type UseSplitterReturn = ComputedRef<splitter.Api<PropTypes>>

export const useSplitter = (props: UseSplitterProps, emit: CallableFunction): UseSplitterReturn => {
  const getRootNode = useEnvironmentContext()
  const context = ref(props)
  const eventMap = generateEventMap(emits, emit)

  const [state, send] = useMachine(
    splitter.machine({
      id: useId().value,
      getRootNode,
      ...context.value,
      ...eventMap,
    }),
    { context },
  )
  return computed(() => splitter.connect(state.value, send, normalizeProps))
}
