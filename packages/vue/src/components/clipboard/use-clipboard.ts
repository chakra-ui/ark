import * as clipboard from '@zag-js/clipboard'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils/clean-props'
import type { RootEmits } from './clipboard.types'

export interface UseClipboardProps extends Optional<Omit<clipboard.Props, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The v-model value of the clipboard
   */
  modelValue?: clipboard.Props['value']
}

export interface UseClipboardReturn extends ComputedRef<clipboard.Api<PropTypes>> {}

export const useClipboard = (props: MaybeRef<UseClipboardProps> = {}, emit?: EmitFn<RootEmits>): UseClipboardReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const context = computed<clipboard.Props>(() => {
    const localeProps = toValue<UseClipboardProps>(props)

    return {
      id,
      getRootNode: env?.value.getRootNode,
      value: localeProps.modelValue,
      onStatusChange: (details) => emit?.('statusChange', details),
      ...cleanProps(localeProps),
      onValueChange(details) {
        emit?.('valueChange', details)
        emit?.('update:modelValue', details.value)
        localeProps.onValueChange?.(details)
      },
    }
  })

  const service = useMachine(clipboard.machine, context)
  return computed(() => clipboard.connect(service, normalizeProps))
}
