import * as datePicker from '@zag-js/date-picker'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export interface UseDatePickerProps
  extends Optional<Omit<datePicker.Context, 'value' | 'focusedValue'>, 'id'> {
  /**
   * The focused date.
   */
  focusedValue?: datePicker.Context['focusedValue']
  modelValue?: datePicker.Context['value']
}

export interface UseDatePickerReturn extends ComputedRef<datePicker.Api<PropTypes>> {}

export const useDatePicker = (
  props: UseDatePickerProps,
  emit: CallableFunction,
): UseDatePickerReturn => {
  const getRootNode = useEnvironmentContext()
  const context = computed(() => {
    const { modelValue, focusedValue, ...rest } = props
    return {
      ...rest,
      value: modelValue,
      focusedValue,
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
