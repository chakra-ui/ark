import * as accordion from '@zag-js/accordion'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './accordion.types'

export interface UseAccordionProps
  extends Optional<Omit<accordion.Context, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  /**
   * The accordion items that are currently expanded.
   * Use this prop to control the state of the items via v-model.
   */
  modelValue?: accordion.Context['value']
  /**
   * The initial value of the accordion that are expanded.
   * Use this when you do not need to control the state of the accordion.
   */
  defaultValue?: accordion.Context['value']
}
export interface UseAccordionReturn extends ComputedRef<accordion.Api<PropTypes>> {}

export const useAccordion = (
  props: UseAccordionProps,
  emit: EmitFn<RootEmits>,
): UseAccordionReturn => {
  const env = useEnvironmentContext()
  const context = computed(() => {
    const { modelValue, defaultValue, ...rest } = props
    return {
      ...rest,
      value: defaultValue ?? modelValue,
    }
  })

  const [state, send] = useMachine(
    accordion.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode: env?.value.getRootNode,
      onFocusChange: (details) => emit('focusChange', details),
      onValueChange: (details) => {
        emit('valueChange', details)
        emit('update:modelValue', details.value)
      },
    }),
    { context },
  )

  return computed(() => accordion.connect(state.value, send, normalizeProps))
}
