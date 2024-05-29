import * as numberInput from '@zag-js/number-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps, useId } from '../../utils'
import type { RootEmits } from './number-input.types'

export interface UseNumberInputProps
  extends Optional<Omit<numberInput.Context, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  modelValue?: numberInput.Context['value']
  /**
   * The initial value of the number input when it is first rendered.
   * Use when you do not need to control the state of the number input.
   */
  defaultValue?: numberInput.Context['value']
}
export interface UseNumberInputReturn extends ComputedRef<numberInput.Api<PropTypes>> {}

export const useNumberInput = (
  props: UseNumberInputProps,
  emit: EmitFn<RootEmits>,
): UseNumberInputReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const context = computed<numberInput.Context>(() => ({
    id,
    dir: locale.value.dir,
    value: props.modelValue ?? props.defaultValue,
    getRootNode: env?.value.getRootNode,
    onValueChange: (details) => {
      emit('valueChange', details)
      emit('update:modelValue', details.value)
    },
    onFocusChange: (details) => emit('focusChange', details),
    onValueInvalid: (details) => emit('valueInvalid', details),
    ...cleanProps(props),
  }))

  const [state, send] = useMachine(numberInput.machine(context.value), { context })

  return computed(() => numberInput.connect(state.value, send, normalizeProps))
}
