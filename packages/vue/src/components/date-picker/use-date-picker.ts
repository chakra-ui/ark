import * as datePicker from '@zag-js/date-picker'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './date-picker.types'

export interface UseDatePickerProps
  extends Optional<Omit<datePicker.Props, 'dir' | 'getRootNode' | 'value' | 'view' | 'open'>, 'id'> {
  /**
   * The v-model value of the date picker
   */
  modelValue?: datePicker.Props['value']
  /**
   * The v-model view of the date picker
   */
  modelView?: datePicker.Props['view']
  /**
   * The v-model open state of the date picker
   */
  modelOpen?: datePicker.Props['open']
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
      value: props.modelValue,
      view: props.modelView,
      open: props.modelOpen,
      getRootNode: env?.value.getRootNode,
      onFocusChange: (details) => emit?.('focusChange', details),
      onViewChange: (details) => {
        emit?.('viewChange', details)
        emit?.('update:view', details.view) // TODO: remove this
        emit?.('update:modelView', details.view)
      },
      onOpenChange: (details) => {
        emit?.('openChange', details)
        emit?.('update:open', details.open) // TODO: remove this
        emit?.('update:modelOpen', details.open)
      },
      onValueChange: (details) => {
        emit?.('valueChange', details)
        emit?.('update:modelValue', details.value)
      },
      ...cleanProps(props),
    }
  })

  const service = useMachine(datePicker.machine, context)
  return computed(() => datePicker.connect(service, normalizeProps))
}
