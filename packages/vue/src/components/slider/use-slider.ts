import * as slider from '@zag-js/slider'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './slider'

export interface UseSliderProps extends Optional<slider.Props, 'id'> {
  /**
   * The v-model value of the slider
   */
  modelValue?: slider.Props['value']
}
export interface UseSliderReturn extends ComputedRef<slider.Api<PropTypes>> {}

export const useSlider = (props: UseSliderProps = {}, emit?: EmitFn<RootEmits>): UseSliderReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const context = computed<slider.Props>(() => ({
    id,
    dir: locale.value.dir,
    value: props.modelValue,
    getRootNode: env?.value.getRootNode,
    ...cleanProps(props),
    onFocusChange: (details) => {
      emit?.('focusChange', details)
      props.onFocusChange?.(details)
    },
    onValueChangeEnd: (details) => {
      emit?.('valueChangeEnd', details)
      props.onValueChangeEnd?.(details)
    },
    onValueChange: (details) => {
      emit?.('valueChange', details)
      emit?.('update:modelValue', details.value)
      props.onValueChange?.(details)
    },
  }))

  const service = useMachine(slider.machine, context)
  return computed(() => slider.connect(service, normalizeProps))
}
