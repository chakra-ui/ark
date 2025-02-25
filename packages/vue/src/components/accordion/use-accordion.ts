import * as accordion from '@zag-js/accordion'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './accordion.types'

export interface UseAccordionProps extends Optional<Omit<accordion.Props, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  /**
   * The model value of the accordion
   */
  modelValue?: accordion.Props['value']
}
export interface UseAccordionReturn extends ComputedRef<accordion.Api<PropTypes>> {}

export const useAccordion = (props: UseAccordionProps = {}, emit?: EmitFn<RootEmits>): UseAccordionReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<accordion.Props>(() => ({
    id,
    dir: locale.value.dir,
    getRootNode: env?.value.getRootNode,
    onFocusChange: (details) => emit?.('focusChange', details),
    value: props.modelValue,
    onValueChange: (details) => {
      emit?.('valueChange', details)
      emit?.('update:modelValue', details.value)
    },
    ...cleanProps(props),
  }))

  const service = useMachine(accordion.machine, context)
  return computed(() => accordion.connect(service, normalizeProps))
}
