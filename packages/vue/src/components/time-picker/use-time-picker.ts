import { parseTime } from '@internationalized/date'
import * as timePicker from '@zag-js/time-picker'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './time-picker.types'

export interface UseTimePickerProps
  extends Optional<
    Omit<timePicker.Context, 'dir' | 'getRootNode' | 'min' | 'max' | 'open.controlled' | 'value'>,
    'id'
  > {
  /**
  /**
   * The initial open state of the time picker when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: timePicker.Context['open']
  /**
   * The initial value of the time picker when it is first rendered.
   * Use when you do not need to control the state of the time picker.
   */
  defaultValue?: string
  /**
   * The minimum time that can be selected.
   */
  min?: string
  /**
   * The maximum time that can be selected.
   */
  max?: string
  /**
   * The v-model value of the time picker
   */
  modelValue?: string
}

export interface UseTimePickerReturn extends ComputedRef<timePicker.Api<PropTypes>> {}

export const useTimePicker = (
  props: UseTimePickerProps,
  emit?: EmitFn<RootEmits>,
): UseTimePickerReturn => {
  const id = useId() as string
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<timePicker.Context>(() => {
    const { modelValue, defaultValue, min, max, ...otherProps } = props
    return {
      id,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      open: props.defaultOpen,
      'open.controlled': props.open !== undefined,
      onValueChange: (details) => emit?.('valueChange', details),
      onFocusChange: (details) => emit?.('focusChange', details),
      onOpenChange: (details) => emit?.('openChange', details),
      max: max ? parseTime(max) : undefined,
      min: min ? parseTime(min) : undefined,
      value: modelValue
        ? parseTime(modelValue)
        : defaultValue
          ? parseTime(defaultValue)
          : undefined,
      ...cleanProps(otherProps),
    }
  })

  const [state, send] = useMachine(timePicker.machine(context.value), { context })

  return computed(() => timePicker.connect(state.value, send, normalizeProps))
}
