import * as slider from '@zag-js/slider'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './slider'

export interface UseSliderProps
  extends Optional<Omit<slider.Context, 'dir' | 'getRootNode' | 'value'>, 'id'> {
  /**
   * The initial value of the slider when it is first rendered.
   * Use when you do not need to control the state of the slider.
   */
  defaultValue?: slider.Context['value']
  modelValue?: slider.Context['value']
}
export interface UseSliderReturn extends ComputedRef<slider.Api<PropTypes>> {}

export const useSlider = (props: UseSliderProps, emit: EmitFn<RootEmits>): UseSliderReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const context = computed(() => {
    const { defaultValue, modelValue, ...rest } = props
    return {
      ...rest,
      value: modelValue ?? defaultValue,
    }
  })

  const [state, send] = useMachine(
    slider.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      onFocusChange: (details) => emit('focusChange', details),
      onValueChangeEnd: (details) => emit('valueChangeEnd', details),
      onValueChange: (details) => {
        emit('valueChange', details)
        emit('update:modelValue', details.value)
      },
    }),
    { context },
  )

  return computed(() => slider.connect(state.value, send, normalizeProps))
}
