import * as datePicker from '@zag-js/date-picker'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export interface UseDatePickerProps
  extends Optional<
    Omit<
      datePicker.Context,
      'value' | 'min' | 'max' | 'parse' | 'focusedValue' | 'open.controlled'
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
}

export interface UseDatePickerReturn extends ComputedRef<datePicker.Api<PropTypes>> {}

export const useDatePicker = (
  props: UseDatePickerProps,
  emit: CallableFunction,
): UseDatePickerReturn => {
  const getRootNode = useEnvironmentContext()
  const context = computed(() => {
    const { modelValue, focusedValue, min, max, ...rest } = props
    return {
      ...rest,
      focusedValue: focusedValue ? datePicker.parse(focusedValue) : undefined,
      value: modelValue ? datePicker.parse(modelValue) : undefined,
      max: max ? datePicker.parse(max) : undefined,
      min: min ? datePicker.parse(min) : undefined,
      'open.controlled': props.open !== undefined,
    }
  })

  const [state, send] = useMachine(
    datePicker.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onValueChange: (details) => {
        emit('value-change', details)
        emit('update:modelValue', details.value)
      },
      onFocusChange: (details) => {
        emit('focus-change', details)
      },
      onViewChange: (details) => {
        emit('view-change', details)
      },
      onOpenChange: (details) => {
        emit('open-change', details)
      },
    }),
    { context },
  )

  return computed(() => datePicker.connect(state.value, send, normalizeProps))
}
