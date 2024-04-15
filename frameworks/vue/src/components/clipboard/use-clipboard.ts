import * as clipboard from '@zag-js/clipboard'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'
import { useId } from '../../utils/utils'

export interface UseClipboardProps extends Optional<clipboard.Context, 'id'> {}
export interface UseClipboardReturn extends ComputedRef<clipboard.Api<PropTypes>> {}

export const useClipboard = (
  props: UseClipboardProps,
  emit: CallableFunction,
): UseClipboardReturn => {
  const getRootNode = useEnvironmentContext()
  const context = ref(props)

  const [state, send] = useMachine(
    clipboard.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onStatusChange: (details) => {
        emit('status-change', details)
      },
    }),
    { context },
  )
  return computed(() => clipboard.connect(state.value, send, normalizeProps))
}
