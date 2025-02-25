import * as clipboard from '@zag-js/clipboard'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './clipboard.types'

export interface UseClipboardProps extends Optional<Omit<clipboard.Props, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  /**
   * The model value of the clipboard
   */
  modelValue?: clipboard.Props['value']
}
export interface UseClipboardReturn extends ComputedRef<clipboard.Api<PropTypes>> {}

export const useClipboard = (props: UseClipboardProps = {}, emit?: EmitFn<RootEmits>): UseClipboardReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const context = computed<clipboard.Props>(() => ({
    id,
    getRootNode: env?.value.getRootNode,
    value: props.modelValue,
    onStatusChange: (details) => emit?.('statusChange', details),
    onValueChange(details) {
      emit?.('valueChange', details)
      emit?.('update:modelValue', details.value)
    },
    ...cleanProps(props),
  }))

  const service = useMachine(clipboard.machine, context)
  return computed(() => clipboard.connect(service, normalizeProps))
}
