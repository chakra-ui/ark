import * as datePicker from '@zag-js/date-picker'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
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
}

export interface UseDatePickerReturn extends ComputedRef<datePicker.Api<PropTypes>> {}

export const useDatePicker = (
  props: UseDatePickerProps,
  emit: EmitFn<RootEmits>,
): UseDatePickerReturn => {
  const env = useEnvironmentContext()
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
      getRootNode: env?.value.getRootNode,
      onValueChange: (details) => {
        emit('valueChange', details)
        emit('update:modelValue', details.valueAsString)
      },
      onFocusChange: (details) => {
        emit('focusChange', details)
      },
      onViewChange: (details) => {
        emit('viewChange', details)
      },
      onOpenChange: (details) => {
        emit('openChange', details)
      },
    }),
    { context },
  )

  return computed(() => datePicker.connect(state.value, send, normalizeProps))
}
