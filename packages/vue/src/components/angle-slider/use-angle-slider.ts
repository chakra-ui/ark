import * as angleSlider from '@zag-js/angle-slider'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type EmitFn, type MaybeRef, computed, toValue, useId } from 'vue'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './angle-slider.types'

export interface UseAngleSliderProps extends Optional<angleSlider.Props, 'id'> {
  /**
   * The v-model value of the angle slider
   */
  modelValue?: angleSlider.Props['value']
}
export interface UseAngleSliderReturn extends ComputedRef<angleSlider.Api<PropTypes>> {}

export const useAngleSlider = (
  props: MaybeRef<UseAngleSliderProps> = {},
  emit?: EmitFn<RootEmits>,
): UseAngleSliderReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const context = computed<angleSlider.Props>(() => {
    const localProps = toValue<UseAngleSliderProps>(props)
    return {
      id,
      dir: locale?.value.dir,
      getRootNode: env?.value.getRootNode,
      value: localProps.modelValue,
      ...cleanProps(localProps),
      onValueChange: (details) => {
        emit?.('valueChange', details)
        emit?.('update:modelValue', details.value)
        localProps.onValueChange?.(details)
      },
      onValueChangeEnd: (details) => {
        emit?.('valueChangeEnd', details)
        localProps.onValueChangeEnd?.(details)
      },
    }
  })

  const service = useMachine(angleSlider.machine, context)
  return computed(() => angleSlider.connect(service, normalizeProps))
}
