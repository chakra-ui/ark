import * as datePicker from '@zag-js/date-picker'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './date-picker.types'

export interface UseDatePickerProps extends Optional<Omit<datePicker.Props, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The v-model value of the date picker
   */
  modelValue?: datePicker.Props['value']
}

export interface UseDatePickerReturn extends ComputedRef<datePicker.Api<PropTypes>> {}

export const useDatePicker = (props: UseDatePickerProps = {}, emit?: EmitFn<RootEmits>): UseDatePickerReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<datePicker.Props>(() => {
    return {
      id,
      dir: locale.value.dir,
      locale: locale.value.locale,
      value: props.modelValue,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(props),
      onFocusChange: (details) => {
        emit?.('focusChange', details)
        emit?.('update:focusedValue', details.focusedValue)
        props.onFocusChange?.(details)
      },
      onViewChange: (details) => {
        emit?.('viewChange', details)
        emit?.('update:view', details.view)
        props.onViewChange?.(details)
      },
      onOpenChange: (details) => {
        emit?.('openChange', details)
        emit?.('update:open', details.open)
        props.onOpenChange?.(details)
      },
      onValueChange: (details) => {
        emit?.('valueChange', details)
        console.log('valueChange', details)
        emit?.('update:modelValue', details.value)
        props.onValueChange?.(details)
      },
    }
  })

  const service = useMachine(datePicker.machine, context)
  return computed(() => datePicker.connect(service, normalizeProps))
}
