import * as numberInput from '@zag-js/number-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './number-input.types'

export interface UseNumberInputProps
  extends Optional<Omit<numberInput.Context, 'dir' | 'getRootNode'>, 'id'> {
  modelValue?: numberInput.Context['value']
}
export interface UseNumberInputReturn extends ComputedRef<numberInput.Api<PropTypes>> {}

export const useNumberInput = (
  props: UseNumberInputProps,
  emit: EmitFn<RootEmits>,
): UseNumberInputReturn => {
  const env = useEnvironmentContext()

  const context = computed(() => {
    const { modelValue, ...rest } = props
    return {
      ...rest,
      value: modelValue,
    }
  })

  const [state, send] = useMachine(
    numberInput.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode: env?.value.getRootNode,
      onValueChange: (details) => {
        emit('valueChange', details)
        emit('update:modelValue', details.value)
      },
      onFocusChange: (details) => {
        emit('focusChange', details)
      },
      onValueInvalid: (details) => {
        emit('valueInvalid', details)
      },
    }),
    { context },
  )

  return computed(() => numberInput.connect(state.value, send, normalizeProps))
}
