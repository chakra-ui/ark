import * as clipboard from '@zag-js/clipboard'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './clipboard.types'

export interface UseClipboardProps
  extends Optional<Omit<clipboard.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseClipboardReturn extends ComputedRef<clipboard.Api<PropTypes>> {}

export const useClipboard = (
  props: UseClipboardProps,
  emit: EmitFn<RootEmits>,
): UseClipboardReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const context = computed<clipboard.Context>(() => ({
    id: id.value,
    getRootNode: env?.value.getRootNode,
    onStatusChange: (details) => emit('statusChange', details),
    ...props,
  }))

  const [state, send] = useMachine(clipboard.machine(context.value), { context })
  return computed(() => clipboard.connect(state.value, send, normalizeProps))
}
