import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useSliderContext } from './slider-context'

export type SliderRangeProps = HTMLArkProps<'div'>

export const SliderRange: ComponentWithProps<SliderRangeProps> = defineComponent({
  name: 'SliderRange',
  setup(_, { slots, attrs }) {
    const api = useSliderContext()

    return () => (
      <ark.div {...api.value.rangeProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
