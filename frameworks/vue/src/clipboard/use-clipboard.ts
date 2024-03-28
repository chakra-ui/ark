import * as clipboard from '@zag-js/clipboard'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, ref, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

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
      onCopyStatusChange: (details) => {
        emit('copy-status-change', details)
      },
    }),
    { context },
  )
  return computed(() => clipboard.connect(state.value, send, normalizeProps))
}
