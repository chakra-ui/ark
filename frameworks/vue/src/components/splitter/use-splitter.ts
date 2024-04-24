import * as splitter from '@zag-js/splitter'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'
import { useId } from '../../utils'

export interface UseSplitterProps extends Optional<splitter.Context, 'id'> {}

export interface UseSplitterReturn extends ComputedRef<splitter.Api<PropTypes>> {}

export const useSplitter = (props: UseSplitterProps, emit: CallableFunction): UseSplitterReturn => {
  const context = ref(props)
  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    splitter.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onSizeChange: (details) => {
        emit('size-change', details)
      },
      onSizeChangeEnd(details) {
        emit('size-change-end', details)
      },
    }),
    { context },
  )
  return computed(() => splitter.connect(state.value, send, normalizeProps))
}
