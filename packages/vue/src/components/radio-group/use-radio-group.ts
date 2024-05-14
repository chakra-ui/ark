import * as radioGroup from '@zag-js/radio-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
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
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const context = computed<radioGroup.Context>(() => ({
    id: id.value,
    dir: locale.value.dir,
    value: props.modelValue ?? props.defaultValue,
    getRootNode: env?.value.getRootNode,
    onValueChange: (details) => {
      emit('valueChange', details)
      emit('update:modelValue', details.value)
    },
    ...props,
  }))

  const [state, send] = useMachine(radioGroup.machine(context.value), { context })

  return computed(() => radioGroup.connect(state.value, send, normalizeProps))
}
