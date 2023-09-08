import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { RangeSliderProvider } from './range-slider-context'
import { emits, props } from './range-slider.props'
import { useRangeSlider, type UseRangeSliderProps } from './use-range-slider'

export type RangeSliderProps = Assign<HTMLArkProps<'div'>, UseRangeSliderProps>

export const RangeSlider = defineComponent({
  name: 'RangeSlider',
  props,
  emits,
  setup(props, { slots, attrs, emit }) {
    const api = useRangeSlider(props, emit)
    RangeSliderProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots?.default?.(api.value)}
      </ark.div>
    )
  },
})
