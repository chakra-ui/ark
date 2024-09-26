import * as accordion from '@zag-js/accordion'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
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
  emit?: EmitFn<RootEmits>,
): UseAccordionReturn => {
  const id = useId() as string
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<accordion.Context>(() => ({
    id,
    dir: locale.value.dir,
    value: props.modelValue ?? props.defaultValue,
    getRootNode: env?.value.getRootNode,
    onFocusChange: (details) => emit?.('focusChange', details),
    onValueChange: (details) => {
      emit?.('valueChange', details)
      emit?.('update:modelValue', details.value)
    },
    ...cleanProps(props),
  }))
  const [state, send] = useMachine(accordion.machine(context.value), { context })

  return computed(() => accordion.connect(state.value, send, normalizeProps))
}
