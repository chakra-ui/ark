import * as colorPicker from '@zag-js/color-picker'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'
import { useId } from '../../utils'

export interface UseColorPickerProps
  extends Omit<Optional<Omit<colorPicker.Context, 'value'>, 'id'>, 'open.controlled'> {
  modelValue?: string
}
export interface UseColorPickerReturn extends ComputedRef<colorPicker.Api<PropTypes>> {}

export const useColorPicker = (
  props: UseColorPickerProps,
  emit: CallableFunction,
): UseColorPickerReturn => {
  const getRootNode = useEnvironmentContext()

  const context = computed(() => {
    const { modelValue, ...rest } = props
    return {
      ...rest,
      value: modelValue ? colorPicker.parse(modelValue) : undefined,
      'open.controlled': props.open !== undefined,
    }
  })

  const [state, send] = useMachine(
    colorPicker.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onFormatChange(details) {
        emit('format-change', details)
      },
      onOpenChange(details) {
        emit('open-change', details)
      },
      onValueChange(details) {
        emit('value-change', details)
        emit('update:modelValue', details.valueAsString)
      },
      onValueChangeEnd(details) {
        emit('value-change-end', details)
      },
    }),
    { context },
  )

  return computed(() => colorPicker.connect(state.value, send, normalizeProps))
}
