import * as clipboard from '@zag-js/clipboard'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './clipboard.types'

export interface UseClipboardProps
  extends Optional<Omit<clipboard.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseClipboardReturn extends ComputedRef<clipboard.Api<PropTypes>> {}

export const useClipboard = (
  props: UseClipboardProps,
  emit?: EmitFn<RootEmits>,
): UseClipboardReturn => {
  const id = useId() as string
  const env = useEnvironmentContext()
  const context = computed<clipboard.Context>(() => ({
    id,
    getRootNode: env?.value.getRootNode,
    onStatusChange: (details) => emit?.('statusChange', details),
    ...cleanProps(props),
  }))

  const [state, send] = useMachine(clipboard.machine(context.value), { context })
  return computed(() => clipboard.connect(state.value, send, normalizeProps))
}
