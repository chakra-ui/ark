import * as slider from '@zag-js/slider'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
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

export const useSlider = (props: MaybeRef<UseSliderProps> = {}, emit?: EmitFn<RootEmits>): UseSliderReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<slider.Props>(() => {
    const localProps = toValue<UseSliderProps>(props)

    return {
      id,
      dir: locale.value.dir,
      value: localProps.modelValue,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localProps),
      onFocusChange: (details) => {
        emit?.('focusChange', details)
        localProps.onFocusChange?.(details)
      },
      onValueChangeEnd: (details) => {
        emit?.('valueChangeEnd', details)
        localProps.onValueChangeEnd?.(details)
      },
      onValueChange: (details) => {
        emit?.('valueChange', details)
        emit?.('update:modelValue', details.value)
        localProps.onValueChange?.(details)
      },
    }
  })

  const service = useMachine(slider.machine, context)
  return computed(() => slider.connect(service, normalizeProps))
}
