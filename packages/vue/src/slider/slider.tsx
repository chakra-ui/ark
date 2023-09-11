import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { SliderProvider } from './slider-context'
import { emits, props } from './slider.props'
import { useSlider, type UseSliderProps } from './use-slider'

export type SliderProps = Assign<HTMLArkProps<'div'>, UseSliderProps>

export const Slider = defineComponent({
  name: 'Slider',
  props,
  emits,
  setup(props, { slots, attrs, emit }) {
    const api = useSlider(props, emit)
    SliderProvider(api)

    return () => (
      <>
        <ark.div {...api.value.rootProps} {...attrs}>
          {slots?.default?.(api.value)}
        </ark.div>
        <input {...api.value.hiddenInputProps} />
      </>
    )
  },
})
