import * as timePicker from '@zag-js/time-picker'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './time-picker.types'

export interface UseTimePickerProps extends Optional<Omit<timePicker.Props, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  /**
   * The v-model value of the time picker
   */
  modelValue?: timePicker.Props['value']
}

export interface UseTimePickerReturn extends ComputedRef<timePicker.Api<PropTypes>> {}

export const useTimePicker = (props: UseTimePickerProps = {}, emit?: EmitFn<RootEmits>): UseTimePickerReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<timePicker.Props>(() => {
    return {
      id,
      dir: locale.value.dir,
      value: props.defaultValue ?? props.modelValue,
      getRootNode: env?.value.getRootNode,
      onFocusChange: (details) => emit?.('focusChange', details),
      onOpenChange: (details) => {
        emit?.('openChange', details)
        emit?.('update:open', details.open)
      },
      onValueChange: (details) => {
        emit?.('valueChange', details)
        emit?.('update:modelValue', details.value)
      },
      ...cleanProps(props),
    }
  })

  const service = useMachine(timePicker.machine, context)
  return computed(() => timePicker.connect(service, normalizeProps))
}
