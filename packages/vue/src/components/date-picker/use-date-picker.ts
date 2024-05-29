import * as datePicker from '@zag-js/date-picker'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps, useId } from '../../utils'
import type { RootEmits } from './date-picker.types'

export interface UseDatePickerProps
  extends Optional<
    Omit<
      datePicker.Context,
      'dir' | 'getRootNode' | 'value' | 'min' | 'max' | 'parse' | 'focusedValue' | 'open.controlled'
    >,
    'id'
  > {
  /**
   * The focused date.
   */
  focusedValue?: string
  /**
   * The v-model value of the date picker
   */
  modelValue?: string[]
  /**
   * The minimum date for the date picker in the format yyyy-mm-dd
   */
  min?: string
  /**
   * The maximum date for the date picker in the format yyyy-mm-dd
   */
  max?: string
  /**
   * The initial open state of the date picker when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: datePicker.Context['open']
  /**
   * The initial value of the date picker when it is first rendered.
   * Use when you do not need to control the state of the date picker.
   */
  defaultValue?: string[]
}

export interface UseDatePickerReturn extends ComputedRef<datePicker.Api<PropTypes>> {}

export const useDatePicker = (
  props: UseDatePickerProps,
  emit: EmitFn<RootEmits>,
): UseDatePickerReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const context = computed<datePicker.Context>(() => {
    const { modelValue, defaultValue, focusedValue, min, max, ...otherProps } = props
    return {
      id,
      dir: locale.value.dir,
      open: props.open ?? props.defaultOpen,
      'open.controlled': props.open !== undefined,
      value: datePicker.parse(modelValue ?? defaultValue ?? []),
      getRootNode: env?.value.getRootNode,
      onFocusChange: (details) => emit('focusChange', details),
      onViewChange: (details) => emit('viewChange', details),
      onOpenChange: (details) => {
        emit('openChange', details)
        emit('update:open', details.open)
      },
      onValueChange: (details) => {
        emit('valueChange', details)
        emit('update:modelValue', details.valueAsString)
      },
      focusedValue: focusedValue ? datePicker.parse(focusedValue) : undefined,
      max: max ? datePicker.parse(max) : undefined,
      min: min ? datePicker.parse(min) : undefined,
      ...cleanProps(otherProps),
    }
  })

  const [state, send] = useMachine(datePicker.machine(context.value), { context })

  return computed(() => datePicker.connect(state.value, send, normalizeProps))
}
