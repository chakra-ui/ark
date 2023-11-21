import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useSliderContext } from './slider-context'

export interface SliderRangeProps extends HTMLArkProps<'div'> {}

export const SliderRange = defineComponent({
  name: 'SliderRange',
  setup(_, { slots, attrs }) {
    const api = useSliderContext()

    return () => (
      <ark.div {...api.value.rangeProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
