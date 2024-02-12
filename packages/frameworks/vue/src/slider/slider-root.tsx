import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { SliderProvider } from './slider-context'
import { emits, props } from './slider.props'
import { useSlider, type UseSliderProps } from './use-slider'

export interface SliderRootProps extends Assign<HTMLArkProps<'div'>, UseSliderProps> {}

export const SliderRoot = defineComponent<SliderRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = useSlider(props, emit)
    SliderProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.div>
    )
  },
  {
    name: 'SliderRoot',
    props,
    emits,
  },
)
