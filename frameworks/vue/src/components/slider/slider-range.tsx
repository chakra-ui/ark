import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useSliderContext } from './use-slider-context'

export interface SliderRangeProps extends HTMLArkProps<'div'> {}

export const SliderRange = defineComponent<SliderRangeProps>(
  (_, { slots, attrs }) => {
    const api = useSliderContext()

    return () => (
      <ark.div {...api.value.rangeProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'SliderRange',
  },
)
