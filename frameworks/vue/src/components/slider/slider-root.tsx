import { defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { SliderProvider } from './slider-context'
import { emits, props } from './slider.props'
import { type UseSliderProps, useSlider } from './use-slider'

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
