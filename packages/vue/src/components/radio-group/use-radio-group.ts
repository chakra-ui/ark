import * as radioGroup from '@zag-js/radio-group'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './radio-group.types'

export interface UseRadioGroupProps extends Optional<Omit<radioGroup.Props, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  /**
   * The v-model value of the radio group
   */
  modelValue?: radioGroup.Props['value']
}
export interface UseRadioGroupReturn extends ComputedRef<radioGroup.Api<PropTypes>> {}

export const useRadioGroup = (props: UseRadioGroupProps = {}, emit?: EmitFn<RootEmits>): UseRadioGroupReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const context = computed<radioGroup.Props>(() => ({
    id,
    dir: locale.value.dir,
    value: props.modelValue,
    getRootNode: env?.value.getRootNode,
    onValueChange: (details) => {
      emit?.('valueChange', details)
      emit?.('update:modelValue', details.value)
    },
    ...cleanProps(props),
  }))

  const service = useMachine(radioGroup.machine, context)
  return computed(() => radioGroup.connect(service, normalizeProps))
}
