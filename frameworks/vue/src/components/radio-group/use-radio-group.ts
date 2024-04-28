import * as radioGroup from '@zag-js/radio-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './radio-group.types'

export interface UseRadioGroupProps
  extends Optional<Omit<radioGroup.Context, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  /**
   * The initial value of the radio group when it is first rendered.
   * Use when you do not need to control the state of the radio group.
   */
  defaultValue?: radioGroup.Context['value']
  modelValue?: radioGroup.Context['value']
}
export interface UseRadioGroupReturn extends ComputedRef<radioGroup.Api<PropTypes>> {}

export const useRadioGroup = (
  props: UseRadioGroupProps,
  emit: EmitFn<RootEmits>,
): UseRadioGroupReturn => {
  const env = useEnvironmentContext()
  const context = computed(() => {
    const { defaultValue, modelValue, ...rest } = props
    return {
      ...rest,
      value: modelValue ?? defaultValue,
    }
  })

  const [state, send] = useMachine(
    radioGroup.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode: env?.value.getRootNode,
      onValueChange: (details) => {
        emit('valueChange', details)
        emit('update:modelValue', details.value)
      },
    }),
    { context },
  )

  return computed(() => radioGroup.connect(state.value, send, normalizeProps))
}
