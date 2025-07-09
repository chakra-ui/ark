import * as datePicker from '@zag-js/date-picker'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
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

export const useDatePicker = (
  props: MaybeRef<UseDatePickerProps> = {},
  emit?: EmitFn<RootEmits>,
): UseDatePickerReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<datePicker.Props>(() => {
    const localeProps = toValue<UseDatePickerProps>(props)

    return {
      id,
      dir: locale.value.dir,
      locale: locale.value.locale,
      value: localeProps.modelValue,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localeProps),
      onFocusChange: (details) => {
        emit?.('focusChange', details)
        emit?.('update:focusedValue', details.focusedValue)
        localeProps.onFocusChange?.(details)
      },
      onViewChange: (details) => {
        emit?.('viewChange', details)
        emit?.('update:view', details.view)
        localeProps.onViewChange?.(details)
      },
      onOpenChange: (details) => {
        emit?.('openChange', details)
        emit?.('update:open', details.open)
        localeProps.onOpenChange?.(details)
      },
      onValueChange: (details) => {
        emit?.('valueChange', details)
        emit?.('update:modelValue', details.value)
        localeProps.onValueChange?.(details)
      },
    }
  })

  const service = useMachine(datePicker.machine, context)
  return computed(() => datePicker.connect(service, normalizeProps))
}
