import * as colorPicker from '@zag-js/color-picker'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './color-picker.types'

export interface UseColorPickerProps
  extends Omit<Optional<Omit<colorPicker.Context, 'value'>, 'id'>, 'open.controlled'> {
  modelValue?: string
}
export interface UseColorPickerReturn extends ComputedRef<colorPicker.Api<PropTypes>> {}

export const useColorPicker = (
  props: UseColorPickerProps,
  emit: EmitFn<RootEmits>,
): UseColorPickerReturn => {
  const env = useEnvironmentContext()

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
      getRootNode: env?.value.getRootNode,
      onFormatChange(details) {
        emit('formatChange', details)
      },
      onOpenChange(details) {
        emit('openChange', details)
      },
      onValueChange(details) {
        emit('valueChange', details)
        emit('update:modelValue', details.valueAsString)
      },
      onValueChangeEnd(details) {
        emit('valueChangeEnd', details)
      },
    }),
    { context },
  )

  return computed(() => colorPicker.connect(state.value, send, normalizeProps))
}
